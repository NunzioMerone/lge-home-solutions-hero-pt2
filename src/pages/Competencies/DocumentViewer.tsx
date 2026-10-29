import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../../components/ui/Icon'
import type { DocumentViewerProps } from '../../types/competencyDocuments'
import styles from './DocumentViewer.module.css'

export function DocumentViewer({ document, trigger, onClose }: DocumentViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const backdropPointerDown = useRef(false)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const htmlOverflow = window.document.documentElement.style.overflow
    const bodyOverflow = window.document.body.style.overflow
    window.document.documentElement.style.overflow = 'hidden'
    window.document.body.style.overflow = 'hidden'
    dialog.showModal()
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      dialog.close()
      window.document.documentElement.style.overflow = htmlOverflow
      window.document.body.style.overflow = bodyOverflow
      if (trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [trigger])

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={`${document.title}: ${document.holder}`}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onPointerDown={(event) => {
        backdropPointerDown.current = event.target === event.currentTarget
      }}
      onPointerCancel={() => {
        backdropPointerDown.current = false
      }}
      onClick={(event) => {
        const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect()
        const outside =
          event.clientX < left ||
          event.clientX > right ||
          event.clientY < top ||
          event.clientY > bottom
        // A gesture beginning in the document must not close it when it ends outside.
        if (backdropPointerDown.current && event.target === event.currentTarget && outside) {
          onClose()
        }
        backdropPointerDown.current = false
      }}
    >
      <div className={styles.media}>
        <img
          src={document.preview}
          alt={`${document.caption}. Intestato a ${document.holder}.`}
          width={document.width}
          height={document.height}
          draggable={false}
        />
      </div>
      <button
        ref={closeRef}
        className={styles.close}
        type="button"
        aria-label="Chiudi attestato"
        onClick={onClose}
      >
        <Icon name="close" />
      </button>
    </dialog>,
    window.document.body,
  )
}
