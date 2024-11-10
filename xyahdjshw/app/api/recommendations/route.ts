import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const { diseases, location, cropName } = await request.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Create a comprehensive action plan for a ${cropName} crop with the following disease analysis: ${JSON.stringify(diseases)}. Location: Lat ${location.latitude}, Long ${location.longitude}. Include immediate actions, short-term strategy, and long-term planning. Also include weather data. Format as JSON with fields: immediate (array), shortTerm (array), longTerm (array), and weather (object with temperature, humidity, rainfall, forecast).`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    })

    const recommendations = JSON.parse(response.choices[0].message.content || "{}")
    
    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json(
      { error: "Error generating recommendations" },
      { status: 500 }
    )
  }
}