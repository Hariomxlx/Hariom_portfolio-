import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/**
 * Scroll reveal built on Framer Motion's IntersectionObserver-backed `whileInView`.
 * Under prefers-reduced-motion (MotionConfig reducedMotion="user") the movement is
 * dropped and only the opacity fade remains.
 */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
