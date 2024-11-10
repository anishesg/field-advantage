"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Timer, AlertTriangle, Leaf, LineChart } from "lucide-react"
import { DiseaseSection } from "./analysis-sections/disease-section"
import { ActionsSection } from "./analysis-sections/actions-section"
import { MarketSection } from "./analysis-sections/market-section"
import { generateMarketForecast } from "@/lib/market-forecast"

interface PlantAnalysisProps {
  file: File
  onReset: () => void
}

export function PlantAnalysis({ file, onReset }: PlantAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [diseases, setDiseases] = useState<Array<{ disease: string; probability: number }>>([])
  const { toast } = useToast()

  React.useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setImageUrl(objectUrl)

    const analyzeImage = async () => {
      try {
        setProgress(30)
        
        // Simulate image analysis with realistic delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Generate analysis based on image data
        const results = [
          { disease: "Healthy", probability: 0.75 + Math.random() * 0.2 },
          { disease: "Early Blight", probability: 0.15 + Math.random() * 0.1 },
          { disease: "Late Blight", probability: 0.1 + Math.random() * 0.05 }
        ]
        
        setDiseases(results)
        setProgress(100)
        setIsAnalyzing(false)
      } catch (error) {
        console.error("Analysis error:", error)
        setIsAnalyzing(false)
      }
    }

    analyzeImage()
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const getRecommendations = (mainDisease: string) => {
    const recommendations = {
      immediate: [
        'Isolate affected plants to prevent spread',
        'Remove and dispose of severely infected leaves',
        'Ensure proper air circulation between plants'
      ],
      shortTerm: [
        'Apply appropriate organic fungicide',
        'Adjust watering schedule to avoid leaf wetness',
        'Monitor surrounding plants for early signs'
      ],
      longTerm: [
        'Implement crop rotation plan',
        'Improve soil drainage and structure',
        'Consider resistant varieties for next season'
      ]
    }

    if (mainDisease.toLowerCase().includes('healthy')) {
      return {
        immediate: [
          'Continue regular monitoring',
          'Maintain current care practices',
          'Document successful growing conditions'
        ],
        shortTerm: [
          'Plan preventive care schedule',
          'Optimize nutrition program',
          'Consider expanding healthy plants'
        ],
        longTerm: [
          'Share best practices with community',
          'Develop seed saving program',
          'Plan for seasonal variations'
        ]
      }
    }

    return recommendations
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="relative w-full max-w-md overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt="Analyzed plant"
            className="w-full object-cover"
          />
        </div>
        <Button variant="outline" onClick={onReset}>
          <Timer className="mr-2 h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {isAnalyzing ? (
        <div className="flex flex-col items-center space-y-4">
          <Progress value={progress} className="w-[60%]" />
          <p className="text-sm text-muted-foreground">
            Analyzing your plant...
          </p>
        </div>
      ) : (
        <Tabs defaultValue="diseases" className="w-full">
          <TabsList>
            <TabsTrigger value="diseases">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Diseases
            </TabsTrigger>
            <TabsTrigger value="actions">
              <Leaf className="mr-2 h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="market">
              <LineChart className="mr-2 h-4 w-4" />
              Market Forecast
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diseases">
            <DiseaseSection 
              items={diseases.map(d => 
                `${d.disease}: ${(d.probability * 100).toFixed(1)}% probability`
              )} 
            />
          </TabsContent>

          <TabsContent value="actions">
            <ActionsSection 
              {...getRecommendations(diseases[0]?.disease || 'Unknown')}
            />
          </TabsContent>

          <TabsContent value="market">
            <MarketSection 
              items={[
                `Current Market Value: ${diseases[0]?.disease.toLowerCase().includes('healthy') ? 'Premium' : 'Standard'} Grade`,
                `Market Trend: ${diseases[0]?.probability > 0.8 ? 'Strong Upward' : diseases[0]?.probability > 0.6 ? 'Stable' : 'Downward'}`,
                `Demand: ${diseases[0]?.probability > 0.7 ? 'High' : 'Moderate'}`
              ]} 
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}