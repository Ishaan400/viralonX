'use client';

import { useState, useEffect } from 'react';
import { History, Copy, Check, Calendar } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface HistoryItem {
  _id: string;
  input: string;
  tweets: string[];
  createdAt: string;
}

export default function TweetHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedTweet, setCopiedTweet] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/history', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch history');
      }

      setHistory(data.history || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyTweet = async (tweet: string) => {
    try {
      await navigator.clipboard.writeText(tweet);
      setCopiedTweet(tweet);
      setTimeout(() => setCopiedTweet(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="md" text="Loading history..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-200 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <History className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">Tweet History</h2>
      </div>

      {history.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
          <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No tweets generated yet</h3>
          <p className="text-gray-400">Start creating viral content to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-gray-300 text-sm mb-2">Original Input:</p>
                  <p className="text-white font-medium bg-white/5 rounded-lg p-3 border border-white/10">
                    {item.input}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm ml-4">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.createdAt)}
                </div>
              </div>

              <div>
                <p className="text-gray-300 text-sm mb-3">Generated Tweets:</p>
                <div className="space-y-3">
                  {item.tweets.map((tweet, index) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <p className="text-gray-200 flex-1 leading-relaxed">{tweet}</p>
                        <button
                          onClick={() => copyTweet(tweet)}
                          className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                          title="Copy tweet"
                        >
                          {copiedTweet === tweet ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        {tweet.length}/280 characters
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}