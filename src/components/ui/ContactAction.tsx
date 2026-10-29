import type { ContactActionProps } from '../../types/ui'
import { Icon } from './Icon'
import styles from './ContactAction.module.css'

export function ContactAction({
  label,
  icon,
  href,
  primary = false,
  compact = false,
}: ContactActionProps) {
  const className = `${styles.action} ${primary ? styles.primary : ''} ${compact ? styles.compact : ''}`
  const children = (
    <>
      <Icon name={icon} />
      <span>{label}</span>
      <Icon name="arrow" />
    </>
  )
  return href ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <button className={className} type="button" disabled title="Recapito aziendale da confermare">
      {children}
    </button>
  )
}
