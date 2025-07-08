import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, PieChart, Shield, Smartphone, TrendingUp } from "lucide-react"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FinanceTracker</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signin">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Take Control of Your <span className="text-blue-600">Financial Future</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Track expenses, manage budgets, and gain insights into your spending habits with our comprehensive personal
          finance tracker.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link href="/auth/signin">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Tracking Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Manage Your Money
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powerful features to help you understand and control your finances
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Smart Analytics</CardTitle>
              <CardDescription>
                Get detailed insights into your spending patterns with interactive charts and reports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <PieChart className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Budget Tracking</CardTitle>
              <CardDescription>
                Set budgets for different categories and get alerts when you're close to limits
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Spending Health Score</CardTitle>
              <CardDescription>
                Get a personalized score based on your financial habits and receive improvement tips
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your financial data is encrypted and secure. We never share your information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Smartphone className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Multi-Device Sync</CardTitle>
              <CardDescription>Access your financial data from anywhere with automatic synchronization</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CreditCard className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Multiple Accounts</CardTitle>
              <CardDescription>
                Track checking, savings, credit cards, and investment accounts in one place
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-blue-600 text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of users who have taken control of their finances</p>
            <Link href="/auth/signin">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 FinanceTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
