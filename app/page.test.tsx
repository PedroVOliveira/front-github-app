import { cookies } from 'next/headers'

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page SSR Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn() as jest.Mock
  })

  it('deve renderizar a lista de usuarios a partir dos cookies', async () => {
    const mockUser = {
      login: 'octocat',
      name: 'The Octocat',
      avatar_url: 'https://github.com/octocat.png',
      public_repos: 42,
      html_url: 'https://github.com/octocat'
    }
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: JSON.stringify([mockUser]) }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore)

    const Result = await Home({ searchParams: Promise.resolve({}) })
    render(Result)

    expect(screen.getByText('The Octocat')).toBeInTheDocument()
    expect(screen.getByText('@octocat')).toBeInTheDocument()
  })

  it('deve renderizar estado vazio quando nao ha cookies', async () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue(null),
    }
    ; (cookies as jest.Mock).mockResolvedValue(mockCookieStore)

    const Result = await Home({ searchParams: Promise.resolve({}) })
    render(Result)

    expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument()
  })

  it('deve fatiar os usuários corretamente baseado no parâmetro page', async () => {
    const mockUsers = Array.from({ length: 6 }, (_, i) => ({
      login: `user${i + 1}`,
      name: `User ${i + 1}`,
      avatar_url: `url${i + 1}`,
      public_repos: i,
      html_url: `html${i + 1}`
    }))
    
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: JSON.stringify(mockUsers) }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore)

    const Result = await Home({ searchParams: Promise.resolve({ page: '1' }) })
    render(Result)

    expect(screen.getByText('User 6')).toBeInTheDocument()
    expect(screen.queryByText('User 1')).not.toBeInTheDocument()
  })
})
