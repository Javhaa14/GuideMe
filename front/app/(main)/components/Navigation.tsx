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
import { Bell, LogOut, Moon, Settings, TentTree, User } from "lucide-react";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";
import { fetchGProfile, fetchTProfile } from "@/app/utils/fetchProfile";
import { TouristProfile } from "../Touristdetail/components/MainProfile";
import { GuideProfile } from "../Guidedetail/components/GuideMainProfile";

const translations = {
  en: {
    guides: "Guides",
    tourists: "Tourists",
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
    settings: "Тохиргоо",
    logout: "Гарах",
    welcome: "Тавтай морил",
    darkMode: "Харанхуй горим",
    notifications: "Мэдэгдлүүд",
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
        const tpro = await fetchTProfile(user.id);
        const gpro = await fetchGProfile(user.id);

        setTprofile(tpro);
        setGprofile(gpro);
      }
    };

    loadProfile();
  }, [user?.id]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

  if (status === "loading") return null;

  const handleLogout = async () => {
    try {
      if (session?.user?.id) {
        await axiosInstance.put("/api/online", {
          userId: session.user.id,
          isOnline: false,
        });
      }
      await signOut({ callbackUrl: "/log-in" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleGoToProfile = () => {
    if (user.role === "Guide") {
      if (!gprofile) {
        router.push("/guideProfile"); // First time, create guide profile
      } else {
        router.push(`/Guidedetail/${gprofile._id}`); // Existing guide profile
      }
    } else if (user.role === "Tourist") {
      if (!tprofile) {
        router.push("/touristProfile"); // First time, create tourist profile
      } else {
        router.push(`/Touristdetail/${tprofile._id}`); // Existing tourist profile
      }
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <TentTree className="text-gray-900 dark:text-white" size={24} />
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          GuideMe
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 mx-auto">
        <Link
          href="/Guidesinfo"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
        >
          {t.guides}
        </Link>
        <Link
          href="/Travelersinfo"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
        >
          {t.tourists}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={tprofile?.profileimage}
                      alt={session.user.name || ""}
                    />
                    <AvatarFallback>
                      {session.user.name ? getInitials(session.user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                    {session.user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>
                  <div className="text-sm font-medium">{t.role}</div>
                </DropdownMenuLabel>
                <div className="p-2">
                  <Select
                    value={user.role}
                    onValueChange={async (value) => {
                      try {
                        const res = await axiosInstance.put(
                          `/user/${user.id}`,
                          {
                            role: value,
                          }
                        );
                        setUser(res.data.user);
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
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleGoToProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => router.push("/notification")}
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>
            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                {/* Dark Mode */}
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

                {/* Language */}
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
                {/* Dark Mode */}
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

                {/* Language */}
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
