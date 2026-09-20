import { useSyncExternalStore } from 'react'

export function useMedia(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

export const useIsMobile = () => useMedia('(max-width: 767px)')
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')
