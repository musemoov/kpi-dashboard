"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ChartData } from "@/lib/use-kpi-data";
import { TrendingUp } from "lucide-react";

interface VisitorsChartProps {
  data: ChartData[];
}

export function VisitorsChart({ data }: VisitorsChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 데이터가 없는 경우 대체 콘텐츠 표시
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-medium mb-4">Visitors Trend</h3>
        
        <div className="h-80 flex items-center justify-center flex-col text-center">
          <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-gray-400 max-w-md">
            Not enough data to display a chart yet. Add more KPI records to see visitor trends over time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium mb-4">Visitors Trend</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Tooltip
              formatter={(value) => [`${value} visitors`, "Visitors"]}
              labelFormatter={formatDate}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 