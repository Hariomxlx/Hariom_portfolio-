import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motionState } from '../../lib/motionState'

/** A faint perspective grid under the hero. It fades out as you scroll away. */
export function Floor() {
  const ref = useRef<THREE.GridHelper>(null)

  useEffect(() => {
    const mat = ref.current?.material as THREE.LineBasicMaterial | undefined
    if (!mat) return
    mat.transparent = true
    mat.depthWrite = false
    mat.opacity = 0.16
  }, [])

  useFrame((state) => {
    const grid = ref.current
    if (!grid) return
    grid.position.y = state.camera.position.y - 5.5
    grid.position.z = -14
    const fade = 1 - THREE.MathUtils.smoothstep(motionState.section, 0.15, 1.4)
    ;(grid.material as THREE.LineBasicMaterial).opacity = 0.16 * fade
    grid.visible = fade > 0.01
  })

  return <gridHelper ref={ref} args={[100, 100, '#2c4a7a', '#182640']} />
}
