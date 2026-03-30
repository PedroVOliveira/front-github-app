import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

import { addUserAction } from './github-actions'

describe('addUserAction Integration', () => {
  let mockCookieStore: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
    }
      ; (cookies as jest.Mock).mockResolvedValue(mockCookieStore)
    global.fetch = jest.fn() as jest.Mock
  })

  it('deve adicionar um usuario valido aos cookies', async () => {
    const mockUser = {
      login: 'octocat',
      name: 'The Octocat',
      avatar_url: 'https://github.com/octocat.png',
      public_repos: 8,
      html_url: 'https://github.com/octocat'
    }
    ; (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser),
    })

    mockCookieStore.get.mockReturnValue({ value: '[]' })

    const formData = new FormData()
    formData.append('username', 'octocat')

    const result = await addUserAction(null, formData)

    expect(result).toEqual({ success: true })
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      'github-users',
      JSON.stringify([mockUser]),
      expect.any(Object)
    )
    expect(revalidatePath).toHaveBeenCalledWith('/')
  })

  it('deve retornar erro para usuario inexistente', async () => {
    ; (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    })

    const formData = new FormData()
    formData.append('username', 'nonexistent-user')

    const result = await addUserAction(null, formData)

    expect(result).toEqual({ error: 'Usuário não encontrado no GitHub.' })
    expect(mockCookieStore.set).not.toHaveBeenCalled()
  })

  it('deve retornar erro para usuario ja existente na lista', async () => {
    const mockUser = { login: 'octocat', name: 'Octo', avatar_url: 'url', public_repos: 1, html_url: 'url' }
    ; (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser),
    })

    mockCookieStore.get.mockReturnValue({ value: JSON.stringify([mockUser]) })

    const formData = new FormData()
    formData.append('username', 'octocat')

    const result = await addUserAction(null, formData)

    expect(result).toEqual({ error: 'Este usuário já está na sua lista.' })
    expect(mockCookieStore.set).not.toHaveBeenCalled()
  })
})
