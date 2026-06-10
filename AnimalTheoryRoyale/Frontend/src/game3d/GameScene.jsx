import { Sky } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import MapEnvironment from './MapEnvironment';
import PlayerCharacter from './PlayerCharacter';
import SafeZone from './SafeZone';
import KnowledgeZone from './KnowledgeZone';
import ItemPickup from './ItemPickup';
import TrapHazard from './TrapHazard';
import useKeyboard from '../hooks/useKeyboard';
import useMouse from '../hooks/useMouse';
import { isPositionBlocked } from './MapObstacles';

function SkillEffect({ skill, actorX, actorZ }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const age = (Date.now() - skill.timestamp) / 1000;
    
    if (skill.type === 'ult_voi') {
      // Expanding shockwave
      const scale = 1 + age * 25;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.material.opacity = Math.max(0, 1 - age * 1.5);
    } else if (skill.type === 'ult_tho') {
      // Dash trail dissipation
      meshRef.current.scale.set(1 + age * 5, 1 + age * 5, 1 + age * 5);
      meshRef.current.material.opacity = Math.max(0, 1 - age * 2);
    }
  });

  if (skill.type === 'ult_voi') {
    return (
      <mesh ref={meshRef} position={[actorX, 0.5, actorZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={1} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
    );
  }

  if (skill.type === 'ult_tho') {
    return (
      <mesh ref={meshRef} position={[actorX, 1.5, actorZ]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#34D399" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
    );
  }

  return null;
}

export default function GameScene({
  gameState, connection, roomCode, myConnectionId, onClaimQuestion,
  isMobile, touchMoveRef, touchRotateRef, touchShootRef, touchJumpRef, touchSkillRef, aimingSkillRef, activeSkills
}) {
  const players = gameState?.players || [];
  const projectiles = gameState?.projectiles || [];
  const safeZone = gameState?.safeZone || { radius: 500, centerX: 0, centerZ: 0 };
  const knowledgeZones = gameState?.knowledgeZones || [];
  const items = gameState?.items || [];
  const traps = gameState?.traps || [];

  const keys = useKeyboard();
  const mouse = useMouse();
  const { camera } = useThree();

  const localPos = useRef(new THREE.Vector3(0, 0, 0));
  const playerRotation = useRef(0);
  const cameraAngle = useRef(0);
  const cameraPitch = useRef(0.6);
  const cameraDistance = useRef(isMobile ? 16 : 14);
  const targetCameraDistance = useRef(isMobile ? 16 : 14);
  const MIN_ZOOM = 8;
  const MAX_ZOOM = 18;
  const SCROLL_SPEED = 0.02;
  const initialized = useRef(false);
  const lastMoveSent = useRef(0);
  const lastZoneClaim = useRef(0);
  
  const lastAim = useRef(null);
  const pushIndRef = useRef();
  const dizzyIndRef = useRef();
  const ultIndRef = useRef();
  const knockbackVelocity = useRef({ x: 0, z: 0 });
  const verticalVelocity = useRef(0);
  const isGrounded = useRef(true);

  useEffect(() => {
    if (!connection) return;
    const handleSkill = (data) => {
      if (data.type === 'push' && data.targets && data.targets.includes(myConnectionId)) {
        // We got pushed! Apply strong knockback (increased from 60 to 150)
        knockbackVelocity.current = { x: data.dirX * 150, z: data.dirZ * 150 };
      }
    };
    connection.on('SkillUsed', handleSkill);
    return () => connection.off('SkillUsed', handleSkill);
  }, [connection, myConnectionId]);

  useFrame((state, delta) => {
    if (!connection || !myConnectionId) return;
    const myPlayer = players.find(p => p.id === myConnectionId);
    if (!myPlayer) return;

    if (!initialized.current) {
      localPos.current.set(myPlayer.x, myPlayer.y || 0, myPlayer.z);
      initialized.current = true;
    }

    // === CAMERA ROTATION ===
    if (isMobile) {
      // Touch rotation
      if (touchRotateRef?.current) {
        cameraAngle.current -= touchRotateRef.current * 0.015;
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

    if (myPlayer.isDead || myPlayer.isEliminated || myPlayer.isStunned) { updateCamera(delta, myPlayer); return; }

    // === MOVEMENT ===
    let charSpeed = 30;
    if (myPlayer.characterId === 1) charSpeed = 20; // Voi (Tanker)
    else if (myPlayer.characterId === 2) charSpeed = 45; // Thỏ (Speedster)
    else if (myPlayer.characterId === 3) charSpeed = 35; // Cáo (Strategist)
    else if (myPlayer.characterId === 4) charSpeed = 25; // Rùa (Defender)
    
    const baseSpeed = myPlayer.activeBuff === 'SpeedBoost' ? charSpeed * 1.5 : charSpeed;
    const speed = baseSpeed * delta;
    let mx = 0, mz = 0;
    const fwd = new THREE.Vector3(-Math.sin(cameraAngle.current), 0, -Math.cos(cameraAngle.current));
    const right = new THREE.Vector3(Math.cos(cameraAngle.current), 0, -Math.sin(cameraAngle.current));

    if (myPlayer.isDizzy) {
      fwd.negate();
      right.negate();
      cameraAngle.current += delta * 6; // dizzy spin
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
      playerRotation.current = Math.atan2(mx, mz);
      const stepX = (mx / len) * speed;
      const stepZ = (mz / len) * speed;
      
      const nextX = localPos.current.x + stepX;
      const nextZ = localPos.current.z + stepZ;

      if (!isPositionBlocked(nextX, nextZ, 1.0)) {
        localPos.current.x = nextX;
        localPos.current.z = nextZ;
      } else if (!isPositionBlocked(nextX, localPos.current.z, 1.0)) {
        localPos.current.x = nextX;
      } else if (!isPositionBlocked(localPos.current.x, nextZ, 1.0)) {
        localPos.current.z = nextZ;
      }
    }

    // Apply knockback
    if (Math.abs(knockbackVelocity.current.x) > 0.1 || Math.abs(knockbackVelocity.current.z) > 0.1) {
      const kx = knockbackVelocity.current.x * delta;
      const kz = knockbackVelocity.current.z * delta;
      
      if (!isPositionBlocked(localPos.current.x + kx, localPos.current.z + kz, 1.0)) {
        localPos.current.x += kx;
        localPos.current.z += kz;
      } else {
        // hit a wall
        knockbackVelocity.current.x = 0;
        knockbackVelocity.current.z = 0;
      }
      
      knockbackVelocity.current.x *= 0.9; // friction damping
      knockbackVelocity.current.z *= 0.9;
    }

    // === JUMPING & GRAVITY ===
    if (!isGrounded.current) {
      verticalVelocity.current -= 60 * delta; // gravity
      localPos.current.y += verticalVelocity.current * delta;
      if (localPos.current.y <= 0) {
        localPos.current.y = 0;
        verticalVelocity.current = 0;
        isGrounded.current = true;
      }
    }

    if ((keys[' '] || (isMobile && touchJumpRef?.current)) && isGrounded.current && !myPlayer.isStunned && !myPlayer.isDizzy) {
      verticalVelocity.current = 25; // jump strength
      isGrounded.current = false;
      if (touchJumpRef) touchJumpRef.current = false; // reset
    }

    if (len > 0 || Math.abs(knockbackVelocity.current.x) > 1 || !isGrounded.current) {
      const now = Date.now();
      if (now - lastMoveSent.current > 33) {
        connection.invoke('PlayerMove', roomCode, localPos.current.x, localPos.current.y, localPos.current.z, playerRotation.current)
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
      else if (keys['3']) currentAim = 'dizzy';
      else if (keys['4']) currentAim = 'ult';
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
      else if (skillToCast === 'dizzy') connection.invoke('UseSkillDizzySpin', roomCode).catch(() => {});
      else if (skillToCast === 'ult') {
        const dirX = -Math.sin(cameraAngle.current);
        const dirZ = -Math.cos(cameraAngle.current);
        connection.invoke('UseSkillUltimate', roomCode, dirX, dirZ).catch(() => {});
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
      else if (instantSkill === 'dizzy') connection.invoke('UseSkillDizzySpin', roomCode).catch(() => {});
      else if (instantSkill === 'ult') {
        const dirX = -Math.sin(cameraAngle.current);
        const dirZ = -Math.cos(cameraAngle.current);
        connection.invoke('UseSkillUltimate', roomCode, dirX, dirZ).catch(() => {});
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
    if (dizzyIndRef.current) {
      dizzyIndRef.current.visible = currentAim === 'dizzy';
      if (currentAim === 'dizzy') dizzyIndRef.current.position.set(localPos.current.x, 0.2, localPos.current.z);
    }
    if (ultIndRef.current) {
      ultIndRef.current.visible = currentAim === 'ult';
      if (currentAim === 'ult') {
        ultIndRef.current.position.set(localPos.current.x, 0.2, localPos.current.z);
        ultIndRef.current.rotation.y = cameraAngle.current; // Point forward
      }
    }

    updateCamera(delta, myPlayer);

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

  function updateCamera(delta, myPlayer) {
    const angle = cameraAngle.current;
    
    // Smooth zoom damping — lerp actual distance toward target
    cameraDistance.current += (targetCameraDistance.current - cameraDistance.current) * 5 * delta;
    
    // Smooth third-person camera follow
    const dist = cameraDistance.current;
    const pitch = cameraPitch.current;
    const cx = localPos.current.x + dist * Math.sin(angle) * Math.cos(pitch);
    const cy = localPos.current.y + dist * Math.sin(pitch);
    const cz = localPos.current.z + dist * Math.cos(angle) * Math.cos(pitch);
    
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), 8 * delta);
    camera.lookAt(localPos.current.x, localPos.current.y + 1, localPos.current.z);
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
    targetCameraDistance.current = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, targetCameraDistance.current + e.deltaY * SCROLL_SPEED));
  }, []);


  return (
    <group onPointerDown={handleShoot} onWheel={handleWheel}>
      {/* Dynamic Environment (Lights, Fog, Ground) based on selected map */}
      <MapEnvironment mapKey={localStorage.getItem('selectedMap') || 'knowledge_campus'} />
      <SafeZone radius={safeZone.radius} x={safeZone.centerX || 0} z={safeZone.centerZ || 0} />

      {knowledgeZones.filter(z => z.isActive).map(z => (
        <KnowledgeZone key={z.zoneId} x={z.x} z={z.z} topic={z.topicName} type={z.type} isTrap={z.isTrap} />
      ))}

      {items.map(item => (
        <ItemPickup key={item.id} item={item} />
      ))}

      {traps.filter(t => t.isActive).map(trap => (
        <TrapHazard key={`trap_${trap.id}`} trap={trap} />
      ))}

      {players.map(player => (
        <PlayerCharacter
          key={player.id} player={player}
          isMe={player.id === myConnectionId}
          localOverride={player.id === myConnectionId ? localPos.current : null}
          localRotationOverride={player.id === myConnectionId ? playerRotation.current : null}
          hideModel={player.id === myConnectionId && gameState?.cameraMode === 'FirstPerson'}
        />
      ))}

      {projectiles.map(proj => (
        <mesh key={proj.id} position={[proj.x, proj.y || 2, proj.z]}>
          <sphereGeometry args={[0.6, 12, 12]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={3} />
        </mesh>
      ))}

      {/* Transient Skill Effects */}
      {activeSkills?.map(skill => {
        const actor = players.find(p => p.id === skill.by);
        const x = skill.x ?? actor?.x ?? 0;
        const z = skill.z ?? actor?.z ?? 0;
        return <SkillEffect key={skill.effectId} skill={skill} actorX={x} actorZ={z} />;
      })}

      {/* Target / Aim Indicators */}
      <group ref={pushIndRef} visible={false}>
        <mesh position={[0, 0, -12.5]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Cone indicator for Push */}
          <planeGeometry args={[15, 25]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={dizzyIndRef} visible={false}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[24, 25, 64]} />
          <meshBasicMaterial color="#9333EA" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[24, 32]} />
          <meshBasicMaterial color="#9333EA" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={ultIndRef} visible={false}>
        <mesh position={[0, 0, -20]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 40]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -40]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[6, 8, 3]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
