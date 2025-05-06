"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { AuthGuard } from "@/components/auth-guard";
import { KpiMetric } from "@/lib/supabase";
import { Trash2 } from "lucide-react";

export default function KpiListPage() {
  const { user } = useAuth();
  const [kpis, setKpis] = useState<KpiMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fetchKpis = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("kpi_metrics")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        throw error;
      }

      setKpis(data || []);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis();
  }, [user, fetchKpis]);

  const handleDelete = async (id: number) => {
    // 삭제 확인 다이얼로그
    const confirmed = window.confirm("정말 이 KPI 기록을 삭제하시겠습니까?");
    
    if (!confirmed) return;
    
    setIsDeleting(true);
    setDeleteMessage(null);
    
    try {
      const { error } = await supabase
        .from("kpi_metrics")
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setDeleteMessage({
        type: 'success',
        text: 'KPI 기록이 성공적으로 삭제되었습니다.'
      });
      
      // 목록 새로고침
      await fetchKpis();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setDeleteMessage({
        type: 'error',
        text: `삭제 중 오류가 발생했습니다: ${errorMessage}`
      });
    } finally {
      setIsDeleting(false);
      
      // 메시지 자동 삭제
      setTimeout(() => {
        setDeleteMessage(null);
      }, 5000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(num);

  const formatNumber = (num: number) => 
    new Intl.NumberFormat().format(num);

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

  return (
    <AuthGuard>
      <div>
        <h1 className="text-2xl font-bold mb-6">KPI Records</h1>
        
        {deleteMessage && (
          <div className={`mb-4 p-3 rounded-md ${deleteMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {deleteMessage.text}
          </div>
        )}
        
        {kpis.length === 0 ? (
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-yellow-700">
            <h2 className="text-lg font-semibold mb-2">No records found</h2>
            <p>You haven't added any KPI records yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Visitors</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Conversions</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Ad Spend</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">ROI</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((kpi) => (
                  <tr key={kpi.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{formatDate(kpi.date)}</td>
                    <td className="py-3 px-4">{formatNumber(kpi.visitors)} <span className="text-gray-500 text-sm">visitors</span></td>
                    <td className="py-3 px-4">{formatNumber(kpi.conversions)} <span className="text-gray-500 text-sm">conversions</span></td>
                    <td className="py-3 px-4">{formatCurrency(kpi.ad_spend)}</td>
                    <td className="py-3 px-4">{kpi.roi.toFixed(2)}%</td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleDelete(kpi.id)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        title="Delete this record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthGuard>
  );
} 