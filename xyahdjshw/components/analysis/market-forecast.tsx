"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

interface MarketForecast {
  currentPrice: string
  predictedPrice: string
  trend: string
  confidence: number
}

export function MarketForecast({ data }: { data: MarketForecast }) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-2xl font-bold">{data.currentPrice}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Predicted Price</p>
            <p className="text-2xl font-bold">{data.predictedPrice}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Confidence: {data.confidence}%
            </p>
          </div>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <ShoppingBag className="mr-2 h-4 w-4" />
          List on Marketplace
        </Button>
      </div>
    </Card>
  )
}