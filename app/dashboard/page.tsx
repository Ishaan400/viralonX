'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TweetGenerator from '@/components/TweetGenerator';
import TweetHistory from '@/components/TweetHistory';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'generate' && <TweetGenerator />}
        {activeTab === 'history' && <TweetHistory />}
      </main>
    </div>
  );
}