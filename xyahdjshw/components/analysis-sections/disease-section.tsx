import { Card } from "@/components/ui/card"

interface DiseaseSectionProps {
  items: string[];
}

export function DiseaseSection({ items }: DiseaseSectionProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Disease Analysis</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border p-4">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}