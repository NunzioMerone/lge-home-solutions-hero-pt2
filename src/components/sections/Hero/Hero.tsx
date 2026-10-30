import { heroCopy } from '../../../data/hero'
import { useHeroEntrance } from '../../../hooks/useHeroEntrance'
import { contacts } from '../../../config/contacts'
import { getContactLinks } from '../../../utils/contactLinks'
import { assetUrl } from '../../../utils/assetUrl'
import { Icon } from '../../ui/Icon'
import styles from './Hero.module.css'

export function Hero() {
  const rootRef = useHeroEntrance()
  const links = getContactLinks(contacts)
  return (
    <section ref={rootRef} className={styles.hero} id="inizio" aria-labelledby="hero-title">
      <picture className={styles.backdrop} aria-hidden="true">
        <source
          media="(max-width: 999px)"
          srcSet={`${assetUrl('img/hero-scene/mobile-480.webp')} 480w, ${assetUrl('img/hero-scene/mobile-850.webp')} 850w`}
          sizes="100vw"
          width="850"
          height="1850"
        />
        <img
          src={assetUrl('img/hero-scene/desktop-1280.webp')}
          srcSet={`${assetUrl('img/hero-scene/desktop-960.webp')} 960w, ${assetUrl('img/hero-scene/desktop-1280.webp')} 1280w, ${assetUrl('img/hero-scene/desktop-1672.webp')} 1672w`}
          sizes="100vw"
          width="1672"
          height="941"
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>
      <div className={`container ${styles.content}`}>
        <div className={styles.introduction} data-introduction>
          <p className={styles.eyebrow} data-hero-eyebrow>
            LGE Home Solutions
          </p>
          <h1 id="hero-title">
            <span className="sr-only">
              {heroCopy.prefix} {heroCopy.phrases[0]}
            </span>
            <span className={styles.headingVisual} aria-hidden="true">
              <span className={styles.prefix} data-hero-prefix>
                {heroCopy.prefix}
              </span>
              <span className={styles.suffixSlot}>
                {heroCopy.phrases.map((phrase) => (
                  <span className={styles.phrase} key={phrase} data-hero-phrase>
                    {phrase}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <p className={styles.subtitle} data-hero-subtitle>
            {heroCopy.subtitle}
          </p>
          {links.whatsapp && (
            <a
              className={styles.whatsapp}
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-hero-action
            >
              Scrivici su WhatsApp <Icon name="arrow" />
              <span className="sr-only"> al numero {contacts.whatsapp}, in una nuova scheda</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
