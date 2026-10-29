import { createContext } from 'react'
import type { MotionSettings } from '../types/ui'

export const MotionContext = createContext<MotionSettings | null>(null)
