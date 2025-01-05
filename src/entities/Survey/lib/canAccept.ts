import { authManager } from '@/shared/service/auth'

export async function canAccept(): Promise<boolean> {
  const user = await authManager.getUser()

  if (!user || user.expired) return false

  if (user.profile.user_id) {
    return user.profile.user_id === '2c5b7c98-d1a0-11ea-f88d-36863ec15fb1'
  }

  return false
}
