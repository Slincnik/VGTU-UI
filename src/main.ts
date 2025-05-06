import { app } from './app'

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'

async function bootstrap() {
  if (useMocks) {
    const { setupMock } = await import('@/shared/service/mocks')
    setupMock()
  }
  app.mount('#app')
}

bootstrap()
