"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { Decimal } from "@prisma/client/runtime/library"

export async function createTransaction(data: {
  amount: number
  description: string
  type: string
  date: Date
  accountId: string
  categoryId: string
  tags?: string[]
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const transaction = await prisma.transaction.create({
    data: {
      ...data,
      amount: new Decimal(data.amount),
      userId: session.user.id,
      tags: data.tags || [],
    },
  })

  // Update account balance
  const account = await prisma.financialAccount.findUnique({
    where: { id: data.accountId },
  })

  if (account) {
    const balanceChange = data.type === "expense" ? -data.amount : data.amount
    await prisma.financialAccount.update({
      where: { id: data.accountId },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    })
  }

  revalidatePath("/dashboard")
  return transaction
}

export async function getTransactions(limit = 10) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return await prisma.transaction.findMany({
    where: { userId: session.user.id },
    include: {
      account: true,
      category: true,
    },
    orderBy: { date: "desc" },
    take: limit,
  })
}

export async function deleteTransaction(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id },
  })

  if (!transaction || transaction.userId !== session.user.id) {
    throw new Error("Transaction not found")
  }

  // Revert account balance
  const balanceChange = transaction.type === "expense" ? Number(transaction.amount) : -Number(transaction.amount)

  await prisma.financialAccount.update({
    where: { id: transaction.accountId },
    data: {
      balance: {
        increment: balanceChange,
      },
    },
  })

  await prisma.transaction.delete({
    where: { id },
  })

  revalidatePath("/dashboard")
}
