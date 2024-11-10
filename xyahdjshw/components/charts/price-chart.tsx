"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PriceChartProps {
  data: Array<{
    date: string;
    price: number;
  }>;
}

export function PriceChart({ data }: PriceChartProps) {
  const CustomXAxis = ({ ...props }) => (
    <XAxis
      {...props}
      tick={{ fontSize: 12 }}
      tickFormatter={(value) => new Date(value).toLocaleDateString()}
    />
  );

  const CustomYAxis = ({ ...props }) => (
    <YAxis
      {...props}
      tick={{ fontSize: 12 }}
      tickFormatter={(value) => `$${value}`}
    />
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm">{new Date(label).toLocaleDateString()}</p>
          <p className="text-sm font-semibold">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <CustomXAxis dataKey="date" />
        <CustomYAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}