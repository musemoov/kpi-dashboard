import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

export function SalesOverview() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Sales Overview</CardTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mt-2">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#5B5FEF"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="100"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#06D6A0"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="170"
                transform="rotate(-90 50 50)"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-bold">$500,00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#5B5FEF]"></div>
              <span className="text-sm text-gray-600">Profit</span>
            </div>
            <div className="ml-auto text-sm font-medium">$23,450</div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#06D6A0]"></div>
              <span className="text-sm text-gray-600">Expense</span>
            </div>
            <div className="ml-auto text-sm font-medium">$23,450</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 