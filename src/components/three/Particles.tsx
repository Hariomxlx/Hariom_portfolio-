import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motionState } from '../../lib/motionState'
import { makeGlowTexture } from './textures'

const ICE = new THREE.Color('#8db9ff')
const IRIS = new THREE.Color('#b9a8ff')
const WHITE = new THREE.Color('#ffffff')

/**
 * One draw call: a slab of soft dust that spans the whole scroll range.
 * It follows the camera at 60% speed, which gives cheap scroll parallax.
 */
export function Particles({ count, size, reduced }: { count: number; size: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null)

  const { positions, colors, sprite } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const tmp = new THREE.Color()
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 44
      pos[i * 3 + 1] = Math.random() * 40 - 26
      pos[i * 3 + 2] = Math.random() * 24 - 20
      const r = Math.random()
      tmp.copy(r < 0.55 ? WHITE : r < 0.85 ? ICE : IRIS).multiplyScalar(0.55 + Math.random() * 0.45)
      col[i * 3] = tmp.r
      col[i * 3 + 1] = tmp.g
      col[i * 3 + 2] = tmp.b
    }
    return { positions: pos, colors: col, sprite: makeGlowTexture(64) }
  }, [count])

  useFrame((state, dt) => {
    const p = points.current
    if (!p) return
    if (!reduced) p.rotation.y += dt * 0.008
    p.position.y = state.camera.position.y * 0.6
    p.position.x = -motionState.sx * 0.5
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={size}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
