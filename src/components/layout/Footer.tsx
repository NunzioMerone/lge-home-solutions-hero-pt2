import { Link } from 'react-router-dom'
import { contacts } from '../../config/contacts'
import { site } from '../../config/site'
import { privacyPage } from '../../config/privacy'
import { competenciesPage } from '../../config/competencies'
import { worksPage } from '../../config/works'
import { products } from '../../data/products'
import { getContactLinks } from '../../utils/contactLinks'
import { assetUrl } from '../../utils/assetUrl'
import { Icon } from '../ui/Icon'
import styles from './Footer.module.css'

export function Footer() {
  const links = getContactLinks(contacts)
  const socialLinks = [
    {
      icon: 'whatsapp',
      label: `WhatsApp al numero ${contacts.whatsapp}`,
      href: links.whatsapp,
    },
    {
      icon: 'instagram',
      label: 'Instagram di LGE Home Solutions',
      href: links.instagram,
    },
  ] as const
  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.main}>
          <div className={styles.identity}>
            <Link
              className={styles.brand}
              to="/#inizio"
              aria-label="LGE Home Solutions, torna in cima"
            >
              <img
                src={site.whiteLogo}
                alt="LGE — Il design per il tuo benessere"
                width="1000"
                height="1000"
                loading="lazy"
              />
            </Link>
            <address className={styles.contact}>
              {links.phone && (
                <a className={styles.contactRow} href={links.phone}>
                  <span className={styles.contactIcon}>
                    <Icon name="phone" />
                  </span>
                  <span>{contacts.phone}</span>
                </a>
              )}
              <a
                className={styles.contactRow}
                href={contacts.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.contactIcon}>
                  <Icon name="pin" />
                </span>
                <span>
                  {contacts.address}
                  <br />
                  {contacts.locality} ({contacts.province})
                </span>
              </a>
              {links.email && (
                <a className={styles.contactRow} href={links.email}>
                  <span className={styles.contactIcon}>
                    <Icon name="mail" />
                  </span>
                  <span>{contacts.email}</span>
                </a>
              )}
            </address>
          </div>
          <nav className={styles.products} aria-label="Soluzioni nel footer">
            <h2>Soluzioni</h2>
            {products.map(({ id, title, path }) => (
              <Link to={path} key={id}>
                {title}
              </Link>
            ))}
          </nav>
          <nav className={styles.navigation} aria-label="Navigazione nel footer">
            <h2>Esplora</h2>
            {site.sections
              .filter(({ id }) => id !== 'prodotti')
              .map(({ id, label }) => (
                <Link
                  to={
                    id === 'competenze'
                      ? competenciesPage.path
                      : id === 'lavori'
                        ? worksPage.path
                        : `/#${id}`
                  }
                  key={id}
                >
                  {label}
                </Link>
              ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>© {new Date().getFullYear()} LGE Home Solutions</span>
          <Link className={styles.legal} to={privacyPage.path}>
            Privacy Policy
          </Link>
          <div className={styles.socials} aria-label="Social LGE">
            {socialLinks.map(({ icon, label, href }) =>
              href ? (
                <a
                  className={styles.socialIcon}
                  href={href}
                  key={icon}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon === 'whatsapp' ? (
                    <img
                      src={assetUrl('icons/whatsapp-white.svg')}
                      alt=""
                      width="24"
                      height="24"
                      loading="lazy"
                    />
                  ) : (
                    <Icon name={icon} />
                  )}
                </a>
              ) : null,
            )}
          </div>
        </div>
        {(contacts.legalName || contacts.vatNumber) && (
          <p className={styles.fiscal}>
            {contacts.legalName}
            {contacts.vatNumber && ` · P. IVA ${contacts.vatNumber}`}
          </p>
        )}
      </div>
    </footer>
  )
}
