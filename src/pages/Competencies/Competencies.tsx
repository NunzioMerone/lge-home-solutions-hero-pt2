import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { Icon } from '../../components/ui/Icon'
import { contacts } from '../../config/contacts'
import { competencies, recognitions } from '../../data/competencies'
import { competencyDocumentGroups } from '../../data/competencyDocuments'
import { competencyDetails } from '../../data/competencyDetails'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import { useCompetenciesReveal } from '../../hooks/useCompetenciesReveal'
import { getContactLinks } from '../../utils/contactLinks'
import { assetUrl } from '../../utils/assetUrl'
import type { DocumentSelection } from '../../types/competencyDocuments'
import { DocumentPreview } from './DocumentPreview'
import { DocumentViewer } from './DocumentViewer'
import styles from './Competencies.module.css'

export function Competencies() {
  const { hash } = useLocation()
  const [selection, setSelection] = useState<DocumentSelection | null>(null)
  const contactLinks = getContactLinks(contacts)
  const contentRef = useCompetenciesReveal()
  useAnchorNavigation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#competencies-content">
        Vai alle competenze
      </a>
      <Header />
      <main id="competencies-content" className={styles.main} tabIndex={-1} ref={contentRef}>
        <div className={`container ${styles.intro}`}>
          <header className={styles.heading}>
            <h1>
              La qualità nasce dalla <em>competenza</em>
            </h1>
            <p>
              Dalla scelta dei materiali alla posa, uniamo preparazione tecnica, precisione e
              attenzione per risultati che durano nel tempo.
            </p>
          </header>
          <nav className={styles.anchors} aria-label="Contenuti della pagina">
            <Link to="#qualifiche">Qualifiche professionali</Link>
            <Link to="#riconoscimenti">Riconoscimenti e collaborazioni</Link>
          </nav>
        </div>

        <section
          className={styles.qualifications}
          id="qualifiche"
          aria-labelledby="qualifications-title"
        >
          <div className="container">
            <h2 className={styles.sectionTitle} id="qualifications-title" data-competency-reveal>
              Preparazione tecnica, <em>cura del dettaglio</em>
            </h2>
          </div>
          {competencies.map((credential) => {
            const group = competencyDocumentGroups.find(
              (item) => item.credentialId === credential.id,
            )
            return (
              <article className={styles.qualification} key={credential.id}>
                <div className={`container ${styles.qualificationInner}`} data-competency-reveal>
                  <div className={styles.credentialCopy}>
                    <span className={styles.credentialIcon}>
                      <Icon name={credential.icon} />
                    </span>
                    <div>
                      <h3>{credential.title}</h3>
                      <p className={styles.label}>{credential.label}</p>
                      <div className={styles.description}>
                        {(competencyDetails[credential.id] ?? [credential.description]).map(
                          (paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                  {group && (
                    <div className={styles.documentsBlock}>
                      <div className={styles.documents}>
                        {group.documents.map((document) => (
                          <DocumentPreview
                            key={document.id}
                            document={document}
                            onOpen={setSelection}
                          />
                        ))}
                      </div>
                      <p className={styles.groupCaption}>{group.caption}</p>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </section>

        <section
          className={styles.recognitions}
          id="riconoscimenti"
          aria-labelledby="recognitions-title"
        >
          <div className="container">
            <h2 className={styles.sectionTitle} id="recognitions-title" data-competency-reveal>
              Riconoscimenti e <em>collaborazioni</em>
            </h2>
            <div className={styles.recognitionGrid}>
              {recognitions.map((recognition) => {
                const group = competencyDocumentGroups.find(
                  (item) => item.credentialId === recognition.id,
                )
                return (
                  <article
                    className={`${styles.recognition} ${group ? styles.featured : ''}`}
                    key={recognition.id}
                    data-competency-reveal
                  >
                    <div className={styles.credentialCopy}>
                      <span className={styles.credentialIcon}>
                        <Icon name={recognition.icon} />
                      </span>
                      <div>
                        <h3>{recognition.title}</h3>
                        <p className={styles.label}>{recognition.label}</p>
                        <div className={styles.description}>
                          {(competencyDetails[recognition.id] ?? [recognition.description]).map(
                            (paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                    {group && (
                      <div className={styles.recognitionDocument}>
                        {group.documents.map((document) => (
                          <DocumentPreview
                            key={document.id}
                            document={document}
                            onOpen={setSelection}
                          />
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section
          className={`container ${styles.contact}`}
          aria-labelledby="competencies-contact-title"
          data-competency-reveal
        >
          <h2 className={styles.sectionTitle} id="competencies-contact-title">
            Parliamo del tuo <em>progetto</em>
          </h2>
          <p>Prendi un appuntamento: troviamo insieme la soluzione per i tuoi spazi.</p>
          {contactLinks.whatsapp && (
            <a
              className={styles.contactButton}
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assetUrl('icons/whatsapp-white.svg')} width="22" height="22" alt="" />
              Prenota su WhatsApp
              <span className="sr-only"> in una nuova scheda</span>
            </a>
          )}
        </section>
      </main>
      <Footer />
      {selection && <DocumentViewer {...selection} onClose={() => setSelection(null)} />}
    </div>
  )
}
