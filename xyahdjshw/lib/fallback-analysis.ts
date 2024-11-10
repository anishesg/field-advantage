import { Disease } from './types';
import { DISEASE_LABELS } from './constants';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface ImageStats {
  greenness: number;
  brightness: number;
  contrast: number;
  spotCount: number;
}

async function getAIPredictions(imageStats: ImageStats): Promise<Disease[]> {
  try {
    const prompt = `As a plant pathologist, analyze these image statistics for a cassava plant and predict disease probabilities:
    
    Image Statistics:
    - Greenness: ${imageStats.greenness.toFixed(2)} (0-100, higher is greener)
    - Brightness: ${imageStats.brightness.toFixed(2)} (0-255)
    - Contrast: ${imageStats.contrast.toFixed(2)} (0-128)
    - Spot Count: ${imageStats.spotCount} (number of distinct color changes)
    
    Provide disease probabilities in this format:
    disease1|probability
    disease2|probability
    disease3|probability
    disease4|probability
    healthy|probability
    
    Probabilities should sum to 1. Consider that:
    - Low greenness suggests disease
    - High spot count suggests bacterial blight
    - High contrast suggests mosaic disease
    - Brown streak shows as brightness variations`

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 150
    });

    const predictions = response.choices[0].message.content?.split('\n').map(line => {
      const [disease, probability] = line.split('|');
      return {
        disease: DISEASE_LABELS.find(label => label.toLowerCase().includes(disease.toLowerCase())) || disease,
        probability: parseFloat(probability)
      };
    }) || [];

    return predictions.sort((a, b) => b.probability - a.probability);
  } catch (error) {
    console.error('Error getting AI predictions:', error);
    return fallbackPredictions(imageStats);
  }
}

function fallbackPredictions(stats: ImageStats): Disease[] {
  // Only used if AI prediction fails
  const normalizedGreenness = Math.min(stats.greenness / 100, 1);
  const normalizedSpots = Math.min(stats.spotCount / 1000, 1);
  const normalizedContrast = Math.min(stats.contrast / 128, 1);

  const healthiness = (
    normalizedGreenness * 0.5 + 
    (1 - normalizedSpots) * 0.3 + 
    (1 - Math.abs(normalizedContrast - 0.5)) * 0.2
  );

  const blight = normalizedSpots * 0.6 + (1 - normalizedGreenness) * 0.4;
  const brownStreak = normalizedContrast * 0.7 + (1 - normalizedGreenness) * 0.3;
  const greenMite = normalizedSpots * 0.4 + (1 - normalizedGreenness) * 0.3 + normalizedContrast * 0.3;
  const mosaic = normalizedContrast * 0.6 + normalizedSpots * 0.4;

  const total = healthiness + blight + brownStreak + greenMite + mosaic;
  
  return [
    { disease: DISEASE_LABELS[0], probability: blight / total },
    { disease: DISEASE_LABELS[1], probability: brownStreak / total },
    { disease: DISEASE_LABELS[2], probability: greenMite / total },
    { disease: DISEASE_LABELS[3], probability: mosaic / total },
    { disease: DISEASE_LABELS[4], probability: healthiness / total }
  ].sort((a, b) => b.probability - a.probability);
}

function analyzeImageStats(imageData: ImageData): ImageStats {
  const data = imageData.data;
  let totalBrightness = 0;
  let totalGreenness = 0;
  let spotCount = 0;
  let pixels = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const brightness = (r + g + b) / 3;
    totalBrightness += brightness;
    pixels.push(brightness);

    const greenness = g - Math.max(r, b);
    totalGreenness += Math.max(0, greenness);

    if (i > 0 && Math.abs(brightness - pixels[pixels.length - 2]) > 50) {
      spotCount++;
    }
  }

  const avgBrightness = totalBrightness / (data.length / 4);
  const avgGreenness = totalGreenness / (data.length / 4);

  let varianceSum = 0;
  for (const brightness of pixels) {
    varianceSum += Math.pow(brightness - avgBrightness, 2);
  }
  const contrast = Math.sqrt(varianceSum / pixels.length);

  return {
    greenness: avgGreenness,
    brightness: avgBrightness,
    contrast: contrast,
    spotCount: spotCount
  };
}

export async function fallbackAnalysis(file: File): Promise<Disease[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    img.onload = async () => {
      try {
        canvas.width = 224;
        canvas.height = 224;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const stats = analyzeImageStats(imageData);
        
        // Try AI predictions first
        const predictions = await getAIPredictions(stats);
        
        URL.revokeObjectURL(img.src);
        resolve(predictions);
      } catch (error) {
        URL.revokeObjectURL(img.src);
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}