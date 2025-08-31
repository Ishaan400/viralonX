'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

interface AuthFormProps {
  mode?: 'login' | 'signup';
}

export default function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                🦤
              </div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
            </div>
            <span className="text-xl font-bold text-white">viralonX</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Get Started'}
          </h1>
          <p className="text-gray-300">
            {mode === 'login' 
              ? 'Sign in to viralonX and generate viral tweets' 
              : 'Create your viralonX account to start generating viral content'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused('')}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  isFocused === 'email' 
                    ? 'border-blue-500 focus:ring-blue-500/50 bg-white/15' 
                    : 'border-white/20 hover:border-blue-400/50'
                }`}
                placeholder="Enter your email"
                required
              />
              {isFocused === 'email' && (
                <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl pointer-events-none animate-pulse"></div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused('password')}
                onBlur={() => setIsFocused('')}
                className={`w-full px-4 py-3 pr-12 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  isFocused === 'password' 
                    ? 'border-blue-500 focus:ring-blue-500/50 bg-white/15' 
                    : 'border-white/20 hover:border-blue-400/50'
                }`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {isFocused === 'password' && (
                <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl pointer-events-none animate-pulse"></div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3 text-red-200 text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <a
              href={mode === 'login' ? '/signup' : '/login'}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </a>
          </p>
        </div>

        {/* Additional info for signup */}
        {mode === 'signup' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-xl border border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-300 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">What you'll get with viralonX:</span>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• AI-powered tweet generation</li>
              <li>• Real-time trending topics</li>
              <li>• Viral keyword integration</li>
              <li>• Free trial included</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}