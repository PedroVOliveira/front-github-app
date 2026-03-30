'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { validateGithubUser } from '@/services/github-service'

export async function addUserAction(prevState: any, formData: FormData) {
  const username = formData.get('username')?.toString().trim().replace('@', '')
  
  if (!username) {
    return { error: 'Por favor, insira um nome de usuário.' }
  }

  const isValid = await validateGithubUser(username)
  if (!isValid) {
    return { error: 'Usuário não encontrado no GitHub.' }
  }

  const cookieStore = await cookies()
  const existingUsersJson = cookieStore.get('github-users')?.value || '[]'
  const existingUsers: string[] = JSON.parse(existingUsersJson)

  if (!existingUsers.includes(username)) {
    const updatedUsers = [username, ...existingUsers]
    cookieStore.set('github-users', JSON.stringify(updatedUsers), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  revalidatePath('/')
  return { success: true }
}
