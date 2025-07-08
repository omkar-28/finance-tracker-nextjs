"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getUserCategories() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return await prisma.category.findMany({
    where: { userId: session.user.id },
    orderBy: { name: "asc" },
  })
}

export async function createCategory(data: {
  name: string
  type: string
  color?: string
  icon?: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return await prisma.category.create({
    data: {
      ...data,
      userId: session.user.id,
      color: data.color || "#3B82F6",
      icon: data.icon || "DollarSign",
    },
  })
}
