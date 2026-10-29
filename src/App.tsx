import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { ProductPlaceholder } from './pages/ProductPlaceholder/ProductPlaceholder'
import { products } from './data/products'
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrivacyPolicy'
import { Competencies } from './pages/Competencies/Competencies'
import { competenciesPage } from './config/competencies'
import { worksPage } from './config/works'
import { Works } from './pages/Works/Works'
import { privacyPage } from './config/privacy'
import { usePageMetadata } from './hooks/usePageMetadata'
import { getPageMetadata } from './utils/pageMetadata'

export default function App() {
  const { pathname } = useLocation()
  usePageMetadata(getPageMetadata(pathname))
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={privacyPage.path} element={<PrivacyPolicy />} />
      <Route path={competenciesPage.path} element={<Competencies />} />
      <Route path={worksPage.path} element={<Works />} />
      {products.map((product) => (
        <Route key={product.path} path={product.path} element={<ProductPlaceholder />} />
      ))}
      <Route path="*" element={<ProductPlaceholder />} />
    </Routes>
  )
}
