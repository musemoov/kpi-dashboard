"use client";

import { Users, CreditCard, TrendingUp, DollarSign } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { VisitorsChart } from "@/components/dashboard/visitors-chart";
import { useKpiData } from "@/lib/use-kpi-data";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
  const { latestKpi, chartData, isLoading, error } = useKpiData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-700">
        <h2 className="text-lg font-semibold mb-2">An error occurred</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!latestKpi) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Marketing KPI Dashboard</h1>
        </div>
        
        <EmptyState message="No KPI data yet. Add your first KPI entry to see insights here." />
      </div>
    );
  }

  // Data formatting
  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(num);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Marketing KPI Dashboard</h1>
        <p className="text-gray-500 mt-1">
          {new Date(latestKpi.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Visitors"
          value={`${formatNumber(latestKpi.visitors)} visitors`}
          icon={<Users className="h-5 w-5" />}
          description="Daily website visitors"
        />
        <KpiCard
          title="Conversions"
          value={`${formatNumber(latestKpi.conversions)} conversions`}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Visits that led to purchases"
        />
        <KpiCard
          title="Ad Spend"
          value={formatCurrency(latestKpi.ad_spend)}
          icon={<CreditCard className="h-5 w-5" />}
          description="Daily ad spend"
        />
        <KpiCard
          title="ROI"
          value={`${latestKpi.roi.toFixed(2)}%`}
          icon={<DollarSign className="h-5 w-5" />}
          description="Return on investment"
          trend={latestKpi.roi > 0 ? "up" : "down"}
          trendValue={`${Math.abs(latestKpi.roi).toFixed(2)}%`}
        />
      </div>

      <div className="mt-8">
        <VisitorsChart data={chartData} />
      </div>
    </div>
  );
} 