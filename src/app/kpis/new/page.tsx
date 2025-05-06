"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { AuthGuard } from "@/components/auth-guard";

export default function NewKpiPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [visitors, setVisitors] = useState("");
  const [conversions, setConversions] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [roi, setRoi] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation
    if (!date || !visitors || !conversions || !adSpend || !roi) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (isNaN(Number(visitors)) || isNaN(Number(conversions)) || isNaN(Number(adSpend)) || isNaN(Number(roi))) {
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
      roi: Number(roi),
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
            <input type="number" value={visitors} onChange={e => setVisitors(e.target.value)} className="w-full border rounded px-3 py-2" required min={0} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Conversions</label>
            <input type="number" value={conversions} onChange={e => setConversions(e.target.value)} className="w-full border rounded px-3 py-2" required min={0} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ad Spend</label>
            <input type="number" step="0.01" value={adSpend} onChange={e => setAdSpend(e.target.value)} className="w-full border rounded px-3 py-2" required min={0} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ROI</label>
            <input type="number" step="0.01" value={roi} onChange={e => setRoi(e.target.value)} className="w-full border rounded px-3 py-2" required />
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