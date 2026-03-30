import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-image" />
}))

jest.mock('lucide-react', () => {
  const icon = (name: string) => (props: any) => <span data-testid={`icon-${name}`} />
  return {
    __esModule: true,
    Users: icon('users'),
    BookOpen: icon('book'),
    MapPin: icon('map'),
    AtSign: icon('at'),
    Calendar: icon('calendar'),
    ExternalLink: icon('external'),
    ChevronRight: icon('chevron'),
    Globe: icon('globe'),
  }
})

jest.mock('vaul', () => ({
  __esModule: true,
  Drawer: {
    Root: ({ children, open }: any) => open ? <div data-testid="drawer-root">{children}</div> : null,
    Portal: ({ children }: any) => <div data-testid="drawer-portal">{children}</div>,
    Overlay: () => <div data-testid="drawer-overlay" />,
    Content: ({ children }: any) => <div data-testid="drawer-content">{children}</div>,
    Title: ({ children }: any) => <h2 data-testid="drawer-title">{children}</h2>,
    Description: ({ children }: any) => <p data-testid="drawer-desc">{children}</p>,
  }
}))

import UserDetailDrawer from './user-detail-drawer'

const mockUser = {
  login: 'octocat',
  id: 1,
  avatar_url: 'https://github.com/octocat.png',
  name: 'The Octocat',
  company: 'GitHub',
  blog: 'https://github.blog',
  location: 'San Francisco',
  email: null,
  bio: 'The mascot of GitHub',
  twitter_username: 'octocat',
  public_repos: 8,
  followers: 100,
  following: 50,
  created_at: '2011-01-25T18:44:36Z',
  html_url: 'https://github.com/octocat'
}

describe('UserDetailDrawer Component', () => {
  const mockBack = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    })
  })

  const renderDrawer = async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <UserDetailDrawer user={mockUser} />
        </Suspense>
      )
    })
  }

  it('deve renderizar as informações do usuário corretamente', async () => {
    await renderDrawer()

    expect(screen.getByText('The Octocat')).toBeInTheDocument()
    expect(screen.getAllByText('@octocat').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/"The mascot of GitHub"/i)).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('San Francisco')).toBeInTheDocument()
  })

  it('deve renderizar o link externo para o GitHub', async () => {
    await renderDrawer()
    const link = screen.getByRole('link', { name: /ver no github/i })
    expect(link).toHaveAttribute('href', 'https://github.com/octocat')
  })
})
