import { verifyToken } from '../../utils/jwt.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ valid: false });

    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ valid: false });

    res.status(200).json({ valid: true, userId: decoded.userId });
  } catch (err) {
    res.status(500).json({ valid: false, error: 'Server error' });
  }
}