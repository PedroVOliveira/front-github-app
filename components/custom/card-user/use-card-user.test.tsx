import { renderHook, act } from '@testing-library/react'
import useCardUser from './use-card-user'
import { removeManyUsersAction } from '@/actions/github-actions'
import { createManyUserMocks } from '@/test/factories/user-factory'

jest.mock('@/actions/github-actions', () => ({
  removeManyUsersAction: jest.fn(),
}))

describe('useCardUser Hook', () => {
  const mockUsers = createManyUserMocks(3)
  const mockLogins = mockUsers.map(user => user.login)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve iniciar com a seleção vazia', () => {
    const { result } = renderHook(() => useCardUser({ usersLogins: mockLogins }))

    expect(result.current.selectedLogins).toEqual([])
    expect(result.current.isAllSelected).toBe(false)
  })

  it('deve alternar a seleção de um usuário individualmente', () => {
    const { result } = renderHook(() => useCardUser({ usersLogins: mockLogins }))

    // Selecionar primeiro usuário
    act(() => {
      result.current.toggleSelect('user-1')
    })
    expect(result.current.selectedLogins).toEqual(['user-1'])
    expect(result.current.isAllSelected).toBe(false)

    // Desmarcar o usuário
    act(() => {
      result.current.toggleSelect('user-1')
    })
    expect(result.current.selectedLogins).toEqual([])
  })

  it('deve selecionar todos os usuários quando toggleSelectAll é chamado', () => {
    const { result } = renderHook(() => useCardUser({ usersLogins: mockLogins }))

    act(() => {
      result.current.toggleSelectAll()
    })

    expect(result.current.selectedLogins).toEqual(mockLogins)
    expect(result.current.isAllSelected).toBe(true)
  })

  it('deve desmarcar todos os usuários se todos já estiverem selecionados', () => {
    const { result } = renderHook(() => useCardUser({ usersLogins: mockLogins }))

    // Primeiro marca todos
    act(() => {
      result.current.toggleSelectAll()
    })

    // Agora desmarca todos
    act(() => {
      result.current.toggleSelectAll()
    })

    expect(result.current.selectedLogins).toEqual([])
    expect(result.current.isAllSelected).toBe(false)
  })

  it('deve limpar toda a seleção ao chamar clearSelection', () => {
    const { result } = renderHook(() => useCardUser({ usersLogins: mockLogins }))

    act(() => {
      result.current.toggleSelect('user-1')
      result.current.toggleSelect('user-2')
    })
    expect(result.current.selectedLogins.length).toBe(2)

    act(() => {
      result.current.clearSelection()
    })
    expect(result.current.selectedLogins).toEqual([])
  })

  it('deve chamar a action de deleção e resetar o estado ao executar handleBulkDelete', async () => {
    const { result } = renderHook(() => useCardUser({ usersLogins: mockLogins }))

    act(() => {
      result.current.toggleSelect('user-1')
      result.current.toggleSelect('user-2')
    })

    await act(async () => {
      await result.current.handleBulkDelete()
    })

    expect(removeManyUsersAction).toHaveBeenCalledWith(['user-1', 'user-2'])
    expect(result.current.selectedLogins).toEqual([])
  })
})