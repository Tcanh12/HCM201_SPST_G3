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
    <header className="fixed top-0 left-0 right-0 h-16 bg-dark/80 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/theory')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(217,28,28,0.4)] group-hover:shadow-[0_0_20px_rgba(245,197,66,0.6)] transition-all">
            C
          </div>
          <span className="font-display font-black text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 group-hover:to-white transition-all">
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
                    ? 'bg-white/10 text-yellow-400 font-bold' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
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
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-sm shadow-[0_0_15px_rgba(217,28,28,0.3)] hover:scale-105 hover:shadow-[0_0_20px_rgba(217,28,28,0.5)] transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            Vào Game Mode
          </button>

          {/* Mobile menu button */}
          <button 
            className="xl:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
            className="absolute top-16 left-0 right-0 bg-dark-lighter border-b border-white/10 shadow-2xl xl:hidden"
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
                        ? 'bg-white/10 text-yellow-400' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </NavLink>
              ))}
              <div className="w-full h-px bg-white/10 my-2" />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold shadow-[0_0_15px_rgba(217,28,28,0.3)]"
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
