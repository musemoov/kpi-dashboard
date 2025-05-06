import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesCardProps {
  title: string;
  value: string;
  percentage?: number;
  subtitle?: string;
}

export function SalesDistribution() {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Sales Distribution</h2>
        <p className="text-sm text-gray-500">This is all over Platform Sales Generated</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TotalSalesCard 
          title="Total Sales" 
          value="$34,343.00" 
        />
        <SalesCard 
          title="By Website" 
          value="$4.5k" 
          percentage={40} 
          subtitle="(40%)" 
        />
        <SalesCard 
          title="By Mobile" 
          value="$2.8k" 
          percentage={25} 
          subtitle="(25%)" 
        />
        <SalesCard 
          title="By Market" 
          value="$2.2k" 
          percentage={20} 
          subtitle="(20%)" 
        />
        <SalesCard 
          title="By Agent" 
          value="$1.7k" 
          percentage={15}
          subtitle="(15%)" 
        />
      </div>
    </div>
  );
}

function TotalSalesCard({ title, value }: SalesCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </CardContent>
    </Card>
  );
}

function SalesCard({ title, value, percentage, subtitle }: SalesCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">By {title}</p>
        <div className="flex items-end justify-between mt-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
        </div>
      </CardContent>
    </Card>
  );
} 