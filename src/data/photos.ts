import type { PhotoAsset, PhotoId } from '../types/content'

export const photos: Record<PhotoId, PhotoAsset> = {
  security: {
    id: 'security',
    alt: 'Fotografia dimostrativa: porta di ingresso antracite con maniglione in una villa in pietra naturale',
    width: 1024,
    height: 1536,
  },
  windows: {
    id: 'windows',
    alt: 'Fotografia dimostrativa: grandi infissi con profili sottili in un soggiorno affacciato sul Mediterraneo',
    width: 1024,
    height: 1536,
  },
  outdoor: {
    id: 'outdoor',
    alt: 'Fotografia dimostrativa: pergola bioclimatica con arredi chiari e illuminazione calda su una terrazza',
    width: 1024,
    height: 1536,
  },
  shading: {
    id: 'shading',
    alt: 'Fotografia dimostrativa: frangisole orientabili in metallo su una facciata in pietra chiara',
    width: 1024,
    height: 1536,
  },
  interior: {
    id: 'interior',
    alt: 'Fotografia dimostrativa: porta interna in rovere aperta verso un ambiente luminoso',
    width: 1024,
    height: 1536,
  },
}
