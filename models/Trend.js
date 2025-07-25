// models/Trend.js
import mongoose from 'mongoose';

const TrendSchema = new mongoose.Schema({
  keywords: [String], // e.g. ["Coldplay", "#SomeTrend", ...]
  createdAt: { type: Date, default: Date.now, expires: 3600 } // TTL: 1 hour (3600 seconds)
});

// Apply TTL index
TrendSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.models.Trend || mongoose.model('Trend', TrendSchema);