export interface Disease {
  disease: string;
  probability: number;
}

export interface MarketForecast {
  currentPrice: string;
  predictedPrice: string;
  trend: 'upward' | 'downward' | 'stable';
  confidence: number;
  marketData: {
    supply: 'low' | 'moderate' | 'high';
    demand: 'low' | 'moderate' | 'high';
    seasonality: 'peak' | 'off-peak' | 'transition';
    competitorPrices: Array<{
      market: string;
      price: string;
    }>;
  };
  priceHistory: Array<{
    date: string;
    price: string;
    change: number;
  }>;
}