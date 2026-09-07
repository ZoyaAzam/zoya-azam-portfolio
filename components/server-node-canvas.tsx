"use client";

import { RefObject, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Sparse 3D lattice of nodes + edges, styled to read as a wireframe
 * server rack / network diagram rather than generic particles.
 */
function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const cols = 6;
    const rows = 4;
    const depth = 3;
    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (Math.random() > 0.5) continue; // keep it sparse, not a solid block
          pts.push(
            new THREE.Vector3(
              (x - cols / 2) * 1.15,
              (y - rows / 2) * 1.15,
              (z - depth / 2) * 1.5
            )
          );
        }
      }
    }
    return pts;
  }, []);

  const edgeGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.35) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geom;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // gentle parallax toward pointer, eased rather than snapping
    const targetX = state.pointer.y * 0.22;
    const targetY = state.pointer.x * 0.32;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.05) * 0.025;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#00ff66" transparent opacity={0.18} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <octahedronGeometry args={[0.055, 0]} />
          <meshBasicMaterial color="#00ff66" wireframe />
        </mesh>
      ))}
    </group>
  );
}

export default function ServerNodeCanvas({
  eventSource,
}: {
  /** Ref to an ancestor element to capture pointer events from, since this
   *  canvas itself sits behind content with pointer-events: none. */
  eventSource?: RefObject<HTMLElement | null>;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        eventSource={eventSource as RefObject<HTMLElement>}
        eventPrefix="client"
        style={{ opacity: 0.55 }}
      >
        <NodeNetwork />
      </Canvas>
    </div>
  );
}