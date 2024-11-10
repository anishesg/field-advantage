"use client"

import { Card } from "@/components/ui/card"
import { Timer, Target, LineChart, Thermometer, Droplets, CloudRain, Sun } from "lucide-react"

interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  forecast: string
}

interface Recommendations {
  immediate: string[]
  shortTerm: string[]
  longTerm: string[]
  weather: WeatherData
}

export function RecommendationsView({ data }: { data: Recommendations }) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Action Plan</h3>
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-orange-500" />
              <h4 className="font-medium">Immediate Actions</h4>
            </div>
            <ul className="space-y-2">
              {data.immediate.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <h4 className="font-medium">Short-term Strategy</h4>
            </div>
            <ul className="space-y-2">
              {data.shortTerm.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-green-500" />
              <h4 className="font-medium">Long-term Planning</h4>
            </div>
            <ul className="space-y-2">
              {data.longTerm.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h4 className="font-medium mb-3">Environmental Conditions</h4>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <p className="font-medium">{data.weather.temperature}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{data.weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Rainfall</p>
              <p className="font-medium">{data.weather.rainfall}mm</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Forecast</p>
              <p className="font-medium capitalize">{data.weather.forecast}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}