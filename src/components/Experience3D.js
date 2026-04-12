import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text, Float, Image, RoundedBox, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// Create an animated Avatar component for reuse
const Avatar = ({ url, position, rotation, scale, floatSpeed = 2 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    // Subtle breathing/floating effect on top of Float component for extra realism
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * floatSpeed) * 0.1;
      // Slight head bobbing (rotation)
      meshRef.current.rotation.z = Math.sin(t * floatSpeed * 0.5) * 0.02;
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.2} floatIntensity={1}>
      <group position={position} rotation={rotation} ref={meshRef}>
        <Image url={url} scale={scale} transparent={true} />
      </group>
    </Float>
  );
};

// UI/UX Design Props - Frosted Glass Editions
const UIWireframe = ({ position, rotation, scale=1, floatSpeed=2 }) => (
  <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={1.5} position={position} rotation={rotation}>
    <group scale={scale}>
      <RoundedBox args={[2, 3, 0.1]} radius={0.1}>
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} ior={1.5} thickness={0.5} />
      </RoundedBox>
      <Box args={[1.5, 0.3, 0.15]} position={[0, 1.1, 0.02]}>
        <meshPhysicalMaterial color="#e0f0ff" transmission={0.7} roughness={0.2} />
      </Box>
      <Box args={[1.5, 1, 0.15]} position={[0, 0.3, 0.02]}>
        <meshPhysicalMaterial color="#fbe4eb" transmission={0.7} roughness={0.2} />
      </Box>
      <Box args={[1.5, 0.1, 0.15]} position={[0, -0.5, 0.02]}>
        <meshPhysicalMaterial color="#e4fbf4" transmission={0.7} roughness={0.2} />
      </Box>
      <Box args={[1.0, 0.1, 0.15]} position={[-0.25, -0.7, 0.02]}>
        <meshPhysicalMaterial color="#f4e4fb" transmission={0.7} roughness={0.2} />
      </Box>
    </group>
  </Float>
);

const FloatingPalette = ({ position, rotation, scale=1, floatSpeed=1.5 }) => (
  <Float speed={floatSpeed} rotationIntensity={0.6} floatIntensity={1.5} position={position} rotation={rotation}>
    <group scale={scale}>
      <RoundedBox args={[1.8, 0.8, 0.1]} radius={0.05} position={[0, 0, -0.1]}>
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} ior={1.5} thickness={0.5} />
      </RoundedBox>
      <Sphere args={[0.3, 32, 32]} position={[-0.5, 0, 0]}>
         <meshPhysicalMaterial color="#38bdf8" transmission={0.4} roughness={0.1} />
      </Sphere>
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
         <meshPhysicalMaterial color="#c084fc" transmission={0.4} roughness={0.1} />
      </Sphere>
      <Sphere args={[0.3, 32, 32]} position={[0.5, 0, 0]}>
         <meshPhysicalMaterial color="#fb923c" transmission={0.4} roughness={0.1} />
      </Sphere>
    </group>
  </Float>
);

const VectorPath = ({ position, rotation, scale=1, floatSpeed=2.5 }) => (
   <Float speed={floatSpeed} rotationIntensity={0.8} floatIntensity={1.2} position={position} rotation={rotation}>
     <group scale={scale}>
       <Box args={[0.2, 0.2, 0.1]} position={[-1, 0.5, 0]}>
          <meshPhysicalMaterial color="#38bdf8" transmission={0.8} roughness={0.1} />
       </Box>
       <Box args={[0.2, 0.2, 0.1]} position={[1, -0.5, 0]}>
          <meshPhysicalMaterial color="#c084fc" transmission={0.8} roughness={0.1} />
       </Box>
       <Box args={[2.2, 0.05, 0.05]} position={[0, 0, 0]} rotation={[0, 0, -0.46]}>
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} ior={1.5} thickness={0.5} />
       </Box>
     </group>
   </Float>
);

const TextSymbolProp = ({ position, rotation, scale=1, floatSpeed=1.5, text="Aa" }) => (
  <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={1.5} position={position} rotation={rotation}>
    <Text scale={scale} fontSize={2} color="#ffffff" fillOpacity={0.8} material-toneMapped={false} anchorX="center" anchorY="middle">
      {text}
      <meshPhysicalMaterial color="#ffffff" transmission={0.95} roughness={0} ior={1.5} thickness={0.5} />
    </Text>
  </Float>
);

export default function Experience3D({ projects, skills, setActiveProject }) {
  const scroll = useScroll();
  const group = useRef();
  
  // Total depth of the fly-through
  const Z_DEPTH = 75; 

  // Define background colors for the 4 sections
  const sectionColors = useMemo(() => [
    new THREE.Color('#000000'), // Pure Black Hero
    new THREE.Color('#01080a'), // Midnight Teal tint
    new THREE.Color('#0a0206'), // Midnight Pink tint
    new THREE.Color('#020205'), // Deep space purple tint
  ], []);

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 to 1
    
    // Smooth Camera Z progression
    const targetZ = 12 - offset * (Z_DEPTH + 15);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 4, delta);
    
    // Dynamic Background & Fog Interpolation based on Scroll
    const totalSections = sectionColors.length - 1;
    const scrollSection = offset * totalSections;
    const startIndex = Math.clamp ? THREE.MathUtils.clamp(Math.floor(scrollSection), 0, totalSections) : Math.min(Math.max(Math.floor(scrollSection), 0), totalSections);
    const endIndex = Math.min(startIndex + 1, totalSections);
    const lerpFactor = scrollSection - startIndex;

    const targetColor = sectionColors[startIndex].clone().lerp(sectionColors[endIndex], lerpFactor);
    state.scene.background.lerp(targetColor, 5 * delta); // Smoothly transition background
    if (state.scene.fog) {
      state.scene.fog.color.lerp(targetColor, 5 * delta); // Smoothly transition fog to match
    }

    // Mouse Parallax Effect X/Y
    const targetX = (state.pointer.x * 2) + Math.sin(offset * Math.PI * 4) * 1.5;
    const targetY = (state.pointer.y * 2) + Math.cos(offset * Math.PI * 2) * 0.5;
    
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 5, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 5, delta);
    
    // Camera gently looks towards center
    state.camera.lookAt(0, 0, state.camera.position.z - 10);
  });

  return (
    <group ref={group}>
      {/* Background UI/UX Designer Elements */}
      {/* Hero Vicinity */}
      <UIWireframe position={[-6, 2, -10]} rotation={[0, 0.4, -0.2]} scale={1.2} />
      <TextSymbolProp text="Aa" position={[5, 3, -8]} rotation={[0, -0.3, 0.1]} scale={0.8} />
      <FloatingPalette position={[-4, -3, -15]} rotation={[0.2, 0.5, 0]} floatSpeed={1} />

      {/* Skills Orbit Vicinity */}
      <VectorPath position={[7, 1, -25]} rotation={[0.1, -0.5, 0.2]} scale={1.5} />
      <TextSymbolProp text="</>" position={[-8, 3, -30]} rotation={[0.2, 0.2, -0.1]} scale={1} />
      <UIWireframe position={[-6, -4, -35]} rotation={[0.5, 0.1, -0.2]} scale={1} />
      
      {/* Projects Vicinity */}
      <TextSymbolProp text="px" position={[-7, 1, -50]} rotation={[0, 0.6, 0.1]} scale={1} />
      <FloatingPalette position={[5, 4, -48]} rotation={[0.5, -0.2, 0.1]} scale={1.5} />
      <VectorPath position={[6, -3, -60]} rotation={[0, 0, 0.8]} scale={1.2} />

      {/* Contact Vicinity */}
      <UIWireframe position={[5, 2, -75]} rotation={[-0.2, -0.4, 0.1]} scale={1} />

      {/* --- Section 1: Hero Landing (z = 0) --- */}
      <group position={[0, 0, 0]}>
        <Avatar url="/display/avatars/hero.png" position={[3, 0, -2]} scale={[6, 8]} />
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
          <Text
            position={[-2.5, 1, 0]}
            fontSize={1.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={-0.05}
          >
            KAVIN C
          </Text>
          <Text
            position={[-2.5, -0.2, 0]}
            fontSize={0.4}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            UI/UX Designer | Front-End Developer
          </Text>
          <Text
            position={[-2.5, -0.8, 0]}
            fontSize={0.2}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            Passionate UI/UX designer with a keen eye for creating intuitive and visually appealing digital experiences.
          </Text>
          <Text
            position={[-2.5, -1.5, 0]}
            fontSize={0.2}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            I specialize in transforming complex problems into simple, elegant solutions that users love.
          </Text>
          <Text
            position={[-2.5, -2, 0]}
            fontSize={0.2}
            color="#64748b"
            anchorX="center"
            anchorY="middle"
          >
            ( SCROLL TO DIVE IN )
          </Text>
        </Float>
      </group>

      {/* --- Section 2: Skills Orbit (z = -25) --- */}
      <group position={[0, 0, -25]}>
         <Avatar url="/display/avatars/skills.png" position={[0, -0.5, 0]} scale={[4, 5.5]} />
         <Text position={[0, 3.5, 0]} fontSize={1.2} color="#38bdf8" anchorX="center">
           SKILLS ORBIT
         </Text>
         {/* Orbiting Elements */}
         {skills.map((skill, i) => {
            const angle = (i / skills.length) * Math.PI * 2;
            const radius = 5.5; // Increased width
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * (radius * 0.6); // Increased height proportion
            const z = Math.sin(angle) * 3; // Proportionally increased depth
            return (
              <Float key={i} speed={2 + (i%3)} floatIntensity={3} position={[x, y, z]} rotation={[0, 0, 0]}>
                 {skill.icon ? (
                   <Image url={skill.icon} scale={[0.8, 0.8]} transparent={true} />
                 ) : (
                   <Sphere args={[0.4, 32, 32]}>
                      <meshPhysicalMaterial color={i%2===0?"#38bdf8":"#c084fc"} transmission={0.9} roughness={0.1} />
                   </Sphere>
                 )}
                 <Text position={[0,-1.0,0]} fontSize={0.3} color="#f8fafc">{skill.name}</Text>
                 <group position={[0, -1.4, 0]}>
                   {/* Black shadow for percentage for contrast if any */}
                   <Text position={[0.01, -0.01, -0.01]} fontSize={0.15} color="#000000">{skill.proficiency}%</Text>
                   {/* Primary colored text */}
                   <Text position={[0, 0, 0]} fontSize={0.15} color="#38bdf8">{skill.proficiency}%</Text>
                 </group>
              </Float>
            )
         })}
      </group>

      {/* --- Section 3: Projects Showcase (z = -50) --- */}
      <group position={[0, 0, -50]}>
        <Avatar url="/display/avatars/projects.png" position={[-4, -0.5, 2]} scale={[5, 6.5]} rotation={[0, 0.3, 0]} />
        <Text position={[2, 4, 0]} fontSize={1.2} color="#c084fc" anchorX="center">
          ARCHIVES
        </Text>
        <group position={[2, 0, 0]}>
          {projects.map((project, i) => {
            const zOffset = -i * 3.5; 
            const xOffset = i % 2 === 0 ? 1 : -2.5;
            const ry = i % 2 === 0 ? -0.15 : 0.15;
            
            return (
              <group key={project.id} position={[xOffset, 0, zOffset]} rotation={[0, ry, 0]} onClick={(e) => { e.stopPropagation(); setActiveProject(project); }} onPointerOver={(e) => { document.body.style.cursor = 'pointer'; }} onPointerOut={(e) => { document.body.style.cursor = 'auto'; }}>
                <Float floatIntensity={2} rotationIntensity={0.2} speed={1.5}>
                  <Image url={project.cover} scale={[4, 2.5]} position={[0, 0.5, 0.1]} />
                  <RoundedBox args={[4.2, 2.7, 0.1]} radius={0.05} position={[0, 0.5, -0.05]} >
                    <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} ior={1.5} />
                  </RoundedBox>
                  <Text position={[0, -1.2, 0.2]} fontSize={0.3} color="#f8fafc" maxWidth={3.8} textAlign="center" anchorY="top">
                    {project.title}
                  </Text>
                </Float>
              </group>
            )
          })}
        </group>
      </group>

      {/* --- Section 4: Contact (z = -75) --- */}
      <group position={[0, 0, -75]}>
         <Avatar url="/display/avatars/contact.png" position={[0, 1, -2]} scale={[5, 6.5]} rotation={[0, 0, 0]} />
         <Float speed={2} rotationIntensity={0.1} floatIntensity={1.5}>
            <Text position={[0, -2.5, 0]} fontSize={1.2} color="#38bdf8">
              INITIATE CONTACT
            </Text>
            <Text position={[0, -3.2, 0]} fontSize={0.35} color="#94a3b8">
              Utilize the HUD below to transmit a message.
            </Text>
         </Float>
      </group>
    </group>
  );
}
