import { SearchedInput } from "@/components/custom/searched-input"
import { CardUserList } from "@/components/custom/card-user"
import { cookies } from "next/headers"

async function getGithubUser(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 }
  })
  if (!res.ok) return null
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
        <CardUserList users={users} />
      </div>
    </div>
  )
}
