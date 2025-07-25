// app/layout.tsx
export const dynamic = 'force-dynamic';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ViralTweets - AI-Powered Tweet Generator',
  description: 'Generate viral tweets using trending topics and AI. Transform your content into engaging social media posts.',
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
      </body>
    </html>
  );
}