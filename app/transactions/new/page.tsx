import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionForm } from "@/components/transactions/transaction-form"

export default async function NewTransactionPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add Transaction</h2>
        <p className="text-muted-foreground">Record a new income, expense, or transfer</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>Fill in the details for your transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionForm />
        </CardContent>
      </Card>
    </div>
  )
}
