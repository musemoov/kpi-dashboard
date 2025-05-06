"use client";

import { useState, useEffect } from "react";
import { supabase, KpiMetric } from "./supabase";

export type ChartData = {
  date: string;
  visitors: number;
};

export function useKpiData() {
  const [latestKpi, setLatestKpi] = useState<KpiMetric | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // 최신 KPI 데이터 가져오기 - single() 대신 maybeSingle() 사용
        const { data: latestData, error: latestError } = await supabase
          .from("kpi_metrics")
          .select("*")
          .order("date", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (latestError) {
          throw new Error(`최신 KPI 데이터를 가져오는 중 오류 발생: ${latestError.message}`);
        }

        setLatestKpi(latestData);

        // 방문자 차트 데이터 가져오기 (최근 7일)
        // 데이터가 있을 때만 차트 데이터 가져오기
        if (latestData) {
          const { data: chartData, error: chartError } = await supabase
            .from("kpi_metrics")
            .select("date, visitors")
            .order("date", { ascending: true })
            .limit(7);

          if (chartError) {
            throw new Error(`차트 데이터를 가져오는 중 오류 발생: ${chartError.message}`);
          }

          setChartData(chartData || []);
        } else {
          // 최신 데이터가 없으면 차트 데이터도 빈 배열로 설정
          setChartData([]);
        }
      } catch (e: any) {
        setError(e);
        console.error("KPI 데이터를 가져오는 중 오류 발생:", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { latestKpi, chartData, isLoading, error };
} 