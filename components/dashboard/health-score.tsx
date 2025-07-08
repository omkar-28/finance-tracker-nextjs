import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface HealthScoreProps {
  score: number
}

export function HealthScore({ score }: HealthScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Health Score</CardTitle>
        <CardDescription>Based on your spending habits and financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}/100</div>
            <Badge variant={getScoreBadgeVariant(score)}>{getScoreLabel(score)}</Badge>
          </div>
          <Progress value={score} className="w-full" />
          <div className="text-sm text-muted-foreground">
            {score >= 80 && "Great job! You're managing your finances well."}
            {score >= 60 && score < 80 && "Good progress! Consider reviewing your budget."}
            {score >= 40 && score < 60 && "Room for improvement. Focus on reducing expenses."}
            {score < 40 && "Consider creating a budget and tracking expenses more closely."}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
