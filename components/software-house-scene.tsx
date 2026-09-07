"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { ExternalLink, X, Terminal } from "lucide-react";
import { PROJECTS, statusAccent, type Project } from "../lib/projects-data";

const COLS = 4;
const SPACING_X = 2.6;
const SPACING_Z = 2.8;

interface DeskProps {
  project: Project;
  position: [number, number, number];
  onSelect: (slug: string) => void;
  isSelected: boolean;
}

function Desk({ project, position, onSelect, isSelected }: DeskProps) {
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<THREE.Mesh>(null);
  const accent = statusAccent(project.status);

  useFrame((state) => {
    if (!screenRef.current) return;
    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    const target = hovered || isSelected ? 1.4 : 0.55;
    mat.emissiveIntensity += (target - mat.emissiveIntensity) * 0.15;
    // subtle scanline-like flicker so the screen doesn't look static
    mat.emissiveIntensity += Math.sin(state.clock.elapsedTime * 6 + position[0]) * 0.02;
  });

  return (
    <group position={position}>
      {/* desk */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.07, 0.7]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* monitor */}
      <mesh position={[0, 0.62, -0.22]}>
        <boxGeometry args={[0.06, 0.25, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh
        ref={screenRef}
        position={[0, 1.02, -0.24]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(project.slug);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        scale={hovered || isSelected ? 1.06 : 1}
      >
        <boxGeometry args={[0.9, 0.55, 0.05]} />
        <meshStandardMaterial
          color="#050505"
          emissive={accent}
          emissiveIntensity={0.55}
          toneMapped={false}
        />
      </mesh>

      {/* chair */}
      <mesh position={[0, 0.42, 0.55]}>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0.65, 0.72]}>
        <boxGeometry args={[0.4, 0.5, 0.05]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0.2, 0.55]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* floating id label */}
      <Html position={[0, 1.5, -0.24]} center distanceFactor={9} occlude>
        <div
          className="font-mono whitespace-nowrap px-1.5 py-0.5 text-[10px] rounded-sm"
          style={{
            color: accent,
            background: "rgba(10,10,10,0.7)",
            border: `1px solid ${accent}55`,
            opacity: hovered || isSelected ? 1 : 0.75
          }}
        >
          {project.id}
        </div>
      </Html>
    </group>
  );
}

function Room() {
  const positions = useMemo(() => {
    return PROJECTS.map((_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const rowCount = Math.ceil(PROJECTS.length / COLS);
      const x = (col - (COLS - 1) / 2) * SPACING_X;
      const z = (row - (rowCount - 1) / 2) * SPACING_Z;
      return [x, 0, z] as [number, number, number];
    });
  }, []);

  return { positions };
}

export default function SoftwareHouseScene() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const { positions } = Room();
  const selected = PROJECTS.find((p) => p.slug === selectedSlug) ?? null;

  return (
    <div className="relative w-full h-screen bg-[#050505]">
      <Canvas
        shadows
        camera={{ position: [9, 7, 10], fov: 42 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#050505"]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 10, 4]} intensity={0.7} castShadow />
        <pointLight position={[0, 4, 0]} intensity={0.3} color="#00ff66" />

        <Grid
          position={[0, 0.001, 0]}
          args={[40, 40]}
          cellSize={0.8}
          cellThickness={0.5}
          cellColor="#1a1a1a"
          sectionSize={4}
          sectionThickness={1}
          sectionColor="#00ff66"
          fadeDistance={26}
          fadeStrength={1}
          infiniteGrid
        />

        <Text
          position={[0, 4.2, -8]}
          fontSize={1.1}
          color="#00ff66"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          SOFTWARE_HOUSE.exe
        </Text>
        <Text
          position={[0, 3.3, -8]}
          fontSize={0.28}
          color="#737373"
          anchorX="center"
          anchorY="middle"
        >
          ZOYA AZAM — click any terminal to open the project
        </Text>

        {PROJECTS.map((project, i) => (
          <Desk
            key={project.id}
            project={project}
            position={positions[i]}
            onSelect={setSelectedSlug}
            isSelected={selectedSlug === project.slug}
          />
        ))}

        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.15}
          target={[0, 1, 0]}
        />
      </Canvas>

      {/* HUD */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-neutral-500 pointer-events-none">
        <div className="text-[#00ff66]">● SCENE LOADED</div>
        <div>drag to orbit · scroll to zoom · click a terminal</div>
      </div>

      {/* project detail overlay */}
      {selected && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d0d0d] border border-neutral-800 max-w-lg w-full p-6 font-mono relative">
            <button
              onClick={() => setSelectedSlug(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-neutral-600 mb-3">
              ── ~/projects/{selected.slug}.{selected.ext} ──
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-500">{selected.id}</span>
              <span
                className="text-[10px]"
                style={{ color: statusAccent(selected.status) }}
              >
                {selected.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-100 mb-2">{selected.title}</h3>
            <div className="text-xs text-neutral-500 mb-4">
              CLIENT / CONTEXT: <span className="text-neutral-300">{selected.client}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5 font-sans">
              {selected.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5 text-[11px]">
              {selected.tags.map((tag) => (
                <span key={tag} className="bg-[#121212] border border-neutral-800 text-neutral-400 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
            {selected.link ? (
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#00ff66] hover:underline"
              >
                <span>$ open {selected.link.replace("https://", "")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs text-neutral-500">
                <Terminal className="w-3.5 h-3.5" />
                <span>permission denied — internal repo</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}