// models/Viral.js
// Viral keyword storage schema with single TTL index on createdAt
import mongoose from 'mongoose';

const ViralSchema = new mongoose.Schema({
  keywords: [String],                            // array of extracted keywords
  createdAt: { type: Date, default: Date.now }   // automatically set by mongoose
});

// Apply a single TTL index—removes documents 7 days (604800s) after createdAt
ViralSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export default mongoose.models.Viral || mongoose.model('Viral', ViralSchema);