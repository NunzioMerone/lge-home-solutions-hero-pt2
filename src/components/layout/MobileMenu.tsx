import { Link } from 'react-router-dom'
import { navigation } from '../../data/navigation'
import { products } from '../../data/products'
import type { MobileMenuProps } from '../../types/navigation'
import styles from './Header.module.css'

export function MobileMenu({
  open,
  activePath,
  solutionsActive,
  sectionsOpen,
  onToggleSections,
  onNavigate,
}: MobileMenuProps) {
  return (
    <div className={styles.mobileMenu} id="mobile-navigation" inert={!open} aria-hidden={!open}>
      <div className={styles.mobileContent}>
        <nav aria-label="Navigazione mobile">
          <ul className={styles.mobileLinks}>
            <li>
              <Link
                to={navigation.home.path}
                aria-current={activePath === navigation.home.path ? 'location' : undefined}
                onClick={onNavigate}
              >
                {navigation.home.label}
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={onToggleSections}
                aria-expanded={sectionsOpen}
                aria-controls="mobile-sections"
                aria-current={solutionsActive ? 'location' : undefined}
                className={styles.mobileSectionsToggle}
              >
                Soluzioni <span className={styles.chevron} aria-hidden="true" />
              </button>
              <div
                className={`${styles.accordion} ${sectionsOpen ? styles.accordionOpen : ''}`}
                inert={!sectionsOpen}
                aria-hidden={!sectionsOpen}
                id="mobile-sections"
              >
                <div>
                  <ul className={styles.mobileProducts}>
                    {products.map((product) => (
                      <li key={product.id}>
                        <Link to={product.path} onClick={onNavigate}>
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <Link
                to={navigation.work.path}
                aria-current={activePath === navigation.work.path ? 'location' : undefined}
                onClick={onNavigate}
              >
                {navigation.work.label}
              </Link>
            </li>
            {[navigation.competencies, navigation.reviews, navigation.contact].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={activePath === item.path ? 'location' : undefined}
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
