import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Users, Sparkles, Zap, Trophy, BookOpen, Shield, Star, ChevronRight } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { CHARACTER_DATA } from '../data/characterData';

// Animated 3D-like floating arena orbs
function ArenaOrbs() {
  const orbs = useMemo(() => [
    { size: 350, x: '8%', y: '15%', color: 'rgba(139,26,26,0.08)', duration: 22 },
    { size: 250, x: '78%', y: '55%', color: 'rgba(212,168,67,0.06)', duration: 28 },
    { size: 280, x: '55%', y: '8%', color: 'rgba(30,58,95,0.06)', duration: 24 },
    { size: 200, x: '15%', y: '65%', color: 'rgba(27,140,90,0.05)', duration: 20 },
    { size: 150, x: '70%', y: '80%', color: 'rgba(139,26,26,0.04)', duration: 18 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: orb.color }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -20, -40, -15, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// Knowledge dust particles floating upward
function KnowledgeDust() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 12,
      size: 1 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.25,
      color: Math.random() > 0.6 ? 'rgba(212,168,67,0.6)' : 'rgba(255,255,255,0.4)',
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            left: p.left, bottom: '-5%',
            opacity: p.opacity,
            background: p.color,
            animation: `floatParticle ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Character showcase — animated character cards
function CharacterShowcase() {
  const [activeChar, setActiveChar] = useState(1);
  const chars = Object.values(CHARACTER_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChar(prev => (prev % 4) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-10 px-4">
      {chars.map((char) => {
        const isActive = activeChar === char.id;
        return (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + char.id * 0.1, duration: 0.5, type: 'spring' }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setActiveChar(char.id)}
          >
            <motion.div
              animate={isActive ? { y: [0, -8, 0], scale: 1.08 } : { y: 0, scale: 1 }}
              transition={{ duration: 2.5, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              {/* Character badge */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-500"
                style={{
                  background: isActive ? `${char.colors.primary}25` : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${isActive ? char.colors.border : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? `0 0 30px ${char.colors.glow}, inset 0 0 15px ${char.colors.glow}` : 'none',
                }}
              >
                {char.emoji}
              </div>

              {/* Name + Role */}
              <span className={`text-xs mt-2 font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30'}`}>
                {char.name}
              </span>
              <span className={`text-[9px] font-medium tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-white/15'}`}
                style={{ color: isActive ? char.colors.border : undefined }}
              >
                {char.roleVi}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Feature badges with icons
function FeatureBadges() {
  const features = [
    { icon: Zap, label: '3D Real-time', color: '#D4A843' },
    { icon: Trophy, label: 'Battle Royale', color: '#10B981' },
    { icon: BookOpen, label: 'Tư tưởng HCM', color: '#EF4444' },
    { icon: Shield, label: 'Multiplayer', color: '#06B6D4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 px-4"
    >
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
          style={{ background: `${f.color}08`, borderColor: `${f.color}20` }}
        >
          <f.icon className="w-3.5 h-3.5" style={{ color: f.color }} />
          <span className="text-xs font-medium" style={{ color: `${f.color}AA` }}>{f.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0E1A 0%, #111827 50%, #0A0E1A 100%)' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-950/10 via-transparent to-transparent" />

      {/* Arena orbs + Knowledge dust */}
      <ArenaOrbs />
      <KnowledgeDust />

      {/* Top decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,26,26,0.5), rgba(212,168,67,0.3), transparent)' }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
          style={{ background: 'rgba(139,26,26,0.1)', borderColor: 'rgba(139,26,26,0.2)' }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#D4A843' }}>
            Đấu trường sinh tồn tri thức 3D
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-2"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-1 drop-shadow-md">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-500 to-amber-500">
              ANIMAL THEORY
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-white">
              ROYALE
            </span>
          </h1>
        </motion.div>

        {/* Subtitle / HCM Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mb-6 md:mb-8 px-4"
        >
          <h2 className="text-sm md:text-lg font-display font-bold text-white/70 uppercase tracking-[0.2em]">
            Vòng Bo Tri Thức 3D
          </h2>
          <p className="mt-2 md:mt-3 max-w-lg mx-auto text-xs md:text-sm leading-relaxed" style={{ color: 'rgba(212,168,67,0.6)' }}>
            Học Tư tưởng Hồ Chí Minh qua đấu trường sinh tồn tri thức.
            <br className="hidden md:block" />
            <span className="text-white/30">Sinh tồn bằng trí tuệ — Chiến thắng bằng kiến thức.</span>
          </p>
        </motion.div>

        {/* Character Showcase */}
        <CharacterShowcase />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-xs md:max-w-none px-6"
        >
          {/* Create Room — Primary CTA */}
          <button
            onClick={() => navigate('/create')}
            className="group relative w-full md:w-auto px-6 md:px-8 py-4 rounded-xl font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #8B1A1A, #B91C1C)',
              boxShadow: '0 0 30px rgba(139,26,26,0.3)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Swords className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Tạo Phòng Mới</span>
            <ChevronRight className="w-4 h-4 relative z-10 opacity-50" />
          </button>

          {/* Join Room */}
          <button
            onClick={() => navigate('/join')}
            className="group relative w-full md:w-auto px-6 md:px-8 py-4 bg-white/5 rounded-xl font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/12 hover:border-white/25 flex items-center justify-center gap-3 hover:shadow-lg"
          >
            <Users className="w-5 h-5 relative z-10 text-white/60 group-hover:text-white transition-colors" />
            <span className="relative z-10 text-white/70 group-hover:text-white transition-colors">Tham Gia</span>
          </button>

          {/* Theory Campus */}
          <button
            onClick={() => navigate('/theory')}
            className="group relative w-full md:w-auto px-6 md:px-8 py-4 rounded-xl font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 border flex items-center justify-center gap-3 hover:shadow-lg"
            style={{
              background: 'rgba(212,168,67,0.08)',
              borderColor: 'rgba(212,168,67,0.2)',
            }}
          >
            <BookOpen className="w-5 h-5 relative z-10" style={{ color: '#D4A843' }} />
            <span className="relative z-10" style={{ color: '#D4A843' }}>Học Lý Thuyết</span>
          </button>
        </motion.div>

        {/* Feature badges */}
        <FeatureBadges />
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] text-white/15 font-mono tracking-wider">
          v2.0.0 · HCM201 — Tư tưởng Hồ Chí Minh · Made with ❤️ at FPT University
        </span>
      </motion.div>
    </div>
  );
}
