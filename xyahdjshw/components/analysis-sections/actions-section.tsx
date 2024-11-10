import { Card } from "@/components/ui/card"

interface ActionsSectionProps {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
}

export function ActionsSection({ immediate, shortTerm, longTerm }: ActionsSectionProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Immediate Actions</h4>
          <ul className="space-y-2">
            {immediate.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Short-term Recommendations</h4>
          <ul className="space-y-2">
            {shortTerm.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Long-term Strategy</h4>
          <ul className="space-y-2">
            {longTerm.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}