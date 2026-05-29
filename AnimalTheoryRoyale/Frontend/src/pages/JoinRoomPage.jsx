import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hash, User, ArrowLeft, Loader2, ArrowRight, Gamepad2 } from 'lucide-react';
import axios from 'axios';
import API_HOST from '../config';

export default function JoinRoomPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!code || !username) return alert('Vui lòng nhập đủ thông tin');

    setLoading(true);
    try {
      // Login/Register the player
      const authRes = await axios.post(`${API_HOST}/api/auth/login`, {
        username: username,
        password: '123'
      });

      localStorage.setItem('user', JSON.stringify(authRes.data));
      localStorage.setItem('role', 'player');

      // Navigate to Player Lobby (character selection)
      navigate(`/player-lobby/${code.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      alert('Không thể tham gia. Vui lòng thử lại.');
    }
    setLoading(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 glass-panel rounded-2xl p-6 md:p-8 w-full max-w-md"
      >
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/15 text-secondary-light rounded-full text-xs font-bold">
            <Gamepad2 className="w-3 h-3" />
            Người chơi
          </div>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30">Tham gia</span>
        </div>

        <h2 className="text-2xl font-display font-bold mb-1">Tham Gia Phòng</h2>
        <p className="text-white/40 text-sm mb-7">Nhập mã phòng từ giảng viên để vào trận</p>

        <div className="space-y-5 mb-7">
          {/* Room Code */}
          <div>
            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Mã Phòng</label>
            <div className="input-with-icon">
              <Hash className="icon w-4 h-4" />
              <input
                type="text"
                placeholder="VD: A7K2Q"
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                className="input-field pl-11 text-center text-xl font-black tracking-[0.3em] uppercase"
                maxLength={5}
              />
            </div>

            {/* Visual code feedback */}
            <div className="flex justify-center gap-2 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={code[i] ? { scale: [1, 1.2, 1], borderColor: 'rgba(16,185,129,0.5)' } : {}}
                  className={`w-9 h-10 rounded-lg border-2 flex items-center justify-center text-lg font-black font-mono transition-all duration-200 ${
                    code[i]
                      ? 'border-secondary/50 bg-secondary/10 text-secondary-light'
                      : 'border-white/10 bg-white/5 text-white/20'
                  }`}
                >
                  {code[i] || '·'}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Nickname</label>
            <div className="input-with-icon">
              <User className="icon w-4 h-4" />
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleJoin}
          disabled={loading || !code || !username}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang kết nối...
            </>
          ) : (
            <>
              Tiếp Tục Chọn Nhân Vật
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-3 flex items-center justify-center gap-2 text-white/40 hover:text-white rounded-xl font-medium transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>
      </motion.div>
    </div>
  );
}
