'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load heavy components
const TweetGenerator = lazy(() => import('@/components/TweetGenerator'));
const TweetHistory = lazy(() => import('@/components/TweetHistory'));

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('generate');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/validate', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      setLoading(false);
    };

    validateToken();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="md" text="Loading component..." />
          </div>
        }>
          {activeTab === 'generate' && <TweetGenerator />}
          {activeTab === 'history' && <TweetHistory />}
        </Suspense>
      </main>
    </div>
  );
}