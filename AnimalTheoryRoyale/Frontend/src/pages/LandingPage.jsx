import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Users, BookOpen, Compass, Shield, BookMarked, Map, ChevronRight } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { CHARACTER_DATA } from '../data/characterData';

// Background with HCM colors
function HCMBackground() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(250, 204, 21, 0.22), transparent 40%),
          radial-gradient(circle at 80% 10%, rgba(185, 28, 28, 0.32), transparent 40%),
          linear-gradient(135deg, #7F1D1D 0%, #B91C1C 42%, #F5E6C8 100%)
        `
      }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" style={{ mixBlendMode: 'overlay' }} />
    </div>
  );
}

// 3 Info Cards as requested
function FeatureCards() {
  const cards = [
    {
      title: "Học lý thuyết trực quan",
      desc: "Concept map, timeline, chương học.",
      icon: BookMarked,
      delay: 0.8
    },
    {
      title: "Thi đấu sinh tồn tri thức",
      desc: "Vòng bo, cột kiến thức, combo điểm.",
      icon: Compass,
      delay: 1.0
    },
    {
      title: "Gắn kết lớp học",
      desc: "Giảng viên tạo phòng, sinh viên tham gia, bảng xếp hạng realtime.",
      icon: Shield,
      delay: 1.2
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-6 mt-12 mb-10 relative z-10">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: c.delay, duration: 0.6 }}
          className="flex flex-col items-center text-center p-6 rounded-2xl transition-transform hover:-translate-y-2"
          style={{
            background: 'rgba(255, 247, 237, 0.9)',
            border: '1px solid rgba(250, 204, 21, 0.38)',
            boxShadow: '0 20px 60px rgba(127, 29, 29, 0.22)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(185, 28, 28, 0.1)', color: '#B91C1C' }}>
            <c.icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: '#7F1D1D' }}>{c.title}</h3>
          <p className="text-sm" style={{ color: '#3F6212' }}>{c.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Minimal floating elements instead of cyber orbs
function AcademicFloaters() {
  const nodes = useMemo(() => [
    { size: 40, x: '15%', y: '25%', duration: 15 },
    { size: 60, x: '85%', y: '20%', duration: 20 },
    { size: 30, x: '75%', y: '70%', duration: 18 },
    { size: 50, x: '25%', y: '65%', duration: 22 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg border flex items-center justify-center"
          style={{ 
            width: n.size, height: n.size, left: n.x, top: n.y,
            background: 'rgba(250, 204, 21, 0.1)',
            borderColor: 'rgba(250, 204, 21, 0.3)'
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: n.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Navigation Header
function MainHeader() {
  const navigate = useNavigate();
  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center"
      style={{
        background: 'rgba(127, 29, 29, 0.78)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(250, 204, 21, 0.25)',
      }}
    >
      <div className="flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-yellow-400" />
        <span className="font-bold text-white text-lg tracking-wide">HCM201</span>
      </div>
      <nav className="hidden md:flex gap-6 items-center">
        <button onClick={() => navigate('/theory')} className="text-sm font-medium text-white/90 hover:text-yellow-400 transition-colors">Lý thuyết</button>
        <button onClick={() => navigate('/theory/timeline')} className="text-sm font-medium text-white/90 hover:text-yellow-400 transition-colors">Timeline</button>
        <button onClick={() => navigate('/theory/concept-map')} className="text-sm font-medium text-white/90 hover:text-yellow-400 transition-colors">Sơ đồ tư duy</button>
        <button onClick={() => navigate('/create')} className="text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors">Tạo phòng</button>
        <button onClick={() => navigate('/join')} className="text-sm font-bold text-white hover:text-gray-200 transition-colors bg-white/20 px-4 py-1.5 rounded-lg">Vào phòng</button>
      </nav>
    </header>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen w-full overflow-y-auto overflow-x-hidden font-sans pt-24 pb-12">
      <HCMBackground />
      <AcademicFloaters />
      <MainHeader />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-8">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-2 drop-shadow-xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
            <span className="text-white">VÒNG BO </span>
            <span className="text-yellow-400">TRI THỨC 3D</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-10 px-4 max-w-2xl"
        >
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium">
            Học Tư tưởng Hồ Chí Minh qua đấu trường sinh tồn, thử thách kiến thức và tương tác 3D.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 w-full max-w-sm md:max-w-none px-6 justify-center"
        >
          {/* Theory Campus */}
          <button
            onClick={() => navigate('/theory')}
            className="group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 shadow-xl"
            style={{
              background: '#FFF7ED',
              color: '#7F1D1D',
              border: '1px solid rgba(250, 204, 21, 0.5)',
            }}
          >
            <BookOpen className="w-5 h-5" />
            Vào học lý thuyết
          </button>

          {/* Create Room */}
          <button
            onClick={() => navigate('/create')}
            className="group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 shadow-xl text-white"
            style={{
              background: 'linear-gradient(135deg, #B91C1C, #7F1D1D)',
              border: '1px solid rgba(250, 204, 21, 0.7)',
            }}
          >
            <Swords className="w-5 h-5 text-yellow-400" />
            Tạo phòng
          </button>

          {/* Join Room */}
          <button
            onClick={() => navigate('/join')}
            className="group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1 shadow-xl text-white"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <Users className="w-5 h-5" />
            Vào phòng
          </button>
        </motion.div>

        {/* 3 Info Cards */}
        <FeatureCards />
        
        {/* Decorative characters at bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex gap-4 opacity-80"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-yellow-400/30 backdrop-blur-sm">🐘</div>
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-yellow-400/30 backdrop-blur-sm">🐇</div>
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-yellow-400/30 backdrop-blur-sm">🦊</div>
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-yellow-400/30 backdrop-blur-sm">🐢</div>
        </motion.div>

      </div>
    </div>
  );
}
