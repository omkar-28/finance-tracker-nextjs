"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Database, CheckCircle, XCircle } from "lucide-react"

export function DatabaseStatus() {
  const [status, setStatus] = useState<{
    connected: boolean
    loading: boolean
    error?: string
  }>({
    connected: false,
    loading: true,
  })

  const checkConnection = async () => {
    setStatus({ connected: false, loading: true })

    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()

      if (response.ok) {
        setStatus({ connected: true, loading: false })
      } else {
        setStatus({
          connected: false,
          loading: false,
          error: data.error || "Connection failed",
        })
      }
    } catch (error) {
      setStatus({
        connected: false,
        loading: false,
        error: "Network error",
      })
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Status
        </CardTitle>
        <CardDescription>Current database connection status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {status.loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : status.connected ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}

            <Badge variant={status.connected ? "default" : "destructive"}>
              {status.loading ? "Checking..." : status.connected ? "Connected" : "Disconnected"}
            </Badge>
          </div>

          <Button variant="outline" size="sm" onClick={checkConnection} disabled={status.loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${status.loading ? "animate-spin" : ""}`} />
            Test Connection
          </Button>
        </div>

        {status.error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            Error: {status.error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
