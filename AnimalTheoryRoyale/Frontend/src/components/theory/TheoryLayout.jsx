import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TheoryHeader from './TheoryHeader';

export default function TheoryLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Allow scrolling for theory pages (overrides body overflow-hidden from index.css)
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      // Revert when leaving theory mode
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#1F2937] font-sans selection:bg-[#B91C1C]/20 selection:text-[#B91C1C]">
      <TheoryHeader />
      <main className="flex-1 mt-16 w-full relative z-0">
        <Outlet />
      </main>
    </div>
  );
}
