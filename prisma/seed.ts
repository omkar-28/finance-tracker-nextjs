import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create a test user first
  const testUser = await prisma.user.upsert({
    where: { email: "demo@financetracker.com" },
    update: {},
    create: {
      id: "demo-user-id",
      email: "demo@financetracker.com",
      name: "Demo User",
      currency: "USD",
      emailVerified: new Date(),
    },
  })

  console.log("👤 Created demo user:", testUser.email)

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

  // Create user-specific categories
  const userCategories = [
    {
      id: "user-food",
      name: "Food & Dining",
      type: "expense",
      color: "#EF4444",
      icon: "Utensils",
      userId: testUser.id,
      isDefault: false,
    },
    {
      id: "user-transport",
      name: "Transportation",
      type: "expense",
      color: "#3B82F6",
      icon: "Car",
      userId: testUser.id,
      isDefault: false,
    },
    {
      id: "user-shopping",
      name: "Shopping",
      type: "expense",
      color: "#8B5CF6",
      icon: "ShoppingBag",
      userId: testUser.id,
      isDefault: false,
    },
    {
      id: "user-bills",
      name: "Bills & Utilities",
      type: "expense",
      color: "#F59E0B",
      icon: "Receipt",
      userId: testUser.id,
      isDefault: false,
    },
    {
      id: "user-entertainment",
      name: "Entertainment",
      type: "expense",
      color: "#10B981",
      icon: "Film",
      userId: testUser.id,
      isDefault: false,
    },
    {
      id: "user-health",
      name: "Health & Medical",
      type: "expense",
      color: "#DC2626",
      icon: "Heart",
      userId: testUser.id,
      isDefault: false,
    },
    {
      id: "user-salary",
      name: "Salary",
      type: "income",
      color: "#059669",
      icon: "DollarSign",
      userId: testUser.id,
      isDefault: false,
    },
    {
      id: "user-freelance",
      name: "Freelance",
      type: "income",
      color: "#0891B2",
      icon: "Briefcase",
      userId: testUser.id,
      isDefault: false,
    },
  ]

  for (const category of userCategories) {
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

  // Create user-specific accounts with realistic balances
  const userAccounts = [
    {
      id: "user-checking",
      name: "Chase Checking",
      type: "checking",
      balance: 3250.75,
      currency: "USD",
      userId: testUser.id,
      isActive: true,
    },
    {
      id: "user-savings",
      name: "High Yield Savings",
      type: "savings",
      balance: 15750.0,
      currency: "USD",
      userId: testUser.id,
      isActive: true,
    },
    {
      id: "user-credit",
      name: "Chase Freedom Card",
      type: "credit",
      balance: -1250.3,
      currency: "USD",
      userId: testUser.id,
      isActive: true,
    },
    {
      id: "user-investment",
      name: "Investment Portfolio",
      type: "investment",
      balance: 25000.0,
      currency: "USD",
      userId: testUser.id,
      isActive: true,
    },
  ]

  console.log("💰 Creating user accounts...")
  for (const account of userAccounts) {
    await prisma.financialAccount.upsert({
      where: { id: account.id },
      update: {},
      create: account,
    })
  }

  // Create realistic transactions for the past 3 months
  const transactions = [
    // January 2024 transactions
    {
      amount: 5500.0,
      description: "Monthly Salary",
      type: "income",
      date: new Date("2024-01-01"),
      tags: ["salary", "monthly"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-salary",
    },
    {
      amount: -1200.0,
      description: "Rent Payment",
      type: "expense",
      date: new Date("2024-01-01"),
      tags: ["rent", "housing"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-bills",
    },
    {
      amount: -85.5,
      description: "Grocery Shopping - Whole Foods",
      type: "expense",
      date: new Date("2024-01-02"),
      tags: ["groceries", "food"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-food",
    },
    {
      amount: -45.0,
      description: "Gas Station Fill-up",
      type: "expense",
      date: new Date("2024-01-03"),
      tags: ["gas", "car"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-transport",
    },
    {
      amount: -120.0,
      description: "Electric Bill",
      type: "expense",
      date: new Date("2024-01-05"),
      tags: ["utilities", "electric"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-bills",
    },
    {
      amount: -25.99,
      description: "Netflix Subscription",
      type: "expense",
      date: new Date("2024-01-08"),
      tags: ["streaming", "subscription"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-entertainment",
    },
    {
      amount: -67.8,
      description: "Dinner at Italian Restaurant",
      type: "expense",
      date: new Date("2024-01-10"),
      tags: ["dining", "restaurant"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-food",
    },
    {
      amount: 800.0,
      description: "Freelance Web Design Project",
      type: "income",
      date: new Date("2024-01-15"),
      tags: ["freelance", "web-design"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-freelance",
    },
    {
      amount: -150.0,
      description: "Doctor Visit Copay",
      type: "expense",
      date: new Date("2024-01-18"),
      tags: ["medical", "copay"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-health",
    },
    {
      amount: -89.99,
      description: "New Running Shoes",
      type: "expense",
      date: new Date("2024-01-20"),
      tags: ["shopping", "fitness"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-shopping",
    },

    // February 2024 transactions
    {
      amount: 5500.0,
      description: "Monthly Salary",
      type: "income",
      date: new Date("2024-02-01"),
      tags: ["salary", "monthly"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-salary",
    },
    {
      amount: -1200.0,
      description: "Rent Payment",
      type: "expense",
      date: new Date("2024-02-01"),
      tags: ["rent", "housing"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-bills",
    },
    {
      amount: -92.3,
      description: "Weekly Groceries",
      type: "expense",
      date: new Date("2024-02-03"),
      tags: ["groceries", "food"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-food",
    },
    {
      amount: -55.0,
      description: "Gas Station",
      type: "expense",
      date: new Date("2024-02-05"),
      tags: ["gas", "car"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-transport",
    },
    {
      amount: -180.0,
      description: "Car Insurance",
      type: "expense",
      date: new Date("2024-02-07"),
      tags: ["insurance", "car"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-transport",
    },
    {
      amount: -45.5,
      description: "Coffee Shop",
      type: "expense",
      date: new Date("2024-02-10"),
      tags: ["coffee", "dining"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-food",
    },
    {
      amount: 1200.0,
      description: "Freelance Logo Design",
      type: "income",
      date: new Date("2024-02-12"),
      tags: ["freelance", "design"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-freelance",
    },
    {
      amount: -299.99,
      description: "New Laptop Accessories",
      type: "expense",
      date: new Date("2024-02-14"),
      tags: ["electronics", "work"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-shopping",
    },
    {
      amount: -75.0,
      description: "Movie Night & Dinner",
      type: "expense",
      date: new Date("2024-02-16"),
      tags: ["entertainment", "date"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-entertainment",
    },

    // March 2024 transactions (recent)
    {
      amount: 5500.0,
      description: "Monthly Salary",
      type: "income",
      date: new Date("2024-03-01"),
      tags: ["salary", "monthly"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-salary",
    },
    {
      amount: -1200.0,
      description: "Rent Payment",
      type: "expense",
      date: new Date("2024-03-01"),
      tags: ["rent", "housing"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-bills",
    },
    {
      amount: -105.75,
      description: "Costco Shopping",
      type: "expense",
      date: new Date("2024-03-02"),
      tags: ["groceries", "bulk"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-food",
    },
    {
      amount: -48.0,
      description: "Gas Fill-up",
      type: "expense",
      date: new Date("2024-03-04"),
      tags: ["gas", "car"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-transport",
    },
    {
      amount: -135.0,
      description: "Electric & Water Bill",
      type: "expense",
      date: new Date("2024-03-05"),
      tags: ["utilities"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-bills",
    },
    {
      amount: -89.99,
      description: "Spotify Premium Family",
      type: "expense",
      date: new Date("2024-03-08"),
      tags: ["music", "subscription"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-entertainment",
    },
    {
      amount: 950.0,
      description: "Consulting Work",
      type: "income",
      date: new Date("2024-03-10"),
      tags: ["freelance", "consulting"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-freelance",
    },
    {
      amount: -220.0,
      description: "Dental Cleaning",
      type: "expense",
      date: new Date("2024-03-12"),
      tags: ["dental", "health"],
      userId: testUser.id,
      accountId: "user-checking",
      categoryId: "user-health",
    },
    {
      amount: -67.5,
      description: "Sushi Dinner",
      type: "expense",
      date: new Date("2024-03-15"),
      tags: ["dining", "sushi"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-food",
    },
    {
      amount: -199.99,
      description: "New Winter Jacket",
      type: "expense",
      date: new Date("2024-03-18"),
      tags: ["clothing", "winter"],
      userId: testUser.id,
      accountId: "user-credit",
      categoryId: "user-shopping",
    },
  ]

  console.log("💳 Creating transactions...")
  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }

  // Create budgets
  const budgets = [
    {
      name: "Monthly Food Budget",
      amount: 600.0,
      spent: 0,
      period: "monthly",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-31"),
      userId: testUser.id,
      categoryId: "user-food",
      isActive: true,
    },
    {
      name: "Transportation Budget",
      amount: 300.0,
      spent: 0,
      period: "monthly",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-31"),
      userId: testUser.id,
      categoryId: "user-transport",
      isActive: true,
    },
    {
      name: "Entertainment Budget",
      amount: 200.0,
      spent: 0,
      period: "monthly",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-31"),
      userId: testUser.id,
      categoryId: "user-entertainment",
      isActive: true,
    },
    {
      name: "Shopping Budget",
      amount: 400.0,
      spent: 0,
      period: "monthly",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-31"),
      userId: testUser.id,
      categoryId: "user-shopping",
      isActive: true,
    },
  ]

  console.log("📊 Creating budgets...")
  for (const budget of budgets) {
    await prisma.budget.create({
      data: budget,
    })
  }

  // Create bills
  const bills = [
    {
      name: "Rent",
      amount: 1200.0,
      dueDate: new Date("2024-04-01"),
      frequency: "monthly",
      isPaid: false,
      isRecurring: true,
      userId: testUser.id,
    },
    {
      name: "Electric Bill",
      amount: 120.0,
      dueDate: new Date("2024-04-05"),
      frequency: "monthly",
      isPaid: false,
      isRecurring: true,
      userId: testUser.id,
    },
    {
      name: "Car Insurance",
      amount: 180.0,
      dueDate: new Date("2024-04-07"),
      frequency: "monthly",
      isPaid: false,
      isRecurring: true,
      userId: testUser.id,
    },
    {
      name: "Netflix",
      amount: 25.99,
      dueDate: new Date("2024-04-08"),
      frequency: "monthly",
      isPaid: false,
      isRecurring: true,
      userId: testUser.id,
    },
    {
      name: "Spotify",
      amount: 89.99,
      dueDate: new Date("2024-04-08"),
      frequency: "monthly",
      isPaid: false,
      isRecurring: true,
      userId: testUser.id,
    },
    {
      name: "Phone Bill",
      amount: 85.0,
      dueDate: new Date("2024-04-15"),
      frequency: "monthly",
      isPaid: false,
      isRecurring: true,
      userId: testUser.id,
    },
  ]

  console.log("📅 Creating bills...")
  for (const bill of bills) {
    await prisma.bill.create({
      data: bill,
    })
  }

  console.log("✅ Database seeded successfully!")
  console.log("📈 Summary:")
  console.log(`- Created ${categories.length} default categories`)
  console.log(`- Created ${userCategories.length} user categories`)
  console.log(`- Created ${accounts.length} default accounts`)
  console.log(`- Created ${userAccounts.length} user accounts`)
  console.log(`- Created ${transactions.length} transactions`)
  console.log(`- Created ${budgets.length} budgets`)
  console.log(`- Created ${bills.length} bills`)
  console.log(`- Demo user: ${testUser.email}`)
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
