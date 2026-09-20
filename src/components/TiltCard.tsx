import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useMedia'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
  glare?: boolean
}

/**
 * Wraps content in a pointer-driven 3D tilt with a soft light sheen.
 * Disabled on touch devices and when the visitor prefers reduced motion.
 * Children can use `translateZ()` to float above the card plane.
 */
export function TiltCard({ children, className = '', max = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduce

  const rx = useSpring(0, { stiffness: 170, damping: 18, mass: 0.6 })
  const ry = useSpring(0, { stiffness: 170, damping: 18, mass: 0.6 })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!enabled || !el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    ry.set((x - 0.5) * 2 * max)
    rx.set(-(y - 0.5) * 2 * max)
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className={className} style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="tilt relative h-full"
      >
        {children}
        {glare && enabled && <span aria-hidden className="glare pointer-events-none absolute inset-0 rounded-[inherit]" />}
      </motion.div>
    </div>
  )
}
