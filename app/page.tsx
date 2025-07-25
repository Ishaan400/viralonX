'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const features = [
    {
      icon: TrendingUp,
      title: 'Trending Topics',
      description: 'Leverages real-time trending topics from Twitter to ensure your content stays relevant.',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Generation',
      description: 'Uses advanced AI to create engaging, viral-worthy tweets tailored to your content.',
    },
    {
      icon: Users,
      title: 'Viral Keywords',
      description: 'Incorporates viral keywords from Reddit and Google Trends for maximum engagement.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">ViralTweets</span>
          </div>
          <div className="flex gap-4">
            <a
              href="/login"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Generate Viral Tweets with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> AI Power</span>
            </h1>
            <p className="text-lg leading-8 text-gray-300 mb-10 max-w-2xl mx-auto">
              Transform your content into engaging, viral-worthy tweets using trending topics from Twitter and viral keywords from across the internet. Powered by advanced AI and real-time data.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Start Creating
              </a>
              <a
                href="/login"
                className="text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/10 transition-all duration-200"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Why Choose ViralTweets?
            </h2>
            <p className="text-lg leading-8 text-gray-300 mb-16">
              Our platform combines the latest AI technology with real-time data to help you create content that resonates.
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}