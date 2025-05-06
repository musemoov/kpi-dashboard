import { createClient } from '@supabase/supabase-js';

// 실제 프로젝트에서는 환경변수로 관리해야 합니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 타입스크립트 Database 타입 정의
export type KpiMetric = {
  id: number;
  user_id: string;
  date: string;
  visitors: number;
  conversions: number;
  ad_spend: number;
  roi: number;
  created_at?: string;
};

export type Database = {
  public: {
    Tables: {
      kpi_metrics: {
        Row: KpiMetric;
        Insert: Omit<KpiMetric, 'id' | 'created_at'>;
        Update: Partial<Omit<KpiMetric, 'id' | 'created_at'>>;
      };
    };
  };
};

export const supabase = createClient<Database>(supabaseUrl, supabaseKey); 