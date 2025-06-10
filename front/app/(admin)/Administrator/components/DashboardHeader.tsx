// DashboardHeader//

"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react"; //
import { Button } from "@/components/ui/button";

export default function DashboardHeader({ activeTab }: { activeTab: string }) {
  const router = useRouter();

  const title =
    activeTab === "overview"
      ? "Dashboard Overview"
      : activeTab === "tourists"
      ? "Tourist Management"
      : activeTab === "guides"
      ? "Guide Management"
      : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  const subtitle =
    activeTab === "overview"
      ? "Welcome back!"
      : `Manage and monitor ${activeTab} on your platform.`;

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>

      <Button
        variant="outline"
        onClick={() => router.push("/")}
        className="flex items-center gap-2"
      >
        <Home className="w-4 h-4" />
        Home
      </Button>
    </div>
  );
}
