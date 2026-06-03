import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TheoryHeader from './TheoryHeader';

export default function TheoryLayout() {
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
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-primary/30 selection:text-white">
      <TheoryHeader />
      <main className="flex-1 mt-16 w-full relative z-0">
        <Outlet />
      </main>
    </div>
  );
}
