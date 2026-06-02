import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import API_HOST from '../config';
import HostDashboard from '../components/HostDashboard';
import { Home } from 'lucide-react';

export default function HostDashboardPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({ players: [], timeRemaining: 0, safeZone: {}, items: [], knowledgeZones: [] });
  const [connection, setConnection] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      // Host re-joins as Host to receive GameStateUpdate broadcasts
      conn.invoke('JoinRoomAsHost', roomCode);

      conn.on('GameStateUpdate', (snapshot) => {
        setGameState(snapshot);
      });
      
      conn.on('GameEnded', (finalScores) => {
        localStorage.setItem('finalScores', JSON.stringify(finalScores));
        navigate(`/result/${roomCode}`);
      });
    });

    setConnection(conn);
    return () => conn.stop();
  }, [roomCode, navigate]);

  return (
    <div className="w-full h-full flex flex-col bg-dark text-white overflow-hidden relative">
      {/* Return Home Button (Overlay) */}
      <button 
        onClick={() => setShowConfirm(true)}
        className="absolute bottom-4 right-4 z-[500] px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-black flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all border border-red-400/30"
      >
        <Home className="w-5 h-5" /> KẾT THÚC TRẬN ĐẤU
      </button>

      {showConfirm && (
        <div className="absolute inset-0 z-[1000] bg-black/80 flex items-center justify-center backdrop-blur-sm pointer-events-auto">
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-black text-red-500 mb-2">KẾT THÚC TRẬN ĐẤU?</h2>
            <p className="text-gray-300 mb-8">Bạn có chắc chắn muốn kết thúc trận đấu ngay bây giờ không? Mọi người sẽ được chuyển đến màn hình kết quả.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white transition-colors"
              >
                HUỶ
              </button>
              <button 
                onClick={() => {
                  if (connection) {
                    connection.invoke('HostEndGame', roomCode).catch(console.error);
                  } else {
                    navigate('/');
                  }
                  setShowConfirm(false);
                }}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white transition-colors"
              >
                XÁC NHẬN KẾT THÚC
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render the advanced Tactical Dashboard */}
      <HostDashboard 
        gameState={gameState} 
        myConnectionId={connection?.connectionId} 
        connection={connection} 
        roomCode={roomCode} 
      />
    </div>
  );
}
