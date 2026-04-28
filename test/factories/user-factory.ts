import { CardUserGithubProps } from '@/components/custom/card-user/type'

export const createUserMock = (overrides?: Partial<CardUserGithubProps>): CardUserGithubProps => ({
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://github.com/octocat.png',
  public_repos: 8,
  html_url: 'https://github.com/octocat',
  ...overrides,
})

export const createManyUserMocks = (count: number): CardUserGithubProps[] => {
  return Array.from({ length: count }, (_, i) => createUserMock({
    login: `user${i + 1}`,
    name: `User ${i + 1}`,
    avatar_url: `https://github.com/user${i + 1}.png`,
    public_repos: i,
    html_url: `https://github.com/user${i + 1}`,
  }))
}
