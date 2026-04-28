export interface UserSelectionBarProps {
  selectedCount: number
  totalCount: number
  onDelete: () => void
  onSelectAll: () => void
  onClear: () => void
  isAllSelected: boolean
}
