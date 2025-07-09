import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Helper function to generate random transactions
function generateRandomTransactions(userId: string, accountIds: string[], categoryIds: { [key: string]: string[] }) {
  const transactions = []
  const currentDate = new Date()

  // Generate transactions for the past 6 months
  for (let month = 0; month < 6; month++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - month, 1)

    // Monthly salary
    transactions.push({
      amount: 5500 + Math.random() * 1000, // $5,500 - $6,500
      description: "Monthly Salary",
      type: "income",
      date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
      tags: ["salary", "monthly"],
      userId,
      accountId: accountIds[0], // checking account
      categoryId: categoryIds.income[0], // salary category
    })

    // Rent
    transactions.push({
      amount: -(1200 + Math.random() * 200), // $1,200 - $1,400
      description: "Rent Payment",
      type: "expense",
      date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
      tags: ["rent", "housing"],
      userId,
      accountId: accountIds[0],
      categoryId: categoryIds.expense[0], // bills category
    })

    // Generate 15-25 random transactions per month
    const numTransactions = 15 + Math.floor(Math.random() * 10)

    for (let i = 0; i < numTransactions; i++) {
      const day = Math.floor(Math.random() * 28) + 1
      const transactionDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day)

      const isExpense = Math.random() > 0.8 // 80% expenses, 20% income
      const type = isExpense ? "expense" : "income"
      const categories = isExpense ? categoryIds.expense : categoryIds.income
      const categoryId = categories[Math.floor(Math.random() * categories.length)]

      let amount, description, tags

      if (isExpense) {
        // Generate expense
        const expenseTypes = [
          { range: [20, 150], desc: ["Grocery Shopping", "Supermarket", "Whole Foods"], tags: ["groceries", "food"] },
          { range: [40, 80], desc: ["Gas Station", "Shell", "Chevron"], tags: ["gas", "car"] },
          { range: [15, 60], desc: ["Coffee Shop", "Starbucks", "Local Cafe"], tags: ["coffee", "dining"] },
          { range: [50, 200], desc: ["Restaurant Dinner", "Lunch Out", "Fast Food"], tags: ["dining", "restaurant"] },
          { range: [25, 100], desc: ["Online Shopping", "Amazon", "Target"], tags: ["shopping", "online"] },
          {
            range: [10, 50],
            desc: ["Subscription Service", "Netflix", "Spotify"],
            tags: ["subscription", "entertainment"],
          },
          { range: [100, 500], desc: ["Utility Bill", "Electric Bill", "Internet"], tags: ["utilities", "bills"] },
        ]

        const expenseType = expenseTypes[Math.floor(Math.random() * expenseTypes.length)]
        amount = -(expenseType.range[0] + Math.random() * (expenseType.range[1] - expenseType.range[0]))
        description = expenseType.desc[Math.floor(Math.random() * expenseType.desc.length)]
        tags = expenseType.tags
      } else {
        // Generate income
        const incomeTypes = [
          {
            range: [200, 1500],
            desc: ["Freelance Project", "Consulting Work", "Side Gig"],
            tags: ["freelance", "extra"],
          },
          { range: [50, 300], desc: ["Investment Return", "Dividend", "Interest"], tags: ["investment", "passive"] },
          { range: [100, 500], desc: ["Bonus Payment", "Commission", "Overtime"], tags: ["bonus", "work"] },
        ]

        const incomeType = incomeTypes[Math.floor(Math.random() * incomeTypes.length)]
        amount = incomeType.range[0] + Math.random() * (incomeType.range[1] - incomeType.range[0])
        description = incomeType.desc[Math.floor(Math.random() * incomeType.desc.length)]
        tags = incomeType.tags
      }

      transactions.push({
        amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
        description,
        type,
        date: transactionDate,
        tags,
        userId,
        accountId: accountIds[Math.floor(Math.random() * accountIds.length)],
        categoryId,
      })
    }
  }

  return transactions
}

async function createSampleData() {
  console.log("🎭 Creating additional sample data...")

  // Get the demo user
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@financetracker.com" },
  })

  if (!demoUser) {
    console.log("❌ Demo user not found. Please run the main seed first.")
    return
  }

  // Get user accounts and categories
  const userAccounts = await prisma.financialAccount.findMany({
    where: { userId: demoUser.id },
  })

  const userCategories = await prisma.category.findMany({
    where: { userId: demoUser.id },
  })

  const accountIds = userAccounts.map((acc) => acc.id)
  const categoryIds = {
    expense: userCategories.filter((cat) => cat.type === "expense").map((cat) => cat.id),
    income: userCategories.filter((cat) => cat.type === "income").map((cat) => cat.id),
  }

  // Generate random transactions
  const randomTransactions = generateRandomTransactions(demoUser.id, accountIds, categoryIds)

  console.log(`💳 Creating ${randomTransactions.length} additional transactions...`)

  for (const transaction of randomTransactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }

  console.log("✅ Sample data created successfully!")
}

createSampleData()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Error creating sample data:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
