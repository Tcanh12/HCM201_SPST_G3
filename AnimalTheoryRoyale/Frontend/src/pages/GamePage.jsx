import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import GameScene from '../game3d/GameScene';
import UIOverlay from '../components/UIOverlay';
import MiniMap from '../components/MiniMap';
import HostDashboard from '../components/HostDashboard';
import QuestionModal from '../components/QuestionModal';
import TouchControls from '../components/TouchControls';
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import { motion, AnimatePresence } from 'framer-motion';
import API_HOST from '../config';
import SettingsModal from '../components/SettingsModal';

export default function GamePage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);
  const [gameState, setGameState] = useState({ players: [], projectiles: [], safeZone: { radius: 500 }, knowledgeZones: [] });
  const [myConnectionId, setMyConnectionId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [connectionState, setConnectionState] = useState('connecting'); // connecting, connected, reconnecting, disconnected
  const [showSettings, setShowSettings] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = localStorage.getItem('role') || 'player';
  const selectedChar = parseInt(localStorage.getItem('selectedChar') || '1');
  const connRef = useRef(null);

  // Detect if user is on a touch device (phone/tablet)
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Shared refs for touch input → GameScene reads these
  const touchMoveRef = useRef({ x: 0, y: 0 });
  const touchRotateRef = useRef(0);
  const touchShootRef = useRef(false);
  const touchJumpRef = useRef(false);
  const touchSkillRef = useRef(null);
  const aimingSkillRef = useRef(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withHubProtocol(new MessagePackHubProtocol())
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      setMyConnectionId(conn.connectionId);
      connRef.current = conn;

      if (role === 'host') {
        conn.invoke('JoinRoomAsHost', roomCode)
          .then(() => { setConnected(true); setConnectionState('connected'); })
          .catch(err => console.error('Host failed to re-join:', err));
      } else {
        conn.invoke('JoinRoomAsPlayer', roomCode, user.username, selectedChar)
          .then(() => { setConnected(true); setConnectionState('connected'); })
          .catch(err => console.error('Failed to re-join:', err));
      }

      conn.on('GameStateUpdate', (snapshot) => setGameState(snapshot));

      conn.on('QuestionReceived', (q) => {
        setQuestion(q);
        setAnswerResult(null);
      });

      conn.on('AnswerResult', (result) => {
        setQuestion(null); // Immediately clear question to show the result toast
        setAnswerResult(result);
        const duration = result.isPickup ? 700 : 4000;
        setTimeout(() => { setAnswerResult(null); }, duration);
      });

      conn.on('GameEnded', (finalScores) => {
        localStorage.setItem('finalScores', JSON.stringify(finalScores));
        navigate(`/result/${roomCode}`);
      });

      conn.onreconnecting((error) => {
        console.warn('Connection lost, attempting to reconnect...', error);
        setConnectionState('reconnecting');
      });

      conn.onreconnected(() => {
        console.log('Reconnected successfully.');
        setConnectionState('connected');
        setMyConnectionId(conn.connectionId);
        if (role === 'host') {
          conn.invoke('JoinRoomAsHost', roomCode).catch(console.error);
        } else {
          conn.invoke('JoinRoomAsPlayer', roomCode, user.username, selectedChar).catch(console.error);
        }
      });

      conn.onclose((error) => {
        console.error('Connection permanently closed', error);
        setConnectionState('disconnected');
      });
    }).catch(err => console.error('Connection failed:', err));

    setConnection(conn);
    return () => { conn.stop(); };
  }, [roomCode]);

  const handleClaimQuestion = useCallback((zoneId) => {
    if (connRef.current && !question) {
      connRef.current.invoke('ClaimQuestion', roomCode, zoneId).catch(() => {});
    }
  }, [roomCode, question]);

  const handleSubmitAnswer = useCallback((optionId) => {
    if (connRef.current && question) {
      connRef.current.invoke('SubmitAnswer', roomCode, question.zoneId, optionId).catch(() => {});
    }
  }, [roomCode, question]);

  const handleQuestionClose = useCallback(() => {
    setQuestion(null);
    setAnswerResult(null);
  }, []);

  // Touch callbacks
  const handleTouchMove = useCallback((mx, my) => {
    touchMoveRef.current = { x: mx, y: my };
  }, []);

  const handleTouchRotate = useCallback((dx) => {
    touchRotateRef.current = dx;
  }, []);

  const handleTouchShoot = useCallback(() => {
    touchShootRef.current = true;
  }, []);

  const handleTouchJump = useCallback(() => {
    touchJumpRef.current = true;
  }, []);

  const handleSkill = useCallback((type) => {
    touchSkillRef.current = type;
  }, []);

  const handleAiming = useCallback((type) => {
    aimingSkillRef.current = type;
  }, []);

  if (!connected || connectionState === 'connecting') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-dark">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <p className="text-xl font-bold">Đang kết nối vào trận đấu...</p>
        </div>
      </div>
    );
  }
  const isHost = gameState?.hostConnectionId === myConnectionId;

  return (
    <div className="relative w-full h-full bg-black" style={{ touchAction: 'none' }}>
      {/* Reconnecting Overlay */}
      <AnimatePresence>
        {connectionState === 'reconnecting' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="text-center text-white">
              <div className="text-6xl mb-4 animate-spin">🔄</div>
              <h2 className="text-3xl font-black mb-2 text-yellow-400">ĐANG KẾT NỐI LẠI...</h2>
              <p className="text-gray-300">Vui lòng chờ, hệ thống đang khôi phục phiên của bạn.</p>
            </div>
          </motion.div>
        )}
        {connectionState === 'disconnected' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <div className="text-center text-white">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-3xl font-black mb-2 text-red-500">MẤT KẾT NỐI</h2>
              <p className="text-gray-300 mb-6">Không thể duy trì kết nối với máy chủ.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-lg transition-all"
              >
                TẢI LẠI TRANG
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows={!isMobile} dpr={isMobile ? [1, 1.2] : [1, 2]} gl={{ powerPreference: "high-performance", antialias: !isMobile }} camera={{ position: [0, 40, 40], fov: 50 }}>
          <color attach="background" args={['#1a1a2e']} />
          <GameScene
            gameState={gameState}
            connection={connection}
            roomCode={roomCode}
            myConnectionId={myConnectionId}
            onClaimQuestion={handleClaimQuestion}
            isMobile={isMobile}
            touchMoveRef={touchMoveRef}
            touchRotateRef={touchRotateRef}
            touchShootRef={touchShootRef}
            touchJumpRef={touchJumpRef}
            touchSkillRef={touchSkillRef}
            aimingSkillRef={aimingSkillRef}
          />
        </Canvas>
      </div>

      {/* Host gets the Tactical Dashboard overlay */}
      {isHost && (
        <HostDashboard gameState={gameState} myConnectionId={myConnectionId} connection={connection} roomCode={roomCode} />
      )}

      {/* Regular players get normal HUD + minimap */}
      {!isHost && (
        <div className="absolute inset-0 pointer-events-none">
          <UIOverlay gameState={gameState} myConnectionId={myConnectionId} onSkill={handleSkill} onAiming={handleAiming} />
          <MiniMap gameState={gameState} myConnectionId={myConnectionId} />
        </div>
      )}

      {/* Mobile Touch Controls */}
      {isMobile && (
        <TouchControls
          onMove={handleTouchMove}
          onRotate={handleTouchRotate}
          onShoot={handleTouchShoot}
          onJump={handleTouchJump}
        />
      )}

      {/* Settings Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); setShowSettings(true); }}
        className="absolute top-4 right-4 z-[200] bg-black/60 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all shadow-lg"
      >
        <span className="text-xl">⚙️</span>
      </button>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </AnimatePresence>

      {/* Answer Result Toast */}
      <AnimatePresence>
        {answerResult && !question && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              style={{
                padding: '30px 40px', borderRadius: '24px', width: '450px',
                background: answerResult.correct 
                  ? (answerResult.wasDouble ? 'rgba(245, 158, 11, 0.95)' : 'rgba(16,185,129,0.95)') 
                  : (answerResult.wasDouble ? 'rgba(153, 27, 27, 0.95)' : 'rgba(239,68,68,0.95)'),
                color: 'white', textAlign: 'center',
                boxShadow: answerResult.correct ? '0 20px 60px rgba(16,185,129,0.5), inset 0 0 40px rgba(255,255,255,0.4)' : '0 20px 60px rgba(239,68,68,0.6), inset 0 0 40px rgba(0,0,0,0.5)', 
                border: '4px solid rgba(255,255,255,0.3)',
                animation: !answerResult.correct ? 'shake 0.5s' : 'pulse 1s infinite',
                pointerEvents: 'auto'
              }}
            >
              <div style={{ fontSize: '64px', marginBottom: '10px', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}>
                {answerResult.correct ? '✅' : '❌'}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                {answerResult.correct ? 'CORRECT!' : 'WRONG ANSWER'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, margin: '10px 0', color: 'rgba(255,255,255,0.9)' }}>
                {answerResult.message}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px' }}>
                {answerResult.correct && <div style={{ fontSize: '24px', fontWeight: '900', color: '#D1FAE5', background: 'rgba(0,0,0,0.3)', padding: '8px 16px', borderRadius: '12px' }}>+{answerResult.scoreGained} SCORE</div>}
                {!answerResult.correct && <div style={{ fontSize: '24px', fontWeight: '900', color: '#FECACA', background: 'rgba(0,0,0,0.3)', padding: '8px 16px', borderRadius: '12px' }}>-{answerResult.hpLost} HP</div>}
              </div>
              
              {answerResult.explanation && (
                <div style={{ marginTop: '20px', fontSize: '15px', lineHeight: '1.5', background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <strong style={{ color: answerResult.correct ? '#A7F3D0' : '#FECACA', display: 'block', marginBottom: '4px' }}>GIẢI THÍCH / ĐÁP ÁN ĐÚNG:</strong>
                  {answerResult.explanation}
                </div>
              )}

              {/* OK Button */}
              <button 
                onClick={() => setAnswerResult(null)}
                style={{
                  marginTop: '20px', padding: '12px 32px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)',
                  color: 'white', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px',
                  cursor: 'pointer', transition: 'all 0.2s', width: '100%',
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              >
                ĐÃ HIỂU (ĐÓNG)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Question Modal */}
      {question && !answerResult && (
        <QuestionModal question={question} onSubmit={handleSubmitAnswer} onClose={handleQuestionClose} isDoubleActive={gameState?.players?.find(p => p.id === connection?.connectionId)?.hasDouble} />
      )}
    </div>
  );
}
