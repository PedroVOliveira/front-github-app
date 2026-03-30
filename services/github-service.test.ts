import { getPaginatedGithubUsers } from './github-service'

describe('Github Service - Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  it('deve realizar o fatiamento correto dos usuarios e calcular metadados', async () => {
    const mockUsernames = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6']

      ; (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockImplementation(async () => ({ login: 'any' })),
      })

    const result = await getPaginatedGithubUsers(mockUsernames, 1, 5)

    expect(result.users).toHaveLength(1) 
    expect(result.totalPages).toBe(2)
    expect(result.totalUsers).toBe(6)
    expect(result.currentPage).toBe(1)
    
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  it('deve retornar lista vazia se a pagina estiver fora do range', async () => {
    const mockUsernames = ['u1', 'u2']
    const result = await getPaginatedGithubUsers(mockUsernames, 4, 5)

    expect(result.users).toHaveLength(0)
    expect(result.totalPages).toBe(1)
    expect(result.currentPage).toBe(4)
  })
})
