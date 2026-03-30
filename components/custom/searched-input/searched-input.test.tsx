import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchedInput from './searched-input'

describe('SearchedInput Component', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    jest.spyOn(window, 'dispatchEvent')
  })

  it('deve renderizar o input de busca', () => {
    render(<SearchedInput />)
    expect(screen.getByPlaceholderText(/digite o nome de usuario do github/i)).toBeInTheDocument()
  })

  it('deve salvar o usuario no localStorage ao disparar a busca', () => {
    render(<SearchedInput />)
    const input = screen.getByPlaceholderText(/digite o nome de usuario do github/i)

    fireEvent.change(input, { target: { value: 'PedroVOliveira' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    const savedUsers = JSON.parse(localStorage.getItem('github-users') || '[]')
    expect(savedUsers).toHaveLength(1)
    expect(savedUsers[0].username).toBe('@PedroVOliveira')
    expect(window.dispatchEvent).toHaveBeenCalledWith(expect.any(Event))
    expect((window.dispatchEvent as jest.Mock).mock.calls[0][0].type).toBe('github-users-updated')
  })

  it('deve limpar o input apos a busca', () => {
    render(<SearchedInput />)
    const input = screen.getByPlaceholderText(/digite o nome de usuario do github/i) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'testuser' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input.value).toBe('')
  })
})
