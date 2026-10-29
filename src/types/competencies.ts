import type { IconName } from './content'

export type CompetencyDetails = Record<string, readonly string[]>

export interface Credential {
  id: string
  title: string
  label: string
  icon: IconName
  description: string
  source: 'document' | 'company'
}

export type CompetencyHighlight = Pick<
  Credential,
  'id' | 'title' | 'label' | 'icon' | 'description'
>
