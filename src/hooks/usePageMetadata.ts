import { useEffect } from 'react'
import type { PageMetadata } from '../types/privacy'

export function usePageMetadata({ title, description, robots }: PageMetadata) {
  const effectiveRobots =
    import.meta.env.VITE_PUBLIC_PREVIEW === 'true' ? 'noindex, nofollow' : robots
  useEffect(() => {
    document.title = title
    const descriptionElement = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (descriptionElement) descriptionElement.content = description

    let robotsElement = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (effectiveRobots) {
      if (!robotsElement) {
        robotsElement = document.createElement('meta')
        robotsElement.name = 'robots'
        document.head.append(robotsElement)
      }
      robotsElement.content = effectiveRobots
    } else {
      robotsElement?.remove()
    }
  }, [title, description, effectiveRobots])
}
