import { useEffect, useRef, useState } from 'react'
import { heroCopy } from '../data/hero'
import { advanceHeroTyping, getHeroTypingDelay, initialHeroTypingState } from '../utils/heroTyping'
import { useMotion } from './useMotion'

export function useHeroTypewriter() {
  const introductionRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useMotion()
  const [state, setState] = useState(initialHeroTypingState)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const introduction = introductionRef.current
    if (!introduction) return
    let inView = false
    const sync = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false
      sync()
    })
    observer.observe(introduction)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  const running = visible && !reducedMotion
  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(
      () => setState((previous) => advanceHeroTyping(previous, heroCopy.phrases)),
      getHeroTypingDelay(state),
    )
    return () => window.clearTimeout(timer)
  }, [running, state])

  const phrase = heroCopy.phrases[state.phraseIndex] ?? heroCopy.phrases[0]
  return {
    introductionRef,
    suffix: reducedMotion ? heroCopy.phrases[0] : phrase.slice(0, state.characterCount),
    reducedMotion,
  }
}
