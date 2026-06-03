import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateRoomPage from './pages/CreateRoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import HostLobbyPage from './pages/HostLobbyPage';
import PlayerLobbyPage from './pages/PlayerLobbyPage';
import HostDashboardPage from './pages/HostDashboardPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';

// Concept Explorer (Theory Website)
import TheoryLayout from './components/theory/TheoryLayout';
import TheoryHomePage from './pages/theory/HomePage';
import AboutPage from './pages/theory/AboutPage';
import ChaptersPage from './pages/theory/ChaptersPage';

function App() {
  return (
    <div className="w-screen h-screen bg-dark text-white">
      <Routes>
        {/* Concept Explorer (Theory Website) */}
        <Route path="/theory" element={<TheoryLayout />}>
          <Route index element={<TheoryHomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="chapters" element={<ChaptersPage />} />
          {/* We will add more theory routes here later */}
        </Route>

        {/* Game Mode (Landing) */}
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
