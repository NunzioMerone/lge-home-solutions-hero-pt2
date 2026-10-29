import { useContext } from 'react'
import { MotionContext } from '../config/motionContext'

export function useMotion() {
  const settings = useContext(MotionContext)
  if (!settings) throw new Error('useMotion must be used within MotionProvider')
  return settings
}
