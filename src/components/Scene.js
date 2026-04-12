import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import { ScrollControls } from '@react-three/drei';
import Experience3D from './Experience3D';

export default function Scene({ projects, skills, setActiveProject }) {
  return (
    <div className="fixed inset-0 w-full h-full bg-transparent z-0">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <color attach="background" args={['#f5f8fa']} />
        <fog attach="fog" args={['#f5f8fa', 10, 25]} />
        
        <ambientLight intensity={1.5} color="#ffffff" />
        {/* Soft Pastel Area lights */}
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" castShadow />
        <pointLight position={[-10, -5, -10]} intensity={1.5} color="#fad0e0" />
        <pointLight position={[10, 0, -5]} intensity={1.5} color="#bfe5f8" />
        
        <Suspense fallback={null}>
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.3} radius={0.8} />
            <Noise opacity={0.015} />
            <Vignette eskil={false} offset={0.3} darkness={0.4} />
          </EffectComposer>

          {/* 4 pages for 4 main sections, plus a bit of extra scroll room */}
          <ScrollControls pages={5} damping={0.15} distance={1.5}>
            <Experience3D projects={projects} skills={skills} setActiveProject={setActiveProject} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
