import { CardUserGithubProps } from '@/components/custom/card-user/type'
import { GithubUserDetails } from '@/components/custom/user-detail-drawer/type'

function getHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  return headers
}

function getBaseUrl(): string {
  return process.env.GITHUB_API_URL || ''
}

export async function getGithubUser(username: string): Promise<CardUserGithubProps | null> {
  const res = await fetch(`${getBaseUrl()}/${username}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 }
  })

  if (!res.ok) {
    if (res.status === 403) {
      console.error('GitHub API Rate Limit Hit. Please add GITHUB_TOKEN to .env.local')
    }
    return null
  }

  const data = await res.json()
  return {
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
    public_repos: data.public_repos,
    html_url: data.html_url
  }
}

export async function getGithubUserDetails(username: string): Promise<GithubUserDetails | null> {
  const res = await fetch(`${getBaseUrl()}/${username}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 }
  })

  if (!res.ok) {
    if (res.status === 404) return null
    return null
  }

  return res.json()
}

export async function validateGithubUser(username: string): Promise<boolean> {
  const res = await fetch(`${getBaseUrl()}/${username}`, {
    headers: getHeaders(),
  })
  return res.ok
}
