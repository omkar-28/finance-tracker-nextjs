import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getDashboardData, getSpendingHealthScore } from "@/lib/actions/analytics"
import { setupUserDefaults } from "@/lib/setup-user-defaults"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { HealthScore } from "@/components/dashboard/health-score"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  // Setup default categories and accounts for new users
  await setupUserDefaults()

  const dashboardData = await getDashboardData()
  const healthScore = await getSpendingHealthScore()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader user={session.user} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards data={dashboardData} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <SpendingChart data={dashboardData.monthlyTrends} />
        </div>
        <div className="col-span-3 space-y-4">
          <HealthScore score={healthScore} />
          <CategoryChart data={dashboardData.categorySpending} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7">
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}
