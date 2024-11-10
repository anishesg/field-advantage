export async function analyzePlant(file: File, cropName: string) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('cropName', cropName);
    
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Analysis failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing plant:', error);
    throw error;
  }
}