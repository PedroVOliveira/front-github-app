import { SearchedInput } from "@/components/custom/searched-input"
import { CardUserList } from "@/components/custom/card-user"
import { EmptyState } from "@/components/custom/empty-state"
import { cookies } from "next/headers"
import { getGithubUser, getPaginatedGithubUsers } from "@/services/github-service"
import { CardUserGithubProps } from "@/components/custom/card-user/type"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 0

  const cookieStore = await cookies()
  const savedUsersJson = cookieStore.get('github-users')?.value || '[]'
  const savedUsers: CardUserGithubProps[] = JSON.parse(savedUsersJson)

  const { users, totalPages, totalUsers } = await getPaginatedGithubUsers(savedUsers, currentPage)

  return (
    <div className="flex flex-col gap-8 items-center p-8">
      <div className="w-full max-w-md">
        <SearchedInput />
      </div>
      <div className="w-full max-w-md">
        {totalUsers === 0 ? (
          <EmptyState
            title="Nenhum usuário encontrado"
            description="Pesquise um usuário do GitHub para começar a montar sua lista."
          />
        ) : (
          <CardUserList
            users={users}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  )
}
