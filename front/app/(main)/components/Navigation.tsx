"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Heart,
  LogOut,
  Moon,
  Settings,
  TentTree,
  User,
} from "lucide-react";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";
import { fetchGProfile, fetchTProfile } from "@/app/utils/fetchProfile";
import MessengerButton from "./Messenger";
import type { TouristProfile } from "../Touristdetail/components/MainProfile";

const translations = {
  en: {
    guides: "Guides",
    tourists: "Tourists",
    trips: "Trips",
    settings: "Settings",
    logout: "Log out",
    welcome: "Welcome",
    darkMode: "Dark Mode",
    notifications: "Notifications",
    role: "Switch Role",
    language: "Language",
    admin: "Admin",
    guide: "Guide",
    tourist: "Tourist",
    login: "Log In",
  },
  mn: {
    guides: "Гайдууд",
    tourists: "Аялагчид",
    trips: "Аялалууд",
    settings: "Тохиргоо",
    logout: "Гарах",
    welcome: "Тавтай морил",
    darkMode: "Харанхуй горим",
    notifications: "Мэдэгдэл",
    role: "Үүрэг солих",
    language: "Хэл",
    admin: "Админ",
    guide: "Гайд",
    tourist: "Аялагч",
    login: "Нэвтрэх",
  },
};

export const Navigation = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { data: session, status } = useSession();
  const [language, setLanguage] = useState<"en" | "mn">("en");
  const { theme, setTheme } = useTheme();
  const [tprofile, setTprofile] = useState<TouristProfile>();
  const [gprofile, setGprofile] = useState<GuideProfile>();
  const t = translations[language];

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        try {
          const [tpro, gpro] = await Promise.all([
            fetchTProfile(user.id),
            fetchGProfile(user.id),
          ]);
          setTprofile(tpro);
          setGprofile(gpro);
        } catch (err) {
          console.error("Failed to fetch profiles:", err);
        }
      }
    };
    loadProfile();
  }, [user?.id]);

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const handleLogout = async () => {
    try {
      if (session?.user?.id) {
        await axiosInstance.put("/api/online", {
          userId: session.user.id,
          isOnline: false,
        });
      }
      await signOut({ callbackUrl: "/log-in" });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleGoToProfile = () => {
    if (!user?.role) return;
    if (user.role === "Guide") {
      router.push(gprofile ? `/Guidedetail/${user.id}` : "/guideProfile");
    } else if (user.role === "Tourist") {
      router.push(tprofile ? `/Touristdetail/${user.id}` : "/touristProfile");
    } else {
      router.push("/");
    }
  };

  if (status === "loading") return null;

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <TentTree className="text-gray-900 dark:text-white" size={24} />
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          GuideMe
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 mx-auto">
        <Link href="/Guidesinfo" className="nav-link">
          {t.guides}
        </Link>
        <Link href="/Travelersinfo" className="nav-link">
          {t.tourists}
        </Link>
        <Link href="/Tripsinfo" className="nav-link">
          {t.trips}
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={tprofile?.profileimage ?? ""}
                      alt={session.user.name ?? "U"}
                    />
                    <AvatarFallback>
                      {getInitials(session.user.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {session.user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>{t.role}</DropdownMenuLabel>
                {user?.role && (
                  <div className="p-2">
                    <Select
                      value={user.role}
                      onValueChange={async (value) => {
                        if (!user.id) return;
                        try {
                          const res = await axiosInstance.put(
                            `/user/${user.id}`,
                            { role: value }
                          );
                          const { _id, username, role, email } = res.data.user;
                          setUser({ id: _id, username, role, email });
                        } catch (err) {
                          console.error("Failed to update role:", err);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">{t.admin}</SelectItem>
                        <SelectItem value="Guide">{t.guide}</SelectItem>
                        <SelectItem value="Tourist">{t.tourist}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleGoToProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/notification")}
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>
            <MessengerButton />
            <div
              onClick={() => router.push("/wish")}
              className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
            >
              <Heart color="red" fill="red" />
            </div>

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem asChild>
                  <div className="flex items-center justify-between w-full px-2 py-1.5">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <span>{t.darkMode}</span>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
                <div className="p-2">
                  <Select
                    value={language}
                    onValueChange={(value) => setLanguage(value as "en" | "mn")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="mn">Монгол</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push("/log-in")}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              {t.login}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem asChild>
                  <div className="flex items-center justify-between w-full px-2 py-1.5">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <span>{t.darkMode}</span>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t.language}</DropdownMenuLabel>
                <div className="p-2">
                  <Select
                    value={language}
                    onValueChange={(value) => setLanguage(value as "en" | "mn")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="mn">Монгол</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
};
