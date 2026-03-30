import { SearchedInput } from "@/components/custom/searched-input"
import { CardUserList } from "@/components/custom/card-user"
import { cookies } from "next/headers"

async function getGithubUser(username: string) {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  const baseUrl = process.env.GITHUB_API_URL
  const res = await fetch(`${baseUrl}/${username}`, {
    headers,
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
    name: data.name || data.login,
    username: `@${data.login}`,
    avatar: data.avatar_url
  }
}

export default async function Home() {
  const cookieStore = await cookies()
  const savedUsernamesJson = cookieStore.get('github-users')?.value || '[]'
  const savedUsernames: string[] = JSON.parse(savedUsernamesJson)

  const users = (await Promise.all(
    savedUsernames.map(username => getGithubUser(username))
  )).filter(user => user !== null)

  return (
    <div className="flex flex-col gap-8 items-center p-8">
      <div className="w-full max-w-md">
        <SearchedInput />
      </div>
      <div className="w-full max-w-md">
        {users.length === 0 && savedUsernames.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">
              Rate Limit atingindo ou Usuário não encontrado. 
            </p>
            <p className="text-red-500 text-xs mt-1">
              Adicione um GITHUB_TOKEN no seu .env.local para aumentar o limite.
            </p>
          </div>
        )}
        <CardUserList users={users} />
      </div>
    </div>
  )
}
