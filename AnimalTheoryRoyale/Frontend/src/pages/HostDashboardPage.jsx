import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import API_HOST from '../config';

export default function HostDashboardPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({ players: [] });
  const [connection, setConnection] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      // Host re-joins as Host to receive GameStateUpdate broadcasts
      conn.invoke('JoinRoomAsHost', roomCode);

      conn.on('GameStateUpdate', (snapshot) => {
        setGameState(snapshot);
      });
    });

    setConnection(conn);
    return () => conn.stop();
  }, [roomCode]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const players = gameState.players || [];
  const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const alive = players.filter(p => !p.isDead).length;

  const handleEndGame = () => {
    navigate(`/result/${roomCode}`);
  };

  return (
    <div className="w-full h-full flex flex-col bg-dark text-white overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-card/50">
        <div>
          <h1 className="text-2xl font-display font-black text-primary">BẢNG ĐIỀU KHIỂN HOST</h1>
          <p className="text-sm text-gray-400">Phòng: <span className="font-bold text-white">{roomCode}</span></p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase">Thời gian</p>
            <p className="text-3xl font-mono font-black text-white">{formatTime(elapsed)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase">Còn sống</p>
            <p className="text-3xl font-mono font-black text-emerald-400">{alive}/{players.length}</p>
          </div>
          <button
            onClick={handleEndGame}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold transition-colors"
          >
            Kết Thúc Trận
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Live Leaderboard */}
        <div className="w-2/3 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">🏆 BẢNG XẾP HẠNG TRỰC TIẾP</h2>
          <div className="space-y-3">
            {sorted.map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  i === 0 ? 'bg-yellow-500/10 border-yellow-500/40' :
                  i === 1 ? 'bg-gray-300/5 border-gray-400/20' :
                  i === 2 ? 'bg-amber-700/10 border-amber-700/30' :
                  'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                    i === 0 ? 'bg-yellow-500 text-dark' :
                    i === 1 ? 'bg-gray-300 text-dark' :
                    i === 2 ? 'bg-amber-700 text-white' :
                    'bg-white/10 text-white'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{p.username || 'Người chơi'}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span>{p.characterId === 1 ? '🐘' : p.characterId === 2 ? '🐇' : p.characterId === 3 ? '🦊' : '🐢'}</span>
                      <span className={p.isDead ? 'text-red-400' : 'text-emerald-400'}>
                        {p.isDead ? '💀 Đang hồi sinh' : `❤️ ${p.hp} HP`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {(p.combo || 0) > 1 && (
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Combo</p>
                      <p className="font-bold text-orange-400 text-lg">x{p.combo}</p>
                    </div>
                  )}
                  <div className="text-center min-w-[80px]">
                    <p className="text-xs text-gray-400">Điểm</p>
                    <p className="text-3xl font-black text-cyan-400">{p.score || 0}</p>
                  </div>
                </div>
              </div>
            ))}
            {sorted.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <p className="text-5xl mb-4">📡</p>
                <p className="text-lg">Đang chờ dữ liệu từ trận đấu...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Radar Map */}
        <div className="w-1/3 p-6 border-l border-white/10">
          <h2 className="text-xl font-bold mb-4 text-blue-400">📍 BẢN ĐỒ RADAR</h2>
          <div className="aspect-square bg-black/60 rounded-2xl relative overflow-hidden border border-white/10">
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20% 20%'
            }} />
            {/* Player dots */}
            {players.map(p => (
              <div
                key={p.id}
                className="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white/50"
                style={{
                  left: `${50 + (p.x / 200) * 100}%`,
                  top: `${50 + (p.z / 200) * 100}%`,
                  backgroundColor: p.isDead ? '#EF4444' : '#10B981',
                  boxShadow: `0 0 12px ${p.isDead ? '#EF4444' : '#10B981'}`
                }}
                title={`${p.username}: ${p.score || 0} điểm`}
              />
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded-xl text-center border border-white/10">
              <p className="text-xs text-gray-400">Tổng người chơi</p>
              <p className="text-2xl font-black">{players.length}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl text-center border border-white/10">
              <p className="text-xs text-gray-400">Còn sống</p>
              <p className="text-2xl font-black text-emerald-400">{alive}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
