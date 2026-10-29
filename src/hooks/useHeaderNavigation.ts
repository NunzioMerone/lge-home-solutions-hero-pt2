import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { mediaQueries } from '../config/layout'

export function useHeaderNavigation() {
  const rootRef = useRef<HTMLElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const sectionsButtonRef = useRef<HTMLButtonElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [sectionsOpen, setSectionsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState(false)

  const closeSections = useCallback(() => setSectionsOpen(false), [])
  const closeNavigation = useCallback(() => {
    setSectionsOpen(false)
    setMobileOpen(false)
    setMobileSectionsOpen(false)
  }, [])
  const toggleSections = () => setSectionsOpen((previous) => !previous)
  const toggleMobileSections = () => setMobileSectionsOpen((previous) => !previous)
  const toggleMobile = () => {
    setSectionsOpen(false)
    setMobileSectionsOpen(false)
    setMobileOpen((previous) => !previous)
  }

  useEffect(() => {
    const media = window.matchMedia(mediaQueries.navigationCompact)
    media.addEventListener('change', closeNavigation)
    return () => media.removeEventListener('change', closeNavigation)
  }, [closeNavigation])

  useEffect(() => {
    if (!sectionsOpen) return
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !sectionsRef.current?.contains(event.target))
        closeSections()
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeSections()
      sectionsButtonRef.current?.focus({ preventScroll: true })
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [sectionsOpen, closeSections])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!mobileOpen || !root) return
    const previousFocus = document.activeElement
    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    const background = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, .skip-link'),
    ).map((element) => ({ element, inert: element.inert }))

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    background.forEach(({ element }) => {
      element.inert = true
    })

    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeNavigation()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'),
      ).filter((element) => element.getClientRects().length > 0 && !element.closest('[inert]'))
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    menuButtonRef.current?.focus({ preventScroll: true })
    document.addEventListener('keydown', keyboard)
    return () => {
      document.removeEventListener('keydown', keyboard)
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
      background.forEach(({ element, inert }) => {
        element.inert = inert
      })
      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected &&
        previousFocus.getClientRects().length > 0
      )
        previousFocus.focus({ preventScroll: true })
      else if (root.isConnected)
        root.querySelector<HTMLAnchorElement>('a[href]')?.focus({ preventScroll: true })
    }
  }, [mobileOpen, closeNavigation])

  return {
    rootRef,
    sectionsRef,
    sectionsButtonRef,
    menuButtonRef,
    sectionsOpen,
    mobileOpen,
    mobileSectionsOpen,
    toggleSections,
    toggleMobile,
    toggleMobileSections,
    closeSections,
    closeNavigation,
  }
}
