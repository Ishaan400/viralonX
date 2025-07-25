// utils/parseContent.js

import { extract } from '@extractus/article-extractor';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Given a blog/article URL, fetches and returns its main content as plain text.
 * Returns an empty string on failure.
 */
export async function parseArticle(url) {
  try {
    const article = await extract(url);
    const html = article?.content || '';

    // ✅ Strip all HTML tags, collapse whitespace
    const plainText = html
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return plainText;
  } catch (err) {
    console.error('❌ parseArticle error:', err.message);
    return '';
  }
}

/**
 * Fetches auto-generated English subtitles using yt-dlp,
 * cleans out all timing markup/headers, and returns plain text.
 */
export async function parseYouTube(linkOrId) {
  try {
    // 1. Extract video ID from URL or assume it's already the ID
    let videoId = linkOrId;
    try {
      const url = new URL(linkOrId);
      videoId = url.searchParams.get('v') || url.pathname.split('/').pop();
    } catch {
      // Not a full URL, treat as ID
    }

    // 2. Build and run yt-dlp command
    const YT_DLP = process.env.YT_DLP_PATH || 'yt-dlp';
    const outputPattern = `${videoId}.en.vtt`;
    const cmd = `"${YT_DLP}" --write-auto-sub --sub-lang en --skip-download -o "${videoId}" "https://www.youtube.com/watch?v=${videoId}"`;

   await new Promise((resolve, reject) => {
  exec(cmd, { shell: true }, (err) => (err ? reject(err) : resolve()));
});


    // 3. Read the .vtt file
    const vttPath = path.resolve(process.cwd(), outputPattern);
    if (!fs.existsSync(vttPath)) {
      console.log('❌ No subtitles file found');
      return '';
    }

    const raw = fs.readFileSync(vttPath, 'utf-8');
    fs.unlinkSync(vttPath); // Cleanup the file

    // 4. Clean .vtt content into plain text
    const text = raw
      .split('\n')
      .filter(line =>
        line.trim() &&
        !/^[0-9]+$/.test(line) &&
        !line.includes('-->') &&
        !line.startsWith('WEBVTT')
      )
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return text;
  } catch (err) {
    console.error('❌ parseYouTube error:', err.message);
    return '';
  }
}
