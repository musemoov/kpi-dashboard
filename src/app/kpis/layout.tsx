"use client";

import { ReactNode } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sidebar } from "@/components/dashboard/sidebar";

interface KpisLayoutProps {
  children: ReactNode;
}

export default function KpisLayout({ children }: KpisLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
} 