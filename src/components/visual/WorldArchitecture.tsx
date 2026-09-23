import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type WorldSectionState } from './WorldState';

interface WorldArchitectureProps {
  sectionState: WorldSectionState;
  onTriggerEasterEgg?: () => void;
  easterEggActive?: boolean;
}

interface NodeData {
  id: string;
  label: string;
  basePos: [number, number, number];
  color: string;
  projectRef?: string;
}

export const WorldArchitecture: React.FC<WorldArchitectureProps> = ({
  sectionState,
  onTriggerEasterEgg,
  easterEggActive = false,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const bugNodeRef = useRef<THREE.Mesh>(null!);
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null!);

  // Abstract Software Layers & System Nodes
  const nodes: NodeData[] = useMemo(
    () => [
      { id: 'ui', label: 'INTERFACE', basePos: [-4, 2.5, 2], color: '#F4F4F7', projectRef: 'OpsFlow' },
      { id: 'app', label: 'APP LOGIC', basePos: [-2, 1.5, 1], color: '#8E8E99', projectRef: 'ShopNest' },
      { id: 'api', label: 'REST API', basePos: [0, 0.5, 0], color: '#38BDF8', projectRef: 'OpsFlow' },
      { id: 'auth', label: 'JWT / RBAC', basePos: [1.8, -0.2, -1], color: '#38BDF8', projectRef: 'OpsFlow' }, // "BUG" Node
      { id: 'db', label: 'POSTGRES / MONGO', basePos: [3.5, -1.0, -2], color: '#8E8E99', projectRef: 'ShopNest' },
      { id: 'integrations', label: 'RAZORPAY / GEMINI', basePos: [2.0, -1.8, -3], color: '#52525B', projectRef: 'Valyrian' },
      { id: 'deployment', label: 'VERCEL / RENDER', basePos: [0.0, -2.5, -4], color: '#F4F4F7', projectRef: 'SmartChain' },
    ],
    []
  );

  // Line connections between system nodes
  const linePositions = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const curr = nodes[i].basePos;
      const next = nodes[i + 1].basePos;
      pos.push(curr[0], curr[1], curr[2]);
      pos.push(next[0], next[1], next[2]);
    }
    return new Float32Array(pos);
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Rotate scene subtly driven by scroll and easter egg state
    let targetRotationY = sectionState.sectionIndex * 0.15;
    if (easterEggActive) {
      targetRotationY += Math.sin(time * 3) * 0.3;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05
    );

    // "THE BUG" visual displacement logic
    if (bugNodeRef.current) {
      if (sectionState.bugActive) {
        // Displace node #4 (auth) outwards during bug state
        bugNodeRef.current.position.x = nodes[3].basePos[0] + Math.sin(time * 20) * 0.25;
        bugNodeRef.current.position.y = nodes[3].basePos[1] + Math.cos(time * 15) * 0.2;
      } else {
        // Reconnect & repair to original position
        bugNodeRef.current.position.x = THREE.MathUtils.lerp(
          bugNodeRef.current.position.x,
          nodes[3].basePos[0],
          0.1
        );
        bugNodeRef.current.position.y = THREE.MathUtils.lerp(
          bugNodeRef.current.position.y,
          nodes[3].basePos[1],
          0.1
        );
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Mesh Wireframe Blocks */}
      {nodes.map((node) => {
        const isBugNode = node.id === 'auth';
        return (
          <group
            key={node.id}
            position={node.basePos}
            ref={isBugNode ? (bugNodeRef as unknown as React.RefObject<THREE.Group>) : undefined}
          >
            {/* Abstract low-poly node box */}
            <mesh>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshStandardMaterial
                color={sectionState.bugActive && isBugNode ? '#EF4444' : node.color}
                wireframe
                roughness={0.4}
                metalness={0.8}
              />
            </mesh>

            {/* Inner accent core */}
            <mesh scale={[0.4, 0.4, 0.4]}>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshBasicMaterial
                color={sectionState.bugActive && isBugNode ? '#EF4444' : '#38BDF8'}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}

      {/* Interconnecting Software Pipeline Lines */}
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={sectionState.bugActive ? '#EF4444' : '#8E8E99'}
          transparent
          opacity={sectionState.bugActive ? 0.3 : 0.4}
        />
      </lineSegments>

      {/* SECRET EASTER EGG ANOMALY NODE (Discoverable node at [3.5, 1.2, -2.5]) */}
      <group
        position={[3.5, 1.2, -2.5]}
        onClick={onTriggerEasterEgg}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh>
          <octahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial
            color={easterEggActive ? '#38BDF8' : '#F4F4F7'}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
};
