import { Sky } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import MapEnvironment from './MapEnvironment';
import PlayerCharacter from './PlayerCharacter';
import SafeZone from './SafeZone';
import KnowledgeZone from './KnowledgeZone';
import useKeyboard from '../hooks/useKeyboard';
import useMouse from '../hooks/useMouse';

export default function GameScene({
  gameState, connection, roomCode, myConnectionId, onClaimQuestion,
  isMobile, touchMoveRef, touchRotateRef, touchShootRef, touchSkillRef, aimingSkillRef
}) {
  const players = gameState?.players || [];
  const projectiles = gameState?.projectiles || [];
  const safeZone = gameState?.safeZone || { radius: 500, centerX: 0, centerZ: 0 };
  const knowledgeZones = gameState?.knowledgeZones || [];

  const keys = useKeyboard();
  const mouse = useMouse();
  const { camera } = useThree();

  const localPos = useRef(new THREE.Vector3(0, 0, 0));
  const cameraAngle = useRef(0);
  const cameraPitch = useRef(0.6);
  const cameraDistance = useRef(isMobile ? 45 : 35);
  const initialized = useRef(false);
  const lastMoveSent = useRef(0);
  const lastZoneClaim = useRef(0);
  
  const lastAim = useRef(null);
  const pushIndRef = useRef();
  const chaosIndRef = useRef();
  const silenceIndRef = useRef();

  useFrame((state, delta) => {
    if (!connection || !myConnectionId) return;
    const myPlayer = players.find(p => p.id === myConnectionId);
    if (!myPlayer) return;

    if (!initialized.current) {
      localPos.current.set(myPlayer.x, 0, myPlayer.z);
      initialized.current = true;
    }
  }); // End of useFrame (will structure better)

  const knockbackVelocity = useRef({ x: 0, z: 0 });

  useEffect(() => {
    if (!connection) return;
    const handleSkill = (data) => {
      if (data.type === 'push' && data.targets && data.targets.includes(myConnectionId)) {
        // We got pushed! Apply strong knockback
        knockbackVelocity.current = { x: data.dirX * 60, z: data.dirZ * 60 };
      }
    };
    connection.on('SkillUsed', handleSkill);
    return () => connection.off('SkillUsed', handleSkill);
  }, [connection, myConnectionId]);

  useFrame((state, delta) => {
    if (!connection || !myConnectionId) return;
    const myPlayer = players.find(p => p.id === myConnectionId);
    if (!myPlayer) return;

    // === CAMERA ROTATION ===
    if (isMobile) {
      // Touch rotation
      if (touchRotateRef?.current) {
        cameraAngle.current -= touchRotateRef.current * 0.008;
        touchRotateRef.current = 0;
      }
    } else {
      // Mouse orbit (hold to rotate)
      const m = mouse.current;
      if (m.isDown) {
        cameraAngle.current -= m.dx * 0.005;
        cameraPitch.current = Math.max(0.2, Math.min(1.2, cameraPitch.current - m.dy * 0.005));
      }
      m.dx = 0; m.dy = 0;
    }

    if (myPlayer.isDead || myPlayer.isStunned) { updateCamera(delta); return; }

    // === MOVEMENT ===
    const baseSpeed = myPlayer.activeBuff === 'SpeedBoost' ? 50 : 30;
    const speed = baseSpeed * delta;
    let mx = 0, mz = 0;
    const fwd = new THREE.Vector3(-Math.sin(cameraAngle.current), 0, -Math.cos(cameraAngle.current));
    const right = new THREE.Vector3(Math.cos(cameraAngle.current), 0, -Math.sin(cameraAngle.current));

    if (myPlayer.isChaos) {
      fwd.negate();
      right.negate();
      cameraAngle.current += delta * 3; // dizzy spin
    }

    if (isMobile) {
      // Touch joystick input
      const tm = touchMoveRef?.current || { x: 0, y: 0 };
      if (Math.abs(tm.x) > 0.1 || Math.abs(tm.y) > 0.1) {
        // tm.x = left/right, tm.y = up/down (inverted for forward)
        mx += right.x * tm.x + fwd.x * (-tm.y);
        mz += right.z * tm.x + fwd.z * (-tm.y);
      }
    } else {
      // Keyboard WASD
      if (keys.w) { mx += fwd.x; mz += fwd.z; }
      if (keys.s) { mx -= fwd.x; mz -= fwd.z; }
      if (keys.a) { mx -= right.x; mz -= right.z; }
      if (keys.d) { mx += right.x; mz += right.z; }
    }

    const len = Math.sqrt(mx * mx + mz * mz);
    if (len > 0) {
      mx = (mx / len) * speed;
      mz = (mz / len) * speed;
      localPos.current.x += mx;
      localPos.current.z += mz;
    }

    // Apply knockback
    if (Math.abs(knockbackVelocity.current.x) > 0.1 || Math.abs(knockbackVelocity.current.z) > 0.1) {
      localPos.current.x += knockbackVelocity.current.x * delta;
      localPos.current.z += knockbackVelocity.current.z * delta;
      knockbackVelocity.current.x *= 0.9; // friction damping
      knockbackVelocity.current.z *= 0.9;
    }

    if (len > 0 || Math.abs(knockbackVelocity.current.x) > 1) {
      const now = Date.now();
      if (now - lastMoveSent.current > 100) {
        connection.invoke('PlayerMove', roomCode, localPos.current.x, 0, localPos.current.z, cameraAngle.current)
          .catch(() => {});
        lastMoveSent.current = now;
      }
    }

    // === TOUCH SHOOT ===
    if (isMobile && touchShootRef?.current) {
      touchShootRef.current = false;
      const dirX = -Math.sin(cameraAngle.current);
      const dirZ = -Math.cos(cameraAngle.current);
      connection.invoke('ShootProjectile', roomCode, dirX, dirZ).catch(() => {});
    }

    // === SKILLS AIMING AND CASTING ===
    let currentAim = null;
    
    // 1. Determine if we are aiming
    if (aimingSkillRef && aimingSkillRef.current) {
      currentAim = aimingSkillRef.current;
    } else if (!isMobile) {
      // Keyboard aiming
      if (keys['1']) currentAim = 'push';
      else if (keys['2']) currentAim = 'double';
      else if (keys['3']) currentAim = 'chaos';
      else if (keys['4']) currentAim = 'silence';
    }

    // 2. Check if we released an aim (cast skill)
    if (lastAim.current && !currentAim) {
      const skillToCast = lastAim.current;
      if (skillToCast === 'push') {
        const dirX = -Math.sin(cameraAngle.current);
        const dirZ = -Math.cos(cameraAngle.current);
        connection.invoke('UseSkillPush', roomCode, dirX, dirZ).catch(() => {});
      }
      else if (skillToCast === 'double') connection.invoke('UseSkillDouble', roomCode).catch(() => {});
      else if (skillToCast === 'chaos') connection.invoke('UseSkillChaos', roomCode).catch(() => {});
      else if (skillToCast === 'silence') {
        const dirX = -Math.sin(cameraAngle.current);
        const dirZ = -Math.cos(cameraAngle.current);
        connection.invoke('UseSkillSilence', roomCode, dirX, dirZ).catch(() => {});
      }
    }
    
    // Also support instant click from touchSkillRef
    if (touchSkillRef && touchSkillRef.current) {
      const instantSkill = touchSkillRef.current;
      touchSkillRef.current = null;
      if (instantSkill === 'push') {
        const dirX = -Math.sin(cameraAngle.current);
        const dirZ = -Math.cos(cameraAngle.current);
        connection.invoke('UseSkillPush', roomCode, dirX, dirZ).catch(() => {});
      }
      else if (instantSkill === 'double') connection.invoke('UseSkillDouble', roomCode).catch(() => {});
      else if (instantSkill === 'chaos') connection.invoke('UseSkillChaos', roomCode).catch(() => {});
      else if (instantSkill === 'silence') {
        const dirX = -Math.sin(cameraAngle.current);
        const dirZ = -Math.cos(cameraAngle.current);
        connection.invoke('UseSkillSilence', roomCode, dirX, dirZ).catch(() => {});
      }
    }

    lastAim.current = currentAim;

    // 3. Update Indicator meshes
    if (pushIndRef.current) {
      pushIndRef.current.visible = currentAim === 'push';
      if (currentAim === 'push') {
        pushIndRef.current.position.set(localPos.current.x, 0.2, localPos.current.z);
        pushIndRef.current.rotation.y = cameraAngle.current;
      }
    }
    if (chaosIndRef.current) {
      chaosIndRef.current.visible = currentAim === 'chaos';
      if (currentAim === 'chaos') chaosIndRef.current.position.set(localPos.current.x, 0.2, localPos.current.z);
    }
    if (silenceIndRef.current) {
      silenceIndRef.current.visible = currentAim === 'silence';
      if (currentAim === 'silence') {
        silenceIndRef.current.position.set(localPos.current.x, 0.2, localPos.current.z);
        silenceIndRef.current.rotation.y = cameraAngle.current; // Point forward
      }
    }

    updateCamera(delta);

    // Knowledge zone proximity claim
    const now = Date.now();
    if (now - lastZoneClaim.current > 1000) {
      for (const zone of knowledgeZones) {
        if (!zone.isActive || zone.isClaimed) continue;
        const dx = localPos.current.x - zone.x;
        const dz = localPos.current.z - zone.z;
        if (dx * dx + dz * dz < 100) {
          onClaimQuestion(zone.zoneId);
          lastZoneClaim.current = now;
          break;
        }
      }
    }
  });

  function updateCamera(delta) {
    const dist = cameraDistance.current;
    const pitch = cameraPitch.current;
    const angle = cameraAngle.current;
    const cx = localPos.current.x + dist * Math.sin(angle) * Math.cos(pitch);
    const cy = dist * Math.sin(pitch);
    const cz = localPos.current.z + dist * Math.cos(angle) * Math.cos(pitch);
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), 8 * delta);
    camera.lookAt(localPos.current.x, 1, localPos.current.z);
  }

  // Desktop: click to shoot
  const handleShoot = useCallback((e) => {
    if (isMobile) return; // Mobile uses TouchControls
    if (e.button !== undefined && e.button !== 0) return;
    if (!connection || !myConnectionId) return;
    const myPlayer = players.find(p => p.id === myConnectionId);
    if (!myPlayer || myPlayer.isDead) return;
    const dirX = -Math.sin(cameraAngle.current);
    const dirZ = -Math.cos(cameraAngle.current);
    connection.invoke('ShootProjectile', roomCode, dirX, dirZ).catch(() => {});
  }, [connection, myConnectionId, players, roomCode, isMobile]);

  const handleWheel = useCallback((e) => {
    cameraDistance.current = Math.max(15, Math.min(80, cameraDistance.current + e.deltaY * 0.05));
  }, []);

  return (
    <group onPointerDown={handleShoot} onWheel={handleWheel}>
      <Sky sunPosition={[100, 40, 100]} turbidity={0.3} rayleigh={0.5} />
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[80, 100, 40]} intensity={1.2}
        shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-far={500} shadow-camera-left={-200} shadow-camera-right={200}
        shadow-camera-top={200} shadow-camera-bottom={-200}
      />

      <MapEnvironment />
      <SafeZone radius={safeZone.radius} x={safeZone.centerX || 0} z={safeZone.centerZ || 0} />

      {knowledgeZones.filter(z => z.isActive).map(z => (
        <KnowledgeZone key={z.zoneId} x={z.x} z={z.z} topic={z.topicName} type={z.type} isTrap={z.isTrap} />
      ))}

      {players.map(player => (
        <PlayerCharacter
          key={player.id} player={player}
          isMe={player.id === myConnectionId}
          localOverride={player.id === myConnectionId ? localPos.current : null}
        />
      ))}

      {projectiles.map(proj => (
        <mesh key={proj.id} position={[proj.x, proj.y || 2, proj.z]}>
          <sphereGeometry args={[0.6, 12, 12]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={3} />
        </mesh>
      ))}

      {/* Target / Aim Indicators */}
      <group ref={pushIndRef} visible={false}>
        <mesh position={[0, 0, -12.5]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Cone indicator for Push */}
          <planeGeometry args={[15, 25]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={chaosIndRef} visible={false}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[19, 20, 64]} />
          <meshBasicMaterial color="#9333EA" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[19, 32]} />
          <meshBasicMaterial color="#9333EA" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={silenceIndRef} visible={false}>
        <mesh position={[0, 0, -25]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2, 50]} />
          <meshBasicMaterial color="#64748B" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* Arrow head */}
        <mesh position={[0, 0, -50]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[3, 6, 3]} />
          <meshBasicMaterial color="#64748B" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
