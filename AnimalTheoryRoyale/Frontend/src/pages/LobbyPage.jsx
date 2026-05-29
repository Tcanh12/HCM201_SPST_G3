import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import API_HOST from '../config.js';

export default function LobbyPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [selectedChar, setSelectedChar] = useState(1);
  const [players, setPlayers] = useState([]);
  const [connection, setConnection] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isHost = localStorage.getItem('isHost') === 'true';

  // Load characters
  useEffect(() => {
    axios.get(`${API_HOST}/api/rooms/characters`)
      .then(res => setCharacters(res.data))
      .catch(err => console.error(err));
  }, []);

  // Initialize SignalR
  useEffect(() => {
    if (!user.username) {
      alert("Vui lòng đăng nhập lại!");
      navigate('/');
      return;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // Connect and set up listeners
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to GameHub!');
          // Join Room
          connection.invoke('JoinRoom', roomCode, user.username, selectedChar);

          connection.on('PlayerJoined', (player) => {
            setPlayers(prev => {
              const existing = prev.find(p => p.connectionId === player.connectionId);
              if (existing) return prev;
              return [...prev, player];
            });
          });

          connection.on('LobbyState', (lobbyPlayers) => {
            setPlayers(lobbyPlayers);
          });

          connection.on('GameStateUpdate', () => {
            // Server started game loop, navigate all players!
            navigate(`/game/${roomCode}`);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection, roomCode, selectedChar]);

  const handleStartGame = async () => {
    try {
      await axios.post(`${API_HOST}/api/rooms/${roomCode}/start`);
    } catch (err) {
      console.error(err);
      alert('Failed to start game');
    }
  };

  return (
    <div className="flex w-full h-full p-8 gap-8 bg-dark">
      
      {/* Left side: Character Selection */}
      <div className="flex-1 flex flex-col glass-panel rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Chọn Nhân Vật</h2>
        <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto">
          {characters.map(char => (
            <motion.div 
              key={char.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedChar(char.id)}
              className={`p-4 rounded-xl cursor-pointer border-2 transition-colors ${selectedChar === char.id ? 'border-primary bg-primary/20' : 'border-white/10 hover:border-white/30'}`}
            >
              <h3 className="font-bold text-xl">{char.name} <span className="text-sm font-normal text-gray-400">({char.animalType})</span></h3>
              <p className="text-sm text-emerald-400 font-medium my-2">Skill: {char.skillName}</p>
              <div className="space-y-1 text-sm text-gray-300">
                <div className="flex justify-between"><span>HP:</span> <span>{char.maxHP}</span></div>
                <div className="flex justify-between"><span>Speed:</span> <span>{char.moveSpeed}</span></div>
                <div className="flex justify-between"><span>Ammo:</span> <span>{char.initialAmmo}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right side: Lobby Status */}
      <div className="w-96 flex flex-col glass-panel rounded-2xl p-6">
        <div className="text-center mb-6">
          <p className="text-gray-400 uppercase tracking-wider text-sm font-bold">Mã Phòng</p>
          <h1 className="text-5xl font-black text-primary tracking-widest">{roomCode}</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h3 className="font-bold mb-3">Người chơi đang chờ ({players.length}/50)</h3>
          <div className="space-y-2">
            {players.map((p, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                <span className="font-medium">{p.username}</span>
                <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                  {characters.find(c => c.id === p.characterId)?.name || '...'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isHost ? (
          <button 
            onClick={handleStartGame}
            className="w-full py-4 mt-4 bg-primary rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            BẮT ĐẦU TRẬN
          </button>
        ) : (
          <div className="w-full py-4 mt-4 bg-white/10 text-center rounded-xl font-bold text-gray-400">
            Chờ chủ phòng bắt đầu...
          </div>
        )}
      </div>

    </div>
  );
}
