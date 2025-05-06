"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export function DashboardHeader() {
  const { signOut, user } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">
            Marketing KPI Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {user?.email}
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
} 