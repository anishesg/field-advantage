export function parseAnalysisSection(text: string | null, section: string): string[] {
  if (!text) return [];
  const sectionMatch = text.match(new RegExp(`${section}:([\\s\\S]*?)(?=\\n\\n|$)`));
  return sectionMatch ? sectionMatch[1].trim().split('\n').map(item => item.trim()) : [];
}