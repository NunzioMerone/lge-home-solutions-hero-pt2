import { assetUrl } from '../utils/assetUrl'

export const site = {
  name: 'LGE Home Solutions',
  title: 'LGE Home Solutions — Il design per il tuo benessere',
  description:
    'LGE Home Solutions, Monte di Procida. Infissi, porte, oscuranti e soluzioni outdoor: il design per il tuo benessere.',
  logo: assetUrl('img/brand/lge-navbar-horizontal-flat.webp'),
  colorLogo: assetUrl('img/brand/lge-horizontal-color.webp'),
  whiteLogo: assetUrl('img/brand/lge-footer-white-official.png'),
  sections: [
    { id: 'prodotti', label: 'Soluzioni' },
    { id: 'competenze', label: 'Competenze' },
    { id: 'lavori', label: 'I nostri lavori' },
    { id: 'recensioni', label: 'Recensioni' },
    { id: 'contatti', label: 'Contatti' },
  ],
} as const
