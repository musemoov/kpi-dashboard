"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { AuthGuard } from "@/components/auth-guard";

export default function AddKpiPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [visitors, setVisitors] = useState("");
  const [conversions, setConversions] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [roi, setRoi] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ROI 자동 계산 함수
  const calculateRoi = () => {
    if (!visitors || !conversions || !adSpend) {
      setRoi(null);
      return;
    }

    const visitorsNum = Number(visitors);
    const conversionsNum = Number(conversions);
    const adSpendNum = Number(adSpend);

    if (isNaN(visitorsNum) || isNaN(conversionsNum) || isNaN(adSpendNum) || adSpendNum === 0) {
      setRoi(null);
      return;
    }

    // ROI 계산 공식: ((conversions * 10) - adSpend) / adSpend * 100
    const calculatedRoi = ((conversionsNum * 10) - adSpendNum) / adSpendNum * 100;
    setRoi(calculatedRoi);
  };

  // 입력값이 변경될 때마다 ROI 다시 계산
  useEffect(() => {
    calculateRoi();
  }, [visitors, conversions, adSpend]);

  // 포맷팅 함수
  const formatRoi = (value: number | null) => {
    if (value === null) return "";
    return value.toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation
    if (!date || !visitors || !conversions || !adSpend || roi === null) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (isNaN(Number(visitors)) || isNaN(Number(conversions)) || isNaN(Number(adSpend))) {
      setError("All values must be valid numbers.");
      setIsLoading(false);
      return;
    }

    // Supabase insert
    const { error: insertError } = await supabase.from("kpi_metrics").insert({
      user_id: user?.id,
      date,
      visitors: Number(visitors),
      conversions: Number(conversions),
      ad_spend: Number(adSpend),
      roi: roi, // 자동 계산된 ROI 값 사용
    });
    if (insertError) {
      setError(insertError.message);
      setIsLoading(false);
      return;
    }
    setSuccess(true);
    setIsLoading(false);
    // Toast & redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <AuthGuard>
      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Add New KPI</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Visitors</label>
            <div className="relative">
              <input 
                type="number" 
                value={visitors} 
                onChange={e => setVisitors(e.target.value)} 
                className="w-full border rounded px-3 py-2 pr-20" 
                required 
                min={0} 
                placeholder="Number of visitors"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                visitors
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Conversions</label>
            <div className="relative">
              <input 
                type="number" 
                value={conversions} 
                onChange={e => setConversions(e.target.value)} 
                className="w-full border rounded px-3 py-2 pr-24" 
                required 
                min={0} 
                placeholder="Number of conversions"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                conversions
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ad Spend</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                $
              </div>
              <input 
                type="number" 
                step="0.01" 
                value={adSpend} 
                onChange={e => setAdSpend(e.target.value)} 
                className="w-full border rounded px-3 py-2 pl-6" 
                required 
                min={0} 
                placeholder="Total ad spend"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ROI (Automatically calculated)</label>
            <div className="relative">
              <input 
                type="text" 
                value={roi !== null ? formatRoi(roi) : ""} 
                className="w-full border rounded px-3 py-2 pr-6 bg-gray-50" 
                readOnly 
                placeholder="Will be calculated automatically"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                %
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ROI is automatically calculated based on $10 revenue per conversion.
            </p>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">KPI saved successfully!</div>}
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? "Saving..." : "Save KPI"}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
} 