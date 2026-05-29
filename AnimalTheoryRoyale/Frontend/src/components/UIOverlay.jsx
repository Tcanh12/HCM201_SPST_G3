import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Striped HP Bar Component
function HPBar({ current, max, percent, color }) {
  return (
    <div className="flex items-center gap-3 w-full mb-2">
      <span className="text-xs font-black tracking-widest min-w-[30px] uppercase text-white/50">HP</span>
      <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
        {/* Animated striped pattern */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${percent}%`,
            background: `linear-gradient(45deg, 
              ${color} 25%, 
              transparent 25%, 
              transparent 50%, 
              ${color} 50%, 
              ${color} 75%, 
              transparent 75%, 
              transparent
            )`,
            backgroundSize: '20px 20px',
            backgroundColor: color.replace(')', ', 0.8)').replace('rgb', 'rgba'),
            boxShadow: `0 0 15px ${color}80, inset 0 0 10px rgba(255,255,255,0.4)`,
          }}
          animate={{ backgroundPosition: ['0px 0px', '20px 0px'] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
        {/* Flash effect on low HP */}
        {percent <= 30 && (
          <motion.div
            className="absolute inset-0 bg-red-500 mix-blend-overlay"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        )}
      </div>
      <span className="text-sm font-black font-mono min-w-[60px] text-right" style={{ color: percent <= 30 ? '#EF4444' : 'white' }}>
        {current}/{max}
      </span>
    </div>
  );
}

// Cooldown sweep skill button
function SkillButton({ name, icon, cd, keyBind, type, tooltip, isSilenced, onPointerDown, onPointerUp, onPointerEnter, onPointerLeave, onPointerCancel }) {
  const isCooldown = cd > 0;
  
  return (
    <div
      className="relative group"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      onPointerEnter={onPointerEnter}
      style={{ touchAction: 'none' }}
    >
      <div
        className={`relative w-[60px] h-[60px] rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-200 overflow-hidden ${
          isCooldown || isSilenced
            ? 'bg-black/80 border-white/10 opacity-70 cursor-not-allowed'
            : 'bg-white/10 border-white/40 cursor-pointer hover:border-white hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
        }`}
      >
        <span className="text-2xl z-10 filter drop-shadow-md">{icon}</span>
        <span className="text-[9px] font-black uppercase tracking-wider mt-1 z-10">{name}</span>
        
        {/* Keybind hint */}
        <div className="absolute top-1 right-1.5 text-[9px] font-black text-amber-400 z-10 bg-black/40 px-1 rounded">
          [{keyBind}]
        </div>

        {/* Cooldown sweep overlay */}
        {isCooldown && (
          <>
            <div className="absolute inset-0 bg-red-500/20 z-20" />
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-black/60 z-20"
              initial={{ height: '100%' }}
              animate={{ height: '0%' }}
              transition={{ duration: cd, ease: 'linear' }}
            />
            <div className="absolute inset-0 flex items-center justify-center z-30 text-lg font-black text-red-500 text-glow-danger font-mono">
              {Math.ceil(cd)}
            </div>
          </>
        )}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-[75px] right-0 w-[240px] p-3 rounded-xl bg-slate-900/95 border border-white/20 shadow-2xl backdrop-blur-md opacity-0 scale-95 origin-bottom-right pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all z-50">
        <div className="text-sm font-black text-amber-400 mb-1">{name}</div>
        <div className="text-xs text-slate-300 leading-relaxed">{tooltip}</div>
      </div>
    </div>
  );
}

export default function UIOverlay({ gameState, myConnectionId, onSkill, onAiming }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const players = gameState?.players || [];
  const safeZone = gameState?.safeZone || {};
  const timeRemaining = gameState?.timeRemaining || 0;

  // Track previous ranks for up/down indicators
  const prevRanksRef = useRef({});

  const myPlayer = players.find(p => p.id === myConnectionId);
  const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const myRank = sorted.findIndex(p => p.id === myConnectionId) + 1;

  useEffect(() => {
    const newRanks = {};
    sorted.forEach((p, idx) => {
      newRanks[p.id] = idx + 1;
    });
    // We update this without triggering re-render to use in next render
    prevRanksRef.current = newRanks;
  }, [sorted]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  if (!myPlayer) return null;

  const hpPercent = Math.max(0, myPlayer.hp / (myPlayer.maxHP || 100) * 100);
  const hpColor = hpPercent > 60 ? '#10B981' : hpPercent > 30 ? '#F59E0B' : '#EF4444';

  const handlePointerDown = (e, type, cd) => {
    e.preventDefault();
    if (cd <= 0 && !myPlayer.isSilenced && onAiming) onAiming(type);
  };

  const handlePointerUp = (e, type, cd) => {
    e.preventDefault();
    if (cd <= 0 && !myPlayer.isSilenced) {
      if (onAiming) onAiming(null);
      if (onSkill) onSkill(type);
    }
  };

  const handlePointerCancel = () => {
    if (onAiming) onAiming(null);
  };

  return (
    <div className="pointer-events-none text-white font-sans w-full h-full relative">
      
      {/* Top Center: Timer + Zone Info */}
      <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-6 glass-panel rounded-2xl px-3 md:px-6 py-1.5 md:py-2 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-[0.85] md:scale-100 origin-top whitespace-nowrap">
        <div className="text-center">
          <div className="text-[8px] md:text-[9px] text-white/50 uppercase font-bold tracking-widest mb-0.5">Thời gian</div>
          <div className={`text-xl md:text-3xl font-black font-mono ${timeRemaining <= 60 ? 'text-red-500 animate-pulse text-glow-danger' : 'text-white'}`}>
            {formatTime(timeRemaining)}
          </div>
        </div>
        
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        
        <div className="text-center min-w-[70px] md:min-w-[100px]">
          <div className="text-[8px] md:text-[9px] text-white/50 uppercase font-bold tracking-widest mb-0.5">Vòng bo</div>
          {safeZone.isShrinking ? (
            <div className="text-sm md:text-base font-black text-red-500 animate-pulse flex items-center justify-center gap-1">
              <span>⚠️</span> ĐANG THU
            </div>
          ) : (
            <div className="text-sm md:text-base font-black text-cyan-400">
              Phase {safeZone.phase || 0}
            </div>
          )}
          {!safeZone.isShrinking && safeZone.nextShrinkIn > 0 && (
            <div className="text-[10px] text-white/60 font-medium">
              Thu sau <span className="font-mono text-amber-400">{Math.ceil(safeZone.nextShrinkIn)}</span>s
            </div>
          )}
        </div>
        
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        
        <div className="text-center">
          <div className="text-[8px] md:text-[9px] text-white/50 uppercase font-bold tracking-widest mb-0.5">Còn sống</div>
          <div className="text-xl md:text-2xl font-black font-mono">
            <span className="text-emerald-400">{players.filter(p => !p.isDead).length}</span>
            <span className="text-white/30 text-sm md:text-lg">/{players.length}</span>
          </div>
        </div>
      </div>

      {/* Bottom Center: Stats HUD */}
      <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-3xl p-3 md:p-5 border-white/10 w-[95%] max-w-[480px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
        
        {/* Buff Banner */}
        <AnimatePresence>
          {myPlayer.activeBuff && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ y: -50, opacity: 1, scale: 1 }}
              exit={{ y: 0, opacity: 0, scale: 0.8 }}
              className="absolute left-1/2 -translate-x-1/2 bg-emerald-500/20 border border-emerald-400/50 rounded-xl px-4 py-1.5 flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md"
            >
              <span className="animate-bounce">⬆️</span>
              <span className="text-emerald-400 font-bold text-sm tracking-wide">BUFF: {myPlayer.activeBuff}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <HPBar current={myPlayer.hp} max={myPlayer.maxHP} percent={hpPercent} color={hpColor} />

        <div className="grid grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-4 pt-2 md:pt-4 border-t border-white/5">
          {/* Score */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] md:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Điểm</span>
            <span className="text-xl md:text-2xl font-black font-mono text-cyan-400 text-glow-cyan">{myPlayer.score || 0}</span>
          </div>

          {/* Combo */}
          <div className="flex flex-col items-center relative">
            <span className="text-[9px] md:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Combo</span>
            <motion.span 
              key={myPlayer.combo}
              initial={{ scale: 1.5, color: '#FFFFFF' }}
              animate={{ scale: 1, color: '#F97316' }}
              className={`text-xl md:text-2xl font-black font-mono ${(myPlayer.combo || 0) >= 3 ? 'text-glow-amber' : ''}`}
            >
              x{myPlayer.combo || 0}
            </motion.span>
            
            {/* Big floating combo effect */}
            <AnimatePresence>
              {(myPlayer.combo || 0) >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.5 }}
                  animate={{ opacity: 1, y: -60, scale: 1 }}
                  exit={{ opacity: 0, y: -80, scale: 1.2 }}
                  className="absolute bottom-full whitespace-nowrap pointer-events-none"
                >
                  <span className="text-3xl font-black text-yellow-300 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] italic tracking-wider">
                    🔥 COMBO x{(myPlayer.combo || 0)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ammo */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] md:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Đạn</span>
            <span className="text-xl md:text-2xl font-black font-mono text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              {myPlayer.ammo || 0}
            </span>
          </div>

          {/* Rank */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] md:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5 md:mb-1">Hạng</span>
            <span className="text-xl md:text-2xl font-black font-mono text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
              #{myRank}
            </span>
          </div>
        </div>
      </div>

      {/* Right Bottom (or Top right on Mobile): Skills */}
      <div className="absolute top-[80px] md:top-auto md:bottom-6 right-2 md:right-6 flex flex-col md:flex-row gap-2 md:gap-3 items-end md:items-end pointer-events-auto scale-75 origin-top-right md:scale-100 md:origin-bottom-right">
        {myPlayer.isSilenced && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -top-12 right-0 bg-red-500/20 border border-red-500/50 text-red-500 font-bold text-sm px-4 py-1.5 rounded-lg whitespace-nowrap shadow-[0_0_20px_rgba(239,68,68,0.4)] backdrop-blur-sm animate-pulse"
          >
            🚫 BỊ CẤM CHIÊU!
          </motion.div>
        )}
        
        <SkillButton
          name="Push" icon="💨" cd={myPlayer.pushCD || 0} keyBind="1" type="push" isSilenced={myPlayer.isSilenced}
          tooltip="Đẩy văng kẻ địch trước mặt ra xa. Dùng để đẩy đối thủ khỏi bo hoặc cướp câu hỏi."
          onPointerDown={(e) => handlePointerDown(e, 'push', myPlayer.pushCD || 0)}
          onPointerUp={(e) => handlePointerUp(e, 'push', myPlayer.pushCD || 0)}
          onPointerLeave={handlePointerCancel} onPointerCancel={handlePointerCancel}
        />
        <SkillButton
          name="Double" icon="🎲" cd={myPlayer.doubleCD || 0} keyBind="2" type="double" isSilenced={myPlayer.isSilenced}
          tooltip="Bật TRƯỚC KHI trả lời. Đúng: x2 Điểm. Sai: Nhận x2 Sát thương. Liều ăn nhiều!"
          onPointerDown={(e) => handlePointerDown(e, 'double', myPlayer.doubleCD || 0)}
          onPointerUp={(e) => handlePointerUp(e, 'double', myPlayer.doubleCD || 0)}
          onPointerLeave={handlePointerCancel} onPointerCancel={handlePointerCancel}
        />
        <SkillButton
          name="Chaos" icon="🌀" cd={myPlayer.chaosCD || 0} keyBind="3" type="chaos" isSilenced={myPlayer.isSilenced}
          tooltip="Làm lộn xộn camera và đảo ngược phím di chuyển của tất cả kẻ địch xung quanh trong 3s."
          onPointerDown={(e) => handlePointerDown(e, 'chaos', myPlayer.chaosCD || 0)}
          onPointerUp={(e) => handlePointerUp(e, 'chaos', myPlayer.chaosCD || 0)}
          onPointerLeave={handlePointerCancel} onPointerCancel={handlePointerCancel}
        />
        <SkillButton
          name="Silence" icon="🔇" cd={myPlayer.silenceCD || 0} keyBind="4" type="silence" isSilenced={myPlayer.isSilenced}
          tooltip="Bắn luồng sóng cấm chiêu. Kẻ địch trúng phải không thể dùng kỹ năng trong 4s."
          onPointerDown={(e) => handlePointerDown(e, 'silence', myPlayer.silenceCD || 0)}
          onPointerUp={(e) => handlePointerUp(e, 'silence', myPlayer.silenceCD || 0)}
          onPointerLeave={handlePointerCancel} onPointerCancel={handlePointerCancel}
        />
      </div>

      {/* Top Right: Leaderboard */}
      <div className="absolute top-[80px] md:top-4 left-2 md:left-auto md:right-4 glass-panel rounded-xl p-2 md:p-3 border-white/10 w-[140px] md:w-[220px] scale-90 origin-top-left md:scale-100 md:origin-top-right pointer-events-auto">
        <div className="text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          Bảng xếp hạng
        </div>
        
        <div className="space-y-1.5">
          {sorted.slice(0, 5).map((p, i) => {
            const isMe = p.id === myConnectionId;
            const rank = i + 1;
            const prevRank = prevRanksRef.current[p.id];
            
            return (
              <motion.div 
                key={p.id}
                layout
                className={`flex justify-between items-center px-2 py-1.5 rounded-lg text-sm ${
                  isMe ? 'bg-emerald-500/20 border border-emerald-500/30 font-bold' : (p.isDead ? 'opacity-50' : '')
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`w-5 text-center font-mono ${rank <= 3 ? 'text-yellow-400' : 'text-white/50'}`}>
                    {rank}
                  </span>
                  <span className={`truncate max-w-[90px] ${isMe ? 'text-emerald-400' : (p.isDead ? 'text-white/50 line-through' : 'text-white')}`}>
                    {p.username || '???'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold">{p.score || 0}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dramatic Death Screen */}
      <AnimatePresence>
        {myPlayer.isDead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-auto z-[999]"
          >
            {/* Blood splatter vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(153,27,27,0.8)_100%)] mix-blend-multiply" />
            <div className="absolute inset-0 bg-red-950/40 backdrop-blur-[2px]" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="text-center"
              >
                <div className="text-8xl mb-4 filter drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">💀</div>
                <h1 className="text-7xl font-display font-black text-red-500 tracking-widest text-glow-danger uppercase mb-4">
                  BỊ HẠ GỤC
                </h1>
                
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/50 border border-red-500/30 rounded-xl backdrop-blur-md">
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xl text-red-200 font-medium">Đang chờ hồi sinh...</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
