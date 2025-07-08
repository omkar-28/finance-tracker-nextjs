import { getAccounts } from "@/lib/actions/accounts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Wallet, TrendingUp, PiggyBank } from "lucide-react"

export async function AccountsList() {
  const accounts = await getAccounts()

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Wallet className="h-5 w-5" />
      case "savings":
        return <PiggyBank className="h-5 w-5" />
      case "credit":
        return <CreditCard className="h-5 w-5" />
      case "investment":
        return <TrendingUp className="h-5 w-5" />
      default:
        return <Wallet className="h-5 w-5" />
    }
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case "checking":
        return "bg-blue-100 text-blue-800"
      case "savings":
        return "bg-green-100 text-green-800"
      case "credit":
        return "bg-red-100 text-red-800"
      case "investment":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (accounts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">No accounts found.</p>
          <p className="text-sm text-muted-foreground">Add your first account to get started.</p>
        </CardContent>
      </Card>
    )
  }

  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardDescription>Across all your accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${totalBalance.toLocaleString()}</div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                {getAccountIcon(account.type)}
                <span className="ml-2">{account.name}</span>
              </CardTitle>
              <Badge className={getAccountTypeColor(account.type)}>{account.type}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Number(account.balance).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{account.currency}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
