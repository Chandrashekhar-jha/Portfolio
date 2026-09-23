import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WorldBranchesProps {
  scrollProgress: number;
}

export const WorldBranches: React.FC<WorldBranchesProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Generate Git Branching Line Coordinates
  const { linePositions, branchNodes } = useMemo(() => {
    const points: number[] = [];
    const nodes: [number, number, number][] = [];

    // Main Branch Trunk
    const trunkPoints: [number, number, number][] = [
      [-6, 0, 4],
      [-3, 0.5, 2],
      [0, 0, 0],
      [3, -0.5, -2],
      [6, 0, -4],
    ];

    for (let i = 0; i < trunkPoints.length - 1; i++) {
      const p1 = trunkPoints[i];
      const p2 = trunkPoints[i + 1];
      points.push(...p1, ...p2);
      nodes.push(p1);
    }
    nodes.push(trunkPoints[trunkPoints.length - 1]);

    // Feature Branch 01 (OpsFlow / Relational)
    const branch1: [number, number, number][] = [
      [-3, 0.5, 2],
      [-1, 1.8, 1],
      [1, 1.8, -1],
      [3, -0.5, -2],
    ];
    for (let i = 0; i < branch1.length - 1; i++) {
      points.push(...branch1[i], ...branch1[i + 1]);
      nodes.push(branch1[i]);
    }

    // Feature Branch 02 (Valyrian / Lab Experiment)
    const branch2: [number, number, number][] = [
      [0, 0, 0],
      [1.5, -1.8, -1],
      [4, -1.8, -3],
      [6, 0, -4],
    ];
    for (let i = 0; i < branch2.length - 1; i++) {
      points.push(...branch2[i], ...branch2[i + 1]);
      nodes.push(branch2[i]);
    }

    return {
      linePositions: new Float32Array(points),
      branchNodes: nodes,
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle drift and convergence during terminal contact pull-back
    const convergenceFactor = Math.max(0, (scrollProgress - 0.85) / 0.15);
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    groupRef.current.scale.setScalar(1 - convergenceFactor * 0.2);
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Git Branch Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#52525B"
          transparent
          opacity={0.35}
        />
      </lineSegments>

      {/* Git Commits / Nodes */}
      {branchNodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial
            color={idx % 3 === 0 ? '#38BDF8' : '#8E8E99'}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};
