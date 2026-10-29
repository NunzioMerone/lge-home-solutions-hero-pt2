import type { PhotoAsset, PhotoId } from '../types/content'

export const heroPhotos: Record<PhotoId, PhotoAsset> = {
  windows: {
    id: 'windows',
    alt: 'Infisso a due ante in legno affacciato sul giardino',
    width: 1000,
    height: 1000,
  },
  shading: {
    id: 'shading',
    alt: 'Schermature a lame orizzontali sulla facciata di una casa contemporanea',
    width: 1539,
    height: 1022,
  },
  security: {
    id: 'security',
    alt: 'Porta di ingresso in legno con maniglione e vetrate laterali',
    width: 1383,
    height: 1137,
  },
  interior: {
    id: 'interior',
    alt: 'Porta interna in legno chiaro con inserto in vetro in un soggiorno moderno',
    width: 1500,
    height: 1049,
  },
  outdoor: {
    id: 'outdoor',
    alt: 'Pergola contemporanea illuminata al crepuscolo, affacciata sul giardino',
    width: 1564,
    height: 1006,
  },
}
