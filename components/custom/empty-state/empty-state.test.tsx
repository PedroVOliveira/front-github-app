import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmptyState from './empty-state'

jest.mock('lucide-react', () => ({
  Search: () => <span data-testid="icon-search" />,
}))

describe('EmptyState Component', () => {
  it('deve renderizar titulo e descricao', () => {
    render(
      <EmptyState
        title="Nenhum usuário encontrado"
        description="Pesquise um usuário do GitHub para começar"
      />
    )

    expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument()
    expect(screen.getByText('Pesquise um usuário do GitHub para começar')).toBeInTheDocument()
  })
})
