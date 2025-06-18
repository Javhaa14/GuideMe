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

// const stats = [
//   {
//     title: "Total Users",
//     value: "2.34",
//     change: "+12%",
//     icon: Users,
//     color: "text-blue-600",
//   },
//   {
//     title: "Active Bookings",
//     value: "156",
//     change: "+18%",
//     icon: BookOpen,
//     color: "text-green-600",
//   },
//   {
//     title: "Revenue",
//     value: "$45.2",
//     change: "+23%",
//     icon: TrendingUp,
//     color: "text-purple-600",
//   },
//   {
//     title: "New Guides",
//     value: "23",
//     change: "+5%",
//     icon: UserCheck,
//     color: "text-orange-600",
//   },
// ];

// const mockUsers = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     email: "sarah.j@email.com",
//     avatar: "/placeholder.svg?height=40&width=40",
//     role: "Tourist",
//     status: "active",
//     joinDate: "Jan 15, 2024",
//     bookings: 12,
//     rating: 4.8,
//     location: "New York, USA",
//     lastActive: "2 hours ago",
//     isOnline: "online",
//   },
//   {
//     id: 2,
//     name: "Mike Chen",
//     email: "mike.chen@email.com",
//     avatar: "/placeholder.svg?height=40&width=40",
//     role: "Guide",
//     status: "active",
//     joinDate: "Dec 8, 2023",
//     bookings: 45,
//     rating: 4.9,
//     location: "Tokyo, Japan",
//     lastActive: "1 hour ago",
//     isOnline: "online",
//   },
//   {
//     id: 3,
//     name: "Emma Wilson",
//     email: "emma.w@email.com",
//     avatar: "/placeholder.svg?height=40&width=40",
//     role: "Tourist",
//     status: "inactive",
//     joinDate: "Feb 3, 2024",
//     bookings: 3,
//     rating: 4.2,
//     location: "London, UK",
//     lastActive: "1 week ago",
//     isOnline: "offline",
//   },
//   {
//     id: 4,
//     name: "Carlos Rodriguez",
//     email: "carlos.r@email.com",
//     avatar: "/placeholder.svg?height=40&width=40",
//     role: "Guide",
//     status: "active",
//     joinDate: "Nov 20, 2023",
//     bookings: 67,
//     rating: 4.7,
//     location: "Barcelona, Spain",
//     lastActive: "30 minutes ago",
//     isOnline: "busy",
//   },
//   {
//     id: 5,
//     name: "Lisa Park",
//     email: "lisa.park@email.com",
//     avatar: "/placeholder.svg?height=40&width=40",
//     role: "Tourist",
//     status: "banned",
//     joinDate: "Jan 28, 2024",
//     bookings: 1,
//     rating: 2.1,
//     location: "Seoul, Korea",
//     lastActive: "3 days ago",
//     isOnline: "offline",
//   },
//   {
//     id: 6,
//     name: "Ahmed Hassan",
//     email: "ahmed.h@email.com",
//     avatar: "/placeholder.svg?height=40&width=40",
//     role: "Guide",
//     status: "pending",
//     joinDate: "Mar 1, 2024",
//     bookings: 0,
//     rating: 0,
//     location: "Cairo, Egypt",
//     lastActive: "1 day ago",
//     isOnline: "offline",
//   },
// ];
// const activeUsers = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     avatar: "/placeholder-user.jpg",
//     location: "New York, USA",
//     lastActive: "2 hours ago",
//     isOnline: "online",
//     activity: "Completed a booking",
//     rating: 4.8,
//     joinDate: "Jan 15, 2024",
//   },
//   {
//     id: 2,
//     name: "Mike Chen",
//     avatar: "/placeholder-user.jpg",
//     location: "Tokyo, Japan",
//     lastActive: "4 hours ago",
//     isOnline: "online",
//     activity: "Received a 5-star review",
//     rating: 4.9,
//     joinDate: "Dec 8, 2023",
//   },
//   {
//     id: 3,
//     name: "Emma Wilson",
//     avatar: "/placeholder-user.jpg",
//     location: "London, UK",
//     lastActive: "1 day ago",
//     isOnline: "offline",
//     activity: "Updated profile",
//     rating: 4.2,
//     joinDate: "Feb 3, 2024",
//   },
//   {
//     id: 4,
//     name: "Carlos Rodriguez",
//     avatar: "/placeholder-user.jpg",
//     location: "Barcelona, Spain",
//     lastActive: "30 minutes ago",
//     isOnline: "busy",
//     activity: "Added new tour package",
//     rating: 4.7,
//     joinDate: "Nov 20, 2023",
//   },
// ];
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
