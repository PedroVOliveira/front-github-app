import { render, axe } from '@/test/test-utils'
import CardUser from './card-user'
import { createUserMock } from '@/test/factories/user-factory'

describe('CardUser Accessibility', () => {
  it('não deve ter violações de acessibilidade', async () => {
    const mockUser = createUserMock()
    const { container } = render(<CardUser user={mockUser} />)
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
