import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'
import { products } from '../src/data/products.ts'
import { privacyPage } from '../src/config/privacy.ts'
import { competenciesPage } from '../src/config/competencies.ts'
import { worksPage } from '../src/config/works.ts'

const output = new URL('../dist/', import.meta.url)
const homepage = new URL('index.html', output)

// Static entry points let GitHub Pages serve direct visits to the existing routes.
for (const product of products) {
  const directory = new URL(`${product.path.slice(1)}/`, output)
  await mkdir(directory, { recursive: true })
  await copyFile(homepage, new URL('index.html', directory))
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]
  })
}

const sourceHtml = await readFile(homepage, 'utf8')
const publicPreview = process.env.VITE_PUBLIC_PREVIEW === 'true'
const informationPages = [
  { ...privacyPage, robots: privacyPage.approved ? undefined : 'noindex, nofollow' },
  { ...competenciesPage, robots: undefined },
  { ...worksPage, robots: undefined },
]

for (const page of informationPages) {
  const directory = new URL(`${page.path.slice(1)}/`, output)
  const robots = publicPreview ? 'noindex, nofollow' : page.robots
  const html = sourceHtml
    .replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>\s*/g, '')
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`,
    )
    .replace(
      '</head>',
      `${robots ? `<meta name="robots" content="${escapeHtml(robots)}" />\n  ` : ''}</head>`,
    )
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), html)
}

await writeFile(new URL('.nojekyll', output), '')
process.stdout.write(`GitHub Pages entry points prepared in ${fileURLToPath(output)}\n`)
