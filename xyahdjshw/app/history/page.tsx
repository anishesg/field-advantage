"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { NavigationBar } from "@/components/navigation-bar"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import { getHistory, type HistoryEntry } from "@/lib/storage"

export default function History() {
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const loadHistory = () => {
      const history = getHistory()
      setEntries(history)
    }

    loadHistory()
    window.addEventListener('storage', loadHistory)
    
    return () => {
      window.removeEventListener('storage', loadHistory)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analysis History</h1>
          <p className="text-muted-foreground mt-2">Review your previous plant analyses</p>
        </div>

        <div className="grid gap-6">
          {entries.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No analysis history yet.</p>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(entry.date), "PPP 'at' p")}
                </div>
                <div className="space-y-4">
                  {entry.diseases.map((disease, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{disease.disease}</span>
                      <span className="text-muted-foreground">
                        {(disease.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}