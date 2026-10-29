import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products } from '../../data/products'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import styles from './ProductPlaceholder.module.css'

export function ProductPlaceholder() {
  const { pathname } = useLocation()
  const product = products.find((item) => item.path === pathname.replace(/\/+$/, ''))
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main} aria-labelledby="product-title">
        <div className={styles.content}>
          <h1 id="product-title">{product?.title ?? 'Pagina in preparazione'}</h1>
          <p>
            Questa sezione è in preparazione. Presto troverai tutti i dettagli sulle nostre
            soluzioni.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
