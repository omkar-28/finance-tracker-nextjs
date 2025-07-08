"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function setupUserDefaults() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  // Check if user already has categories
  const existingCategories = await prisma.category.count({
    where: { userId },
  })

  if (existingCategories === 0) {
    // Copy default categories for this user
    const defaultCategories = await prisma.category.findMany({
      where: { userId: "system", isDefault: true },
    })

    for (const category of defaultCategories) {
      await prisma.category.create({
        data: {
          name: category.name,
          type: category.type,
          color: category.color,
          icon: category.icon,
          userId: userId,
          isDefault: false,
        },
      })
    }
  }

  // Check if user already has accounts
  const existingAccounts = await prisma.financialAccount.count({
    where: { userId },
  })

  if (existingAccounts === 0) {
    // Create default accounts for this user
    const defaultAccounts = [
      {
        name: "My Checking Account",
        type: "checking",
        balance: 0,
        currency: "USD",
      },
      {
        name: "My Savings Account",
        type: "savings",
        balance: 0,
        currency: "USD",
      },
    ]

    for (const account of defaultAccounts) {
      await prisma.financialAccount.create({
        data: {
          ...account,
          userId: userId,
        },
      })
    }
  }

  return { success: true }
}
