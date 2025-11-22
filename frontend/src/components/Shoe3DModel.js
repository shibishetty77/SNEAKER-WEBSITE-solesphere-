import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Shoe Component
function Shoe({ colors }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!hovered) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Create shoe geometry using basic shapes
  const createShoeMesh = () => {
    const shoeGroup = new THREE.Group();

    // Sole
    const soleGeometry = new THREE.BoxGeometry(2.5, 0.3, 1.2);
    const soleMaterial = new THREE.MeshStandardMaterial({
      color: colors.sole || '#FFFFFF',
      roughness: 0.5,
      metalness: 0.2,
    });
    const sole = new THREE.Mesh(soleGeometry, soleMaterial);
    sole.position.y = 0.15;
    shoeGroup.add(sole);

    // Upper body
    const upperGeometry = new THREE.BoxGeometry(2.3, 0.8, 1);
    const upperMaterial = new THREE.MeshStandardMaterial({
      color: colors.upper || '#333333',
      roughness: 0.7,
      metalness: 0.1,
    });
    const upper = new THREE.Mesh(upperGeometry, upperMaterial);
    upper.position.set(0.1, 0.7, 0);
    upper.rotation.x = 0.1;
    shoeGroup.add(upper);

    // Toe cap
    const toeGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI);
    const toeMaterial = new THREE.MeshStandardMaterial({
      color: colors.upper || '#333333',
      roughness: 0.7,
    });
    const toe = new THREE.Mesh(toeGeometry, toeMaterial);
    toe.position.set(1.2, 0.5, 0);
    toe.rotation.z = Math.PI / 2;
    toe.scale.set(1, 0.8, 1);
    shoeGroup.add(toe);

    // Nike Swoosh-like accent
    const swooshGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.05);
    const swooshMaterial = new THREE.MeshStandardMaterial({
      color: colors.swoosh || '#FF6B00',
      roughness: 0.3,
      metalness: 0.5,
    });
    const swoosh = new THREE.Mesh(swooshGeometry, swooshMaterial);
    swoosh.position.set(0.2, 0.7, 0.51);
    swoosh.rotation.z = -0.3;
    shoeGroup.add(swoosh);

    // Laces area
    const lacesGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    const lacesMaterial = new THREE.MeshStandardMaterial({
      color: colors.laces || '#FFFFFF',
      roughness: 0.8,
    });
    
    for (let i = 0; i < 5; i++) {
      const lace = new THREE.Mesh(lacesGeometry, lacesMaterial);
      lace.position.set(-0.3 + i * 0.3, 0.9, 0);
      lace.rotation.x = Math.PI / 2;
      shoeGroup.add(lace);
    }

    // Heel counter
    const heelGeometry = new THREE.BoxGeometry(0.3, 1, 1);
    const heelMaterial = new THREE.MeshStandardMaterial({
      color: colors.accent || '#222222',
      roughness: 0.6,
    });
    const heel = new THREE.Mesh(heelGeometry, heelMaterial);
    heel.position.set(-1.1, 0.6, 0);
    shoeGroup.add(heel);

    return shoeGroup;
  };

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <primitive object={createShoeMesh()} />
    </group>
  );
}

// Main 3D Canvas Component
export default function Shoe3DModel({ colors, autoRotate = true }) {
  return (
    <div style={{ width: '100%', height: '600px', background: '#1a1a2e', borderRadius: '12px' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, 0, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />

        {/* 3D Shoe */}
        <Shoe colors={colors} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
}
