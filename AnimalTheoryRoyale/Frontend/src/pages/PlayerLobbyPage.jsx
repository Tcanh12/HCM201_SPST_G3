import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import API_HOST from '../config';

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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl p-8 w-full max-w-2xl"
      >
        {!joined ? (
          <>
            <h2 className="text-3xl font-display font-bold text-center mb-2">Chọn Nhân Vật</h2>
            <p className="text-center text-gray-400 text-sm mb-6">Phòng: <span className="text-primary font-bold">{roomCode}</span> · Chào <span className="text-white font-medium">{user.username}</span></p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {characters.map(char => (
                <motion.div
                  key={char.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedChar(char.id)}
                  className={`p-5 rounded-xl cursor-pointer border-2 transition-all ${
                    selectedChar === char.id
                      ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(79,70,229,0.3)]'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">
                      {char.id === 1 ? '🐘' : char.id === 2 ? '🐇' : char.id === 3 ? '🦊' : '🐢'}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg">{char.name}</h3>
                      <p className="text-xs text-gray-400">{char.animalType}</p>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-400 font-medium mb-3">Skill: {char.skillName}</p>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex justify-between"><span>HP:</span> <span className="font-mono">{char.maxHP}</span></div>
                    <div className="flex justify-between"><span>Tốc độ:</span> <span className="font-mono">{char.moveSpeed}</span></div>
                    <div className="flex justify-between"><span>Đạn:</span> <span className="font-mono">{char.initialAmmo}</span></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleJoinRoom}
              disabled={!selectedChar}
              className="w-full py-4 bg-primary disabled:bg-gray-700 disabled:text-gray-500 rounded-xl font-bold text-lg transition-transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              {selectedChar ? 'Xác Nhận & Vào Phòng Chờ' : 'Chọn nhân vật trước'}
            </button>
          </>
        ) : (
          <div className="text-center py-12">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              {selectedChar === 1 ? '🐘' : selectedChar === 2 ? '🐇' : selectedChar === 3 ? '🦊' : '🐢'}
            </motion.div>
            <h2 className="text-3xl font-display font-bold mb-2">Đã Sẵn Sàng!</h2>
            <p className="text-gray-400">Đang chờ Host bắt đầu trận đấu...</p>
            <p className="text-sm text-gray-500 mt-4">Phòng: <span className="text-primary font-bold">{roomCode}</span></p>

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Đã kết nối</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
