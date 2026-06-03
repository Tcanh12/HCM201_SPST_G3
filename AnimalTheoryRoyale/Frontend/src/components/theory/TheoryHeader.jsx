import { NavLink, useNavigate } from 'react-router-dom';
import { Gamepad2, Menu, X, BookOpen, Map, Clock, FileText, CheckSquare, Search } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TheoryHeader() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Trang chủ', path: '/theory', icon: Search },
    { name: 'Giới thiệu', path: '/theory/about', icon: BookOpen },
    { name: 'Nội dung giáo trình', path: '/theory/chapters', icon: BookOpen },
    { name: 'Bản đồ tri thức', path: '/theory/concept-map', icon: Map },
    { name: 'Timeline', path: '/theory/timeline', icon: Clock },
    { name: 'Case Files', path: '/theory/case-files', icon: FileText },
    { name: 'Ôn tập', path: '/theory/review', icon: CheckSquare },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/theory')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B91C1C] to-[#F59E0B] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-lg transition-all">
            C
          </div>
          <span className="font-display font-black text-xl tracking-tight text-[#1F2937] group-hover:text-[#B91C1C] transition-colors">
            Concept Explorer
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/theory'}
              className={({ isActive }) => 
                `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#FEE2E2] text-[#B91C1C] font-bold' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-[#1F2937]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Game Mode Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E3A8A] text-white font-bold text-sm shadow-md hover:scale-105 hover:bg-[#1e3a8add] hover:shadow-lg transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            Vào Game Mode
          </button>

          {/* Mobile menu button */}
          <button 
            className="xl:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl xl:hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/theory'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive 
                        ? 'bg-[#FEE2E2] text-[#B91C1C]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1F2937]'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </NavLink>
              ))}
              <div className="w-full h-px bg-gray-200 my-2" />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold shadow-md"
              >
                <Gamepad2 className="w-5 h-5" />
                Vào Game Mode
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
