"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Decimal } from "@prisma/client/runtime/library"

export async function createAccount(data: {
  name: string
  type: string
  balance: number
  currency?: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const account = await prisma.financialAccount.create({
    data: {
      ...data,
      balance: new Decimal(data.balance),
      userId: session.user.id,
      currency: data.currency || "USD",
    },
  })

  revalidatePath("/accounts")
  return account
}

export async function getAccounts() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return await prisma.financialAccount.findMany({
    where: {
      userId: session.user.id,
      isActive: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function updateAccount(
  id: string,
  data: {
    name?: string
    type?: string
    balance?: number
  },
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const updateData: any = { ...data }
  if (data.balance !== undefined) {
    updateData.balance = new Decimal(data.balance)
  }

  const account = await prisma.financialAccount.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: updateData,
  })

  revalidatePath("/accounts")
  return account
}
