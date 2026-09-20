import { motionState } from './motionState'

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))

/**
 * Feeds scroll progress, the active section (as a float) and pointer position
 * into `motionState`. Returns a cleanup function.
 */
export function startMotionSync(ids: readonly string[], opts: { pointer: boolean }): () => void {
  let tops: number[] = []

  const measure = () => {
    tops = ids.map((id) => {
      const el = document.getElementById(id)
      return el ? el.getBoundingClientRect().top + window.scrollY : 0
    })
  }

  const update = () => {
    const y = window.scrollY
    const vh = window.innerHeight
    const max = document.documentElement.scrollHeight - vh
    motionState.scroll = max > 0 ? clamp(y / max) : 0

    const center = y + vh * 0.5
    let i = 0
    for (let k = 0; k < tops.length; k++) if (center >= tops[k]) i = k
    const next = tops[i + 1]
    const span = next !== undefined ? next - tops[i] : 0
    motionState.section = span > 0 ? i + clamp((center - tops[i]) / span) : i
  }

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    motionState.px = (e.clientX / window.innerWidth) * 2 - 1
    motionState.py = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  const remeasure = () => {
    measure()
    update()
  }

  remeasure()
  const ro = new ResizeObserver(remeasure)
  ro.observe(document.body)
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', remeasure)
  if (opts.pointer) window.addEventListener('pointermove', onPointer, { passive: true })
  void document.fonts?.ready.then(remeasure)

  return () => {
    ro.disconnect()
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', remeasure)
    window.removeEventListener('pointermove', onPointer)
  }
}

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
