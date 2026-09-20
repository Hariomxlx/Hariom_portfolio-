import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { motionState } from '../../lib/motionState'
import { CAMERA_TRAVEL } from './constants'

/**
 * Smooth camera: descends with scroll and drifts a little toward the pointer.
 * Must be mounted before other scene objects so the damped values are fresh
 * when they read them (useFrame callbacks run in mount order).
 */
export function CameraRig({ pointer }: { pointer: boolean }) {
  useFrame((state, dt) => {
    const m = motionState
    m.sScroll = MathUtils.damp(m.sScroll, m.scroll, 4, dt)
    m.sx = MathUtils.damp(m.sx, pointer ? m.px : 0, 3, dt)
    m.sy = MathUtils.damp(m.sy, pointer ? m.py : 0, 3, dt)

    const cam = state.camera
    cam.position.x = m.sx * 0.7
    cam.position.y = -m.sScroll * CAMERA_TRAVEL + m.sy * 0.45
    cam.position.z = 9 - Math.sin(m.sScroll * Math.PI) * 1.4
    cam.lookAt(m.sx * 0.25, cam.position.y - m.sy * 0.2, 0)
  })
  return null
}
