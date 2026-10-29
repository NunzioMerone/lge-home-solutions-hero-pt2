import { contacts } from '../../../config/contacts'
import { useSectionReveal } from '../../../hooks/useSectionReveal'
import { getContactLinks } from '../../../utils/contactLinks'
import { assetUrl } from '../../../utils/assetUrl'
import { Icon } from '../../ui/Icon'
import { ContactChannels } from './ContactChannels'
import { LocationMap } from './LocationMap'
import styles from './Contacts.module.css'

export function Contacts() {
  const ref = useSectionReveal()
  const links = getContactLinks(contacts)
  return (
    <section
      className={`section ${styles.section}`}
      id="contatti"
      aria-labelledby="contacts-title"
      ref={ref}
    >
      <div className="container">
        <div className={styles.layout}>
          <header className={styles.introduction} data-reveal>
            <h2 id="contacts-title" className={styles.heading}>
              Vieni a <em>trovarci</em>
            </h2>
            <p>
              Prendi un appuntamento: ti aspettiamo a Monte di Procida per scegliere insieme le
              soluzioni più adatte alla tua casa.
            </p>
            <div className={styles.actions}>
              {links.whatsapp && (
                <a
                  className={styles.whatsapp}
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Prenota su WhatsApp al numero ${contacts.whatsapp}`}
                >
                  <img src={assetUrl('icons/whatsapp-white.svg')} alt="" width="26" height="26" />
                  Prenota su WhatsApp
                </a>
              )}
              {links.phone && (
                <a
                  className={styles.textLink}
                  href={links.phone}
                  aria-label={`Chiamaci al numero ${contacts.phone}`}
                >
                  Chiamaci <Icon name="arrow" />
                </a>
              )}
            </div>
          </header>
          <dl className={styles.contactList} data-reveal>
            <div className={styles.detailRow}>
              <dt>
                <Icon name="pin" />
                Dove siamo
              </dt>
              <dd>
                <a href={contacts.mapUrl} target="_blank" rel="noopener noreferrer">
                  {contacts.address ?? contacts.locality}
                </a>
                <span>
                  {contacts.locality} ({contacts.province})
                </span>
              </dd>
            </div>
            <div className={styles.detailRow}>
              <dt>
                <Icon name="clock" />
                Orari
              </dt>
              <dd className={styles.hours}>
                {contacts.openingHours.map(({ days, hours }) => (
                  <div key={days}>
                    <span>{days}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
          <div className={styles.mapReveal} data-reveal>
            <LocationMap />
          </div>
          {(links.instagram || links.email) && (
            <div className={styles.social} data-reveal>
              <ContactChannels />
              {links.email && (
                <a className={styles.email} href={links.email}>
                  {contacts.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
