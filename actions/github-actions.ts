'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function addUserAction(formData: FormData) {
  const username = formData.get('username')?.toString().trim().replace('@', '')
  if (!username) return

  const cookieStore = await cookies()
  const existingUsersJson = cookieStore.get('github-users')?.value || '[]'
  const existingUsers: string[] = JSON.parse(existingUsersJson)

  if (!existingUsers.includes(username)) {
    const updatedUsers = [username, ...existingUsers]
    cookieStore.set('github-users', JSON.stringify(updatedUsers), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }

  revalidatePath('/')
}
