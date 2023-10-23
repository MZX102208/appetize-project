import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appetize Project',
  description: 'For Appetize coding challenge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
};
