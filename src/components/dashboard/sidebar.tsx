import Link from "next/link";
import { LayoutDashboard, PlusCircle, List, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function Sidebar() {
  const { signOut } = useAuth();

  return (
    <aside className="bg-white border-r min-h-screen w-56 flex flex-col">
      <div className="p-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-500"></div>
          <h1 className="text-xl font-semibold">KPI Dashboard</h1>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        <Link href="/add-kpi" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
          <PlusCircle size={18} />
          <span>Add KPI</span>
        </Link>
        <Link href="/kpis" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
          <List size={18} />
          <span>KPI List</span>
        </Link>
      </nav>
      <div className="mt-auto p-4 border-t">
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 w-full"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
} 