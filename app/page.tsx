import { SearchedInput } from "@/components/custom/searched-input"
import { CardUserList } from "@/components/custom/card-user"
import { EmptyState } from "@/components/custom/empty-state"
import { cookies } from "next/headers"
import { getGithubUser } from "@/services/github-service"

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
        {users.length === 0 ? (
          <EmptyState
            title="Nenhum usuário encontrado"
            description="Pesquise um usuário do GitHub para começar a montar sua lista."
          />
        ) : (
          <CardUserList users={users} />
        )}
      </div>
    </div>
  )
}
