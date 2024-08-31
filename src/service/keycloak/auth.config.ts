import { UserManager, WebStorageStateStore, type UserManagerSettings } from 'oidc-client-ts'
import { jwtDecode } from 'jwt-decode'

const oidcConfig: UserManagerSettings = {
  authority: `${import.meta.env.VITE_KEYCLOAK_CLIENT_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}`,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: `${window.location.origin}/callback`,
  post_logout_redirect_uri: `${window.location.origin}/`,
  response_type: 'code',
  scope: 'openid profile email',
  automaticSilentRenew: true,
  checkSessionIntervalInSeconds: 60 * 1000, // Интервал проверки сессии (по умолчанию 60 секунд)
  accessTokenExpiringNotificationTimeInSeconds: 30,
  filterProtocolClaims: true,
  redirectMethod: 'replace',

  monitorSession: true,
  userStore: new WebStorageStateStore({ store: window.localStorage })
}

export const authManager = new UserManager(oidcConfig)

export namespace IJwt {
  export interface Jwt {
    name: string
    given_name: string
    family_name: string
    email: string
    realm_access: Account
    user_id: string
  }

  export interface Account {
    roles: Role[]
  }

  export type Role = 'student' | 'employee'
}
/**
 * Возвращает токен
 * @returns {Promise<string | undefined>}
 */
export const getToken = async (): Promise<string | undefined> => {
  let user = await authManager.getUser()

  if (!user) return undefined

  if (user.expired) {
    user = await authManager.signinSilent()
  }

  return user?.access_token
}

export const getDecodedToken = async () => {
  const token = await getToken()

  if (!token) return undefined

  return jwtDecode<IJwt.Jwt>(token)
}

authManager.events.addAccessTokenExpired(async () => {
  await authManager.removeUser()
  await authManager.signinRedirect()
})

authManager.events.addSilentRenewError(async () => {
  await authManager.removeUser()
  await authManager.signinRedirect()
})
