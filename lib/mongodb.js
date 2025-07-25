// lib/mongodb.js
// Fully self-contained MongoDB connection helper with caching and .env support

// 1) Load environment variables immediately
import 'dotenv/config';

import mongoose from 'mongoose';

// 2) Read required env vars
const { MONGODB_URI, MONGODB_DB } = process.env;

// 3) Validate
if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env');
}

// 4) Global cache to reuse connection across hot-reloads in development
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// 5) Exported connection function
export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      maxPoolSize: 10,        // Maintain up to 10 socket connections
      dbName:      MONGODB_DB, // Use specific DB if provided
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}