import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Users, Play, X, Settings2, Hash, Wifi, Map, Shield, ChevronDown } from 'lucide-react';
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import API_HOST from '../config';
import { MAPS, getDefaultMap } from '../data/mapData';

export default function HostLobbyPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [connection, setConnection] = useState(null);
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedMap, setSelectedMap] = useState(getDefaultMap().key);
  const [copied, setCopied] = useState(false);
  const [starting, setStarting] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [dynamicLighting, setDynamicLighting] = useState(true);
  const [error, setError] = useState("");

  const playerCount = Array.isArray(players) ? players.length : 0;
  const signalRConnected = connection?.state === "Connected" || connection?.state === signalR.HubConnectionState?.Connected;
  const hasRoomCode = Boolean(roomCode && (typeof roomCode === 'string' ? roomCode.trim() : roomCode));
  const hasPlayers = playerCount >= 1;

  const canStartGame = hasRoomCode && signalRConnected && hasPlayers && !starting;

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withHubProtocol(new MessagePackHubProtocol())
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

      conn.on('GameStarted', (payload) => {
        console.log("[SignalR] GameStarted received:", payload);
        const nextRoomCode = payload?.roomCode || roomCode;
        setStarting(false);
        setError("");
        sessionStorage.setItem("roomCode", nextRoomCode);
        navigate(`/game/${nextRoomCode}`);
      });

      conn.on('GameStartFailed', (payload) => {
        console.error("[SignalR] GameStartFailed raw:", payload);
        console.error("[SignalR] GameStartFailed JSON:", JSON.stringify(payload, null, 2));

        const message =
          typeof payload === "string"
            ? payload
            : payload?.message || payload?.Message || "Không thể bắt đầu trận.";

        const detail =
          typeof payload === "object"
            ? payload?.detail || payload?.Detail || payload?.error || ""
            : "";

        setStarting(false);
        setError(detail ? `${message} (${detail})` : message);
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
    if (!hasRoomCode) {
      setError("Không tìm thấy mã phòng.");
      return;
    }

    if (!signalRConnected) {
      setError("Chưa kết nối máy chủ. Vui lòng đợi hoặc tải lại trang.");
      return;
    }

    if (!hasPlayers) {
      setError("Cần ít nhất 1 người chơi để bắt đầu trận.");
      return;
    }

    try {
      setStarting(true);
      setError("");

      console.log("[HostLobby] Invoking HostStartGame", {
        roomCode,
        playerCount,
        connectionState: connection?.state,
      });

      const camMode = localStorage.getItem('cameraMode') || 'ThirdPerson';
      sessionStorage.setItem('activeMapId', selectedMap);
      
      const startPromise = connection.invoke('HostStartGame', roomCode, questionCount, camMode, selectedMap, dynamicLighting);
      
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Start game timeout sau 10 giây.")), 10000)
      );

      const result = await Promise.race([startPromise, timeoutPromise]);

      if (result && !result.success) {
        setStarting(false);
        setError(result.message || "Không thể bắt đầu trận.");
        return;
      }

      console.log("[HostLobby] HostStartGame invoke completed. Waiting for GameStarted event...");
    } catch (err) {
      console.error("[HostLobby] HostStartGame invoke failed:", err);
      setError(err?.message || "Không gọi được HostStartGame.");
      setStarting(false);
    }
  };

  const characterNames = { 1: 'Voi 🐘', 2: 'Thỏ 🐇', 3: 'Cáo 🦊', 4: 'Rùa 🐢' };
  const characterColors = {
    1: '#8B1A1A',
    2: '#1B8C5A',
    3: '#D97706',
    4: '#1E3A5F',
  };

  const currentMap = MAPS.find(m => m.key === selectedMap) || MAPS[0];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-4 md:p-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0E1A 0%, #111827 50%, #0A0E1A 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/10 via-transparent to-transparent pointer-events-none" />



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-panel rounded-2xl p-5 md:p-8 w-full max-w-xl max-h-[95vh] overflow-y-auto"
      >
        {/* Room Code Display */}
        <div className="text-center mb-6">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold mb-3">
            Mã Phòng — Chiếu lên màn hình lớp
          </p>
          
          <button
            onClick={handleCopy}
            className="group relative inline-flex items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 bg-white/3 hover:bg-white/6 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-[0.4em] font-mono"
              style={{ color: '#D4A843', textShadow: '0 0 30px rgba(212,168,67,0.3)' }}
            >
              {roomCode}
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 rounded-lg text-xs font-medium text-white/50 group-hover:text-white transition-colors">
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

          <p className="text-white/20 text-[11px] mt-3">Chia sẻ mã này cho sinh viên</p>
        </div>

        {/* Room Settings */}
        <div className="mb-5 p-4 rounded-xl bg-white/2 border border-white/6">
          <div className="flex items-center gap-2 mb-3">
            <Settings2 className="w-4 h-4 text-white/30" />
            <label className="text-xs font-bold text-white/40 uppercase tracking-wider">Cài đặt trận đấu</label>
          </div>

          {/* Question Count */}
          <div className="mb-3">
            <div className="input-with-icon">
              <Hash className="icon w-4 h-4" />
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="input-field pl-11 cursor-pointer appearance-none text-sm"
              >
                <option value={10}>10 Câu hỏi (Nhanh)</option>
                <option value={15}>15 Câu hỏi (Cơ bản)</option>
                <option value={20}>20 Câu hỏi (Tiêu chuẩn)</option>
                <option value={50}>50 Câu hỏi (Hỗn loạn)</option>
                <option value={100}>100 Câu hỏi (Siêu hỗn loạn)</option>
              </select>
            </div>
          </div>

          {/* Map Selection */}
          <div className="relative">
            <label className="text-[10px] text-white/30 uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1">
              <Map className="w-3 h-3" /> Bản đồ
            </label>
            <button
              onClick={() => setShowMapPicker(!showMapPicker)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 transition-all text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg" style={{ color: currentMap.color }}>
                  {currentMap.icon && <currentMap.icon size={22} strokeWidth={2} />}
                </span>
                <div>
                  <div className="text-sm font-bold text-white/80">{currentMap.nameVi}</div>
                  <div className="text-[10px] text-white/30">{currentMap.difficulty} · {currentMap.knowledgeDensity} cột tri thức</div>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${showMapPicker ? 'rotate-180' : ''}`} />
            </button>

            {/* Map picker dropdown */}
            <AnimatePresence>
              {showMapPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mt-2 rounded-xl border border-white/10 bg-dark-lighter/95 backdrop-blur-xl overflow-hidden"
                >
                  {MAPS.map(map => (
                    <button
                      key={map.key}
                      onClick={() => { setSelectedMap(map.key); setShowMapPicker(false); }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-white/5 transition-all text-left ${
                        selectedMap === map.key ? 'bg-white/8' : ''
                      }`}
                    >
                      <span className="text-xl" style={{ color: map.color }}>
                        {map.icon && <map.icon size={22} strokeWidth={2} />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold" style={{ color: selectedMap === map.key ? map.color : 'rgba(255,255,255,0.7)' }}>
                          {map.nameVi}
                        </div>
                        <div className="text-[10px] text-white/30 truncate">{map.description}</div>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                        style={{
                          color: map.color,
                          background: `${map.color}10`,
                          borderColor: `${map.color}20`,
                        }}
                      >
                        {map.difficulty}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-white/2 border border-white/6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={dynamicLighting}
                  onChange={(e) => setDynamicLighting(e.target.checked)}
                  className="rounded bg-white/10 border-white/20 text-emerald-500 focus:ring-emerald-500"
                />
                Bật chu kỳ Sáng/Tối (Dynamic Lighting)
              </label>
            </div>
          </div>
        </div>

        {/* Player List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white/30" />
              <h3 className="font-bold text-sm text-white/80">Sinh viên đã vào</h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg border"
              style={{
                background: players.length > 0 ? 'rgba(212,168,67,0.1)' : 'rgba(255,255,255,0.05)',
                color: players.length > 0 ? '#D4A843' : 'rgba(255,255,255,0.3)',
                borderColor: players.length > 0 ? 'rgba(212,168,67,0.2)' : 'rgba(255,255,255,0.08)',
              }}
            >
              {players.length}
            </span>
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
                      className="w-2 h-2 bg-white/20 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-white/25 text-sm">Đang chờ sinh viên tham gia...</p>
                <p className="text-white/15 text-[10px] mt-1">Sinh viên truy cập web → Tham Gia → Nhập mã phòng</p>
              </div>
            )}
            <AnimatePresence>
              {players.map((p, i) => (
                <motion.div
                  key={p.connectionId || i}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex justify-between items-center p-3 rounded-xl bg-white/2 border border-white/6"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white"
                      style={{
                        background: `${characterColors[p.characterId] || '#6366F1'}20`,
                        border: `1px solid ${characterColors[p.characterId] || '#6366F1'}40`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <span className="font-medium text-sm text-white/80">{p.username}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Wifi className="w-2.5 h-2.5 text-emerald-400" />
                        <span className="text-[9px] text-emerald-400/60">Online</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg text-white/40 font-medium border"
                    style={{
                      background: `${characterColors[p.characterId] || '#6366F1'}10`,
                      borderColor: `${characterColors[p.characterId] || '#6366F1'}20`,
                      color: characterColors[p.characterId] || '#6366F1',
                    }}
                  >
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
          disabled={!canStartGame}
          className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 flex items-center justify-center gap-2"
          style={{
            background: canStartGame
              ? 'linear-gradient(135deg, #1B8C5A, #10B981)'
              : '#1F2937',
            color: canStartGame ? 'white' : '#6B7280',
            boxShadow: canStartGame ? '0 0 30px rgba(16,185,129,0.3)' : 'none',
            cursor: canStartGame ? 'pointer' : 'not-allowed',
          }}
        >
          <Play className="w-5 h-5" />
          {starting ? "Đang bắt đầu..." : (players.length === 0 ? 'Chờ người chơi...' : `BẮT ĐẦU TRẬN (${players.length} người)`)}
        </button>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200 text-center">
            {error}
          </div>
        )}

        {!hasRoomCode && !error && (
          <p className="mt-3 text-sm text-amber-500/80 text-center">
            Không tìm thấy mã phòng.
          </p>
        )}

        {hasRoomCode && !signalRConnected && !error && (
          <p className="mt-3 text-sm text-amber-500/80 text-center">
            Chưa kết nối máy chủ. Vui lòng đợi vài giây hoặc tải lại trang.
          </p>
        )}

        {hasRoomCode && signalRConnected && !hasPlayers && !error && (
          <p className="mt-3 text-sm text-amber-500/80 text-center">
            Cần ít nhất 1 người chơi để bắt đầu trận.
          </p>
        )}

        {starting && !error && (
          <p className="mt-3 text-sm text-amber-500/80 text-center">
            Đang gửi yêu cầu bắt đầu trận...
          </p>
        )}

        {/* Debug panel */}
        <div className="mt-4 text-[10px] text-white/20 font-mono text-center flex flex-wrap gap-3 justify-center">
          <span>roomCode: {roomCode || "missing"}</span>
          <span>players: {playerCount}</span>
          <span>connection: {connection?.state || "unknown"}</span>
          <span>starting: {String(starting)}</span>
          <span>canStartGame: {String(canStartGame)}</span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-2 flex items-center justify-center gap-2 text-white/20 hover:text-white/50 rounded-xl font-medium transition-colors text-sm"
        >
          <X className="w-4 h-4" />
          Hủy phòng
        </button>
      </motion.div>
    </div>
  );
}
