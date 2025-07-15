"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface SimpleModelProps {
  color: string
  scale?: number
}

export default function SimpleModel({ color, scale = 1 }: SimpleModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const boxRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const cylinderRef = useRef<THREE.Mesh>(null)

  // Create a simple model instead of loading a complex one
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Add subtle floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05
    }

    if (boxRef.current) {
      boxRef.current.rotation.y += 0.01
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.005
    }

    if (cylinderRef.current) {
      cylinderRef.current.rotation.z += 0.008
    }
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* Create a simple geometric model */}
      <mesh ref={boxRef} position={[-1, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>

      <mesh ref={sphereRef} position={[1, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>

      <mesh ref={cylinderRef} position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}
