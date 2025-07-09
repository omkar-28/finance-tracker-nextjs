// Demo data utilities for testing and development

export const DEMO_USER = {
  id: "demo-user-id",
  email: "demo@financetracker.com",
  name: "Demo User",
  currency: "USD",
}

export const SAMPLE_TRANSACTIONS = [
  {
    amount: 5500.0,
    description: "Monthly Salary",
    type: "income" as const,
    category: "Salary",
    account: "Chase Checking",
    tags: ["salary", "monthly"],
  },
  {
    amount: -1200.0,
    description: "Rent Payment",
    type: "expense" as const,
    category: "Bills & Utilities",
    account: "Chase Checking",
    tags: ["rent", "housing"],
  },
  {
    amount: -85.5,
    description: "Grocery Shopping",
    type: "expense" as const,
    category: "Food & Dining",
    account: "Chase Checking",
    tags: ["groceries", "food"],
  },
  {
    amount: -45.0,
    description: "Gas Station",
    type: "expense" as const,
    category: "Transportation",
    account: "Chase Freedom Card",
    tags: ["gas", "car"],
  },
  {
    amount: 800.0,
    description: "Freelance Project",
    type: "income" as const,
    category: "Freelance",
    account: "Chase Checking",
    tags: ["freelance", "web-design"],
  },
]

export const SAMPLE_BUDGETS = [
  {
    name: "Monthly Food Budget",
    amount: 600.0,
    category: "Food & Dining",
    period: "monthly" as const,
  },
  {
    name: "Transportation Budget",
    amount: 300.0,
    category: "Transportation",
    period: "monthly" as const,
  },
  {
    name: "Entertainment Budget",
    amount: 200.0,
    category: "Entertainment",
    period: "monthly" as const,
  },
]

export const SAMPLE_BILLS = [
  {
    name: "Rent",
    amount: 1200.0,
    frequency: "monthly" as const,
    dueDay: 1,
  },
  {
    name: "Electric Bill",
    amount: 120.0,
    frequency: "monthly" as const,
    dueDay: 5,
  },
  {
    name: "Car Insurance",
    amount: 180.0,
    frequency: "monthly" as const,
    dueDay: 7,
  },
  {
    name: "Netflix",
    amount: 25.99,
    frequency: "monthly" as const,
    dueDay: 8,
  },
]

export const FINANCIAL_TIPS = [
  "Track every expense, no matter how small",
  "Set up automatic savings transfers",
  "Review and cancel unused subscriptions",
  "Build an emergency fund of 3-6 months expenses",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
  "Pay off high-interest debt first",
  "Invest in low-cost index funds for long-term growth",
  "Review your budget monthly and adjust as needed",
]

export const SPENDING_INSIGHTS = [
  "You spent 23% more on dining out this month",
  "Great job staying under your transportation budget!",
  "Consider setting up a budget for entertainment expenses",
  "Your grocery spending is consistent - well done!",
  "You've saved $200 more than last month",
]
