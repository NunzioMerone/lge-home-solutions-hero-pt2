import type { SectionHeadingProps } from '../../types/ui'
import styles from './SectionHeading.module.css'

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <header className={styles.heading} data-reveal>
      <h2 id={id}>{title}</h2>
      <span className={styles.line} data-heading-line aria-hidden="true" />
      {children && <div className={styles.details}>{children}</div>}
    </header>
  )
}
