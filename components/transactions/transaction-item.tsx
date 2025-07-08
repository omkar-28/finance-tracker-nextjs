"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, ArrowRightLeft, Trash2 } from "lucide-react"
import { deleteTransaction } from "@/lib/actions/transactions"
import { useTransition } from "react"
import { toast } from "@/hooks/use-toast"

interface TransactionItemProps {
  transaction: {
    id: string
    amount: any
    description: string
    type: string
    date: Date
    tags: string[]
    account: {
      name: string
    }
    category: {
      name: string
    }
  }
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [isPending, startTransition] = useTransition()

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

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTransaction(transaction.id)
        toast({
          title: "Transaction deleted",
          description: "The transaction has been successfully removed.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete transaction. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
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
      <div className="flex items-center space-x-4">
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
        <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isPending}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
