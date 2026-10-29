import process from 'node:process'
import { privacyPage, privacyReview } from '../src/config/privacy.ts'

const missing = Object.values(privacyReview).filter(({ value }) => !value?.trim())

if (!privacyPage.approved || missing.length > 0) {
  process.stderr.write('Privacy Policy: la bozza non è pronta per la pubblicazione.\n')
  for (const { label } of missing) process.stderr.write(`- Da completare: ${label}\n`)
  if (!privacyPage.approved) {
    process.stderr.write(
      '- Verificare il testo con il titolare e impostare approved solo dopo la revisione.\n',
    )
  }
  process.exitCode = 1
} else {
  process.stdout.write('Privacy Policy: dati compilati e revisione confermata.\n')
}
