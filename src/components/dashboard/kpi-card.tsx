import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function KpiCard({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
}: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        
        {trend && trendValue && (
          <div
            className={`text-sm font-medium ${
              trend === "up" ? "text-green-500" : 
              trend === "down" ? "text-red-500" : 
              "text-gray-500"
            }`}
          >
            {trend === "up" ? "↑ " : trend === "down" ? "↓ " : ""}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
} 