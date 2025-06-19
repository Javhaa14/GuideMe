"use client";
import {
  BookOpen,
  HomeIcon,
  TrendingUp,
  UserCheck,
  Users,
  Users2,
} from "lucide-react";
import { Sidebar, Statscard, UserGrid } from "../components";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActiveUsers } from "../components/ActiveUsers";
import { axiosInstance } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [user, setUser] = useState([]);
  const [stats, setStats] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);

      if (activeTab === "overview") {
        const [statsRes, activeUsersRes] = await Promise.all([
          axiosInstance.get("/stats"),
          axiosInstance.get("/admin/isOnline"),
        ]);

        console.log("✅ Stats fetched:", statsRes.data.stats);
        console.log("✅ Active users fetched:", activeUsersRes.data.users);
        setStats(statsRes.data.stats);
        setActiveUsers(activeUsersRes.data.users);
      } else {
        const role = activeTab === "tourists" ? "tourist" : "guide";
        const params = {
          role,
          ...(searchQuery && { search: searchQuery }),
          ...(filterStatus !== "all" && { status: filterStatus }),
        };

        const res = await axiosInstance.get("/user", { params });
        console.log("✅ Users fetched:", res.data);
        setUser(res.data.users);
      }
    } catch (err) {
      console.error("❌ Data fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [activeTab, searchQuery, filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "banned":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {activeTab === "overview"
                    ? "Dashboard Overview"
                    : activeTab === "tourists"
                    ? "Tourist Management"
                    : activeTab === "guides"
                    ? "Guide Management"
                    : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {activeTab === "overview"
                    ? "Welcome back!"
                    : `Manage and monitor ${activeTab} on your platform.`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/")}
                >
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </div>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Statscard key={index} {...stat} />
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users2 className="w-5 h-5" />
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeUsers.map((user) => (
                      <ActiveUsers key={user._id} user={user} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {(activeTab === "tourists" || activeTab === "guides") && (
            <UserGrid
              users={user}
              activeTab={activeTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              getStatusColor={getStatusColor}
            />
          )}
        </div>
      </main>
    </div>
  );
}
