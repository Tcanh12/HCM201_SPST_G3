import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_HOST from '../config';

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hostName, setHostName] = useState('');
  const [settings, setSettings] = useState({
    duration: 10,
    maxPlayers: 50,
    difficulty: 'Mixed'
  });

  const handleCreate = async () => {
    if (!hostName.trim()) return alert('Vui lòng nhập tên Host!');
    setLoading(true);
    try {
      // 1. Authenticate Host
      const authRes = await axios.post(`${API_HOST}/api/auth/login`, {
        username: hostName,
        password: '123'
      });
      const user = authRes.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', 'host');

      // 2. Create Room via API
      const res = await axios.post(`${API_HOST}/api/rooms/create`, {
        hostId: user.userId,
        maxPlayers: settings.maxPlayers,
        gameDuration: settings.duration * 60,
        difficulty: settings.difficulty,
        enableWeapon: true
      });

      const { roomCode } = res.data;

      // 3. Navigate to Host Lobby (NOT player lobby)
      navigate(`/host-lobby/${roomCode}`);
    } catch (err) {
      console.error(err);
      alert('Không thể tạo phòng. Vui lòng thử lại.');
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
        <h2 className="text-3xl font-display font-bold text-center mb-2">Tạo Phòng Chơi</h2>
        <p className="text-center text-gray-400 text-sm mb-6">Bạn sẽ quản lý trận đấu với tư cách Host</p>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Tên Host / Giảng viên</label>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              value={hostName}
              onChange={e => setHostName(e.target.value)}
              className="w-full bg-dark border border-white/20 rounded-lg p-3 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Thời gian (Phút)</label>
            <select
              value={settings.duration}
              onChange={e => setSettings({ ...settings, duration: Number(e.target.value) })}
              className="w-full bg-dark border border-white/20 rounded-lg p-3 outline-none focus:border-primary"
            >
              <option value={10}>10 Phút (Khuyên dùng)</option>
              <option value={15}>15 Phút</option>
              <option value={20}>20 Phút</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Độ khó</label>
            <select
              value={settings.difficulty}
              onChange={e => setSettings({ ...settings, difficulty: e.target.value })}
              className="w-full bg-dark border border-white/20 rounded-lg p-3 outline-none focus:border-primary"
            >
              <option value="Mixed">Trộn Lẫn (Mixed)</option>
              <option value="Easy">Dễ</option>
              <option value="Hard">Khó</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={loading || !hostName.trim()}
          className="w-full py-4 bg-primary rounded-xl font-bold text-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Đang tạo...' : 'Tạo Phòng'}
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
