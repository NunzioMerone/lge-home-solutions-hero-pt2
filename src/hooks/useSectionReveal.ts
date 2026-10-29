import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from '../config/motion'
import { useMotion } from './useMotion'
import type { SectionRevealOptions } from '../types/ui'

gsap.registerPlugin(ScrollTrigger)

export function useSectionReveal({
  duration = motion.duration,
  stagger = motion.stagger,
}: SectionRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const { reducedMotion } = useMotion()
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || reducedMotion) return
    let reveal: gsap.core.Timeline | undefined
    const context = gsap.context(() => {
      const items = root.querySelectorAll('[data-reveal]')
      reveal = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector('header[data-reveal]') ?? root,
          start: motion.sectionStart,
          once: true,
          fastScrollEnd: true,
        },
      })
      reveal.fromTo(
        items,
        {
          opacity: 0,
          x: (_index: number, element: HTMLElement) =>
            element.dataset.revealDirection === 'right' ? motion.partnerDistance : 0,
          y: (_index: number, element: HTMLElement) =>
            element.dataset.revealDirection === 'right' ? 0 : motion.distance,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger,
          ease: motion.sectionEase,
        },
      )
      const lines = root.querySelectorAll('[data-heading-line]')
      if (lines.length)
        reveal.fromTo(
          lines,
          { scaleX: 0 },
          { scaleX: 1, duration: motion.headingLineDuration, ease: motion.sectionEase },
          motion.headingLineDelay,
        )
    }, root)
    const finishForKeyboard = () => {
      reveal?.progress(1)
    }
    root.addEventListener('focusin', finishForKeyboard)
    return () => {
      root.removeEventListener('focusin', finishForKeyboard)
      context.revert()
    }
  }, [reducedMotion, duration, stagger])
  return ref
}
