import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { heroFocus } from '../config/hero'
import { useMotion } from './useMotion'

export function useHeroEntrance() {
  const rootRef = useRef<HTMLElement>(null)
  const { reducedMotion } = useMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return
    const introduction = root.querySelector<HTMLElement>('[data-introduction]')
    if (!introduction) return
    const phrases = root.querySelectorAll<HTMLElement>('[data-hero-phrase]')
    let entrance: gsap.core.Timeline | undefined
    let rotation: gsap.core.Timeline | undefined
    const context = gsap.context(() => {
      entrance = gsap.timeline({ paused: true })
      entrance
        .fromTo(
          root.querySelector('[data-hero-eyebrow]'),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          0,
        )
        .fromTo(
          root.querySelector('[data-hero-prefix]'),
          { opacity: 0, y: 6, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power2.out' },
          0.05,
        )
        .fromTo(
          root.querySelector('[data-hero-subtitle]'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          0.2,
        )
        .fromTo(
          root.querySelector('[data-hero-action]'),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' },
          0.35,
        )

      if (phrases.length === 0) return
      const unfocused = { autoAlpha: 0, filter: `blur(${heroFocus.blur}px)`, y: 6 }
      gsap.set(phrases, unfocused)
      rotation = gsap.timeline({
        paused: true,
        repeat: -1,
        delay: heroFocus.initialDelay,
        repeatDelay: heroFocus.betweenDuration,
      })
      phrases.forEach((phrase, index) => {
        rotation
          ?.fromTo(
            phrase,
            unfocused,
            {
              autoAlpha: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: heroFocus.enterDuration,
              ease: 'power2.out',
              immediateRender: false,
            },
            index === 0 ? 0 : `+=${heroFocus.betweenDuration}`,
          )
          .to(
            phrase,
            {
              autoAlpha: 0,
              filter: `blur(${heroFocus.blur}px)`,
              y: -4,
              duration: heroFocus.exitDuration,
              ease: 'power2.in',
            },
            `+=${heroFocus.holdDuration}`,
          )
      })
    }, root)
    let inView = false
    const syncVisibility = () => {
      const running = inView && !document.hidden
      entrance?.paused(!running)
      rotation?.paused(!running)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        syncVisibility()
      },
      { threshold: 0.1 },
    )
    observer.observe(introduction)
    document.addEventListener('visibilitychange', syncVisibility)
    const revealForKeyboard = () => {
      entrance?.progress(1)
    }
    root.addEventListener('focusin', revealForKeyboard)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
      root.removeEventListener('focusin', revealForKeyboard)
      context.revert()
    }
  }, [reducedMotion])

  return rootRef
}
