import { useCallback, useEffect, useState } from 'react'
import { MotionContext } from '../../config/motionContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { MotionProviderProps } from '../../types/ui'

function storedPreference(): boolean {
  try {
    return sessionStorage.getItem('lge-reduced-motion') === 'true'
  } catch {
    return false
  }
}

export function MotionProvider({ children }: MotionProviderProps) {
  const systemReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [userReducedMotion, setUserReducedMotion] = useState(storedPreference)
  const reducedMotion = systemReducedMotion || userReducedMotion
  const toggleMotion = useCallback(() => {
    setUserReducedMotion((previous) => !previous)
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('lge-reduced-motion', String(userReducedMotion))
    } catch {
      /* Preference remains available for this visit. */
    }
  }, [userReducedMotion])

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
    return () => {
      delete document.documentElement.dataset.motion
    }
  }, [reducedMotion])

  return (
    <MotionContext.Provider
      value={{ reducedMotion, systemReducedMotion, userReducedMotion, toggleMotion }}
    >
      {children}
    </MotionContext.Provider>
  )
}
