import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Clock, BarChart3, Users, ArrowLeft, Loader2, Swords } from 'lucide-react';
import axios from 'axios';
import API_HOST from '../config';

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hostName, setHostName] = useState('');
  const [settings, setSettings] = useState({
    duration: 10,
    maxPlayers: 50,
    difficulty: 'Mixed',
    cameraMode: 'ThirdPerson'
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
      localStorage.setItem('cameraMode', settings.cameraMode);

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

  const difficultyOptions = [
    { value: 'Mixed', label: 'Trộn Lẫn', desc: 'Đủ mọi cấp độ', icon: '🎲' },
    { value: 'Easy', label: 'Dễ', desc: 'Cho người mới', icon: '🌱' },
    { value: 'Hard', label: 'Khó', desc: 'Thử thách cao', icon: '🔥' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 glass-panel rounded-2xl p-8 w-full max-w-md"
      >
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/15 text-primary-light rounded-full text-xs font-bold">
            <Swords className="w-3 h-3" />
            Bước 1/2
          </div>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30">Tạo phòng</span>
        </div>

        <h2 className="text-2xl font-display font-bold mb-1">Tạo Phòng Chơi</h2>
        <p className="text-white/40 text-sm mb-7">Bạn sẽ quản lý trận đấu với tư cách Host</p>

        <div className="space-y-5 mb-7">
          {/* Host Name */}
          <div>
            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Tên Host / Giảng viên</label>
            <div className="input-with-icon">
              <User className="icon w-4 h-4" />
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                value={hostName}
                onChange={e => setHostName(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Thời gian</label>
            <div className="input-with-icon">
              <Clock className="icon w-4 h-4" />
              <select
                value={settings.duration}
                onChange={e => setSettings({ ...settings, duration: Number(e.target.value) })}
                className="input-field pl-11 cursor-pointer appearance-none"
              >
                <option value={10}>10 Phút (Khuyên dùng)</option>
                <option value={15}>15 Phút</option>
                <option value={20}>20 Phút</option>
              </select>
            </div>
          </div>

          {/* Difficulty - Card selector */}
          <div>
            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Độ khó</label>
            <div className="grid grid-cols-3 gap-2">
              {difficultyOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSettings({ ...settings, difficulty: opt.value })}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                    settings.difficulty === opt.value
                      ? 'border-primary bg-primary/15 shadow-glow-primary'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-xl mb-1">{opt.icon}</div>
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Mode */}
          <div>
            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Góc nhìn Camera</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'ThirdPerson', label: 'Góc nhìn thứ ba', desc: 'Dễ quan sát xung quanh' },
                { value: 'FirstPerson', label: 'Góc nhìn thứ nhất', desc: 'Góc nhìn nhập vai' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSettings({ ...settings, cameraMode: opt.value })}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                    settings.cameraMode === opt.value
                      ? 'border-primary bg-primary/15 shadow-glow-primary'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold mb-1">{opt.label}</div>
                  <div className="text-[10px] text-white/40">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={loading || !hostName.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang tạo...
            </>
          ) : (
            <>
              <Swords className="w-5 h-5" />
              Tạo Phòng
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
