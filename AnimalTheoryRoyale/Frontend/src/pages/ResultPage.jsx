import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Home, Crown, Medal, Award, Star, TrendingUp, Target, Zap, ShieldAlert, Clock, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

// Podium component for Top 3
function Podium({ players }) {
  // Reorder: 2nd, 1st, 3rd for visual podium layout
  const podiumOrder = [
    { player: players[1], rank: 2, height: 'h-40', color: 'from-gray-400 to-gray-300', barColor: 'bg-gradient-to-t from-gray-600/30 to-gray-500/20', delay: 0.8 },
    { player: players[0], rank: 1, height: 'h-52', color: 'from-yellow-400 to-amber-500', barColor: 'bg-gradient-to-t from-yellow-600/30 to-amber-500/20', delay: 1.2 },
    { player: players[2], rank: 3, height: 'h-32', color: 'from-amber-700 to-amber-600', barColor: 'bg-gradient-to-t from-amber-800/30 to-amber-700/20', delay: 0.5 },
  ];

  const rankIcons = { 1: Crown, 2: Medal, 3: Award };

  return (
    <div className="flex items-end justify-center gap-4 mb-10 mt-6">
      {podiumOrder.map(({ player, rank, height, color, barColor, delay }) => {
        if (!player) return <div key={rank} className="w-48" />;
        const RankIcon = rankIcons[rank];
        const isMVP = player.isMVP;
        
        return (
          <motion.div
            key={rank}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.6, type: 'spring', stiffness: 120 }}
            className="flex flex-col items-center relative"
          >
            {/* MVP Aura for Top 1 */}
            {isMVP && (
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[120%] w-32 h-32 bg-yellow-400/20 blur-2xl rounded-full animate-pulse" />
            )}

            {/* Player info */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.3, type: 'spring' }}
              className="mb-4 flex flex-col items-center relative z-10"
            >
              {rank === 1 && (
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0], y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-2 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                >
                  👑
                </motion.div>
              )}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 ${
                rank === 1 ? 'border-yellow-400 bg-yellow-500/20 shadow-[0_0_30px_rgba(250,204,21,0.5)]' :
                rank === 2 ? 'border-gray-300 bg-gray-400/20' :
                'border-amber-700 bg-amber-700/20'
              }`}>
                {player.characterId === 1 ? '🐘' : player.characterId === 2 ? '🐇' : player.characterId === 3 ? '🦊' : '🐢'}
              </div>
              
              <p className={`font-black text-base mt-3 uppercase tracking-wide ${rank === 1 ? 'text-yellow-400 text-glow-sm' : 'text-white/90'}`}>
                {player.username}
              </p>
              
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-3xl font-black font-mono ${rank === 1 ? 'text-yellow-400 text-glow-sm' : 'text-white'}`}>
                  {player.score}
                </span>
                <span className="text-[10px] text-white/50 uppercase font-bold mt-1">PTS</span>
              </div>
            </motion.div>

            {/* Podium bar */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: delay - 0.2, duration: 0.5 }}
              className={`w-44 ${height} ${barColor} rounded-t-2xl border border-white/10 flex flex-col items-center justify-start pt-4 relative overflow-hidden shadow-2xl backdrop-blur-sm`}
            >
              <div className={`text-4xl font-black bg-gradient-to-b ${color} bg-clip-text text-transparent filter drop-shadow-md`}>
                #{rank}
              </div>
              <RankIcon className={`w-6 h-6 mt-2 filter drop-shadow-lg ${
                rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : 'text-amber-600'
              }`} />
              
              {/* Highlight Stats inside podium */}
              {rank === 1 && player.totalCorrectAnswers !== undefined && (
                <div className="mt-4 w-full px-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60">Chính xác</span>
                    <span className="font-bold text-emerald-400">{player.totalCorrectAnswers}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60">Combo Max</span>
                    <span className="font-bold text-orange-400">x{player.longestCombo}</span>
                  </div>
                </div>
              )}

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Full Stats Row Component
function StatRow({ label, value, icon: Icon, colorClass }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
      <div className="flex items-center gap-2">
        <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
        <span className="text-[10px] text-white/60 uppercase font-bold tracking-wider">{label}</span>
      </div>
      <span className={`text-sm font-black font-mono ${colorClass}`}>{value}</span>
    </div>
  );
}

export default function ResultPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  // Load authoritative scores from Server (passed via GameEnded event to localStorage)
  const results = useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('finalScores') || 'null');
      if (saved && Array.isArray(saved) && saved.length > 0) {
        // Ensure they are correctly sorted as final verification
        return saved.sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, finalRank: i + 1 }));
      }
    } catch {}
    
    // Mock for testing if direct navigation
    return [
      { finalRank: 1, isMVP: true, username: 'ServerData_A', score: 2500, characterId: 2, totalCorrectAnswers: 12, totalWrongAnswers: 2, longestCombo: 8, damageTaken: 50, survivalDuration: 600 },
      { finalRank: 2, username: 'ServerData_B', score: 1800, characterId: 3, totalCorrectAnswers: 9, totalWrongAnswers: 4, longestCombo: 4, damageTaken: 120, survivalDuration: 600 },
      { finalRank: 3, username: 'ServerData_C', score: 1200, characterId: 1, totalCorrectAnswers: 5, totalWrongAnswers: 5, longestCombo: 2, damageTaken: 200, survivalDuration: 450 },
      { finalRank: 4, username: 'Bạn', score: 950, characterId: 4, totalCorrectAnswers: 4, totalWrongAnswers: 8, longestCombo: 2, damageTaken: 300, survivalDuration: 200 },
    ];
  }, []);

  // Fire confetti on mount for MVP
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);

    const fireConfetti = () => {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
      confetti({ ...defaults, particleCount: 50, origin: { x: 0.2, y: 0.5 } });
      confetti({ ...defaults, particleCount: 50, origin: { x: 0.8, y: 0.5 } });
    };

    const t1 = setTimeout(fireConfetti, 1500);
    const t2 = setTimeout(fireConfetti, 2200);
    const t3 = setTimeout(() => {
      confetti({
        particleCount: 150, spread: 120, origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#4F46E5', '#10B981'],
        zIndex: 9999,
      });
    }, 3000);

    return () => { clearTimeout(timer); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const top3 = results.slice(0, 3);
  const rest = results.slice(3);

  return (
    <div className="relative flex flex-col items-center w-full min-h-full p-8 overflow-y-auto overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-dark z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/80 via-dark to-dark z-0" />
      <div className="fixed inset-0 bg-grid-pattern opacity-100 z-0" />

      {/* Glowing orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-float z-0 pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-float-delayed z-0 pointer-events-none" />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center w-full max-w-5xl pb-16"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 mt-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
                <Star className="w-3.5 h-3.5 text-yellow-400 animate-spin-slow" />
                <span className="text-xs text-white/70 font-bold uppercase tracking-widest">
                  AUTHORITATIVE MATCH RESULT · {roomCode}
                </span>
              </div>

              <h1 className="text-6xl font-display font-black filter drop-shadow-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500">
                  KẾT QUẢ CHUNG CUỘC
                </span>
              </h1>
            </motion.div>

            {/* Podium for Top 3 */}
            <Podium players={top3} />

            {/* Rest of the rankings with Full Stats */}
            <div className="w-full space-y-4 mb-12">
              <div className="text-sm text-white/50 uppercase tracking-widest font-black mb-4 flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Bảng Xếp Hạng & Chỉ Số Chi Tiết
              </div>
              
              {results.map((player, index) => {
                const isTop1 = index === 0;
                const accuracy = player.totalCorrectAnswers + player.totalWrongAnswers > 0 
                  ? Math.round((player.totalCorrectAnswers / (player.totalCorrectAnswers + player.totalWrongAnswers)) * 100) 
                  : 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className={`glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6 border-2 transition-all hover:scale-[1.01] ${
                      isTop1 ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10'
                    }`}
                  >
                    {/* Rank & Avatar */}
                    <div className="flex items-center gap-5 w-full md:w-1/3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-lg ${
                        isTop1 ? 'bg-yellow-400 text-dark' : 
                        index === 1 ? 'bg-gray-300 text-dark' : 
                        index === 2 ? 'bg-amber-600 text-white' : 
                        'bg-white/10 text-white/50'
                      }`}>
                        #{player.finalRank}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-black text-xl tracking-wide ${isTop1 ? 'text-yellow-400' : 'text-white'}`}>
                            {player.username}
                          </h3>
                          {player.isMVP && (
                            <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-[10px] font-black rounded uppercase">MVP</span>
                          )}
                        </div>
                        <p className="text-sm text-white/40 mt-0.5 font-medium">
                          Skin: {player.characterId === 1 ? 'Voi' : player.characterId === 2 ? 'Thỏ' : player.characterId === 3 ? 'Cáo' : 'Rùa'}
                        </p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <StatRow label="Điểm Số" value={player.score} icon={Star} colorClass="text-cyan-400 text-glow-cyan" />
                      <StatRow label="Độ Chính Xác" value={`${accuracy}%`} icon={Target} colorClass="text-emerald-400" />
                      <StatRow label="Combo Max" value={`x${player.longestCombo || player.combo || 0}`} icon={Flame} colorClass="text-orange-400" />
                      <StatRow label="Sát Thương Nhận" value={player.damageTaken || 0} icon={ShieldAlert} colorClass="text-red-400" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Back button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={() => navigate('/')}
              className="btn-primary flex items-center gap-3 px-8 py-4 text-lg"
            >
              <Home className="w-5 h-5" />
              Trở về Trang Chủ
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
