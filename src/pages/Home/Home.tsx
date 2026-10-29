import { Hero } from '../../components/sections/Hero/Hero'
import { Solutions } from '../../components/sections/Solutions/Solutions'
import { Partners } from '../../components/sections/Partners/Partners'
import { Certifications } from '../../components/sections/Certifications/Certifications'
import { Gallery } from '../../components/sections/Gallery/Gallery'
import { Reviews } from '../../components/sections/Reviews/Reviews'
import { Contacts } from '../../components/sections/Contacts/Contacts'
import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { useAnchorNavigation } from '../../hooks/useAnchorNavigation'
import styles from './Home.module.css'

export function Home() {
  useAnchorNavigation()
  return (
    <div className={styles.home}>
      <a className="skip-link" href="#prodotti">
        Vai alle soluzioni
      </a>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Partners />
        <Certifications />
        <Gallery />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </div>
  )
}
