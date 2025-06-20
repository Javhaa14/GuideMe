"use client";

<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
=======
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Bell,
  Heart,
  User,
  LogOut,
  TentTree,
  MessageCircle,
  Users,
  MapPin,
  Settings,
} from "lucide-react";

import { useTheme } from "next-themes";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
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
import { TouristProfile } from "../Touristdetail/components/MainProfile";
import { GuideProfile } from "../Guidedetail/components/GuideMainProfile";
import { MessengerButton } from "./Messenger";

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
=======
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MessengerButton } from "./Messenger";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/app/context/LanguageContext";
import { useProfile } from "@/app/context/ProfileContext";

type Tab = {
  name: TabName;
  href: string;
};

type TabName = "Guides" | "Travelers" | "Trips" | "";

const getInitials = (name: string) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
};

export const Navigation = () => {
  const router = useRouter();
<<<<<<< HEAD
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
        router.push(`/Guidedetail/${user.id}`); // Existing guide profile
      }
    } else if (user.role === "Tourist") {
      if (!tprofile) {
        router.push("/touristProfile"); // First time, create tourist profile
      } else {
        router.push(`/Touristdetail/${user.id}`); // Existing tourist profile
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
                  {user?.role && (
                    <Select
                      value={user.role}
                      onValueChange={async (value) => {
                        if (!user.id) {
                          console.error("No user ID available for update");
                          return;
                        }

                        try {
                          const res = await axiosInstance.put(
                            `/user/${user.id}`,
                            {
                              role: value,
                            }
                          );
                          setUser({
                            id: res.data.user._id,
                            username: res.data.user.username,
                            role: res.data.user.role,
                            email: res.data.user.email,
                          });
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
                  )}
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
=======
  const pathname = usePathname();
  const { data: session } = useSession();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const {
    currentRole,
    setCurrentRole,
    profileData,
    hasGuideProfile,
    hasTouristProfile,
    isLoading,
    requireAuth,
  } = useProfile();

  const getActiveTab = (): TabName => {
    // Remove query parameters and get the base path
    const basePath = pathname.split("?")[0];

    // Check for exact matches or paths that start with the tab path
    if (basePath === "/Guidesinfo" || basePath.startsWith("/Guidesinfo/"))
      return "Guides";
    if (basePath === "/Travelersinfo" || basePath.startsWith("/Travelersinfo/"))
      return "Travelers";
    if (basePath === "/Tripsinfo" || basePath.startsWith("/Tripsinfo/"))
      return "Trips";

    // If not on any of the main tab pages, return empty string to show no active tab
    return "";
  };

  const [activeTab, setActiveTab] = useState<TabName>(getActiveTab());

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [pathname]);

  // Dynamic tabs with translations
  const tabs: Tab[] = [
    { name: t("guides") as TabName, href: "/Guidesinfo" },
    { name: t("travelers") as TabName, href: "/Travelersinfo" },
    { name: t("trips") as TabName, href: "/Tripsinfo" },
  ];

  if (!session) {
    // Optional: Render a login-specific navbar or null
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <TentTree className="text-white" size={24} />
              <span className="text-lg font-bold text-white">GuideMe</span>
            </Link>
            <Button
              onClick={() => router.push("/log-in")}
              className="h-10 px-6 text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {t("logIn")}
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/log-in" });
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.name);
    router.push(tab.href);
  };

  const handleRoleChange = (role: "Guide" | "Tourist") => {
    setCurrentRole(role);

    // Navigate based on profile existence
    if (role === "Guide") {
      if (hasGuideProfile) {
        router.push(`/Guidedetail/${session?.user?.id}`);
      } else {
        router.push("/guideProfile");
      }
    } else {
      if (hasTouristProfile) {
        router.push(`/Touristdetail/${session?.user?.id}`);
      } else {
        router.push("/touristProfile");
      }
    }
  };

  const handleProfileClick = () => {
    // Navigate based on current role and profile existence
    if (currentRole === "Guide") {
      if (hasGuideProfile) {
        router.push(`/Guidedetail/${session?.user?.id}`);
      } else {
        router.push("/guideProfile");
      }
    } else {
      if (hasTouristProfile) {
        router.push(`/Touristdetail/${session?.user?.id}`);
      } else {
        router.push("/touristProfile");
      }
    }
  };

  // Get profile image from current profile data
  const profileImage = profileData?.profileimage || session.user.image;
  const displayName = profileData?.username || session.user.name;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <TentTree className="text-white" size={24} />
              <span className="text-lg font-bold text-white">GuideMe</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="relative mx-auto flex items-center justify-center bg-white/5 rounded-full p-1 backdrop-blur-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => handleTabClick(tab)}
                    className={cn(
                      "relative rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
                      "focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2",
                      "hover:scale-105 active:scale-95"
                    )}
                    style={{ WebkitTapHighlightColor: "transparent" }}>
                    {activeTab === tab.name && activeTab !== "" && (
                      <motion.span
                        layoutId="bubble"
                        className="absolute inset-0 z-10 bg-white/20 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.5,
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-20 transition-colors duration-200",
                        activeTab === tab.name && activeTab !== ""
                          ? "text-white font-semibold"
                          : "text-neutral-300 hover:text-white"
                      )}>
                      {tab.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {/* Role Selector */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105 text-white">
                    {currentRole === "Guide" ? (
                      <MapPin className="h-4 w-4" />
                    ) : (
                      <Users className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{currentRole}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 bg-black/40 backdrop-blur-xl border-white/10 text-gray-200 shadow-2xl">
                  <DropdownMenuItem
                    onClick={() => {
                      if (requireAuth("switch to Guide role")) {
                        handleRoleChange("Guide");
                      }
                    }}
                    className={cn(
                      "focus:bg-white/10 focus:text-white transition-colors duration-200",
                      currentRole === "Guide" && "bg-white/10 text-white"
                    )}>
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Guide</span>
                    {hasGuideProfile && (
                      <span className="ml-auto text-xs text-green-400">✓</span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (requireAuth("switch to Tourist role")) {
                        handleRoleChange("Tourist");
                      }
                    }}
                    className={cn(
                      "focus:bg-white/10 focus:text-white transition-colors duration-200",
                      currentRole === "Tourist" && "bg-white/10 text-white"
                    )}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Tourist</span>
                    {hasTouristProfile && (
                      <span className="ml-auto text-xs text-green-400">✓</span>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105"
              onClick={() => {
                if (requireAuth("access wishlist")) {
                  router.push("/wish");
                }
              }}>
              <Heart className="h-6 w-6 text-white" />
            </Button>
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105"
              onClick={() => {
                if (requireAuth("view notifications")) {
                  router.push("/notification");
                }
              }}>
              <Bell className="h-6 w-6 text-white" />
            </Button>
            <MessengerButton />

            <div className="ml-3 relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-0 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={profileImage ?? ""}
                        alt={displayName ?? "User"}
                      />
                      <AvatarFallback className="bg-white/30 text-white">
                        {getInitials(displayName || "")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-60 bg-black/40 backdrop-blur-xl border-white/10 text-gray-200 shadow-2xl">
                  <DropdownMenuLabel className="flex items-center gap-2 text-white">
                    <span className="font-medium">{displayName}</span>
                    <span className="text-xs text-gray-400">
                      ({currentRole})
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />

                  {/* Profile Links */}
                  <DropdownMenuItem
                    onClick={() => {
                      if (requireAuth("access profile")) {
                        handleProfileClick();
                      }
                    }}
                    className="focus:bg-white/10 focus:text-white transition-colors duration-200">
                    <User className="mr-2 h-4 w-4" />
                    <span>
                      {session.user.email === "admin@gmail.com"
                        ? t("adminPage")
                        : t("myProfile")}
                    </span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      if (requireAuth("access settings")) {
                        router.push("/Settings");
                      }
                    }}
                    className="focus:bg-white/10 focus:text-white transition-colors duration-200">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t("settings")}</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/10" />

                  {/* Settings */}
                  <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
                  <div className="p-2">
                    <Select
                      value={language}
                      onValueChange={(value) =>
                        setLanguage(
                          value as
                            | "en"
                            | "zh"
                            | "ja"
                            | "es"
                            | "de"
                            | "ko"
                            | "mn"
                        )
                      }>
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white backdrop-blur-sm">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 text-white border-white/10 backdrop-blur-xl">
                        <SelectItem
                          value="en"
                          className="focus:bg-white/10 focus:text-white hover:text-white">
                          🇺🇸 English
                        </SelectItem>
                        <SelectItem
                          value="zh"
                          className="focus:bg-white/10 focus:text-white hover:text-white">
                          🇨🇳 中文 (Chinese)
                        </SelectItem>
                        <SelectItem
                          value="ja"
                          className="focus:bg-white/10 focus:text-white hover:text-white">
                          🇯🇵 日本語 (Japanese)
                        </SelectItem>
                        <SelectItem
                          value="es"
                          className="focus:bg-white/10 focus:text-white hover:text-white">
                          🇪🇸 Español (Spanish)
                        </SelectItem>
                        <SelectItem
                          value="de"
                          className="focus:bg-white/10 focus:text-white hover:text-white">
                          🇩🇪 Deutsch (German)
                        </SelectItem>
                        <SelectItem
                          value="ko"
                          className="focus:bg-white/10 focus:text-white hover:text-white">
                          🇰🇷 한국어 (Korean)
                        </SelectItem>
                        <SelectItem
                          value="mn"
                          className="focus:bg-white/10 focus:text-white hover:text-white">
                          🇲🇳 Монгол (Mongolian)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 focus:text-red-400 focus:bg-white/10 transition-colors duration-200">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      </div>
    </nav>
  );
};
