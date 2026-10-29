import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useAnchorNavigation() {
  const { hash, key } = useLocation()
  useLayoutEffect(() => {
    if (!hash) return
    let id: string
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
      return
    }
    const frame = requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ block: 'start' }),
    )
    return () => cancelAnimationFrame(frame)
  }, [hash, key])
}
