import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Users, Sparkles, Zap, Trophy, BookOpen } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

// Floating orb background component
function FloatingOrbs() {
  const orbs = useMemo(() => [
    { size: 300, x: '10%', y: '20%', color: 'rgba(79,70,229,0.08)', duration: 20 },
    { size: 200, x: '75%', y: '60%', color: 'rgba(16,185,129,0.06)', duration: 25 },
    { size: 250, x: '60%', y: '10%', color: 'rgba(6,182,212,0.06)', duration: 22 },
    { size: 180, x: '20%', y: '70%', color: 'rgba(245,158,11,0.05)', duration: 18 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size, height: orb.size,
            left: orb.x, top: orb.y,
            background: orb.color,
          }}
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

// Floating particle dots
function ParticleDots() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 10,
      size: 2 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.3,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size, height: p.size,
            left: p.left, bottom: '-5%',
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Animated mascot component
function MascotRing() {
  const mascots = [
    { emoji: '🐘', name: 'Voi', color: '#6366F1', delay: 0 },
    { emoji: '🐇', name: 'Thỏ', color: '#10B981', delay: 0.15 },
    { emoji: '🦊', name: 'Cáo', color: '#F59E0B', delay: 0.3 },
    { emoji: '🐢', name: 'Rùa', color: '#06B6D4', delay: 0.45 },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-8 md:mb-10 px-4">
      {mascots.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + m.delay, duration: 0.5, type: 'spring' }}
          className="relative group"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, delay: m.delay * 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 transition-all duration-300 group-hover:scale-110"
              style={{
                background: `${m.color}15`,
                borderColor: `${m.color}40`,
                boxShadow: `0 0 20px ${m.color}20`,
              }}
            >
              {m.emoji}
            </div>
            <span className="text-xs text-white/40 mt-2 font-medium tracking-wide">{m.name}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// Feature badges
function FeatureBadges() {
  const features = [
    { icon: Zap, label: 'Real-time 3D', color: 'text-yellow-400' },
    { icon: Trophy, label: 'Battle Royale', color: 'text-emerald-400' },
    { icon: BookOpen, label: 'EdTech', color: 'text-cyan-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 px-4"
    >
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
          <f.icon className={`w-3.5 h-3.5 ${f.color}`} />
          <span className="text-xs text-white/50 font-medium">{f.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-dark">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/50 via-transparent to-transparent" />

      {/* Floating orbs */}
      <FloatingOrbs />
      <ParticleDots />

      {/* Top decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary-light" />
          <span className="text-xs font-semibold text-primary-light tracking-wide uppercase">Multiplayer 3D Learning Game</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-3"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              ANIMAL THEORY
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              ROYALE
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mb-6 md:mb-8 px-4"
        >
          <h2 className="text-sm md:text-xl font-display font-bold text-white/80 uppercase tracking-[0.25em]">
            Vòng Bo Tri Thức 3D
          </h2>
          <p className="mt-2 md:mt-3 text-white/40 max-w-md mx-auto text-xs md:text-sm leading-relaxed">
            Sinh tồn bằng tri thức. Chạy nhanh chưa đủ, muốn thắng phải hiểu đúng.
          </p>
        </motion.div>

        {/* Mascots */}
        <MascotRing />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-xs md:max-w-none px-6"
        >
          <button
            onClick={() => navigate('/create')}
            className="group relative w-full md:w-auto px-6 md:px-8 py-4 bg-gradient-to-r from-primary to-primary-light rounded-xl font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-primary flex items-center justify-center gap-3"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Swords className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Tạo Phòng Mới</span>
          </button>

          <button
            onClick={() => navigate('/join')}
            className="group relative w-full md:w-auto px-6 md:px-8 py-4 bg-white/5 rounded-xl font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/15 hover:border-white/30 flex items-center justify-center gap-3 hover:shadow-lg"
          >
            <Users className="w-5 h-5 relative z-10 text-white/70 group-hover:text-white transition-colors" />
            <span className="relative z-10 text-white/80 group-hover:text-white transition-colors">Tham Gia Bằng Mã</span>
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
        <span className="text-[11px] text-white/20 font-mono">v1.0.0 · Made with ❤️ at FPT University</span>
      </motion.div>
    </div>
  );
}
