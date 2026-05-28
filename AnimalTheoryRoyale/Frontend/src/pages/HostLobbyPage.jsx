import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as signalR from '@microsoft/signalr';
import API_HOST from '../config';

export default function HostLobbyPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [connection, setConnection] = useState(null);
  const [questionCount, setQuestionCount] = useState(20);

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
    });

    setConnection(conn);
    return () => { conn.stop(); };
  }, [roomCode]);

  const handleStartGame = async () => {
    if (players.length === 0) {
      alert('Chưa có người chơi nào tham gia!');
      return;
    }
    if (connection) {
      await connection.invoke('HostStartGame', roomCode, questionCount);
    }
  };

  const characterNames = { 1: 'Voi 🐘', 2: 'Thỏ 🐇', 3: 'Cáo 🦊', 4: 'Rùa 🐢' };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-8 w-full max-w-lg"
      >
        {/* Room Code Display */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Mã Phòng</p>
          <h1 className="text-6xl font-black text-primary tracking-[0.3em] my-2">{roomCode}</h1>
          <p className="text-gray-400 text-sm">Chia sẻ mã này cho sinh viên để họ tham gia</p>
        </div>

        {/* Room Settings */}
        <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
          <label className="block text-sm font-bold text-gray-300 mb-2">Số lượng câu hỏi trên map:</label>
          <select 
            value={questionCount} 
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full bg-dark/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-primary"
          >
            <option value={10}>10 Câu (Map nhỏ)</option>
            <option value={20}>20 Câu (Tiêu chuẩn)</option>
            <option value={50}>50 Câu (Map lớn)</option>
            <option value={100}>100 Câu (Siêu hỗn loạn)</option>
          </select>
        </div>

        {/* Player List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Người chơi đã vào</h3>
            <span className="text-primary font-mono font-bold text-lg">{players.length}</span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {players.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-4xl mb-2">⏳</p>
                <p>Đang chờ sinh viên tham gia...</p>
              </div>
            )}
            {players.map((p, i) => (
              <motion.div
                key={p.connectionId || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-3 flex justify-between items-center border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-sm font-bold">{i + 1}</div>
                  <span className="font-medium">{p.username}</span>
                </div>
                <span className="text-sm px-3 py-1 bg-white/10 rounded-full">
                  {characterNames[p.characterId] || 'Chưa chọn'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartGame}
          disabled={players.length === 0}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-xl font-bold text-xl transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        >
          {players.length === 0 ? 'Chờ người chơi...' : `BẮT ĐẦU TRẬN (${players.length} người)`}
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-3 bg-transparent text-gray-400 hover:text-white rounded-xl font-medium transition-colors"
        >
          Hủy phòng
        </button>
      </motion.div>
    </div>
  );
}
