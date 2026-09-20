/** Runs `cb` when the browser is idle (falls back to a short timeout, e.g. on Safari). */
export function whenIdle(cb: () => void, timeout = 1200): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(cb, { timeout })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(cb, 300)
  return () => window.clearTimeout(id)
}
