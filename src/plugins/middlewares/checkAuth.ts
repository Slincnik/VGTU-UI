import { useKeycloak } from '@josempgon/vue-keycloak'

export async function loadKeycloakToken(): Promise<void> {
  const { isAuthenticated, keycloak } = useKeycloak()

  if (!isAuthenticated.value) {
    keycloak.value?.login()
  }
}
