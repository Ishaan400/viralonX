// lib/mongodb.js
import mongoose from 'mongoose';

//
// 1) Load local .env only in development
//
if (process.env.NODE_ENV === 'development') {
  // using CommonJS here so you don’t accidentally tree‑shake dotenv in prod
  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
  require('dotenv').config();
}

//
// 2) Pull in your vars
//
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB  = process.env.MONGODB_DB;

//
// 3) Validate presence
//
if (!MONGODB_URI) {
  throw new Error(
    process.env.NODE_ENV === 'development'
      ? 'Please define MONGODB_URI in your local .env'
      : 'Missing required environment variable: MONGODB_URI'
  );
}

//
// 4) Global cache for dev hot‑reloads
//
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

//
// 5) Export connection helper
//
export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10,
      dbName:      MONGODB_DB,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
