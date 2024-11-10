export interface HistoryEntry {
  id: string;
  date: string;
  diseases: Array<{ disease: string; probability: number }>;
}

export function saveAnalysis(diseases: Array<{ disease: string; probability: number }>) {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      diseases
    };

    const updatedHistory = [entry, ...history];
    localStorage.setItem('plant_analysis_history', JSON.stringify(updatedHistory));
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
    
    return entry;
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const history = localStorage.getItem('plant_analysis_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}