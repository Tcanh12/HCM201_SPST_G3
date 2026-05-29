import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Crosshair, CheckCircle2, Wifi } from 'lucide-react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import API_HOST from '../config';

// Stat bar component
function StatBar({ label, value, max, color, icon: Icon }) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
      <span className="text-xs text-white/40 w-12 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`h-full rounded-full`}
          style={{ background: `linear-gradient(90deg, ${color.replace('text-', '').includes('red') ? '#EF4444' : color.includes('yellow') ? '#F59E0B' : color.includes('cyan') ? '#06B6D4' : '#10B981'}, transparent)` }}
        />
      </div>
      <span className="text-xs font-mono font-bold text-white/60 w-6 text-right">{value}</span>
    </div>
  );
}

// Character card component
function CharacterCard({ char, selected, onClick }) {
  const emojiMap = { 1: '🐘', 2: '🐇', 3: '🦊', 4: '🐢' };
  const colorMap = {
    1: { border: '#6366F1', bg: 'rgba(99,102,241,0.12)', glow: 'rgba(99,102,241,0.3)' },
    2: { border: '#10B981', bg: 'rgba(16,185,129,0.12)', glow: 'rgba(16,185,129,0.3)' },
    3: { border: '#F59E0B', bg: 'rgba(245,158,11,0.12)', glow: 'rgba(245,158,11,0.3)' },
    4: { border: '#06B6D4', bg: 'rgba(6,182,212,0.12)', glow: 'rgba(6,182,212,0.3)' },
  };
  const colors = colorMap[char.id] || colorMap[1];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300"
      style={{
        border: `2px solid ${selected ? colors.border : 'rgba(255,255,255,0.1)'}`,
        background: selected ? colors.bg : 'rgba(255,255,255,0.03)',
        boxShadow: selected ? `0 0 25px ${colors.glow}` : 'none',
      }}
    >
      {/* Selected indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 z-10"
        >
          <CheckCircle2 className="w-5 h-5" style={{ color: colors.border }} />
        </motion.div>
      )}

      <div className="p-4">
        {/* Character header */}
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={selected ? { y: [0, -4, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: `${colors.border}20`,
              border: `1px solid ${colors.border}40`,
            }}
          >
            {emojiMap[char.id]}
          </motion.div>
          <div>
            <h3 className="font-bold text-base">{char.name}</h3>
            <p className="text-xs text-white/40">{char.animalType}</p>
          </div>
        </div>

        {/* Skill name */}
        <div className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/5">
          <Zap className="w-3 h-3 text-amber-400" />
          <span className="text-xs font-bold text-amber-400">{char.skillName}</span>
        </div>

        {/* Stat bars */}
        <div className="space-y-2">
          <StatBar label="HP" value={char.maxHP} max={200} color="text-emerald-400" icon={Shield} />
          <StatBar label="Speed" value={char.moveSpeed} max={15} color="text-cyan-400" icon={Zap} />
          <StatBar label="Ammo" value={char.initialAmmo} max={10} color="text-amber-400" icon={Crosshair} />
        </div>
      </div>
    </motion.div>
  );
}

export default function PlayerLobbyPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [joined, setJoined] = useState(false);
  const [connection, setConnection] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Load character list from API
  useEffect(() => {
    axios.get(`${API_HOST}/api/rooms/characters`)
      .then(res => setCharacters(res.data))
      .catch(err => console.error(err));
  }, []);

  // Set up SignalR connection
  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      // Listen for game start event from Host
      conn.on('GameStartedForPlayer', () => {
        navigate(`/game/${roomCode}`);
      });
    });

    setConnection(conn);
    return () => { conn.stop(); };
  }, [roomCode]);

  const handleJoinRoom = async () => {
    if (!selectedChar) return alert('Vui lòng chọn nhân vật!');
    if (!connection) return;

    // Save selection so GamePage can re-join with correct character
    localStorage.setItem('selectedChar', String(selectedChar));

    // Player joins the room as an active player (creates PlayerState on server)
    await connection.invoke('JoinRoomAsPlayer', roomCode, user.username, selectedChar);
    setJoined(true);
  };

  const emojiMap = { 1: '🐘', 2: '🐇', 3: '🦊', 4: '🐢' };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-panel rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {!joined ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-bold mb-1">Chọn Nhân Vật</h2>
              <p className="text-white/40 text-sm">
                Phòng: <span className="text-primary font-bold font-mono">{roomCode}</span> · Chào <span className="text-white font-medium">{user.username}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {characters.map(char => (
                <CharacterCard
                  key={char.id}
                  char={char}
                  selected={selectedChar === char.id}
                  onClick={() => setSelectedChar(char.id)}
                />
              ))}
            </div>

            <button
              onClick={handleJoinRoom}
              disabled={!selectedChar}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              {selectedChar ? 'Xác Nhận & Vào Phòng Chờ' : 'Chọn nhân vật trước'}
            </button>
          </>
        ) : (
          <div className="text-center py-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="text-6xl mb-6"
            >
              {emojiMap[selectedChar] || '🎮'}
            </motion.div>

            <h2 className="text-3xl font-display font-bold mb-2">Đã Sẵn Sàng!</h2>
            <p className="text-white/40 mb-2">Đang chờ Host bắt đầu trận đấu...</p>
            <p className="text-sm text-white/30">
              Phòng: <span className="text-primary font-bold font-mono">{roomCode}</span>
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/15 text-emerald-400 rounded-full border border-emerald-500/25">
                <Wifi className="w-3.5 h-3.5" />
                <span className="text-sm font-medium">Đã kết nối</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>

              {/* Waiting animation - 3 pulsing dots */}
              <div className="flex gap-1.5 mt-4">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
