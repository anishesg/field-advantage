import OpenAI from 'openai';
import type { Disease } from './types';

// For client-side, use the public environment variable
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateRecommendations(diseases: Disease[], location: GeolocationPosition) {
  try {
    // Use server API endpoint instead of direct OpenAI call
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diseases, location })
    });

    if (!response.ok) throw new Error('Failed to generate recommendations');
    return await response.json();
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return {
      immediate: [
        'Inspect and remove any visibly infected leaves',
        'Apply organic fungicide to prevent spread',
        'Adjust irrigation to avoid overwatering'
      ],
      shortTerm: [
        'Implement crop rotation plan',
        'Install drip irrigation system',
        'Start companion planting program'
      ],
      longTerm: [
        'Develop soil health management plan',
        'Invest in disease-resistant varieties',
        'Create biodiversity zones around fields'
      ]
    };
  }
}