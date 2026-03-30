import { getPaginatedGithubUsers } from './github-service'

describe('Github Service - Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  it('deve realizar o fatiamento correto dos usuarios e calcular metadados', async () => {
    const mockUsers = Array.from({ length: 6 }, (_, i) => ({
      login: `u${i + 1}`,
      name: `User ${i + 1}`,
      avatar_url: `url${i + 1}`,
      public_repos: i,
      html_url: `html${i + 1}`
    }))

    const result = await getPaginatedGithubUsers(mockUsers, 1, 5)

    expect(result.users).toHaveLength(1)
    expect(result.totalPages).toBe(2)
    expect(result.totalUsers).toBe(6)
    expect(result.currentPage).toBe(1)
  })

  it('deve retornar lista vazia se a pagina estiver fora do range', async () => {
    const mockUsers = [{ login: 'u1', name: 'N1', avatar_url: 'A1', public_repos: 1, html_url: 'H1' }]
    const result = await getPaginatedGithubUsers(mockUsers, 4, 5)

    expect(result.users).toHaveLength(0)
    expect(result.totalPages).toBe(1)
    expect(result.currentPage).toBe(4)
  })
})
