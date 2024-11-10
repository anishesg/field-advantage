"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceChart } from "@/components/charts/price-chart"
import { generateHistoricalData } from "@/lib/market-forecast"

interface MarketSectionProps {
  items: string[];
}

export function MarketSection({ items }: MarketSectionProps) {
  const basePrice = 100 + Math.random() * 50;
  
  const monthlyData = generateHistoricalData(30, basePrice, 0.1);
  const yearlyData = generateHistoricalData(12, basePrice, 0.2);
  const fiveYearData = generateHistoricalData(60, basePrice, 0.3);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid gap-4">
          {items.map((item, index) => (
            <div key={index} className="rounded-lg border p-4">
              <p>{item}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="month" className="w-full">
          <TabsList>
            <TabsTrigger value="month">1 Month</TabsTrigger>
            <TabsTrigger value="year">1 Year</TabsTrigger>
            <TabsTrigger value="fiveYear">5 Years</TabsTrigger>
          </TabsList>

          <TabsContent value="month">
            <div className="h-[300px] mt-4">
              <PriceChart data={monthlyData} />
            </div>
          </TabsContent>

          <TabsContent value="year">
            <div className="h-[300px] mt-4">
              <PriceChart data={yearlyData} />
            </div>
          </TabsContent>

          <TabsContent value="fiveYear">
            <div className="h-[300px] mt-4">
              <PriceChart data={fiveYearData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}