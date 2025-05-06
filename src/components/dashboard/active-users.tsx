import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export function ActiveUsers() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Active User</CardTitle>
        <button className="flex items-center text-xs text-gray-700 border border-gray-200 rounded px-2 py-1">
          <Upload className="h-3 w-3 mr-1" />
          Export
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <div className="text-blue-500 font-bold text-xl">8.06%</div>
          <div className="text-sm text-gray-500">Vs. pervious month</div>
        </div>

        <div className="h-[200px] w-full relative">
          {/* World map representation - simplified version */}
          <div className="w-full h-full bg-gray-50 rounded-lg relative flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-30"
            >
              <path
                d="M400,20 Q450,10 500,50 T600,70 T700,50 T800,90 Q750,150 700,130 T600,200 T500,250 T400,230 T300,250 T200,200 T100,130 T0,90 Q50,30 100,50 T200,70 T300,50 T400,20Z"
                stroke="#ddd"
                strokeWidth="1"
                fill="#f5f5f5"
              />
              <path
                d="M50,180 Q100,150 150,160 T250,200 T350,180 T450,220 T550,180 T650,200 T750,160 Q780,200 750,240 T650,280 T550,300 T450,280 T350,300 T250,280 T150,240 T50,220 Q20,200 50,180Z"
                stroke="#ddd"
                strokeWidth="1"
                fill="#f5f5f5"
              />
            </svg>

            {/* Points indicating user locations */}
            <div className="absolute top-1/4 left-1/3 h-2 w-2 bg-blue-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 h-2 w-2 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 h-2 w-2 bg-blue-500 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 h-2 w-2 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/2 h-2 w-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="text-3xl font-bold mb-1">23,214</div>
          <div className="text-sm text-gray-500">Total Active User</div>
        </div>
      </CardContent>
    </Card>
  );
} 