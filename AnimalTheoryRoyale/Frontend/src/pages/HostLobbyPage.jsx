import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Users, Play, X, Settings2, Hash, Wifi } from 'lucide-react';
import * as signalR from '@microsoft/signalr';
import API_HOST from '../config';

export default function HostLobbyPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [connection, setConnection] = useState(null);
  const [questionCount, setQuestionCount] = useState(20);
  const [copied, setCopied] = useState(false);
  const [starting, setStarting] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      // Host joins as spectator/controller – NOT as a player
      conn.invoke('JoinRoomAsHost', roomCode);

      conn.on('PlayerJoined', (player) => {
        setPlayers(prev => {
          if (prev.find(p => p.connectionId === player.connectionId)) return prev;
          return [...prev, player];
        });
      });

      conn.on('LobbyState', (playerList) => {
        setPlayers(playerList);
      });

      conn.on('PlayerLeft', (connectionId) => {
        setPlayers(prev => prev.filter(p => p.connectionId !== connectionId));
      });

      conn.on('GameStartedForHost', () => {
        navigate(`/host-dashboard/${roomCode}`);
      });

      conn.onreconnected(() => {
        conn.invoke('JoinRoomAsHost', roomCode).catch(console.error);
      });
    }).catch(console.error);

    setConnection(conn);
    return () => { conn.stop(); };
  }, [roomCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = roomCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartGame = async () => {
    if (players.length === 0) {
      alert('Chưa có người chơi nào tham gia!');
      return;
    }
    
    // Countdown sequence
    setStarting(true);
    setCountdown(3);
    
    await new Promise(r => setTimeout(r, 1000));
    setCountdown(2);
    await new Promise(r => setTimeout(r, 1000));
    setCountdown(1);
    await new Promise(r => setTimeout(r, 1000));
    setCountdown('GO!');
    
    if (connection) {
      await connection.invoke('HostStartGame', roomCode, questionCount);
    }
  };

  const characterNames = { 1: 'Voi 🐘', 2: 'Thỏ 🐇', 3: 'Cáo 🦊', 4: 'Rùa 🐢' };
  const playerColors = ['#6366F1', '#10B981', '#F59E0B', '#06B6D4', '#EC4899', '#8B5CF6', '#14B8A6', '#F97316'];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Countdown overlay */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className={`text-9xl font-display font-black ${
                countdown === 'GO!' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-glow' 
                  : 'text-white text-glow'
              }`}
            >
              {countdown}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-panel rounded-2xl p-5 md:p-8 w-full max-w-lg"
      >
        {/* Room Code Display */}
        <div className="text-center mb-6">
          <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-3">Mã Phòng</p>
          
          <button
            onClick={handleCopy}
            className="group relative inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 rounded-2xl transition-all duration-300"
          >
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-cyan-400 tracking-[0.3em] font-mono">
              {roomCode}
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-white/60 group-hover:text-white transition-colors">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã copy!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </div>
          </button>

          <p className="text-white/30 text-xs mt-3">Chia sẻ mã này cho sinh viên để họ tham gia</p>
        </div>

        {/* Room Settings */}
        <div className="mb-5 p-4 rounded-xl bg-white/3 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Settings2 className="w-4 h-4 text-white/40" />
            <label className="text-xs font-bold text-white/50 uppercase tracking-wider">Cài đặt trận đấu</label>
          </div>
          <div className="input-with-icon">
            <Hash className="icon w-4 h-4" />
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="input-field pl-11 cursor-pointer appearance-none text-sm"
            >
              <option value={10}>10 Câu hỏi (Map nhỏ)</option>
              <option value={20}>20 Câu hỏi (Tiêu chuẩn)</option>
              <option value={50}>50 Câu hỏi (Map lớn)</option>
              <option value={100}>100 Câu hỏi (Siêu hỗn loạn)</option>
            </select>
          </div>
        </div>

        {/* Player List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white/40" />
              <h3 className="font-bold text-sm">Người chơi đã vào</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-primary/15 text-primary-light rounded-lg">{players.length}</span>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {players.length === 0 && (
              <div className="text-center py-10">
                <div className="flex justify-center gap-1.5 mb-4">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                      className="w-2 h-2 bg-white/30 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-white/30 text-sm">Đang chờ sinh viên tham gia...</p>
              </div>
            )}
            <AnimatePresence>
              {players.map((p, i) => (
                <motion.div
                  key={p.connectionId || i}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex justify-between items-center p-3 rounded-xl bg-white/3 border border-white/8"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                      style={{ background: `${playerColors[i % playerColors.length]}30`, border: `1px solid ${playerColors[i % playerColors.length]}50` }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{p.username}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Wifi className="w-2.5 h-2.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400/70">Online</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-white/5 rounded-lg text-white/50 font-medium">
                    {characterNames[p.characterId] || 'Chưa chọn'}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartGame}
          disabled={players.length === 0 || starting}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-gray-700 disabled:to-gray-600 disabled:text-gray-500 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 flex items-center justify-center gap-2"
          style={{ boxShadow: players.length > 0 ? '0 0 30px rgba(16,185,129,0.3)' : 'none' }}
        >
          <Play className="w-5 h-5" />
          {players.length === 0 ? 'Chờ người chơi...' : `BẮT ĐẦU TRẬN (${players.length} người)`}
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-2 flex items-center justify-center gap-2 text-white/30 hover:text-white/60 rounded-xl font-medium transition-colors text-sm"
        >
          <X className="w-4 h-4" />
          Hủy phòng
        </button>
      </motion.div>
    </div>
  );
}
