import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import { Header } from '../../../src/components/layout/Header'
import { Footer } from '../../../src/components/layout/Footer'
import { Icon } from '../../../src/components/ui/Icon'
import { MotionProvider } from '../../../src/components/ui/MotionProvider'
import { gallery } from '../../../src/data/gallery'
import '../../../src/styles/global.css'
import './preview.css'

const groups = [
  {
    id: 'infissi',
    title: 'Infissi',
    description: 'La luce trova il suo spazio.',
    layout: 'landscape',
    photos: ['lge-0db25f41', 'lge-320edfa5', 'lge-8956c0db'],
  },
  {
    id: 'outdoor',
    title: 'Atelier Gibus',
    description: 'Nuovi modi di vivere l’esterno.',
    layout: 'landscape',
    photos: ['lge-89a82d37', 'lge-fb1ac1a2', 'lge-b0c2a00b'],
  },
  {
    id: 'porte',
    title: 'Porte interne e sicurezza',
    description: 'Dettagli che fanno parte della casa.',
    layout: 'portraits',
    photos: ['lge-3b069cab', 'lge-e7b0f444', 'lge-3087d625', 'lge-1bb377f9'],
  },
  {
    id: 'oscuranti',
    title: 'Oscuranti',
    description: 'Il giusto equilibrio tra luce e riservatezza.',
    layout: 'landscape',
    photos: ['lge-76cd6474', 'lge-0317eb86', 'lge-1e08fc98'],
  },
] as const

function WorksPreview() {
  return (
    <>
      <Header />
      <main className="works-preview">
        <header className="works-intro container">
          <p className="eyebrow">Realizzazioni LGE</p>
          <h1>
            I nostri <em>lavori</em>
          </h1>
          <p>
            Spazi reali, soluzioni su misura.
            <br />
            Una raccolta dei lavori firmati LGE.
          </p>
        </header>

        <div className="works-categories container" aria-label="Categorie proposte per la galleria">
          <div className="category-list">
            <span className="selected">Tutti i lavori</span>
            <a href="#infissi">Infissi</a>
            <a href="#oscuranti">Oscuranti</a>
            <a href="#porte">Porte e sicurezza</a>
            <a href="#porte">Porte interne</a>
            <span>Zanzariere</span>
            <a href="#outdoor">Atelier Gibus</a>
          </div>
        </div>

        <div className="works-collections container">
          {groups.map((group) => (
            <section className="work-collection" id={group.id} key={group.id}>
              <header className="collection-heading">
                <div>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
                <span className="collection-more">
                  Tutti i lavori <Icon name="arrow" />
                </span>
              </header>
              <div className={`collection-images ${group.layout}`}>
                {group.photos.map((id) => {
                  const photo = gallery.find((item) => item.id === id)
                  if (!photo) return null
                  return (
                    <figure className="work-photo" key={id}>
                      <img
                        src={`/img/gallery-real/${photo.id}-${photo.fullWidth}.webp`}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                      />
                    </figure>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="works-contact">
          <div className="container">
            <p className="eyebrow">Il prossimo spazio, il tuo</p>
            <h2>
              Diamo forma alle tue <em>idee</em>
            </h2>
            <p>Raccontaci cosa immagini per la tua casa. Troviamo insieme la soluzione.</p>
            <a href="/#contatti" className="contact-cta">
              Parliamo del tuo progetto <Icon name="arrow" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('Mockup root element is missing')
createRoot(root).render(
  <BrowserRouter>
    <MotionProvider>
      <WorksPreview />
    </MotionProvider>
  </BrowserRouter>,
)
