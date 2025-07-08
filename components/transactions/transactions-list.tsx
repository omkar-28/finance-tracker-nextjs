import { getTransactions } from "@/lib/actions/transactions"
import { TransactionItem } from "./transaction-item"

export async function TransactionsList() {
  const transactions = await getTransactions(50)

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No transactions found.</p>
        <p className="text-sm">Add your first transaction to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  )
}
