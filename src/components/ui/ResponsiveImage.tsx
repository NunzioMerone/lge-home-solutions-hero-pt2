import { useState } from 'react'
import { photos } from '../../data/photos'
import { heroPhotos } from '../../data/heroPhotos'
import type { ResponsiveImageProps } from '../../types/ui'
import { assetUrl } from '../../utils/assetUrl'
import styles from './ResponsiveImage.module.css'

export function ResponsiveImage({
  photo,
  collection = 'photos',
  sizes = '(min-width: 1000px) 25vw, 85vw',
  className,
  critical = false,
  decorative = false,
}: ResponsiveImageProps) {
  const [failed, setFailed] = useState(false)
  const asset = collection === 'hero' ? heroPhotos[photo] : photos[photo]
  const [smallWidth, largeWidth] = collection === 'hero' ? [480, 960] : [640, 1024]
  if (failed)
    return (
      <div
        className={`${styles.fallback} ${className ?? ''}`}
        role={decorative ? 'presentation' : 'img'}
        aria-label={decorative ? undefined : asset.alt}
      >
        Immagine temporaneamente non disponibile
      </div>
    )
  return (
    <img
      className={className}
      src={assetUrl(`img/${collection}/${photo}-${smallWidth}.webp`)}
      srcSet={`${assetUrl(`img/${collection}/${photo}-${smallWidth}.webp`)} ${smallWidth}w, ${assetUrl(`img/${collection}/${photo}-${largeWidth}.webp`)} ${largeWidth}w`}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={decorative ? '' : asset.alt}
      loading={critical ? 'eager' : 'lazy'}
      fetchPriority={critical ? 'high' : 'auto'}
      decoding="async"
      data-critical={critical || undefined}
      onError={() => setFailed(true)}
    />
  )
}
