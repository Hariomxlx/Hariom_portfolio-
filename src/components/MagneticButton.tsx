import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useMedia'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  /** Pass a file name to make the link download instead of navigate. */
  download?: string
  external?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const variants = {
  primary: 'bg-paper text-void hover:bg-white',
  ghost: 'border border-white/15 bg-white/[0.04] text-paper hover:border-white/30 hover:bg-white/[0.08]',
}

/** A link styled as a button that leans toward the cursor. */
export function MagneticButton({
  href,
  children,
  variant = 'primary',
  download,
  external,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduce

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ x: sx, y: sy }}
      className={`inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
