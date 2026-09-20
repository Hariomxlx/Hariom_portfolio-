import { useEffect, type RefObject } from 'react'

/**
 * Writes the mouse position to --px / --py (-1..1) on an element.
 * CSS then turns those numbers into 3D transforms, so no React re-renders happen.
 */
export function usePointerVars(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    let frame = 0
    let nx = 0
    let ny = 0

    const apply = () => {
      frame = 0
      el.style.setProperty('--px', nx.toFixed(3))
      el.style.setProperty('--py', ny.toFixed(3))
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      nx = (e.clientX / window.innerWidth) * 2 - 1
      ny = (e.clientY / window.innerHeight) * 2 - 1
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, enabled])
}
