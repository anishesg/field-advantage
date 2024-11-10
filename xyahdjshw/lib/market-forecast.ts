interface DataPoint {
  date: string;
  price: number;
  trend: number;
}

function generateSeasonalFactor(date: Date): number {
  const month = date.getMonth();
  // Peak season: summer months (May-August)
  const peakSeasonFactor = Math.sin((month / 12) * 2 * Math.PI) * 0.15 + 1;
  return peakSeasonFactor;
}

function generateMarketCycleFactor(index: number, total: number): number {
  // Simulate market cycles with a combination of sine waves
  const shortCycle = Math.sin((index / total) * 2 * Math.PI * 3) * 0.05;
  const longCycle = Math.sin((index / total) * 2 * Math.PI) * 0.1;
  return 1 + shortCycle + longCycle;
}

export function generateHistoricalData(months: number, basePrice: number, volatility: number): DataPoint[] {
  const data: DataPoint[] = [];
  const now = new Date();
  let currentPrice = basePrice;
  
  for (let i = 0; i < months; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - (months - i - 1));
    
    const seasonalFactor = generateSeasonalFactor(date);
    const marketCycleFactor = generateMarketCycleFactor(i, months);
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    const trend = 1 + (i / months) * 0.1; // Slight upward trend
    
    currentPrice = currentPrice * randomFactor * seasonalFactor * marketCycleFactor * trend;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(currentPrice.toFixed(2)),
      trend: trend
    });
  }
  
  return data;
}