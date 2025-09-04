'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Sparkles, TrendingUp, Users, ArrowRight, CheckCircle, Play, Star } from 'lucide-react';

// Lazy load heavy components
const LazyFeatures = lazy(() => import('./components/LazyFeatures'));
const LazyBackendInfo = lazy(() => import('./components/LazyBackendInfo'));

export default function HomePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
    
    // Animation on mount
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [router]);

  const features = [
    {
      icon: TrendingUp,
      title: 'Trending Topics',
      description: 'Leverages real-time trending topics (Trends24) to ensure your content stays relevant.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Sparkles,
      title: 'Smart Tweet Creation',
      description: 'Create engaging tweets from any YouTube video, article, or topic with a click.',
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-teal-500/20 to-emerald-500/20'
    },
    {
      icon: Users,
      title: 'Viral Keywords',
      description: 'Incorporates viral keywords from Reddit and Google Trends for maximum engagement.',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-indigo-500/20 to-blue-500/20'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:from-blue-300 group-hover:to-teal-300 transition-all duration-300">
                🦤
              </div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-blue-300/30 transition-all duration-300"></div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">viralonX</span>
          </div>
          <div className="flex gap-4">
            <a
              href="/login"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Trending-topic boosted tweets</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 leading-tight">
              Generate Viral Tweets with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400"> viralonX</span>
            </h1>
            
            <p className="text-lg leading-8 text-gray-300 mb-10 max-w-2xl mx-auto">
              Use trending topics to increase the chance of reach. viralonX makes it easy to craft tweets from any YouTube video, web page, or topic—fast.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
              <a
                href="/signup"
                className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-blue-500/25"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Start Creating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/login"
                className="text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-blue-400/50"
              >
                Sign In
              </a>
            </div>

            {/* Backend Development Info - Lazy Loaded */}
            <Suspense fallback={
              <div className="max-w-3xl mx-auto mt-16">
                <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 animate-pulse">
                  <div className="h-8 bg-blue-400/20 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-blue-400/20 rounded"></div>
                    <div className="h-4 bg-blue-400/20 rounded w-3/4"></div>
                    <div className="h-4 bg-blue-400/20 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            }>
              <LazyBackendInfo />
            </Suspense>
          </div>
        </div>

        {/* Features - Lazy Loaded */}
        <Suspense fallback={
          <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="h-8 bg-blue-400/20 rounded mb-4 animate-pulse"></div>
              <div className="h-6 bg-blue-400/20 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-pulse">
                  <div className="h-6 bg-blue-400/20 rounded mb-4"></div>
                  <div className="h-4 bg-blue-400/20 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        }>
          <LazyFeatures features={features} activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        </Suspense>

        {/* CTA Section */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 pb-24">
          <div className="bg-gradient-to-r from-blue-600/20 to-teal-600/20 backdrop-blur-lg rounded-3xl p-12 border border-blue-500/30 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Create Viral Content?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using viralonX to generate engaging tweets that drive real engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Free Trial
              </a>
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                Already have an account? Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}