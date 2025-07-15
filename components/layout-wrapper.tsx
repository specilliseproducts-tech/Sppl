'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isAuthPage = pathname.startsWith('/auth');

  const shouldHideNavbar = isDashboard || isAuthPage;

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main className={`min-h-screen ${!shouldHideNavbar ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!shouldHideNavbar && <Footer />}
    </>
  );
}
