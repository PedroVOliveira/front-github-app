'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function validateGithubUser(username: string) {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  const baseUrl = process.env.GITHUB_API_URL
  const res = await fetch(`${baseUrl}/${username}`, { headers })
  return res.ok
}

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
      maxAge: 60 * 60 * 24 * 30, // 30 dias
    })
  }

  revalidatePath('/')
  return { success: true }
}
