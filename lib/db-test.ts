// Test database connection
import { prisma } from "./prisma"

export async function testDatabaseConnection() {
  try {
    // Test basic connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Test query
    const userCount = await prisma.user.count()
    console.log(`📊 Users in database: ${userCount}`)

    // Test write operation
    const testResult = await prisma.$queryRaw`SELECT 1 as test`
    console.log("✅ Database queries working:", testResult)

    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return { success: false, error: error.message }
  } finally {
    await prisma.$disconnect()
  }
}
