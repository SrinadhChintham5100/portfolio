/*
 * Scene3D.jsx — the 3D artwork in the hero.
 * ------------------------------------------------------------------
 * Libraries:
 *  - three.js            : the low-level 3D engine (WebGL).
 *  - @react-three/fiber  : lets us write three.js as React components.
 *                          <mesh> = THREE.Mesh, <sphereGeometry> = THREE.SphereGeometry ...
 *  - @react-three/drei   : ready-made helpers (Float, distort material, sparkles).
 *
 * Every 3D object = geometry (shape) + material (surface look).
 * Lights make materials visible. <Canvas> creates the scene + camera.
 *
 * Design rule you asked for: "not too much animation". So everything
 * moves SLOWLY, and it stops completely if the visitor's OS has
 * "reduce motion" turned on.
 */
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';

/* The main glossy blob. */
function Orb({ calm }) {
  return (
    <Float speed={calm ? 0 : 1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh scale={1.45}>
        {/* 64x64 segments = smooth surface for the distortion to look organic */}
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#7484ff"
          roughness={0.15}
          metalness={0.55}
          distort={0.32} // how wobbly (0 = perfect sphere)
          speed={calm ? 0 : 1.1} // how fast it wobbles
        />
      </mesh>
    </Float>
  );
}

/* A thin wireframe ring orbiting the orb — reads as "systems / orbit". */
function Ring({ radius, tilt, speed, color, calm }) {
  const ref = useRef();
  // useFrame runs ~60x per second. `delta` = seconds since last frame,
  // so the speed is the same on fast and slow computers.
  useFrame((_, delta) => {
    if (!calm && ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 16, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

/* Tilts the whole scene a little toward the mouse — subtle parallax. */
function Rig({ children, calm }) {
  const ref = useRef();
  useFrame((state) => {
    if (calm || !ref.current) return;
    const { x, y } = state.pointer; // -1..1 across the canvas
    // "lerp" toward the target each frame = smooth easing, no jitter
    ref.current.rotation.y += (x * 0.25 - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (-y * 0.15 - ref.current.rotation.x) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

export default function Scene3D({ active = true }) {
  const calm = useReducedMotion();
  return (
    <Canvas
      // Stop drawing frames when the hero is scrolled out of view (saves battery/CPU)
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 6.6], fov: 45 }}
      dpr={[1, 1.75]} // cap pixel ratio: sharp on retina, but saves battery
      gl={{ antialias: true, alpha: true }} // alpha = transparent background
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#5eead4" />
      <pointLight position={[3, -3, -2]} intensity={14} color="#c084fc" />

      <Rig calm={calm}>
        <Orb calm={calm} />
        <Ring radius={2.05} tilt={[1.2, 0.2, 0]} speed={0.12} color="#5eead4" calm={calm} />
        <Ring radius={2.4} tilt={[1.4, -0.5, 0.3]} speed={-0.08} color="#a5b4fc" calm={calm} />
        <Sparkles count={60} scale={7} size={2} speed={calm ? 0 : 0.25} opacity={0.6} color="#c7d2fe" />
      </Rig>
    </Canvas>
  );
}
