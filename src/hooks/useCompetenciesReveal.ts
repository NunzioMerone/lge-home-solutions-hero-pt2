import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from '../config/motion'
import { useMotion } from './useMotion'

gsap.registerPlugin(ScrollTrigger)

export function useCompetenciesReveal() {
  const ref = useRef<HTMLElement>(null)
  const { reducedMotion } = useMotion()

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || reducedMotion) return

    const animations = new Map<HTMLElement, gsap.core.Tween>()
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-competency-reveal]').forEach((element) => {
        const animation = gsap.fromTo(
          element,
          { opacity: 0, y: motion.distance },
          {
            opacity: 1,
            y: 0,
            duration: motion.duration,
            ease: motion.sectionEase,
            scrollTrigger: {
              trigger: element,
              start: motion.sectionStart,
              once: true,
              fastScrollEnd: true,
            },
          },
        )
        animations.set(element, animation)
      })
    }, root)

    // Keyboard navigation must never land inside a still-hidden reveal.
    const revealFocusedItem = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      const element = event.target.closest<HTMLElement>('[data-competency-reveal]')
      if (element) animations.get(element)?.progress(1)
    }
    root.addEventListener('focusin', revealFocusedItem)
    return () => {
      root.removeEventListener('focusin', revealFocusedItem)
      context.revert()
    }
  }, [reducedMotion])

  return ref
}
