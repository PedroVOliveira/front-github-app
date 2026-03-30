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
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: JSON.stringify(['octocat']) }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore)

      ; (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          login: 'octocat',
          name: 'The Octocat',
          avatar_url: 'https://github.com/octocat.png',
          public_repos: 42,
          html_url: 'https://github.com/octocat'
        }),
      })

    const Result = await Home()
    render(Result)

    expect(screen.getByText('The Octocat')).toBeInTheDocument()
    expect(screen.getByText('@octocat')).toBeInTheDocument()
  })

  it('deve renderizar estado vazio quando nao ha cookies', async () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue(null),
    }
      ; (cookies as jest.Mock).mockResolvedValue(mockCookieStore)

    const Result = await Home()
    render(Result)

    expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument()
  })
})
