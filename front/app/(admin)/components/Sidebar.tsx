//sidebar//
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserCheck,
  BarChart3,
  LogOut,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const navigationItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: BookOpen },
  { id: "tourists", label: "Tourists", icon: Users },
  { id: "guides", label: "Guides", icon: UserCheck },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

const accountItems = [{ id: "logout", label: "Logout", icon: LogOut }];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  return (
    <aside className="w-[280px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              TourAdmin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Management Panel
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-8">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Main Menu
            </h2>
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 h-10 ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Account
            </h2>
            <nav className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    onClick={() =>
                      item.id === "logout" && router.push("/log-in")
                    }
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              admin@guideme.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
