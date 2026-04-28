import { getPaginatedGithubUsers, getGithubUser, validateGithubUser } from './github-service'
import { createManyUserMocks } from '@/test/factories/user-factory'

describe('Github Service', () => {
  describe('Pagination Logic', () => {
    it('deve realizar o fatiamento correto dos usuarios e calcular metadados', async () => {
      const mockUsers = createManyUserMocks(6)
      const result = await getPaginatedGithubUsers(mockUsers, 1, 5)

      expect(result.users).toHaveLength(1)
      expect(result.totalPages).toBe(2)
      expect(result.totalUsers).toBe(6)
      expect(result.currentPage).toBe(1)
    })

    it('deve retornar lista vazia se a pagina estiver fora do range', async () => {
      const mockUsers = createManyUserMocks(1)
      const result = await getPaginatedGithubUsers(mockUsers, 4, 5)

      expect(result.users).toHaveLength(0)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(4)
    })
  })

  describe('API Calls (MSW)', () => {
    it('deve buscar um usuario do github com sucesso', async () => {
      const user = await getGithubUser('test-user')
      expect(user).not.toBeNull()
      expect(user?.login).toBe('test-user')
      expect(user?.name).toBe('User test-user')
    })

    it('deve retornar null para usuario inexistente', async () => {
      const user = await getGithubUser('nonexistent-user')
      expect(user).toBeNull()
    })

    it('deve validar se um usuario existe', async () => {
      const isValid = await validateGithubUser('test-user')
      expect(isValid).toBe(true)

      const isInvalid = await validateGithubUser('nonexistent-user')
      expect(isInvalid).toBe(false)
    })
  })
})
