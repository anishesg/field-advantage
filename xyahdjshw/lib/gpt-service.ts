"use client"

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeImage(imageBase64: string, cropName: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this ${cropName || 'plant'} image and provide:
              1. Disease analysis with probabilities
              2. Immediate actions needed
              3. Short-term recommendations
              4. Long-term strategy
              5. Expected market impact
              
              Format as a simple text response with clear sections.`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error: any) {
    console.error("GPT Analysis Error:", error);
    throw new Error(error?.error?.message || "Failed to analyze the image. Please try again.");
  }
}