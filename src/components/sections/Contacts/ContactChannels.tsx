import { contacts } from '../../../config/contacts'
import { getContactLinks } from '../../../utils/contactLinks'
import { Icon } from '../../ui/Icon'
import styles from './Contacts.module.css'

export function ContactChannels() {
  const links = getContactLinks(contacts)
  if (!links.instagram) return null
  return (
    <a
      className={styles.instagram}
      href={links.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Segui LGE su Instagram (nuova scheda)"
    >
      <Icon name="instagram" />
      <span className={styles.textLink}>
        Seguici su Instagram <Icon name="arrow" />
      </span>
    </a>
  )
}
