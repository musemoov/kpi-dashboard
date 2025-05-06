import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

export function YearlySales() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Yearly Sales</CardTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full relative">
          {/* This is a simplified area chart representation */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,15 Q10,10 20,15 T40,20 T60,10 T80,15 T100,5 V30 H0 Z"
                fill="url(#gradient)"
                stroke="none"
              />
              <path
                d="M0,15 Q10,10 20,15 T40,20 T60,10 T80,15 T100,5"
                fill="none"
                stroke="#818cf8"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            <div>
              <div className="text-sm font-semibold">$5476</div>
              <div className="text-xs text-gray-500">2023</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-purple-300 mr-2"></div>
            <div>
              <div className="text-sm font-semibold">$4476</div>
              <div className="text-xs text-gray-500">2022</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 