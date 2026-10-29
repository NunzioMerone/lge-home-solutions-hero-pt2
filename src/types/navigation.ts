export interface MobileMenuProps {
  open: boolean
  activePath: string
  solutionsActive: boolean
  sectionsOpen: boolean
  onToggleSections: () => void
  onNavigate: () => void
}
