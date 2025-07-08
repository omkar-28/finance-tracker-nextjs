import { testDatabaseConnection } from "@/lib/db-test"
import { NextResponse } from "next/server"

export async function GET() {
  const result = await testDatabaseConnection()

  if (result.success) {
    return NextResponse.json({ message: "Database connected successfully" })
  } else {
    return NextResponse.json({ error: "Database connection failed", details: result.error }, { status: 500 })
  }
}
