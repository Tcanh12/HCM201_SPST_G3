import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateRoomPage from './pages/CreateRoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import HostLobbyPage from './pages/HostLobbyPage';
import PlayerLobbyPage from './pages/PlayerLobbyPage';
import HostDashboardPage from './pages/HostDashboardPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div className="w-screen h-screen bg-dark text-white">
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Host Flow: Create Room → Host Lobby → Host Dashboard */}
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/host-lobby/:roomCode" element={<HostLobbyPage />} />
        <Route path="/host-dashboard/:roomCode" element={<HostDashboardPage />} />

        {/* Player Flow: Join Room → Player Lobby (Character Select) → Game */}
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/player-lobby/:roomCode" element={<PlayerLobbyPage />} />
        <Route path="/game/:roomCode" element={<GamePage />} />

        {/* Shared */}
        <Route path="/result/:roomCode" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
