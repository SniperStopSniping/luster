'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * A stylized LUSTER bottle: squat matte-black body, gold cap, gold label.
 * Everything is generated in code (lathe profiles + canvas label texture),
 * so the scene needs no network assets and can never 404 in production.
 */

function useLabelTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Resolve the site serif (Playfair) that next/font registered, falling back gracefully.
    const serif =
      getComputedStyle(document.documentElement).getPropertyValue('--font-serif').trim() ||
      'Georgia, serif';
    const gold = '#C6A85E';

    ctx.clearRect(0, 0, 512, 512);
    ctx.fillStyle = gold;
    ctx.strokeStyle = gold;
    ctx.textAlign = 'center';

    // The "L" flourish — a simple bezier stroke echoing the brand mark.
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(262, 128);
    ctx.bezierCurveTo(240, 200, 226, 252, 238, 268);
    ctx.bezierCurveTo(252, 284, 292, 268, 306, 252);
    ctx.stroke();

    // Wordmark
    ctx.font = `500 64px ${serif}`;
    const word = 'LUSTER';
    const tracked = word.split('').join('  ');
    ctx.fillText(tracked, 256, 366);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function lathe(points: Array<[number, number]>) {
  return new THREE.LatheGeometry(
    points.map(([x, y]) => new THREE.Vector2(x, y)),
    64
  );
}

function Bottle({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const label = useLabelTexture();

  const bodyGeo = useMemo(
    () =>
      lathe([
        [0, 0],
        [0.86, 0],
        [0.94, 0.07],
        [0.96, 0.4],
        [0.96, 1.05],
        [0.93, 1.3],
        [0.84, 1.42],
        [0.62, 1.48],
        [0.6, 1.5],
      ]),
    []
  );

  const capGeo = useMemo(
    () =>
      lathe([
        [0.6, 0],
        [0.62, 0.02],
        [0.62, 1.02],
        [0.58, 1.1],
        [0.4, 1.15],
        [0, 1.16],
      ]),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    if (animate) {
      group.current.rotation.y += delta * 0.24;
      // Pointer-follow tilt, gently damped.
      const targetX = state.pointer.y * -0.1;
      const targetZ = state.pointer.x * 0.06;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.04);
    } else {
      group.current.rotation.y = -0.5;
    }
  });

  return (
    <group ref={group} position={[0, -1.05, 0]} scale={0.62}>
      {/* Body — matte black with a whisper of clearcoat */}
      <mesh geometry={bodyGeo} castShadow>
        <meshPhysicalMaterial
          color="#0e0e10"
          roughness={0.52}
          metalness={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.65}
        />
      </mesh>

      {/* Label wrapped on the front face */}
      {label && (
        <mesh position={[0, 0, 0]} rotation={[0, -0.62, 0]}>
          <cylinderGeometry args={[0.975, 0.975, 1.15, 64, 1, true, 0, 1.24]} />
          <meshBasicMaterial map={label} transparent side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      )}

      {/* Gold collar where the cap seats */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[0.6, 0.022, 24, 64]} />
        <meshPhysicalMaterial color="#C6A85E" metalness={1} roughness={0.28} />
      </mesh>

      {/* Cap — polished gold, echoing the top-coat bottle */}
      <mesh geometry={capGeo} position={[0, 1.51, 0]} castShadow>
        <meshPhysicalMaterial color="#B99A50" metalness={1} roughness={0.24} />
      </mesh>
    </group>
  );
}

export default function HeroBottleCanvas({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.55, 7.2], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Float
          enabled={animate}
          speed={1.4}
          rotationIntensity={0.12}
          floatIntensity={0.35}
          floatingRange={[-0.06, 0.06]}
        >
          <Bottle animate={animate} />
        </Float>

        <ContactShadows position={[0, -1.12, 0]} opacity={0.55} scale={7} blur={2.6} far={2.4} color="#000000" />

        {/* Studio-style lighting built from lightformers — no external HDR fetch */}
        <Environment resolution={256}>
          <Lightformer intensity={1.6} position={[3.5, 2, 3]} scale={[2.5, 5, 1]} color="#fff3dd" />
          <Lightformer intensity={1.1} position={[-4, 1.5, 2]} scale={[2, 4, 1]} color="#e8dcc0" />
          <Lightformer intensity={0.7} position={[0, 4, -3]} scale={[6, 2, 1]} color="#f5e9cf" />
        </Environment>
        <directionalLight position={[4, 5, 4]} intensity={0.6} color="#ffedc9" />
        <ambientLight intensity={0.12} />
      </Suspense>
    </Canvas>
  );
}
