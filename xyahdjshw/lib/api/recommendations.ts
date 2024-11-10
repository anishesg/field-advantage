export async function getRecommendations(data: {
  diseases: any[],
  location: { latitude: number, longitude: number },
  cropName: string
}, retryCount = 3): Promise<any> {
  try {
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error('Recommendations failed')
    return response.json()
  } catch (error) {
    if (retryCount > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return getRecommendations(data, retryCount - 1)
    }
    throw error
  }
}