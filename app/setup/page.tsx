import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatabaseStatus } from "@/components/database-status"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, CreditCard } from "lucide-react"
import Link from "next/link"

export default async function SetupPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Personal Finance Tracker!</h1>
        <p className="text-muted-foreground">Let's make sure everything is set up correctly</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DatabaseStatus />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Authentication
            </CardTitle>
            <CardDescription>User authentication status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Signed in as {session.user?.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Default Setup
            </CardTitle>
            <CardDescription>Categories and accounts initialization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Default categories created</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Default accounts ready</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Get started with your finance tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link href="/transactions/new">
              <Button variant="outline" className="w-full bg-transparent">
                Add First Transaction
              </Button>
            </Link>
            <Link href="/accounts">
              <Button variant="outline" className="w-full bg-transparent">
                Manage Accounts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
