// app/layout.tsx
export const dynamic = 'force-dynamic';

import { Inter } from 'next/font/google';
import './globals.css';
import PerformanceMonitor from '@/components/PerformanceMonitor';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'viralonX - AI-Powered Tweet Generator',
  description: 'Generate viral tweets using trending topics and AI with viralonX. Transform your content into engaging social media posts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <PerformanceMonitor />
      </body>
    </html>
  );
}