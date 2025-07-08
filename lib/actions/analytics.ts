"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getDashboardData() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  // Get total balance across all accounts
  const accounts = await prisma.financialAccount.findMany({
    where: { userId, isActive: true },
  })

  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0)

  // Get current month transactions
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const monthlyTransactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    include: {
      category: true,
    },
  })

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const monthlyExpenses = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  // Get spending by category
  const categorySpending = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        const categoryName = t.category.name
        acc[categoryName] = (acc[categoryName] || 0) + Number(t.amount)
        return acc
      },
      {} as Record<string, number>,
    )

  // Get last 6 months data for trends
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const trendData = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: sixMonthsAgo,
      },
    },
  })

  const monthlyTrends = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const monthTransactions = trendData.filter((t) => t.date >= monthStart && t.date <= monthEnd)

    const income = monthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0)

    const expenses = monthTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0)

    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      income,
      expenses,
      net: income - expenses,
    }
  })

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    netIncome: monthlyIncome - monthlyExpenses,
    categorySpending: Object.entries(categorySpending).map(([name, amount]) => ({
      name,
      amount,
    })),
    monthlyTrends,
    accountsCount: accounts.length,
    transactionsCount: monthlyTransactions.length,
  }
}

export async function getSpendingHealthScore() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthlyTransactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: { gte: startOfMonth },
    },
  })

  const income = monthlyTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0)

  const expenses = monthlyTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0)

  // Calculate health score based on various factors
  let score = 100

  // Spending ratio (expenses vs income)
  const spendingRatio = income > 0 ? expenses / income : 1
  if (spendingRatio > 0.9) score -= 30
  else if (spendingRatio > 0.7) score -= 15
  else if (spendingRatio > 0.5) score -= 5

  // Emergency fund (simplified - based on account balances)
  const accounts = await prisma.financialAccount.findMany({
    where: { userId, isActive: true },
  })
  const totalSavings = accounts.filter((a) => a.type === "savings").reduce((sum, a) => sum + Number(a.balance), 0)

  const monthlyExpenseAvg = expenses || 1000 // fallback
  const emergencyFundRatio = totalSavings / (monthlyExpenseAvg * 3) // 3 months emergency fund

  if (emergencyFundRatio < 0.5) score -= 20
  else if (emergencyFundRatio < 1) score -= 10

  // Budget adherence (simplified)
  const budgets = await prisma.budget.findMany({
    where: { userId, isActive: true },
  })

  let budgetOverruns = 0
  for (const budget of budgets) {
    if (Number(budget.spent) > Number(budget.amount)) {
      budgetOverruns++
    }
  }

  if (budgetOverruns > 0) {
    score -= budgetOverruns * 10
  }

  return Math.max(0, Math.min(100, score))
}
