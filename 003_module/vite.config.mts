import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'prisma', // Required
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    environmentOptions: {
      adapter: 'psql',
      envFile: '.env.test',
      prismaEnvVarName: 'DATABASE_URL', // Optional
      transformMode: 'ssr', // Optional
    },
  },
})
