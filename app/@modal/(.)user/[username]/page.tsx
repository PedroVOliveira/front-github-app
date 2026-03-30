import UserDetailDrawer from '@/components/custom/user-detail-drawer'
import { getGithubUserDetails } from '@/services/github-service'
import { notFound } from 'next/navigation'

export default async function UserModalPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = await getGithubUserDetails(username)

  if (!user) notFound()

  return <UserDetailDrawer user={user} />
}
