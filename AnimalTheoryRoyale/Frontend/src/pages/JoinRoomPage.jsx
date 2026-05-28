import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-display font-bold text-center mb-2">Tham Gia Phòng</h2>
        <p className="text-center text-gray-400 text-sm mb-6">Nhập mã phòng từ giảng viên để vào trận</p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Mã Phòng</label>
            <input
              type="text"
              placeholder="VD: A7K2Q"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full bg-dark border border-white/20 rounded-lg p-3 outline-none focus:border-secondary uppercase text-center text-xl font-bold tracking-widest"
              maxLength={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Nickname</label>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-dark border border-white/20 rounded-lg p-3 outline-none focus:border-secondary"
            />
          </div>
        </div>

        <button
          onClick={handleJoin}
          disabled={loading || !code || !username}
          className="w-full py-4 bg-secondary rounded-xl font-bold text-lg text-dark transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Đang kết nối...' : 'Tiếp Tục Chọn Nhân Vật'}
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-3 bg-transparent text-gray-400 hover:text-white rounded-xl font-medium transition-colors"
        >
          Quay lại
        </button>
      </motion.div>
    </div>
  );
}
