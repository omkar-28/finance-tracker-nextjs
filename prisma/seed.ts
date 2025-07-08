import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create default categories
  const categories = [
    {
      id: "default-food",
      name: "Food & Dining",
      type: "expense",
      color: "#EF4444",
      icon: "Utensils",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-transport",
      name: "Transportation",
      type: "expense",
      color: "#3B82F6",
      icon: "Car",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-shopping",
      name: "Shopping",
      type: "expense",
      color: "#8B5CF6",
      icon: "ShoppingBag",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-bills",
      name: "Bills & Utilities",
      type: "expense",
      color: "#F59E0B",
      icon: "Receipt",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-entertainment",
      name: "Entertainment",
      type: "expense",
      color: "#10B981",
      icon: "Film",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-health",
      name: "Health & Medical",
      type: "expense",
      color: "#DC2626",
      icon: "Heart",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-salary",
      name: "Salary",
      type: "income",
      color: "#059669",
      icon: "DollarSign",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-freelance",
      name: "Freelance",
      type: "income",
      color: "#0891B2",
      icon: "Briefcase",
      userId: "system",
      isDefault: true,
    },
    {
      id: "default-investment",
      name: "Investment Returns",
      type: "income",
      color: "#7C3AED",
      icon: "TrendingUp",
      userId: "system",
      isDefault: true,
    },
  ]

  console.log("📂 Creating default categories...")
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    })
  }

  // Create default financial accounts
  const accounts = [
    {
      id: "default-checking",
      name: "Checking Account",
      type: "checking",
      balance: 0,
      currency: "USD",
      userId: "system",
      isActive: true,
    },
    {
      id: "default-savings",
      name: "Savings Account",
      type: "savings",
      balance: 0,
      currency: "USD",
      userId: "system",
      isActive: true,
    },
    {
      id: "default-credit",
      name: "Credit Card",
      type: "credit",
      balance: 0,
      currency: "USD",
      userId: "system",
      isActive: true,
    },
  ]

  console.log("🏦 Creating default accounts...")
  for (const account of accounts) {
    await prisma.financialAccount.upsert({
      where: { id: account.id },
      update: {},
      create: account,
    })
  }

  console.log("✅ Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
