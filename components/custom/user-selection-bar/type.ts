export interface UserSelectionBarProps {
  isVisible: boolean
  selectedCount: number
  isAllSelected: boolean
  onSelectAll: () => void
  onDelete: () => void
  onClear: () => void
}
