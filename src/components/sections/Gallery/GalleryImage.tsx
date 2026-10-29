import { useState } from 'react'
import type { GalleryImageProps } from '../../../types/gallery'
import { assetUrl } from '../../../utils/assetUrl'

export function GalleryImage({
  photo,
  full = false,
  sizes,
  loading,
  fetchPriority,
}: GalleryImageProps) {
  const [failed, setFailed] = useState(false)
  const source = (width: number) => assetUrl(`img/gallery-real/${photo.id}-${width}.webp`)
  if (failed) {
    return (
      <span role="img" aria-label={photo.alt}>
        Immagine temporaneamente non disponibile
      </span>
    )
  }
  return (
    <img
      src={source(full ? photo.fullWidth : photo.previewWidths[0])}
      srcSet={
        full
          ? undefined
          : photo.previewWidths.map((width) => `${source(width)} ${width}w`).join(', ')
      }
      sizes={
        full ? undefined : (sizes ?? '(min-width: 1200px) 480px, (min-width: 700px) 42vw, 74vw')
      }
      width={photo.width}
      height={photo.height}
      alt={full ? photo.alt : ''}
      loading={loading ?? (full ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}
