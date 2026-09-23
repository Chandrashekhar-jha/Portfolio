import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import * as THREE from 'three';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getSectionStateFromProgress } from './WorldState';
import { WorldTerrain } from './WorldTerrain';
import { WorldArchitecture } from './WorldArchitecture';
import { WorldBranches } from './WorldBranches';
import { WorldParticles } from './WorldParticles';

interface WorldSceneProps {
  mousePosition: { x: number; y: number };
  onTriggerEasterEgg?: () => void;
  easterEggActive?: boolean;
}

// Internal Camera Rig Driven by Scroll Progress
const CameraRig: React.FC<{
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  shouldReduceMotion: boolean;
}> = ({ scrollProgress, mousePosition, shouldReduceMotion }) => {
  const sectionState = getSectionStateFromProgress(scrollProgress);

  useFrame((state) => {
    if (shouldReduceMotion) return;

    const { camera } = state;
    const targetX = sectionState.cameraX + mousePosition.x * 0.8;
    const targetY = sectionState.cameraY + mousePosition.y * -0.5;
    const targetZ = sectionState.cameraZ;

    // Smooth lerp camera movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const WorldScene: React.FC<WorldSceneProps> = ({
  mousePosition,
  onTriggerEasterEgg,
  easterEggActive = false,
}) => {
  const { progress } = useScrollProgress();
  const shouldReduceMotion = useReducedMotion();
  const sectionState = getSectionStateFromProgress(progress);

  return (
    <Canvas
      camera={{ position: [0, 2, 14], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
      className="w-full h-full"
    >
      <CameraRig
        scrollProgress={progress}
        mousePosition={mousePosition}
        shouldReduceMotion={shouldReduceMotion}
      />

      {/* Lighting Setup (Ambient + Restrained Directional Accent) */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#FFFFFF" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#38BDF8" />

      {/* 3D Environment Components */}
      <WorldTerrain scrollProgress={progress} />
      <WorldArchitecture
        sectionState={sectionState}
        onTriggerEasterEgg={onTriggerEasterEgg}
        easterEggActive={easterEggActive}
      />
      <WorldBranches scrollProgress={progress} />
      <WorldParticles
        count={70}
        mousePosition={mousePosition}
        bugActive={sectionState.bugActive}
        easterEggActive={easterEggActive}
      />
    </Canvas>
  );
};
