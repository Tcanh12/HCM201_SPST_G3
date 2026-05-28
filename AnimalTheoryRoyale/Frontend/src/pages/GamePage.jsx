import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import GameScene from '../game3d/GameScene';
import UIOverlay from '../components/UIOverlay';
import MiniMap from '../components/MiniMap';
import QuestionModal from '../components/QuestionModal';
import TouchControls from '../components/TouchControls';
import * as signalR from '@microsoft/signalr';
import { motion, AnimatePresence } from 'framer-motion';
import API_HOST from '../config';

export default function GamePage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);
  const [gameState, setGameState] = useState({ players: [], projectiles: [], safeZone: { radius: 500 }, knowledgeZones: [] });
  const [myConnectionId, setMyConnectionId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const selectedChar = parseInt(localStorage.getItem('selectedChar') || '1');
  const connRef = useRef(null);

  // Detect if user is on a touch device (phone/tablet)
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Shared refs for touch input → GameScene reads these
  const touchMoveRef = useRef({ x: 0, y: 0 });
  const touchRotateRef = useRef(0);
  const touchShootRef = useRef(false);
  const touchSkillRef = useRef(null);
  const aimingSkillRef = useRef(null);

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${API_HOST}/gamehub`)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => {
      setMyConnectionId(conn.connectionId);
      connRef.current = conn;

      conn.invoke('JoinRoomAsPlayer', roomCode, user.username, selectedChar)
        .then(() => setConnected(true))
        .catch(err => console.error('Failed to re-join:', err));

      conn.on('GameStateUpdate', (snapshot) => setGameState(snapshot));

      conn.on('QuestionReceived', (q) => {
        setQuestion(q);
        setAnswerResult(null);
      });

      conn.on('AnswerResult', (result) => {
        setAnswerResult(result);
        setTimeout(() => { setQuestion(null); setAnswerResult(null); }, 4000);
      });

      conn.on('GameEnded', (finalScores) => {
        localStorage.setItem('finalScores', JSON.stringify(finalScores));
        navigate(`/result/${roomCode}`);
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

  const handleSkill = useCallback((type) => {
    touchSkillRef.current = type;
  }, []);

  const handleAiming = useCallback((type) => {
    aimingSkillRef.current = type;
  }, []);

  if (!connected) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-dark">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <p className="text-xl font-bold">Đang kết nối vào trận đấu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black" style={{ touchAction: 'none' }}>
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows camera={{ position: [0, 40, 40], fov: 50 }}>
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
            touchSkillRef={touchSkillRef}
            aimingSkillRef={aimingSkillRef}
          />
        </Canvas>
      </div>

      {/* HUD Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <UIOverlay gameState={gameState} myConnectionId={myConnectionId} onSkill={handleSkill} onAiming={handleAiming} />
        <MiniMap gameState={gameState} myConnectionId={myConnectionId} />
      </div>

      {/* Mobile Touch Controls */}
      {isMobile && (
        <TouchControls
          onMove={handleTouchMove}
          onRotate={handleTouchRotate}
          onShoot={handleTouchShoot}
        />
      )}

      {/* Answer Result Toast */}
      <AnimatePresence>
        {answerResult && !question && (
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute', top: '80px', right: '20px',
              padding: '16px 24px', borderRadius: '12px', zIndex: 200, width: '320px',
              background: answerResult.correct 
                ? (answerResult.wasDouble ? 'rgba(245, 158, 11, 0.95)' : 'rgba(16,185,129,0.95)') 
                : (answerResult.wasDouble ? 'rgba(153, 27, 27, 0.95)' : 'rgba(239,68,68,0.95)'),
              color: 'white',
              boxShadow: answerResult.wasDouble ? '0 10px 40px rgba(245,158,11,0.5)' : '0 10px 40px rgba(0,0,0,0.6)', 
              border: '2px solid rgba(255,255,255,0.2)',
              animation: answerResult.wasDouble && !answerResult.correct ? 'shake 0.5s' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '32px' }}>{answerResult.correct ? '✅' : '❌'}</div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 900 }}>
                  {answerResult.message}
                </div>
                {answerResult.correct && <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#D1FAE5' }}>+{answerResult.scoreGained} điểm</div>}
                {!answerResult.correct && <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FEE2E2' }}>-{answerResult.hpLost} HP</div>}
              </div>
            </div>
            
            {answerResult.explanation && (
              <div style={{ marginTop: '12px', fontSize: '13px', lineHeight: '1.4', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                <strong style={{ color: answerResult.correct ? '#A7F3D0' : '#FECACA' }}>Giải thích: </strong>{answerResult.explanation}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Modal */}
      {question && !answerResult && (
        <QuestionModal question={question} onSubmit={handleSubmitAnswer} onClose={handleQuestionClose} isDoubleActive={gameState?.players?.find(p => p.id === connection?.connectionId)?.hasDouble} />
      )}
    </div>
  );
}
