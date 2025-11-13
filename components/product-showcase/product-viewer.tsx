'use client';

import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';

import SimpleModel from './simple-model';

interface ProductViewerProps {
  modelPath: string;
  zoom: number;
  autoRotate: boolean;
  color: string;
  onError?: () => void;
}

function CanvasContent({
  zoom,
  autoRotate,
  color,
}: {
  zoom: number;
  autoRotate: boolean;
  color: string;
}) {
  return (
    <>
      <color attach="background" args={['#101820']} />
      <fog attach="fog" args={['#101820', 5, 20]} />

      <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />

      <SimpleModel color={color} scale={zoom} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1C1E4E" />
      </mesh>

      {/* Additional lighting for better illumination */}
      <pointLight position={[-5, 5, -5]} intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.3} />
      
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={10}
      />
    </>
  );
}

export default function ProductViewer({
  zoom,
  autoRotate,
  color,
  onError,
}: ProductViewerProps) {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle errors in the 3D rendering
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.message.includes('three') ||
        event.message.includes('fiber') ||
        event.message.includes('drei')
      ) {
        setHasError(true);
        if (onError) onError();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [onError]);

  if (!mounted || hasError) {
    return null; // Return null to allow the parent component to show fallback
  }

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onError={() => {
          setHasError(true);
          if (onError) onError();
        }}
        fallback={
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Suspense fallback={null}>
          <CanvasContent zoom={zoom} autoRotate={autoRotate} color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
}
