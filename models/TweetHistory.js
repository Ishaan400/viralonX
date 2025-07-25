// models/TweetHistory.js
import mongoose from 'mongoose';

const TweetHistorySchema = new mongoose.Schema({
  user:   { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  input:  { type: String, required: true },    // The submitted content or URL
  tweets: { type: [String], required: true },  // Generated tweets
}, { timestamps: true });

export default mongoose.models.TweetHistory || mongoose.model('TweetHistory', TweetHistorySchema);