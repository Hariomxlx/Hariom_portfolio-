import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motionState } from '../../lib/motionState'
import { makeGlowTexture } from './textures'

/**
 * Where the crystal sits for each section (index = section order in the page).
 * x/y/z are world units at desktop width, s is scale, a is overall opacity.
 * The position eases between keyframes as the scroll position moves between sections.
 */
const KEYS = [
  { x: 6.4, y: 2.5, z: -3.0, s: 1.3, a: 1.0 }, // home: beside the portrait
  { x: 5.2, y: 1.8, z: -3.5, s: 1.15, a: 0.9 }, // about: in the empty corner of the heading
  { x: 5.6, y: 1.6, z: -4.5, s: 1.0, a: 0.7 }, // experience
  { x: -6.4, y: -0.4, z: -6.0, s: 1.0, a: 0.45 }, // projects
  { x: 6.0, y: 0.6, z: -5.5, s: 0.95, a: 0.5 }, // skills
  { x: 6.0, y: 2.0, z: -5.0, s: 1.0, a: 0.55 }, // education
  { x: 6.0, y: 2.0, z: -5.0, s: 1.0, a: 0.5 }, // certifications
  { x: 7.6, y: 0.8, z: -4.5, s: 1.3, a: 0.7 }, // contact: in the right margin
]

const ease = (t: number) => t * t * (3 - 2 * t)

function sample(section: number) {
  const last = KEYS.length - 1
  const c = Math.min(Math.max(section, 0), last)
  const i = Math.min(Math.floor(c), last - 1)
  const t = ease(c - i)
  const a = KEYS[i]
  const b = KEYS[i + 1]
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    z: a.z + (b.z - a.z) * t,
    s: a.s + (b.s - a.s) * t,
    a: a.a + (b.a - a.a) * t,
  }
}

const damp = THREE.MathUtils.damp

/** A faceted crystal, two thin rings and a small satellite. Deliberately low-poly. */
export function Crystal({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const orbit = useRef<THREE.Group>(null)

  const coreMat = useRef<THREE.MeshStandardMaterial>(null)
  const wireMat = useRef<THREE.MeshBasicMaterial>(null)
  const ringAMat = useRef<THREE.MeshBasicMaterial>(null)
  const ringBMat = useRef<THREE.MeshBasicMaterial>(null)
  const glowMat = useRef<THREE.SpriteMaterial>(null)

  const glow = useMemo(() => makeGlowTexture(128), [])
  const dim = mobile ? 0.5 : 1

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const m = motionState
    const k = sample(m.section)

    // Scale the horizontal offset with the visible width so it stays on screen on phones.
    const xs = THREE.MathUtils.clamp(state.viewport.width / 13, 0.28, 1)
    const t = state.clock.elapsedTime
    const camY = state.camera.position.y

    g.position.x = damp(g.position.x, k.x * xs, 3, dt)
    g.position.y = damp(g.position.y, camY + k.y + (reduced ? 0 : Math.sin(t * 0.6) * 0.18), 3, dt)
    g.position.z = damp(g.position.z, k.z, 3, dt)
    const s = k.s * THREE.MathUtils.clamp(xs + 0.25, 0.55, 1)
    g.scale.setScalar(damp(g.scale.x, s, 3, dt))

    // Lean toward the pointer, and spin slowly.
    g.rotation.y = damp(g.rotation.y, m.sx * 0.55, 2.5, dt)
    g.rotation.x = damp(g.rotation.x, -m.sy * 0.35, 2.5, dt)
    if (!reduced) {
      if (core.current) core.current.rotation.y += dt * 0.16
      if (wire.current) wire.current.rotation.y += dt * 0.16
      if (ringA.current) ringA.current.rotation.z += dt * 0.08
      if (ringB.current) ringB.current.rotation.z -= dt * 0.05
      if (orbit.current) orbit.current.rotation.z += dt * 0.5
    }

    const a = k.a * dim
    if (coreMat.current) coreMat.current.opacity = 0.95 * a
    if (wireMat.current) wireMat.current.opacity = 0.28 * a
    if (ringAMat.current) ringAMat.current.opacity = 0.5 * a
    if (ringBMat.current) ringBMat.current.opacity = 0.3 * a
    if (glowMat.current) glowMat.current.opacity = 0.38 * a
  })

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          ref={coreMat}
          color="#0d1424"
          metalness={0.85}
          roughness={0.3}
          flatShading
          transparent
          emissive="#183258"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh ref={wire} scale={1.03}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial ref={wireMat} wireframe transparent color="#8db9ff" depthWrite={false} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[1.9, 0.006, 6, mobile ? 96 : 160]} />
        <meshBasicMaterial ref={ringAMat} transparent color="#b9a8ff" depthWrite={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2, -0.5, 0.4]}>
        <torusGeometry args={[2.6, 0.005, 6, mobile ? 96 : 200]} />
        <meshBasicMaterial ref={ringBMat} transparent color="#8db9ff" depthWrite={false} />
      </mesh>
      <group rotation={[Math.PI / 2.3, 0.2, 0]}>
        <group ref={orbit}>
          <mesh position={[1.9, 0, 0]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#ffffff" fog={false} />
          </mesh>
        </group>
      </group>

      <sprite scale={[10, 10, 1]}>
        <spriteMaterial
          ref={glowMat}
          map={glow}
          color="#5f8fe8"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  )
}
