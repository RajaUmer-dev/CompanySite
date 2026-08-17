import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useSmoothScroll, useCustomCursor } from '@/hooks';

export default function Layout({ children }: { children: ReactNode }) {
  useSmoothScroll();
  useCustomCursor();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-[#08080A] text-[#F4F4F2]">
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main key={pathname} className="page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
}
