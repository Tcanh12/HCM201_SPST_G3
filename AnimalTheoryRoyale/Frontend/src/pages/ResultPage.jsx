import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Home, Crown, Medal, Award, Star, TrendingUp, Target, ShieldAlert, Flame, User } from 'lucide-react';
import confetti from 'canvas-confetti';

// Helper component for Stat Row
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

// Sub-component: LeaderboardItem (For each player)
function LeaderboardItem({ player, isMe, index, highestAccuracy, lowestDamage }) {
  const isTop1 = index === 0;
  const isTop2 = index === 1;
  const isTop3 = index === 2;

  const totalQuestions = player.totalCorrectAnswers + player.totalWrongAnswers;
  const accuracy = totalQuestions > 0 
    ? Math.round((player.totalCorrectAnswers / totalQuestions) * 100) 
    : 0;

  // Determine badges
  const badges = [];
  if (isTop1) badges.push({ text: 'Champion', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' });
  if (accuracy > 0 && accuracy === highestAccuracy) badges.push({ text: 'Best Accuracy', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' });
  if (player.damageTaken === lowestDamage && player.damageTaken < 100) badges.push({ text: 'Untouchable', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' });

  // Styles based on rank
  let rankClass = 'bg-white/10 text-white/50 border-white/10';
  let rankIcon = null;
  if (isTop1) { rankClass = 'bg-yellow-400 text-dark border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]'; rankIcon = <Crown className="w-6 h-6" />; }
  else if (isTop2) { rankClass = 'bg-gray-300 text-dark border-gray-300'; rankIcon = <Medal className="w-5 h-5 text-dark" />; }
  else if (isTop3) { rankClass = 'bg-amber-600 text-white border-amber-600'; rankIcon = <Award className="w-5 h-5 text-white" />; }

  // Highlight current user
  const borderHighlight = isMe ? 'border-primary shadow-[0_0_20px_rgba(79,70,229,0.4)] bg-primary/10' : (isTop1 ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10 bg-black/40');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 + index * 0.1, type: 'spring' }}
      className={`relative w-full p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6 border-2 transition-all hover:scale-[1.01] overflow-hidden ${borderHighlight}`}
    >
      {/* Background glow for current player */}
      {isMe && <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent pointer-events-none" />}

      {/* Rank & Avatar */}
      <div className="flex items-center gap-5 w-full md:w-1/3 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black border-2 ${rankClass}`}>
          {rankIcon || `#${player.finalRank}`}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-black text-xl tracking-wide flex items-center gap-2 ${isMe ? 'text-primary' : (isTop1 ? 'text-yellow-400' : 'text-white')}`}>
              {player.username} 
              {isMe && <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded-full flex items-center gap-1"><User className="w-3 h-3"/> Bạn</span>}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {player.isHost && (
              <span className="px-2 py-0.5 bg-rose-500/20 border border-rose-500/50 text-rose-400 text-[10px] font-black rounded uppercase">HOST</span>
            )}
            {badges.map((badge, idx) => (
              <span key={idx} className={`px-2 py-0.5 border text-[10px] font-black rounded uppercase ${badge.color}`}>
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        <StatRow label="Điểm Số" value={player.score} icon={Star} colorClass={isMe ? "text-primary text-glow-primary" : "text-cyan-400"} />
        <StatRow label="Câu Đúng" value={`${player.totalCorrectAnswers}`} icon={Target} colorClass="text-emerald-400" />
        <StatRow label="Câu Sai" value={`${player.totalWrongAnswers}`} icon={ShieldAlert} colorClass="text-red-400" />
        <StatRow label="Combo Max" value={`x${player.longestCombo || 0}`} icon={Flame} colorClass="text-orange-400" />
      </div>
    </motion.div>
  );
}

// Sub-component: Podium for Top 3
function Podium({ players }) {
  const podiumOrder = [
    { player: players[1], rank: 2, height: 'h-40', color: 'from-gray-400 to-gray-300', barColor: 'bg-gradient-to-t from-gray-600/30 to-gray-500/20', delay: 0.8 },
    { player: players[0], rank: 1, height: 'h-52', color: 'from-yellow-400 to-amber-500', barColor: 'bg-gradient-to-t from-yellow-600/30 to-amber-500/20', delay: 1.2 },
    { player: players[2], rank: 3, height: 'h-32', color: 'from-amber-700 to-amber-600', barColor: 'bg-gradient-to-t from-amber-800/30 to-amber-700/20', delay: 0.5 },
  ];

  const rankIcons = { 1: Crown, 2: Medal, 3: Award };

  return (
    <div className="flex items-end justify-center gap-4 mb-10 mt-6 w-full max-w-2xl mx-auto overflow-hidden px-4">
      {podiumOrder.map(({ player, rank, height, color, barColor, delay }) => {
        if (!player) return <div key={rank} className="w-24 md:w-48" />;
        const RankIcon = rankIcons[rank];
        const isMVP = player.isMVP || rank === 1; // Fallback to rank 1 if MVP flag missing
        
        return (
          <motion.div
            key={rank}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.6, type: 'spring', stiffness: 120 }}
            className="flex flex-col items-center relative flex-1"
          >
            {/* MVP Aura for Top 1 */}
            {isMVP && rank === 1 && (
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[120%] w-32 h-32 bg-yellow-400/20 blur-2xl rounded-full animate-pulse pointer-events-none" />
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
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl border-2 ${
                rank === 1 ? 'border-yellow-400 bg-yellow-500/20 shadow-[0_0_30px_rgba(250,204,21,0.5)]' :
                rank === 2 ? 'border-gray-300 bg-gray-400/20' :
                'border-amber-700 bg-amber-700/20'
              }`}>
                {player.characterId === 1 ? '🐘' : player.characterId === 2 ? '🐇' : player.characterId === 3 ? '🦊' : '🐢'}
              </div>
              
              <p className={`font-black text-sm md:text-base mt-3 uppercase tracking-wide truncate max-w-[80px] md:max-w-[120px] ${rank === 1 ? 'text-yellow-400 text-glow-sm' : 'text-white/90'}`}>
                {player.username}
              </p>
              
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xl md:text-3xl font-black font-mono ${rank === 1 ? 'text-yellow-400 text-glow-sm' : 'text-white'}`}>
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
              className={`w-full max-w-[150px] ${height} ${barColor} rounded-t-2xl border border-white/10 flex flex-col items-center justify-start pt-4 relative overflow-hidden shadow-2xl backdrop-blur-sm`}
            >
              <div className={`text-2xl md:text-4xl font-black bg-gradient-to-b ${color} bg-clip-text text-transparent filter drop-shadow-md`}>
                #{rank}
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Main ResultPage Component
export default function ResultPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } 
    catch { return {}; }
  }, []);

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
      { finalRank: 1, isHost: true, username: 'Player1', score: 2500, characterId: 2, totalCorrectAnswers: 12, totalWrongAnswers: 2, longestCombo: 8, damageTaken: 50, survivalDuration: 600 },
      { finalRank: 2, username: 'Player2', score: 1800, characterId: 3, totalCorrectAnswers: 9, totalWrongAnswers: 4, longestCombo: 4, damageTaken: 120, survivalDuration: 600 },
      { finalRank: 3, username: 'Player3', score: 1200, characterId: 1, totalCorrectAnswers: 5, totalWrongAnswers: 5, longestCombo: 2, damageTaken: 200, survivalDuration: 450 },
      { finalRank: 4, username: currentUser.username || 'Bạn', score: 950, characterId: 4, totalCorrectAnswers: 4, totalWrongAnswers: 8, longestCombo: 2, damageTaken: 300, survivalDuration: 200 },
    ];
  }, [currentUser.username]);

  // Calculations for Badges
  const highestAccuracy = useMemo(() => {
    return Math.max(...results.map(p => {
      const t = p.totalCorrectAnswers + p.totalWrongAnswers;
      return t > 0 ? Math.round((p.totalCorrectAnswers / t) * 100) : 0;
    }));
  }, [results]);

  const lowestDamage = useMemo(() => {
    return Math.min(...results.map(p => p.damageTaken || 0));
  }, [results]);

  // Fire confetti on mount for Top players
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

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen p-4 md:p-8 overflow-y-auto overflow-x-hidden bg-black text-white">
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
            className="relative z-10 flex flex-col items-center w-full max-w-4xl pb-16 mx-auto"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-6 mt-4 w-full"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
                <Star className="w-3.5 h-3.5 text-yellow-400 animate-spin-slow" />
                <span className="text-xs text-white/70 font-bold uppercase tracking-widest">
                  AUTHORITATIVE MATCH RESULT · {roomCode}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-black filter drop-shadow-lg">
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
                const isMe = player.username === currentUser.username;
                return (
                  <LeaderboardItem 
                    key={index}
                    player={player}
                    isMe={isMe}
                    index={index}
                    highestAccuracy={highestAccuracy}
                    lowestDamage={lowestDamage}
                  />
                );
              })}
            </div>

            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              onClick={() => navigate('/')}
              className="btn-primary flex items-center justify-center gap-3 px-8 py-4 text-lg w-full md:w-auto shadow-[0_0_20px_rgba(79,70,229,0.5)]"
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
