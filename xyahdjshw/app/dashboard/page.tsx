"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Camera, History, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PlantAnalysis } from "@/components/plant-analysis"

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive"
        })
        return
      }
      setSelectedFile(file)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Plant Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="space-y-4">
          <Card className="p-6">
            {!selectedFile ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Upload plant image
                      </span>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <Button
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  Select Image
                </Button>
              </div>
            ) : (
              <PlantAnalysis
                file={selectedFile}
                onReset={() => setSelectedFile(null)}
              />
            )}
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Analysis History</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">No analysis history yet.</p>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="marketplace" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Marketplace</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your sustainable produce marketplace.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}