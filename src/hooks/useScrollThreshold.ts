import { useCallback, useSyncExternalStore } from 'react'

export function useScrollThreshold(threshold: number) {
  const subscribe = useCallback(
    (notify: () => void) => {
      let current = window.scrollY > threshold
      const update = () => {
        const next = window.scrollY > threshold
        if (next === current) return
        current = next
        notify()
      }
      window.addEventListener('scroll', update, { passive: true })
      return () => window.removeEventListener('scroll', update)
    },
    [threshold],
  )
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold])
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
