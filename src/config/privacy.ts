import type { PrivacyReviewItem } from '../types/privacy'

// Review record: completed entries record their source, not a legal certification.
// Remaining checks stay here instead of repeating a checklist in the public-facing text.
// See references/privacy-audit.md. The privacy phone below is separate from general contacts.
export const privacyContact = {
  administrator: 'Lemuel Schiano Lomoriello',
  phone: '+39 329 826 5371',
} as const

export const privacyReview = {
  // Company name and address confirmed directly by the user on 29 October 2026.
  controller: {
    label: 'denominazione completa del titolare del trattamento',
    value: 'LGE Home Solutions S.a.s. di Schiano Lomoriello Lemuel',
  },
  address: {
    label: 'sede e indirizzo per le comunicazioni al titolare',
    value: 'Via Roma, 29 — 80070 Monte di Procida (NA)',
  },
  contact: {
    label: 'email o altro recapito dedicato alle richieste privacy',
    value: 'info@lgesolutions.it',
  },
  providers: {
    label: 'hosting definitivo, soggetti con accesso ai dati e rispettivi ruoli',
    value: null,
  },
  transfers: {
    label: 'paesi, garanzie e modalità per ottenerne copia per i trasferimenti applicabili',
    value: null,
  },
  technicalRetention: {
    label: 'durata o criteri dei log di hosting e mappa, con le relative fonti',
    value: null,
  },
  contactRetention: {
    label: 'tempi o criteri effettivi di conservazione delle richieste e delle chat aziendali',
    value: null,
  },
  publishedContent: {
    label: 'base giuridica, informative e conservazione per recensioni e foto riconoscibili',
    // The user confirms permission to photograph and publish client projects.
    // Review reuse and the future Google API still require their own assessment.
    value: null,
  },
  legitimateInterests: {
    label:
      'valutazione degli interessi legittimi per navigazione, sicurezza, mappa e richieste generiche',
    value: null,
  },
} satisfies Record<string, PrivacyReviewItem>

// Visitor-facing preview copy; internal review status is kept separate above.
export const privacyContent = {
  hostingNotice:
    'Hosting — da completare. Questa parte sarà perfezionata alla scelta dell’hosting definitivo, indicando il fornitore, la gestione e la conservazione dei dati tecnici ed eventuali trasferimenti di dati fuori dallo Spazio Economico Europeo.',
  contactRetention:
    'I dati comunicati per una richiesta sono trattati per il tempo necessario a rispondere e gestire l’eventuale seguito. Una conservazione ulteriore è limitata ai dati necessari per obblighi applicabili o per tutelare un diritto.',
} as const

export const privacyPage = {
  path: '/privacy-policy',
  title: 'Privacy Policy — LGE Home Solutions',
  description:
    'Informativa sul trattamento dei dati durante la navigazione nel sito LGE Home Solutions, sui servizi esterni e sui diritti degli interessati.',
  updatedAt: '2026-10-29',
  updatedLabel: '29 ottobre 2026',
  // Set only after the missing details and the text have been reviewed by the controller.
  approved: false,
} as const

export const privacySources = {
  gdpr: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/ita',
  garante:
    'https://www.garanteprivacy.it/home/diritti/come-agire-per-tutelare-i-tuoi-dati-personali',
  cookies: 'https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876',
  githubPages:
    'https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection',
  githubPrivacy:
    'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
  osmPrivacy: 'https://osmfoundation.org/wiki/Privacy_Policy',
  whatsappPrivacy: 'https://www.whatsapp.com/legal/privacy-policy-eea',
  googlePrivacy: 'https://policies.google.com/privacy?hl=it',
  instagramPrivacy: 'https://privacycenter.instagram.com/policy/',
} as const
