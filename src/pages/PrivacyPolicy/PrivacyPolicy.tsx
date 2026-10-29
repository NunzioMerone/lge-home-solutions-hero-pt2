import { useEffect } from 'react'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { contacts } from '../../config/contacts'
import {
  privacyContact,
  privacyContent,
  privacyPage,
  privacyReview,
  privacySources,
} from '../../config/privacy'
import { getContactLinks } from '../../utils/contactLinks'
import styles from './PrivacyPolicy.module.css'

export function PrivacyPolicy() {
  const links = getContactLinks({ ...contacts, phone: privacyContact.phone })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#informativa">
        Vai all’informativa
      </a>
      <Header />
      <main className={styles.main} id="informativa" tabIndex={-1}>
        <header className={styles.heading}>
          <h1>Privacy Policy</h1>
          <p className={styles.intro}>
            Le informazioni essenziali sui tuoi dati quando visiti il sito o contatti LGE.
          </p>
          <p className={styles.updated}>
            Ultimo aggiornamento:{' '}
            <time dateTime={privacyPage.updatedAt}>{privacyPage.updatedLabel}</time>
          </p>
        </header>

        <article
          className={styles.content}
          aria-label="Informativa sul trattamento dei dati personali"
        >
          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller">1. Chi tratta i dati</h2>
            <p>
              Il titolare del trattamento è la società{' '}
              <strong>{privacyReview.controller.value}</strong>, con sede in{' '}
              {privacyReview.address.value}. L’amministratore della società è{' '}
              {privacyContact.administrator}.
            </p>
            <p>
              Per informazioni sulla privacy o per esercitare i tuoi diritti puoi scrivere a{' '}
              {links.email ? (
                <a href={links.email}>{contacts.email}</a>
              ) : (
                'LGE tramite i recapiti aziendali'
              )}
              . Puoi inoltre contattarci al{' '}
              {links.phone ? (
                <a href={links.phone}>{privacyContact.phone}</a>
              ) : (
                privacyContact.phone
              )}
              .
            </p>
          </section>

          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data">2. Quali dati e per quali scopi</h2>
            <p>
              Questo è un sito vetrina: non contiene moduli, registrazioni, newsletter o acquisti
              online. I trattamenti legati alla visita e ai contatti sono i seguenti:
            </p>
            <ul>
              <li>
                <strong>Navigazione e mappa:</strong> indirizzo IP, risorse richieste e dati tecnici
                del browser servono a mostrare il sito, proteggerlo e individuare il punto vendita.
                Il trattamento si basa sull’interesse legittimo al funzionamento e alla sicurezza
                del sito e a fornire la mappa del punto vendita (art. 6.1.f GDPR).
              </li>
              <li>
                <strong>Contatti:</strong> se ci scrivi o ci chiami, utilizziamo i recapiti e le
                informazioni che ci comunichi per rispondere alla tua domanda o concordare un
                appuntamento. La base giuridica è l’esecuzione di misure precontrattuali richieste
                da te (art. 6.1.b GDPR) oppure, per le comunicazioni generiche, l’interesse
                legittimo a risponderti (art. 6.1.f).
              </li>
            </ul>
            <p>
              Il pulsante WhatsApp è un semplice collegamento alla chat aziendale: il clic non invia
              messaggi e il sito non acquisisce la conversazione. Sei tu a scegliere se scriverci e
              quali informazioni condividere. LGE riceve ciò che decidi di inviare.
            </p>
          </section>

          <section aria-labelledby="privacy-services">
            <h2 id="privacy-services">3. Servizi utilizzati dal sito</h2>
            <p className={styles.hostingNotice}>{privacyContent.hostingNotice}</p>
            <p>
              La mappa carica immagini da <strong>OpenStreetMap</strong> quando ci si avvicina alla
              sezione contatti. Il servizio riceve l’indirizzo IP e i dati tecnici della richiesta,
              senza richiedere l’accesso alla posizione del dispositivo, e utilizza server
              distribuiti in diversi Paesi. Dettagli nell’
              <a href={privacySources.osmPrivacy}>informativa OpenStreetMap</a>.
            </p>
            <p>
              WhatsApp, Instagram e Google Maps si aprono solo quando selezioni i rispettivi
              collegamenti. L’utilizzo di questi servizi esterni è descritto nelle loro informative:{' '}
              <a href={privacySources.whatsappPrivacy}>WhatsApp</a>,{' '}
              <a href={privacySources.instagramPrivacy}>Instagram</a>,{' '}
              <a href={privacySources.googlePrivacy}>Google</a>.
            </p>
          </section>

          <section aria-labelledby="privacy-storage">
            <h2 id="privacy-storage">4. Cookie e preferenze</h2>
            <p>
              L’applicazione non utilizza analytics, pixel pubblicitari o cookie propri. Salva nella
              memoria di sessione della scheda una preferenza tecnica per le animazioni, senza
              inviarla a un server. Font e fotografie sono ospitati insieme al sito.
            </p>
            <p>Per questa preferenza tecnica non è necessario un banner di consenso.</p>
          </section>

          <section aria-labelledby="privacy-content">
            <h2 id="privacy-content">5. Fotografie e recensioni</h2>
            <p>
              Le fotografie mostrano gli spazi e i lavori di LGE. Per le foto scattate presso i
              clienti viene richiesto il consenso a fotografare e pubblicare. Quando il consenso
              riguarda dati personali, può essere revocato contattandoci, senza pregiudicare il
              trattamento effettuato prima della revoca.
            </p>
            <p>
              Le recensioni provengono dalla scheda Google di LGE e riportano il nome dell’autore,
              la valutazione, l’eventuale commento e la data. Sono attualmente riportate e
              aggiornate manualmente: visualizzarle non attiva un collegamento automatico a Google.
              Per segnalare un contenuto o richiedere una rettifica o rimozione puoi scriverci
              all’email indicata in questa pagina.
            </p>
          </section>

          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention">6. Per quanto tempo</h2>
            <p>{privacyReview.contactRetention.value ?? privacyContent.contactRetention}</p>
            <p>
              La preferenza delle animazioni rimane nella memoria di sessione della scheda del
              browser. Per i dati trattati dai servizi esterni valgono le rispettive informative.
            </p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">7. I tuoi diritti</h2>
            <p>
              Nei casi previsti dal <a href={privacySources.gdpr}>GDPR</a> puoi chiedere accesso,
              rettifica, cancellazione, limitazione e portabilità dei dati, oppure opporti ai
              trattamenti basati sul legittimo interesse. Scrivi a{' '}
              {links.email ? (
                <a href={links.email}>{contacts.email}</a>
              ) : (
                'LGE tramite i recapiti aziendali'
              )}
              : riceverai riscontro di norma entro un mese, salvo le proroghe motivate previste
              dalla normativa.
            </p>
            <p>
              Puoi inoltre presentare reclamo al{' '}
              <a href={privacySources.garante}>Garante per la protezione dei dati personali</a>.
              Questa informativa sarà aggiornata quando cambieranno i servizi o il trattamento dei
              dati.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
