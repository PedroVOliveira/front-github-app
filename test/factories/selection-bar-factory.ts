import { UserSelectionBarProps } from '@/components/custom/user-selection-bar/type'

export const createSelectionBarProps = (
  overrides?: Partial<UserSelectionBarProps>
): UserSelectionBarProps => ({
  isVisible: true,
  selectedCount: 0,
  isAllSelected: false,
  onSelectAll: jest.fn(),
  onDelete: jest.fn(),
  onClear: jest.fn(),
  ...overrides,
})
