import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WorldParticlesProps {
  count?: number;
  mousePosition: { x: number; y: number };
  bugActive?: boolean;
  easterEggActive?: boolean;
}

export const WorldParticles: React.FC<WorldParticlesProps> = ({
  count = 90,
  mousePosition,
  bugActive = false,
  easterEggActive = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate particle buffer data once
  const { positions, colors, initialY } = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colArr = new Float32Array(count * 3);
    const initY = new Float32Array(count);

    const colorFg = new THREE.Color('#F4F4F7');
    const colorMuted = new THREE.Color('#8E8E99');
    const colorSubtle = new THREE.Color('#52525B');
    const colorCyan = new THREE.Color('#38BDF8');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 24;

      posArr[i * 3] = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;
      initY[i] = y;

      // Color selection (mostly subtle/muted, 10% cyan accent nodes)
      const rand = Math.random();
      let selectedColor = colorSubtle;
      if (rand > 0.9) selectedColor = colorCyan;
      else if (rand > 0.6) selectedColor = colorMuted;
      else if (rand > 0.4) selectedColor = colorFg;

      colArr[i * 3] = selectedColor.r;
      colArr[i * 3 + 1] = selectedColor.g;
      colArr[i * 3 + 2] = selectedColor.b;
    }

    return { positions: posArr, colors: colArr, initialY: initY };
  }, [count]);

  // Frame update for subtle organic movement & cursor reactivity
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    const mouseXNorm = mousePosition.x * 2;
    const mouseYNorm = mousePosition.y * 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const baseX = array[i3];
      const baseZ = array[i3 + 2];

      // Subtle vertical floating motion
      let speed = 0.4;
      if (bugActive) speed = 1.8;
      if (easterEggActive) speed = 2.5;

      array[i3 + 1] = initialY[i] + Math.sin(time * speed + baseX * 0.2) * 0.4;

      // Proximity cursor deflection
      const dx = baseX - mouseXNorm;
      const dz = baseZ - mouseYNorm;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 4) {
        const factor = (4 - dist) * 0.05;
        array[i3] += dx * factor * 0.1;
        array[i3 + 2] += dz * factor * 0.1;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};
