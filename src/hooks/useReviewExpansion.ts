import { useEffect, useRef, useState } from 'react'

export function useReviewExpansion(text: string) {
  const textRef = useRef<HTMLQuoteElement>(null)
  const [canExpand, setCanExpand] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const element = textRef.current
    if (!element) return
    let disposed = false
    const measure = () => {
      if (disposed) return
      const style = getComputedStyle(element)
      const maxHeight =
        Number.parseFloat(style.lineHeight) *
        Number.parseInt(style.getPropertyValue('--review-lines'), 10)
      setCanExpand(Number.isFinite(maxHeight) && element.scrollHeight > maxHeight + 1)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    void document.fonts.ready.then(measure)
    return () => {
      disposed = true
      observer.disconnect()
    }
  }, [text])

  return { textRef, canExpand, expanded, toggleExpanded: () => setExpanded((value) => !value) }
}
