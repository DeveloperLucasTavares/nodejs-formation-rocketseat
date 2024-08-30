import { PrismaClient } from '@prisma/client'
import { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
}
