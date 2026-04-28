import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { addUserAction, removeUserAction } from './github-actions'
import { createUserMock } from '@/test/factories/user-factory'

describe('addUserAction Integration', () => {
  let mockCookieStore: any

  beforeEach(async () => {
    jest.clearAllMocks()
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
    }
      ; (cookies as jest.Mock).mockResolvedValue(mockCookieStore)
  })

  it('deve adicionar um usuario valido aos cookies', async () => {
    const mockUser = createUserMock({ login: 'octocat' })
    mockCookieStore.get.mockReturnValue({ value: '[]' })

    const formData = new FormData()
    formData.append('username', 'octocat')

    const result = await addUserAction(null, formData)

    expect(result).toEqual({ success: true })
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'github-users',
      expect.stringContaining('"login":"octocat"'),
      expect.any(Object)
    )
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })

  it('deve retornar erro para usuario inexistente', async () => {
    const formData = new FormData()
    formData.append('username', 'nonexistent-user')

    const result = await addUserAction(null, formData)

    expect(result).toEqual({ error: 'Usuário não encontrado no GitHub.' })
    expect(mockCookieStore.set).not.toHaveBeenCalled()
  })

  it('deve retornar erro para usuario ja existente na lista', async () => {
    const mockUser = createUserMock({ login: 'octocat' })
    mockCookieStore.get.mockReturnValue({ value: JSON.stringify([mockUser]) })

    const formData = new FormData()
    formData.append('username', 'octocat')

    const result = await addUserAction(null, formData)

    expect(result).toEqual({ error: 'Este usuário já está na sua lista.' })
    expect(mockCookieStore.set).not.toHaveBeenCalled()
  })
})

describe('deleteUserAction Integration', () => {
  let mockCookieStore: any

  beforeEach(async () => {
    jest.clearAllMocks()
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
    }
      ; (cookies as jest.Mock).mockResolvedValue(mockCookieStore)
  })

  it('deve deletar um usuario da lista', async () => {
    const mockUser = createUserMock({ login: 'pedrovoliveira' })
    mockCookieStore.get.mockReturnValue({ value: JSON.stringify([mockUser]) })

    const result = await removeUserAction('pedrovoliveira')

    expect(result).toEqual({ success: true })
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'github-users',
      '[]',
      expect.any(Object)
    )
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })
})
