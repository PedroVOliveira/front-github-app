export interface GithubUserDetails {
  login: string
  id: number
  avatar_url: string
  name: string
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  html_url: string
}

export interface UserDetailDrawerProps {
  user: GithubUserDetails
}
