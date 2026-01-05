import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Export a function to check database health
export async function checkDatabaseHealth() {
  try {
    await db.$queryRaw`SELECT 1`
    return { healthy: true, message: 'Database connection successful' }
  } catch (error) {
    return { 
      healthy: false, 
      message: error instanceof Error ? error.message : 'Database connection failed' 
    }
  }
}