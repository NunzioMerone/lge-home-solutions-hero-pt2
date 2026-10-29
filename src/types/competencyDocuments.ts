export interface CompetencyDocument {
  id: string
  title: string
  holder: string
  caption: string
  preview: string
  thumbnail?: string
  original: string
  format: 'image' | 'pdf'
  width: number
  height: number
}

export interface CompetencyDocumentGroup {
  credentialId: string
  caption: string
  documents: CompetencyDocument[]
}

export interface DocumentSelection {
  document: CompetencyDocument
  trigger: HTMLButtonElement
}

export interface DocumentPreviewProps {
  document: CompetencyDocument
  onOpen: (selection: DocumentSelection) => void
}

export interface DocumentViewerProps extends DocumentSelection {
  onClose: () => void
}
