"use client"

import { Card } from "@/components/ui/card"

interface Disease {
  disease: string
  probability: number
}

export function DiseaseList({ diseases }: { diseases: Disease[] }) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Disease Analysis</h3>
      <div className="space-y-4">
        {diseases.map((disease, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <p className="font-medium">{disease.disease}</p>
              <p className="text-sm text-muted-foreground">
                Confidence: {(disease.probability * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}