import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Crown, ChevronLeft, Shield, Zap, Target } from 'lucide-react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
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

  useEffect(() => {
    axios.get(`${API_HOST}/api/rooms/characters`)
      .then(res => setCharacters(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!user.username) {
      alert("Vui lòng đăng nhập lại!");
      navigate('/');
      return;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          connection.invoke('JoinRoom', roomCode, user.username, selectedChar);

          connection.on('PlayerJoined', (player) => {
            setPlayers(prev => {
              if (prev.find(p => p.connectionId === player.connectionId)) return prev;
              return [...prev, player];
            });
          });

          connection.on('LobbyState', (lobbyPlayers) => {
            setPlayers(lobbyPlayers);
          });

          connection.on('GameStateUpdate', () => {
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
    <div className="flex flex-col w-full h-full bg-dark text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-dark-lighter/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              PHÒNG CHỜ
            </h1>
            <span className="text-xs text-white/50 uppercase tracking-widest font-medium">Chuẩn bị chiến đấu</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Mã Phòng</span>
            <span className="font-mono text-lg font-black text-secondary tracking-widest">{roomCode}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary-light font-bold">
              {user.username?.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">{user.username}</span>
              <span className="text-xs text-white/50">{isHost ? 'Chủ phòng' : 'Người chơi'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 md:p-8 max-w-7xl mx-auto w-full h-full overflow-hidden">
        
        {/* Left column: Character Selection */}
        <div className="flex-[2] flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              Chọn Nhân Vật <span className="text-sm font-normal px-2 py-1 bg-white/10 rounded-md text-white/60 ml-2">Sẵn sàng ({characters.length})</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-6 pr-2 custom-scrollbar">
            {characters.map(char => (
              <motion.div 
                key={char.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChar(char.id)}
                className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                  selectedChar === char.id 
                    ? 'bg-gradient-to-br from-primary/20 to-transparent border-2 border-primary shadow-glow-primary' 
                    : 'bg-card border-2 border-white/5 hover:border-white/20'
                }`}
              >
                {selectedChar === char.id && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Đã chọn
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-black text-2xl tracking-wide text-white drop-shadow-sm">{char.name}</h3>
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{char.animalType}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                    {char.id === 1 ? '🐘' : char.id === 2 ? '🐇' : char.id === 3 ? '🦊' : '🐢'}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Kỹ năng đặc biệt</div>
                  <div className="text-sm font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 border border-cyan-400/20">
                    <Zap className="w-3.5 h-3.5" />
                    {char.skillName}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-dark/50 rounded-lg p-2 text-center border border-white/5">
                    <div className="flex justify-center mb-1"><Shield className="w-4 h-4 text-emerald-400" /></div>
                    <div className="text-[10px] text-white/40 uppercase mb-0.5 font-bold">Máu</div>
                    <div className="font-mono font-bold text-white">{char.maxHP}</div>
                  </div>
                  <div className="bg-dark/50 rounded-lg p-2 text-center border border-white/5">
                    <div className="flex justify-center mb-1"><Zap className="w-4 h-4 text-amber-400" /></div>
                    <div className="text-[10px] text-white/40 uppercase mb-0.5 font-bold">Tốc độ</div>
                    <div className="font-mono font-bold text-white">{char.moveSpeed}</div>
                  </div>
                  <div className="bg-dark/50 rounded-lg p-2 text-center border border-white/5">
                    <div className="flex justify-center mb-1"><Target className="w-4 h-4 text-purple-400" /></div>
                    <div className="text-[10px] text-white/40 uppercase mb-0.5 font-bold">Đạn</div>
                    <div className="font-mono font-bold text-white">{char.initialAmmo}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column: Lobby Status */}
        <div className="flex-1 flex flex-col glass-panel rounded-3xl p-6 h-full relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h3 className="font-display font-bold text-xl flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              Người chơi ({players.length}/50)
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 pr-2 space-y-2 custom-scrollbar relative z-10">
            {players.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/30 text-sm">
                <div className="w-12 h-12 border-2 border-white/10 border-t-white/40 rounded-full animate-spin mb-4" />
                Đang tải danh sách...
              </div>
            ) : (
              players.map((p, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    p.username === user.username ? 'bg-primary/10 border-primary/30' : 'bg-dark/40 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold border border-white/5">
                      {p.username?.substring(0, 2).toUpperCase()}
                    </div>
                    <span className={`font-medium ${p.username === user.username ? 'text-white' : 'text-white/80'}`}>
                      {p.username}
                    </span>
                    {i === 0 && <Crown className="w-3.5 h-3.5 text-yellow-400" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white/5 text-secondary rounded-md border border-white/10">
                    {characters.find(c => c.id === p.characterId)?.name || '...'}
                  </span>
                </motion.div>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-white/10 relative z-10">
            {isHost ? (
              <button 
                onClick={handleStartGame}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                <span>BẮT ĐẦU TRẬN</span>
              </button>
            ) : (
              <div className="w-full py-4 bg-dark/50 border border-white/10 text-center rounded-xl font-bold text-white/50 flex flex-col items-center justify-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                Chờ chủ phòng bắt đầu...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
