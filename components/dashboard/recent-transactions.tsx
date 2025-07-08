import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTransactions } from "@/lib/actions/transactions"
import { ArrowUpIcon, ArrowDownIcon, ArrowRightLeft } from "lucide-react"
import Link from "next/link"

export async function RecentTransactions() {
  const transactions = await getTransactions(5)

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowUpIcon className="h-4 w-4 text-green-600" />
      case "expense":
        return <ArrowDownIcon className="h-4 w-4 text-red-600" />
      case "transfer":
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />
      default:
        return <ArrowRightLeft className="h-4 w-4" />
    }
  }

  const getAmountColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-green-600"
      case "expense":
        return "text-red-600"
      default:
        return "text-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </div>
          <Link href="/transactions">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No transactions yet.</p>
              <Link href="/transactions/new">
                <Button className="mt-2">Add your first transaction</Button>
              </Link>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{transaction.category.name}</span>
                      <span>•</span>
                      <span>{transaction.account.name}</span>
                      <span>•</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${getAmountColor(transaction.type)}`}>
                    {transaction.type === "expense" ? "-" : "+"}${Number(transaction.amount).toLocaleString()}
                  </p>
                  {transaction.tags.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {transaction.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
