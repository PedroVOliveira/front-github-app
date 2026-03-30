import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchedInput from './searched-input'
import { addUserAction } from '@/actions/github-actions'

jest.mock('@/actions/github-actions', () => ({
  addUserAction: jest.fn(),
}))

describe('SearchedInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(addUserAction as jest.Mock).mockResolvedValue({ success: true })
  })

  it('deve renderizar o input de busca', () => {
    render(<SearchedInput />)
    expect(screen.getByPlaceholderText(/digite o nome de usuario do github/i)).toBeInTheDocument()
  })

  it('deve disparar a addUserAction ao apertar Enter', async () => {
    render(<SearchedInput />)
    const input = screen.getByPlaceholderText(/digite o nome de usuario do github/i) as HTMLInputElement
    
    await act(async () => {
      fireEvent.change(input, { target: { value: 'PedroVOliveira' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    })

    await waitFor(() => {
      expect(addUserAction).toHaveBeenCalled()
    })
    
    const formData = (addUserAction as jest.Mock).mock.calls[0][1]
    expect(formData.get('username')).toBe('PedroVOliveira')

    await waitFor(() => expect(input.value).toBe(''), { timeout: 2000 })
  })

  it('deve atualizar o valor do input ao digitar', () => {
    render(<SearchedInput />)
    const input = screen.getByPlaceholderText(/digite o nome de usuario do github/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'testuser' } })
    expect(input.value).toBe('testuser')
  })
})
