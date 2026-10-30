import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { heroHeadlineMotion } from '../config/hero'
import { heroCopy } from '../data/hero'
import { useMotion } from './useMotion'

gsap.registerPlugin(TextPlugin)

export function useHeroEntrance() {
  const rootRef = useRef<HTMLElement>(null)
  const { reducedMotion } = useMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return
    const introduction = root.querySelector<HTMLElement>('[data-introduction]')
    const live = root.querySelector<HTMLElement>('[data-hero-live]')
    const text = root.querySelector<HTMLElement>('[data-hero-text]')
    if (!introduction || !live || !text) return
    const originalText = text.textContent
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

      gsap.set(text, { text: '' })
      const headline = gsap.timeline({
        paused: true,
        repeat: -1,
        delay: heroHeadlineMotion.initialDelay,
        repeatDelay: heroHeadlineMotion.betweenDuration,
      })
      rotation = headline
      heroCopy.phrases.forEach((phrase, index) => {
        headline
          .set(
            live,
            { autoAlpha: 1, filter: 'blur(0px)', y: 0 },
            index === 0 ? 0 : `+=${heroHeadlineMotion.betweenDuration}`,
          )
          .fromTo(
            text,
            { text: '' },
            {
              text: { value: phrase, delimiter: '' },
              duration: phrase.length * heroHeadlineMotion.characterDuration,
              ease: 'none',
              immediateRender: false,
            },
          )
          .to(
            live,
            {
              autoAlpha: 0,
              filter: `blur(${heroHeadlineMotion.blur}px)`,
              y: -4,
              duration: heroHeadlineMotion.exitDuration,
              ease: 'power2.in',
            },
            `+=${heroHeadlineMotion.holdDuration}`,
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
      text.textContent = originalText
    }
  }, [reducedMotion])

  return rootRef
}
