import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import PageTransition from '@/components/page-transition';
import LayoutWrapper from '@/components/layout-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spécialisé Products - Customized Solutions Company',
  description:
    'Spécialisé Products provides customized solutions for demanding applications with over 30 years of experience in laser technology, 3D printing, and optical systems.',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <PageTransition>
          <LayoutWrapper>{children}</LayoutWrapper>
        </PageTransition>
      </body>
    </html>
  );
}
