import dbConnect from '../../lib/mongodb.js';
import TweetHistory from '../../models/TweetHistory.js';
import Trend from '../../models/Trend.js';
import Viral from '../../models/Viral.js';
import { verifyToken } from '../../utils/jwt.js';
import { parseArticle, parseYouTube } from '../../utils/parseContent.js';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Authenticate
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const userId = decoded.userId;

    // 2. Validate input
    const { input, type } = req.body;
    if (!input || !['text', 'article', 'youtube'].includes(type)) {
      return res.status(400).json({ error: 'Invalid input or type' });
    }

    // 3. Connect to MongoDB
    await dbConnect();

    // 4. Extract content
    let contentText = '';
    if (type === 'article') {
      if (!/^https?:\/\//.test(input)) {
        return res.status(400).json({ error: 'Invalid article URL' });
      }
      contentText = await parseArticle(input);
    } else if (type === 'youtube') {
      if (!/(youtube\.com|youtu\.be)/.test(input)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }
      contentText = await parseYouTube(input);
    } else {
      contentText = input;
    }

    if (!contentText.trim()) {
      return res.status(422).json({ error: 'Failed to extract any text from input' });
    }

    // ✅ 5. Truncate contentText if it's too long (prevent token overflow)
    const MAX_CHARS = 10000;
    if (contentText.length > MAX_CHARS) {
      console.log(`✂️ Truncating content from ${contentText.length} to ${MAX_CHARS} characters`);
      contentText = contentText.slice(0, MAX_CHARS) + '...';
    }

    // 6. Summarize if very long
    let summary = contentText;
    if (contentText.length > 800) {
      const summaryPrompt = `Summarize the following content briefly:\n${contentText}`;
      const summaryResp = await cohere.generate({
        model: 'command',
        prompt: summaryPrompt,
        max_tokens: 300,
        temperature: 0.5,
      });
      summary = summaryResp.generations[0].text.trim();
    }

    // 7. Load trending & viral keywords
    const trendDoc = await Trend.findOne().sort({ createdAt: -1 });
    const viralDoc = await Viral.findOne().sort({ createdAt: -1 });
    const trending = trendDoc?.keywords.join(', ') || '';
    const viralKeys = viralDoc?.keywords.join(', ') || '';

    // 8. Build prompt
    const prompt = `
You are an API for generating tweets. Do NOT explain or comment.

Generate exactly 2 short, engaging tweets based on this topic:
"${summary}"

Use trending keywords if they make sense:
- Twitter trends: ${trending}
- Google trends: ${viralKeys}

Rules:
- Each tweet must be under 280 characters
- Be distinct, viral, and hashtag-savvy
- Do NOT add commentary, titles, code blocks, or explanations
- Only output a JSON array of 1 tweet strings
- Do not tell in response "here is your tweet..." or anything like that just simple give one tweet in response.
`;

    // 9. Call Cohere to generate tweets
    const tweetResp = await cohere.generate({
      model: 'command',
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const rawOutput = tweetResp.generations[0].text.trim();

    let tweets;
    try {
      tweets = JSON.parse(rawOutput);
    } catch {
      // Cleanup: remove markdown, filter short lines, remove quote wrapping
      const lines = rawOutput
        .split('\n')
        .map(l => l.trim().replace(/^["'\-*\s]+|["'\-*\s]+$/g, ''))
        .filter(l =>
          l.length > 30 &&
          !l.startsWith('```') &&
          !l.startsWith('[') &&
          !l.startsWith(']') &&
          !l.toLowerCase().includes('let me know') &&
          !l.toLowerCase().includes('here are') &&
          !l.endsWith(':')
        );

      // Return at most 3 clean tweets
      tweets = lines.slice(0, 3);
    }

    // 10. Save history
    await TweetHistory.create({ user: userId, input, tweets });

    // 11. Return result
    res.status(200).json({ tweets });

  } catch (err) {
    console.error('API generate error:', err);
    res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}
