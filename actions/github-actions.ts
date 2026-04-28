'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getGithubUser } from '@/services/github-service'
import { CardUserGithubProps } from '@/components/custom/card-user/type'

export async function addUserAction(prevState: any, formData: FormData) {
  const username = formData.get('username')?.toString().trim().replace('@', '')

  if (!username) {
    return { error: 'Por favor, insira um nome de usuário.' }
  }

  const userData = await getGithubUser(username)
  if (!userData) {
    return { error: 'Usuário não encontrado no GitHub.' }
  }

  const cookieStore = await cookies()
  const existingUsersJson = cookieStore.get('github-users')?.value || '[]'
  const existingUsers: CardUserGithubProps[] = JSON.parse(existingUsersJson)

  if (existingUsers.some(u => u.login.toLowerCase() === userData.login.toLowerCase())) {
    return { error: 'Este usuário já está na sua lista.' }
  }

  const updatedUsers = [userData, ...existingUsers]
  cookieStore.set('github-users', JSON.stringify(updatedUsers), {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  revalidatePath('/')
  return { success: true }
}



export async function removeUserAction(username: string) {
  const cookieStore = await cookies()
  const existingUsersJson = cookieStore.get('github-users')?.value || '[]'
  const existingUsers: CardUserGithubProps[] = JSON.parse(existingUsersJson)

  const updatedUsers = existingUsers.filter(u => u.login.toLowerCase() !== username.toLowerCase())

  cookieStore.set('github-users', JSON.stringify(updatedUsers), { path: '/' })
  revalidatePath('/')
  return { success: true }
}

