import { Link, useLocation } from 'react-router-dom'
import { site } from '../../config/site'
import { navigation } from '../../data/navigation'
import { products } from '../../data/products'
import { useHeaderNavigation } from '../../hooks/useHeaderNavigation'
import { useScrollThreshold } from '../../hooks/useScrollThreshold'
import { MobileMenu } from './MobileMenu'
import styles from './Header.module.css'

export function Header() {
  const { hash, pathname: routePath } = useLocation()
  const pathname = routePath.replace(/\/+$/, '') || '/'
  const activePath = pathname === '/' ? `/${hash || '#inizio'}` : pathname
  const solutionsActive = products.some((product) => product.path === pathname)
  const scrolled = useScrollThreshold(24)
  const {
    rootRef,
    sectionsRef,
    sectionsButtonRef,
    menuButtonRef,
    sectionsOpen,
    mobileOpen,
    mobileSectionsOpen,
    toggleSections,
    toggleMobile,
    toggleMobileSections,
    closeSections,
    closeNavigation,
  } = useHeaderNavigation()
  return (
    <header
      ref={rootRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${mobileOpen ? styles.menuOpen : ''}`}
      role={mobileOpen ? 'dialog' : undefined}
      aria-modal={mobileOpen || undefined}
      aria-label={mobileOpen ? 'Menu di navigazione' : undefined}
    >
      <div className={styles.surface} data-header-chrome aria-hidden="true" />
      <div className={styles.bar}>
        <nav className={styles.desktopNav} aria-label="Navigazione principale" data-header-chrome>
          <Link
            to={navigation.home.path}
            className={styles.navigationLink}
            aria-current={activePath === navigation.home.path ? 'location' : undefined}
            onClick={closeNavigation}
          >
            {navigation.home.label}
          </Link>
          <div
            className={styles.sections}
            ref={sectionsRef}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closeSections()
            }}
          >
            <button
              ref={sectionsButtonRef}
              className={styles.navigationLink}
              type="button"
              onClick={toggleSections}
              aria-expanded={sectionsOpen}
              aria-controls="desktop-sections"
              aria-current={solutionsActive ? 'location' : undefined}
            >
              Soluzioni <span className={styles.chevron} aria-hidden="true" />
            </button>
            <ul
              className={`${styles.dropdown} ${sectionsOpen ? styles.dropdownOpen : ''}`}
              id="desktop-sections"
              inert={!sectionsOpen}
              aria-hidden={!sectionsOpen}
            >
              {products.map((product) => (
                <li key={product.id}>
                  <Link to={product.path} onClick={closeNavigation}>
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to={navigation.work.path}
            className={styles.navigationLink}
            aria-current={activePath === navigation.work.path ? 'location' : undefined}
            onClick={closeNavigation}
          >
            {navigation.work.label}
          </Link>
        </nav>
        <Link
          to={navigation.home.path}
          className={styles.brand}
          aria-label="LGE, homepage"
          onClick={closeNavigation}
        >
          <img
            src={site.logo}
            alt=""
            width="2172"
            height="724"
            data-logo
            data-critical
            fetchPriority="high"
          />
        </Link>
        <div className={styles.right} data-header-chrome>
          {[navigation.competencies, navigation.reviews, navigation.contact].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.contactLink} ${styles.navigationLink}`}
              aria-current={activePath === item.path ? 'location' : undefined}
              onClick={closeNavigation}
            >
              {item.label}
            </Link>
          ))}
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuToggle}
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu
        open={mobileOpen}
        activePath={activePath}
        solutionsActive={solutionsActive}
        sectionsOpen={mobileSectionsOpen}
        onToggleSections={toggleMobileSections}
        onNavigate={closeNavigation}
      />
    </header>
  )
}
