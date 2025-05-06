import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

export function RevenueUpdates() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Revenue Updates</CardTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-2">
          <div className="flex h-full items-end">
            {[30, 50, 25, 70, 35, 50, 20].map((value, i) => (
              <div key={i} className="flex-1 mx-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-t-sm ${i === 3 ? 'bg-blue-500' : 'bg-blue-100'}`} 
                  style={{ height: `${value}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-1">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 