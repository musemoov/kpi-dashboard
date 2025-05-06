# 마케팅 KPI 대시보드

Supabase 인증 및 실시간 데이터를 사용하는 마케팅 KPI 대시보드입니다.

## 기능

- Supabase 이메일/비밀번호 인증
- 실시간 KPI 데이터 가져오기
- 시각적 KPI 대시보드
- 방문자 추이 차트

## 기술 스택

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase (인증 및 데이터베이스)
- Recharts (차트 라이브러리)

## 시작하기

### 필수 조건

- Node.js 18 이상
- Supabase 프로젝트

### Supabase 설정

1. Supabase 프로젝트를 생성합니다.
2. 다음 스키마로 `kpi_metrics` 테이블을 생성합니다:
   - `id` (BIGINT, PRIMARY KEY)
   - `date` (DATE, NOT NULL)
   - `visitors` (INT, NOT NULL)
   - `conversions` (INT, NOT NULL)
   - `ad_spend` (FLOAT, NOT NULL)
   - `roi` (FLOAT, NOT NULL)
   - `created_at` (TIMESTAMP, DEFAULT NOW())

3. 테스트 데이터를 삽입합니다:
```sql
INSERT INTO kpi_metrics (date, visitors, conversions, ad_spend, roi)
VALUES
  ('2023-05-01', 1200, 50, 350000, 5.2),
  ('2023-05-02', 1350, 57, 360000, 5.8),
  ('2023-05-03', 1100, 42, 340000, 4.5),
  ('2023-05-04', 1250, 55, 355000, 5.6),
  ('2023-05-05', 1400, 62, 365000, 6.1),
  ('2023-05-06', 1050, 40, 330000, 4.3),
  ('2023-05-07', 950, 35, 320000, 3.9);
```

4. Supabase URL과 anon key를 복사합니다.

### 환경 변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 다음 값을 설정합니다:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 설치 및 실행

```bash
# 종속성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 사용법

1. 로그인 페이지(`/login`)에서 Supabase 계정으로 로그인합니다.
2. 로그인 성공 시 대시보드(`/dashboard`)로 자동 리디렉션됩니다.
3. 대시보드에서 주요 KPI 지표와 방문자 추이를 확인합니다.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
