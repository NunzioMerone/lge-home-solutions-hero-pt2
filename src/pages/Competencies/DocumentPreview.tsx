import type { DocumentPreviewProps } from '../../types/competencyDocuments'
import { Icon } from '../../components/ui/Icon'
import styles from './Competencies.module.css'

export function DocumentPreview({ document, onOpen }: DocumentPreviewProps) {
  return (
    <button
      type="button"
      className={styles.document}
      onClick={(event) => onOpen({ document, trigger: event.currentTarget })}
      aria-label={`Visualizza ${document.title}: ${document.holder}`}
      aria-haspopup="dialog"
    >
      <span className={styles.documentImage}>
        <img
          src={document.thumbnail ?? document.preview}
          alt=""
          width={document.width}
          height={document.height}
          loading="lazy"
          decoding="async"
        />
        {document.format === 'pdf' && <span className={styles.documentFormat}>PDF</span>}
      </span>
      <span className={styles.documentHolder}>{document.holder}</span>
      <span className={styles.documentLink}>
        Visualizza <Icon name="external" />
      </span>
    </button>
  )
}
