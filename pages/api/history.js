import dbConnect from '../../lib/mongodb';
import TweetHistory from '../../models/TweetHistory.js';
import { verifyToken } from '../../utils/jwt.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Not authenticated' });

    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    await dbConnect();
    const histories = await TweetHistory.find({ user: decoded.userId })
      .sort({ createdAt: -1 })
      .select('-user -__v');

    res.status(200).json({ history: histories });
  } catch (err) {
    console.error('History error:', err);
    res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}