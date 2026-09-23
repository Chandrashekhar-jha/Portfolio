import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WorldTerrainProps {
  scrollProgress: number;
}

export const WorldTerrain: React.FC<WorldTerrainProps> = ({ scrollProgress }) => {
  const gridRef = React.useRef<THREE.GridHelper>(null!);

  useFrame(() => {
    if (gridRef.current) {
      // Subtle pulse based on scroll depth
      const mat = gridRef.current.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = 0.06 + Math.sin(scrollProgress * Math.PI) * 0.04;
      }
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Primary Architectural Grid */}
      <gridHelper
        ref={gridRef}
        args={[40, 40, '#8E8E99', '#52525B']}
        position={[0, 0, 0]}
      />

      {/* Subtle lower depth plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#070708" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};
