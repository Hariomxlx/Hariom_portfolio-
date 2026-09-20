import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIsMobile } from '../../hooks/useMedia'
import { useFinePointer } from '../../hooks/useMedia'
import { CameraRig } from './CameraRig'
import { Crystal } from './Crystal'
import { Floor } from './Floor'
import { Particles } from './Particles'

/** Lowers the pixel ratio if the device can't hold ~40 fps. Costs almost nothing. */
function PerformanceGuard({ start }: { start: number }) {
  const setDpr = useThree((s) => s.setDpr)
  const stats = useRef({ time: 0, frames: 0, level: start, warmup: 3 })

  useFrame((_, dt) => {
    const s = stats.current
    s.time += dt
    s.frames += 1
    if (s.time < 2) return
    const fps = s.frames / s.time
    s.time = 0
    s.frames = 0
    if (s.warmup > 0) {
      s.warmup -= 1
      return
    }
    if (fps < 40 && s.level > 1) {
      s.level = Math.max(1, s.level - 0.5)
      setDpr(s.level)
    }
  })
  return null
}

export default function Scene({ reduced }: { reduced: boolean }) {
  const mobile = useIsMobile()
  const finePointer = useFinePointer()
  const maxDpr = mobile ? 1.5 : 2

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, maxDpr]}
        camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 80 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : 'always'}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <fog attach="fog" args={['#06070a', 12, 46]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={1.8} color="#dbe8ff" />
        <pointLight position={[-6, -2, 3]} intensity={40} color="#8db9ff" />

        <CameraRig pointer={finePointer && !reduced} />
        <Particles count={mobile ? 420 : 1500} size={mobile ? 0.075 : 0.07} reduced={reduced} />
        <Floor />
        <Crystal mobile={mobile} reduced={reduced} />
        {!reduced && <PerformanceGuard start={maxDpr} />}
      </Canvas>
    </div>
  )
}
