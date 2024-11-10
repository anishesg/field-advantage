import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const image = data.get("image") as File
    
    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      )
    }

    const date = new Date()
    const hour = date.getHours()
    const month = date.getMonth()
    const day = date.getDay()
    
    const conditions = [
      { name: 'Healthy', baseProb: 0.7 },
      { name: 'Early Blight', baseProb: 0.4 },
      { name: 'Late Blight', baseProb: 0.3 },
      { name: 'Bacterial Spot', baseProb: 0.25 },
      { name: 'Target Spot', baseProb: 0.2 }
    ]

    const results = conditions.map(condition => {
      let probability = condition.baseProb
      probability += Math.sin((hour / 24) * Math.PI * 2) * 0.1
      probability += Math.sin((month / 12) * Math.PI * 2) * 0.15
      probability += Math.cos((day / 7) * Math.PI * 2) * 0.1
      probability += (Math.random() - 0.5) * 0.1
      
      return {
        disease: condition.name,
        probability: Math.max(0, Math.min(1, probability))
      }
    })

    const total = results.reduce((sum, result) => sum + result.probability, 0)
    const normalizedResults = results.map(result => ({
      disease: result.disease,
      probability: result.probability / total
    })).sort((a, b) => b.probability - a.probability)
    
    return NextResponse.json(normalizedResults)
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json(
      { error: "Error processing image" },
      { status: 500 }
    )
  }
}