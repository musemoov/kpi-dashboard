import { Search, Mail, Bell, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="border-b py-2 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        
        <div className="relative w-full max-w-lg mx-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Mail className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
} 