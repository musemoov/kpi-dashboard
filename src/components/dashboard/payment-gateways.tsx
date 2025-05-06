import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, MoreHorizontal, Wallet } from "lucide-react";

export function PaymentGateways() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Payment Gateways</CardTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PaymentGatewayItem 
            name="Paypal"
            description="Big Brands"
            value="+$6235"
            icon="paypal"
          />
          <PaymentGatewayItem 
            name="Wallet"
            description="Bill payment"
            value="-$235"
            icon="wallet"
          />
          <PaymentGatewayItem 
            name="Credit card"
            description="Bill Payment"
            value="+$2235"
            icon="credit-card"
          />
        </div>

        <div className="mt-6">
          <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 rounded-md">
            View all transactions
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

interface PaymentGatewayItemProps {
  name: string;
  description: string;
  value: string;
  icon: string;
}

function PaymentGatewayItem({ name, description, value, icon }: PaymentGatewayItemProps) {
  return (
    <div className="flex items-center py-2">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        icon === 'paypal' ? 'bg-red-100' : 
        icon === 'wallet' ? 'bg-yellow-100' : 
        'bg-blue-100'
      }`}>
        {icon === 'paypal' && (
          <div className="text-red-500 font-bold text-lg">P</div>
        )}
        {icon === 'wallet' && (
          <Wallet className="h-6 w-6 text-yellow-500" />
        )}
        {icon === 'credit-card' && (
          <CreditCard className="h-6 w-6 text-blue-500" />
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <div className={`text-right font-medium ${value.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {value}
      </div>
    </div>
  );
} 