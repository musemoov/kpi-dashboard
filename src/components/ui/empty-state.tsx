import { FileBarChart, PlusCircle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  message: string;
  showAddButton?: boolean;
}

export function EmptyState({ message, showAddButton = true }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
      <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <FileBarChart className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No KPI data available</h3>
      <p className="text-gray-500 mb-6 max-w-md">{message}</p>
      
      {showAddButton && (
        <Link 
          href="/add-kpi" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Your First KPI</span>
        </Link>
      )}
    </div>
  );
} 