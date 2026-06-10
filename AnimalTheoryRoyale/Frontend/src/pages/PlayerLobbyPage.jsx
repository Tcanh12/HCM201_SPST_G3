import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Crosshair, CheckCircle2, Wifi, Star, Swords, Eye } from 'lucide-react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import API_HOST from '../config';
import { CHARACTER_DATA, getCharacterData } from '../data/characterData';

// Stat bar component
function StatBar({ label, value, max, color, icon: Icon }) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
      <span className="text-[10px] text-white/35 w-10 shrink-0 font-bold uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}40)` }}
        />
      </div>
      <span className="text-xs font-mono font-bold text-white/50 w-6 text-right">{value}</span>
    </div>
  );
}

// Skill preview pill
function SkillPill({ skill }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
      <span className="text-sm">{skill.icon}</span>
      <div>
        <div className="text-[9px] font-bold text-amber-400/80">{skill.name}</div>
        <div className="text-[8px] text-white/30 leading-tight">{skill.desc}</div>
      </div>
    </div>
  );
}

// Premium Character Card with pedestal style
function CharacterCard({ char, charMeta, selected, onClick, index }) {
  const meta = charMeta || getCharacterData(char.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        border: `2px solid ${selected ? meta.colors.border : 'rgba(255,255,255,0.06)'}`,
        background: selected
          ? `linear-gradient(135deg, ${meta.colors.bg}, rgba(10,14,26,0.9))`
          : 'rgba(255,255,255,0.02)',
        boxShadow: selected
          ? `0 0 30px ${meta.colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
          : '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Selected indicator */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-2 right-2 z-10"
          >
            <CheckCircle2 className="w-5 h-5" style={{ color: meta.colors.border }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border"
          style={{
            color: meta.colors.border,
            background: `${meta.colors.primary}20`,
            borderColor: `${meta.colors.border}30`,
          }}
        >
          {meta.roleVi}
        </span>
      </div>

      <div className="p-4">
        {/* Character avatar + info */}
        <div className="flex items-center gap-3 mb-3 mt-3">
          <motion.div
            animate={selected ? { y: [0, -5, 0], rotate: [0, 2, -2, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{
              background: `${meta.colors.primary}20`,
              border: `2px solid ${meta.colors.border}40`,
              boxShadow: selected ? `0 0 20px ${meta.colors.glow}` : 'none',
            }}
          >
            {meta.emoji}
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-lg" style={{ color: selected ? meta.colors.border : 'white' }}>
              {char.name}
            </h3>
            <p className="text-[10px] text-white/30">{char.animalType}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[10px] text-white/35 leading-snug mb-3 line-clamp-2">
          {meta.shortDesc}
        </p>

        {/* Ultimate Skill Preview */}
        <div className="mb-3 p-2.5 rounded-xl border transition-all duration-300"
          style={{
            background: selected ? `${meta.colors.primary}10` : 'rgba(255,255,255,0.02)',
            borderColor: selected ? `${meta.colors.border}20` : 'rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Star className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
              {meta.skills.ultimate.name}
            </span>
          </div>
          <p className="text-[9px] text-white/35 leading-snug">
            {meta.skills.ultimate.desc}
          </p>
          {selected && meta.skills.ultimate.visualDesc && (
            <p className="text-[8px] mt-1 flex items-center gap-1" style={{ color: `${meta.colors.border}80` }}>
              <Eye className="w-2.5 h-2.5" />
              {meta.skills.ultimate.visualDesc}
            </p>
          )}
        </div>

        {/* Stat bars */}
        <div className="space-y-1.5">
          <StatBar label="HP" value={char.maxHP} max={200} color="#10B981" icon={Shield} />
          <StatBar label="SPD" value={char.moveSpeed} max={15} color="#06B6D4" icon={Zap} />
          <StatBar label="ATK" value={char.initialAmmo} max={10} color="#F59E0B" icon={Crosshair} />
        </div>

        {/* Accessories hint (shown when selected) */}
        <AnimatePresence>
          {selected && meta.accessories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-white/5"
            >
              <div className="text-[9px] text-white/25 uppercase tracking-wider mb-1">Phụ kiện</div>
              {meta.accessories.map((acc, i) => (
                <div key={i} className="text-[9px] text-white/30 flex items-center gap-1">
                  <span style={{ color: meta.colors.border }}>•</span> {acc}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PlayerLobbyPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [joinStatus, setJoinStatus] = useState('idle');
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
      .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      conn.on('GameStarted', (payload) => {
        navigate(`/game/${payload.roomCode}`);
      });

      conn.on('JoinRejected', (msg) => {
        if (window.confirm(msg + "\n\nBạn có muốn gửi yêu cầu tham gia muộn đến Host không?")) {
          setJoinStatus('requesting');
          conn.invoke('RequestJoinInProgressRoom', roomCode, user.username, parseInt(localStorage.getItem('selectedChar'))).catch(console.error);
        } else {
          setJoinStatus('idle');
        }
      });

      conn.on('LateJoinApproved', (game) => {
        navigate(`/game/${roomCode}`);
      });

      conn.on('LateJoinRejected', () => {
        alert("Chủ phòng đã từ chối yêu cầu tham gia của bạn.");
        setJoinStatus('idle');
      });

      conn.on('PlayerJoined', (p) => {
        if (p.connectionId === conn.connectionId) setJoinStatus('joined');
      });

      conn.onreconnected(() => {
        const sc = localStorage.getItem('selectedChar');
        if (sc) {
          conn.invoke('JoinRoomAsPlayer', roomCode, user.username, parseInt(sc)).catch(console.error);
        }
      });
    }).catch(console.error);

    setConnection(conn);
    return () => { conn.stop(); };
  }, [roomCode]);

  const handleJoinRoom = async () => {
    if (!selectedChar) return alert('Vui lòng chọn nhân vật!');
    if (!connection) return;

    localStorage.setItem('selectedChar', String(selectedChar));
    setJoinStatus('waiting');
    await connection.invoke('JoinRoomAsPlayer', roomCode, user.username, selectedChar);
  };

  const selectedMeta = selectedChar ? getCharacterData(selectedChar) : null;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-4 md:p-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0E1A 0%, #111827 50%, #0A0E1A 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-red-950/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-panel rounded-2xl p-4 md:p-6 w-full max-w-3xl max-h-[95vh] overflow-y-auto"
        style={{ borderColor: selectedMeta ? `${selectedMeta.colors.border}15` : 'rgba(255,255,255,0.08)' }}
      >
        {joinStatus === 'idle' ? (
          <>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Swords className="w-4 h-4 text-amber-400/50" />
                <h2 className="text-xl md:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                  Chọn Chiến Binh
                </h2>
                <Swords className="w-4 h-4 text-amber-400/50" />
              </div>
              <p className="text-white/30 text-xs">
                Phòng: <span className="text-amber-400 font-bold font-mono tracking-wider">{roomCode}</span>
                <span className="mx-2 text-white/10">|</span>
                Chào <span className="text-white font-medium">{user.username}</span>
              </p>
            </div>

            {/* Character Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {characters.map((char, i) => (
                <CharacterCard
                  key={char.id}
                  char={char}
                  charMeta={CHARACTER_DATA[char.id]}
                  selected={selectedChar === char.id}
                  onClick={() => setSelectedChar(char.id)}
                  index={i}
                />
              ))}
            </div>

            {/* Confirm Button */}
            <motion.button
              whileHover={selectedChar ? { scale: 1.02 } : {}}
              whileTap={selectedChar ? { scale: 0.97 } : {}}
              onClick={handleJoinRoom}
              disabled={!selectedChar}
              className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: selectedChar
                  ? `linear-gradient(135deg, ${selectedMeta?.colors.primary || '#8B1A1A'}, ${selectedMeta?.colors.border || '#D4A843'})`
                  : '#1F2937',
                color: selectedChar ? 'white' : '#6B7280',
                cursor: selectedChar ? 'pointer' : 'not-allowed',
                boxShadow: selectedChar ? `0 0 25px ${selectedMeta?.colors.glow || 'transparent'}` : 'none',
              }}
            >
              <CheckCircle2 className="w-5 h-5" />
              {selectedChar ? `Xác Nhận ${selectedMeta?.name} & Vào Phòng Chờ` : 'Chọn nhân vật trước'}
            </motion.button>
          </>
        ) : joinStatus === 'requesting' ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-display font-bold mb-2 text-amber-400">Đang xin phép...</h2>
            <p className="text-white/40 mb-4">Đang gửi yêu cầu tham gia đến Host.</p>
            <div className="flex justify-center gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }} className="w-2 h-2 bg-amber-400 rounded-full" />
              ))}
            </div>
          </div>
        ) : (
          /* Waiting for host to start */
          <div className="text-center py-10">
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="text-6xl mb-6"
            >
              {selectedMeta?.emoji || '🎮'}
            </motion.div>

            <h2 className="text-2xl font-display font-black mb-2"
              style={{ color: selectedMeta?.colors.border || '#D4A843' }}
            >
              Đã Sẵn Sàng!
            </h2>
            <p className="text-white/40 mb-1 text-sm">Đang chờ Host bắt đầu trận đấu...</p>
            <p className="text-xs text-white/25">
              Phòng: <span className="text-amber-400 font-bold font-mono">{roomCode}</span>
              <span className="mx-2 text-white/10">|</span>
              {selectedMeta?.name} — {selectedMeta?.roleVi}
            </p>

            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                <Wifi className="w-3.5 h-3.5" />
                <span className="text-sm font-medium">Đã kết nối</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>

              {/* Waiting dots */}
              <div className="flex gap-1.5 mt-3">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: selectedMeta?.colors.border || '#D4A843' }}
                  />
                ))}
              </div>

              {/* Knowledge tip while waiting */}
              <div className="mt-4 max-w-xs p-3 rounded-xl bg-white/3 border border-white/5 text-center">
                <span className="text-[10px] text-amber-400/50 uppercase tracking-wider font-bold">💡 Mẹo</span>
                <p className="text-[11px] text-white/30 mt-1 leading-snug">
                  Trả lời đúng liên tiếp sẽ tăng combo và nhân điểm thưởng. Combo cao nhất sẽ được vinh danh!
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
