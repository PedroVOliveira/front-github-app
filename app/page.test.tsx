import { cookies } from 'next/headers'
import { render, screen } from '@/test/test-utils'
import Home from './page'
import { createManyUserMocks, createUserMock } from '@/test/factories/user-factory'

describe('Home Page SSR Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar a lista de usuarios a partir dos cookies', async () => {
    const mockUser = createUserMock({ login: 'octocat', name: 'The Octocat' })
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
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore)

    const Result = await Home({ searchParams: Promise.resolve({}) })
    render(Result)

    expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument()
  })

  it('deve fatiar os usuários corretamente baseado no parâmetro page', async () => {
    const mockUsers = createManyUserMocks(6)
    
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: JSON.stringify(mockUsers) }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore)

    // A lógica em Home inverte a lista antes de paginar, ou algo assim? 
    // Vamos checar o comportamento original no teste anterior:
    // expect(screen.getByText('User 6')).toBeInTheDocument()
    // expect(screen.queryByText('User 1')).not.toBeInTheDocument()
    // Isso sugere que a página 1 (default ou param) mostra os últimos itens se a lista for revertida.
    
    const Result = await Home({ searchParams: Promise.resolve({ page: '1' }) })
    render(Result)

    expect(screen.getByText('User 6')).toBeInTheDocument()
    expect(screen.queryByText('User 1')).not.toBeInTheDocument()
  })
})
