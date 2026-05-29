import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as signalR from '@microsoft/signalr';
import API_HOST from '../config';
import HostDashboard from '../components/HostDashboard';
import { Home } from 'lucide-react';

export default function HostDashboardPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({ players: [], timeRemaining: 0, safeZone: {}, items: [], knowledgeZones: [] });
  const [connection, setConnection] = useState(null);

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
        onClick={() => {
          if (connection) {
            connection.invoke('HostEndGame', roomCode).catch(console.error);
          } else {
            navigate('/');
          }
        }}
        className="absolute top-4 right-4 z-[999] px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-colors"
      >
        <Home className="w-4 h-4" /> Kết Thúc Trận
      </button>

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
