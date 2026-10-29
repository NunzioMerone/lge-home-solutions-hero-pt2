import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import { MotionProvider } from './components/ui/MotionProvider'
import App from './App'
import './styles/global.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element is missing')
createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MotionProvider>
        <App />
      </MotionProvider>
    </BrowserRouter>
  </StrictMode>,
)
