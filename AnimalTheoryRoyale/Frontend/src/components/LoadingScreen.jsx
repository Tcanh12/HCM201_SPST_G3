import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomTips } from '../data/loadingTips';

/**
 * Premium Loading Screen for Animal Theory Royale
 * Shows animated background, rotating tips, and connection status
 */

// Animated knowledge particle
function KnowledgeParticle({ delay, duration, left }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-amber-400/40"
      style={{ left, bottom: '-5%' }}
      animate={{
        y: [0, -window.innerHeight * 1.2],
        opacity: [0, 0.8, 0.4, 0],
        scale: [0.5, 1.2, 0.8],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function LoadingScreen({ 
  status = 'connecting', // connecting | loading_map | syncing | waiting_host | ready
  message = '',
  progress = null, // 0-100 or null
  roomCode = null,
}) {
  const [tipIndex, setTipIndex] = useState(0);
  const tips = useMemo(() => getRandomTips(5), []);

  // Cycle through tips every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [tips.length]);

  const statusConfig = {
    connecting: { label: 'Đang kết nối...', icon: '🔗', color: '#F59E0B' },
    loading_map: { label: 'Đang tải bản đồ...', icon: '🗺️', color: '#06B6D4' },
    syncing: { label: 'Đang đồng bộ dữ liệu trận...', icon: '📡', color: '#8B5CF6' },
    waiting_host: { label: 'Đang chờ Host bắt đầu...', icon: '⏳', color: '#10B981' },
    ready: { label: 'Sẵn sàng!', icon: '✅', color: '#10B981' },
  };

  const config = statusConfig[status] || statusConfig.connecting;
  const currentTip = tips[tipIndex];

  // Generate particles
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
    })), []
  );

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0E1A 0%, #1a1130 40%, #0A0E1A 100%)' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px]" />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Floating particles */}
        {particles.map(p => (
          <KnowledgeParticle key={p.id} left={p.left} delay={p.delay} duration={p.duration} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg px-6">
        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300">
              ANIMAL THEORY
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white text-2xl md:text-3xl">
              ROYALE
            </span>
          </h1>
        </motion.div>

        {/* Room Code (if provided) */}
        {roomCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 px-4 py-2 bg-white/5 rounded-xl border border-white/10"
          >
            <span className="text-xs text-white/40 uppercase tracking-wider">Phòng </span>
            <span className="text-lg font-mono font-black text-amber-400 tracking-[0.2em]">{roomCode}</span>
          </motion.div>
        )}

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.span 
            className="text-2xl"
            animate={{ rotate: status === 'connecting' ? [0, 360] : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            {config.icon}
          </motion.span>
          <span className="text-lg font-bold" style={{ color: config.color }}>
            {message || config.label}
          </span>
        </motion.div>

        {/* Progress Bar */}
        {progress !== null && (
          <div className="w-full max-w-xs mb-8">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${config.color}, ${config.color}80)` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-xs text-white/30 text-center mt-1 font-mono">{progress}%</div>
          </div>
        )}

        {/* Pulsing dots when no progress bar */}
        {progress === null && (
          <div className="flex gap-1.5 mb-8">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: config.color }}
              />
            ))}
          </div>
        )}

        {/* Knowledge Tip Card */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={tipIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-xl p-4 border-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">{currentTip?.icon}</span>
                <div>
                  {currentTip?.chapter && (
                    <span className="text-[10px] text-amber-400/70 font-bold uppercase tracking-wider">
                      Chương {currentTip.chapter}
                    </span>
                  )}
                  <p className="text-sm text-white/70 leading-relaxed mt-0.5">
                    {currentTip?.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tip dots indicator */}
          <div className="flex justify-center gap-1.5 mt-3">
            {tips.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i === tipIndex ? config.color : 'rgba(255,255,255,0.15)',
                  transform: i === tipIndex ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center">
        <span className="text-[11px] text-white/15 font-mono">
          Học Tư tưởng Hồ Chí Minh qua đấu trường sinh tồn tri thức
        </span>
      </div>
    </div>
  );
}
