import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trebami - Service Marketplace',
  description: 'Find and book local service professionals for all your needs',
  keywords: 'services, professionals, cleaning, electrical, plumbing, construction, home repair',
  authors: [{ name: 'Trebami Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Trebami - Service Marketplace',
    description: 'Find and book local service professionals for all your needs',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trebami - Service Marketplace',
    description: 'Find and book local service professionals for all your needs',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}