import dbConnect from '../../lib/mongodb';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/jwt.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await dbConnect();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = signToken({ userId: user._id });
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}