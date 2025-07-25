// utils/jwt.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d'; // token valid for 7 days

export function signToken(payload) {
  // Signs the payload (e.g. { userId }) with expiration
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}