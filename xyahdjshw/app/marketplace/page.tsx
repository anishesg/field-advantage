"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Leaf, TrendingUp } from "lucide-react"

interface MarketListing {
  id: string
  cropName: string
  quantity: string
  price: string
  quality: "Premium" | "Standard" | "Value"
  seller: string
  location: string
  imageUrl: string
  healthScore: number
}

export default function Marketplace() {
  const [listings] = useState<MarketListing[]>([
    {
      id: "1",
      cropName: "Organic Tomatoes",
      quantity: "500 kg",
      price: "$2.50/kg",
      quality: "Premium",
      seller: "Green Valley Farms",
      location: "California, USA",
      imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop",
      healthScore: 98
    },
    {
      id: "2",
      cropName: "Fresh Potatoes",
      quantity: "1000 kg",
      price: "$1.75/kg",
      quality: "Standard",
      seller: "Sunrise Agriculture",
      location: "Idaho, USA",
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop",
      healthScore: 95
    }
  ])

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground mt-2">Connect with buyers and sellers of sustainable produce</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={listing.imageUrl}
                  alt={listing.cropName}
                  className="h-full w-full object-cover"
                />
                <Badge
                  className="absolute right-2 top-2"
                  variant={listing.quality === "Premium" ? "default" : "secondary"}
                >
                  {listing.quality}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{listing.cropName}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{listing.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold text-green-600">{listing.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Health Score</span>
                    <div className="flex items-center gap-1">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span>{listing.healthScore}%</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">{listing.seller} • {listing.location}</p>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <Button className="flex-1">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Purchase
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Trends
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}