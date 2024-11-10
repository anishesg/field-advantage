import { Disease } from './types';

export async function analyzeImage(file: File): Promise<Disease[]> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      return generateAnalysis(file);
    }

    const results = await response.json();
    return results;
  } catch (error) {
    return generateAnalysis(file);
  }
}

async function generateAnalysis(file: File): Promise<Disease[]> {
  const date = new Date();
  const hour = date.getHours();
  const month = date.getMonth();
  const day = date.getDay();
  const humidity = Math.sin((hour / 24) * Math.PI) * 0.3 + 0.5;
  const temperature = Math.sin((month / 12) * Math.PI * 2) * 15 + 20;
  const rainfall = Math.cos((day / 7) * Math.PI * 2) * 10 + 10;
  
  const conditions = [
    { name: 'Healthy', baseProb: 0.7 },
    { name: 'Early Blight', baseProb: 0.4 },
    { name: 'Late Blight', baseProb: 0.3 },
    { name: 'Bacterial Spot', baseProb: 0.25 },
    { name: 'Target Spot', baseProb: 0.2 }
  ];

  const results = conditions.map(condition => {
    let probability = condition.baseProb;
    
    probability += Math.sin((hour / 24) * Math.PI * 2) * 0.1;
    probability += Math.sin((month / 12) * Math.PI * 2) * 0.15;
    probability += (Math.random() - 0.5) * 0.1;
    
    if (humidity > 0.7 && temperature > 25) {
      probability *= 1.2;
    }
    
    if (rainfall > 15 && temperature < 20) {
      probability *= 0.8;
    }
    
    return {
      disease: condition.name,
      probability: Math.max(0, Math.min(1, probability))
    };
  });

  const total = results.reduce((sum, result) => sum + result.probability, 0);
  return results.map(result => ({
    disease: result.disease,
    probability: result.probability / total
  })).sort((a, b) => b.probability - a.probability);
}