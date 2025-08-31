'use client';

import { useState } from 'react';
import { Sparkles, Link, Youtube, Type, Copy, Check } from 'lucide-react';

export default function TweetGenerator() {
  const [input, setInput] = useState('');
  const [type, setType] = useState('text');
  const [tweets, setTweets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const types = [
    { id: 'text', label: 'Topic/Text', icon: Type, placeholder: 'Enter a topic or text to create tweets about...' },
    { id: 'article', label: 'Article URL', icon: Link, placeholder: 'Paste an article URL to generate tweets from...' },
    { id: 'youtube', label: 'YouTube URL', icon: Youtube, placeholder: 'Paste a YouTube URL to generate tweets from...' },
  ];

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter some content');
      return;
    }

    setLoading(true);
    setError('');
    setTweets([]);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ input: input.trim(), type }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate tweets');
      }

      setTweets(data.tweets || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyTweet = async (tweet: string, index: number) => {
    try {
      await navigator.clipboard.writeText(tweet);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const selectedType = types.find(t => t.id === type);

  return (
    <div className="space-y-8">
      {/* Content Type Selector */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">What would you like to create tweets from?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {types.map((typeOption) => {
            const Icon = typeOption.icon;
            return (
              <button
                key={typeOption.id}
                onClick={() => setType(typeOption.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  type === typeOption.id
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-gray-300 hover:border-blue-400 hover:bg-blue-400/10'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{typeOption.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <label className="block text-lg font-semibold text-white mb-4">
          Enter Your {selectedType?.label}
        </label>
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedType?.placeholder}
            rows={type === 'text' ? 4 : 2}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating Viral Tweets...' : 'Generate Viral Tweets'}
          </button>
        </div>
      </div>

      {/* Generated Tweets */}
      {tweets.length > 0 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Generated Viral Tweets
          </h3>
          <div className="space-y-4">
            {tweets.map((tweet, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex justify-between items-start gap-4">
                  <p className="text-gray-200 flex-1 leading-relaxed">{tweet}</p>
                  <button
                    onClick={() => copyTweet(tweet, index)}
                    className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    title="Copy tweet"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="mt-3 text-sm text-gray-400">
                  {tweet.length}/280 characters
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}