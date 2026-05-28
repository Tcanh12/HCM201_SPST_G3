import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ResultPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();

  // In MVP, we can just use mock data or pass state. 
  // For a real app, you would fetch final results from /api/rooms/{roomCode}/results
  const mockResults = [
    { rank: 1, username: 'SinhVien_A', score: 2500, combo: 5, char: 'Thỏ' },
    { rank: 2, username: 'SinhVien_B', score: 1800, combo: 3, char: 'Cáo' },
    { rank: 3, username: 'SinhVien_C', score: 1200, combo: 2, char: 'Voi' },
    { rank: 4, username: 'Bạn', score: 950, combo: 1, char: 'Rùa' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-dark to-dark">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-xl font-display text-gray-400 uppercase tracking-widest mb-2">Trận đấu kết thúc</h2>
        <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          KẾT QUẢ CHUNG CUỘC
        </h1>
        <p className="mt-2 text-white/50">Mã phòng: {roomCode}</p>
      </motion.div>

      <div className="grid gap-4 w-full max-w-3xl">
        {mockResults.map((player, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`glass-panel p-6 rounded-2xl flex items-center justify-between ${player.rank === 1 ? 'border-yellow-500/50 bg-yellow-500/10' : ''}`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl ${player.rank === 1 ? 'bg-yellow-500 text-dark' : player.rank === 2 ? 'bg-gray-300 text-dark' : player.rank === 3 ? 'bg-amber-700 text-white' : 'bg-white/10'}`}>
                {player.rank}
              </div>
              <div>
                <h3 className="text-xl font-bold">{player.username}</h3>
                <p className="text-sm text-gray-400">Nhân vật: {player.char}</p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-right">
              <div>
                <p className="text-xs text-gray-400 uppercase">Max Combo</p>
                <p className="font-bold text-orange-400">x{player.combo}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Tổng Điểm</p>
                <p className="text-3xl font-black text-cyan-400">{player.score}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => navigate('/')}
        className="mt-12 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-colors"
      >
        Trở về Trang Chủ
      </motion.button>
    </div>
  );
}
