// DashboardHeader//

"use client";

import { useRouter } from "next/navigation";
import { Filter, Home, RefreshCw, Search } from "lucide-react"; //
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useState } from "react";

export default function DashboardHeader({ activeTab }: { activeTab: string }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const title =
    activeTab === "overview"
      ? "Dashboard Overview"
      : activeTab === "bookings"
      ? "Bookings"
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
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
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
