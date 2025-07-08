import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0] || "there"}!</h2>
        <p className="text-muted-foreground">Here's what's happening with your finances today.</p>
      </div>
      <div className="flex items-center space-x-2">
        <Link href="/transactions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>
    </div>
  )
}
