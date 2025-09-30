"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Bell,
  User,
  LogOut,
  TentTree,
  Users,
  MapPin,
  Settings,
} from "lucide-react";

import { useTheme } from "next-themes";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
};

export const Navigation = () => {
  const router = useRouter();
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
    const basePath = pathname.split("?")[0];

    if (basePath === "/Guidesinfo" || basePath.startsWith("/Guidesinfo/"))
      return "Guides";
    if (basePath === "/Travelersinfo" || basePath.startsWith("/Travelersinfo/"))
      return "Travelers";
    if (basePath === "/Tripsinfo" || basePath.startsWith("/Tripsinfo/"))
      return "Trips";

    return "";
  };

  const [activeTab, setActiveTab] = useState<TabName>(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [pathname]);

  const tabs: Tab[] = [
    { name: t("guides") as TabName, href: "/Guidesinfo" },
    { name: t("travelers") as TabName, href: "/Travelersinfo" },
    { name: t("trips") as TabName, href: "/Tripsinfo" },
  ];

  if (!session) {
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
              className="h-10 px-6 text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
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

  const profileImage =
    profileData?.profileimage || session?.user?.image || undefined;
  const displayName = profileData?.username || session.user.name;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl">
      <div className="max-w-full mx-auto px-40">
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
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
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
                      )}
                    >
                      {tab.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105 text-white"
                  >
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
                  className="w-40 bg-black/40 backdrop-blur-xl border-white/10 text-gray-200 shadow-2xl"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      if (requireAuth("switch to Guide role")) {
                        handleRoleChange("Guide");
                      }
                    }}
                    className={cn(
                      "focus:bg-white/10 focus:text-white transition-colors duration-200",
                      currentRole === "Guide" && "bg-white/10 text-white"
                    )}
                  >
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
                    )}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>Tourist</span>
                    {hasTouristProfile && (
                      <span className="ml-auto text-xs text-green-400">✓</span>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105"
              onClick={() => {
                if (requireAuth("view notifications")) {
                  router.push("/notification");
                }
              }}
            >
              <Bell className="h-6 w-6 text-white" />
            </Button> */}
            <MessengerButton />

            <div className="ml-3 relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-0 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
                  >
                    <Avatar className="h-8 w-8">
                      {profileImage ? (
                        <AvatarImage
                          src={profileImage}
                          alt={displayName ?? "User"}
                        />
                      ) : (
                        <AvatarFallback className="bg-white/30 text-white">
                          {getInitials(displayName || "")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-60 bg-black/40 backdrop-blur-xl border-white/10 text-gray-200 shadow-2xl"
                >
                  <DropdownMenuLabel className="flex items-center gap-2 text-white">
                    <span className="font-medium">{displayName}</span>
                    <span className="text-xs text-gray-400">
                      ({currentRole})
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    onClick={() => {
                      if (requireAuth("access profile")) {
                        handleProfileClick();
                      }
                    }}
                    className="focus:bg-white/10 focus:text-white transition-colors duration-200"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>
                      {session.user.email === "admin@gmail.com"
                        ? t("adminPage")
                        : t("myProfile")}
                    </span>
                  </DropdownMenuItem>

                  {/* <DropdownMenuItem
                    onClick={() => {
                      if (requireAuth("access settings")) {
                        router.push("/Settings");
                      }
                    }}
                    className="focus:bg-white/10 focus:text-white transition-colors duration-200"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t("settings")}</span>
                  </DropdownMenuItem> */}

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
                      }
                    >
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white backdrop-blur-sm">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 text-white border-white/10 backdrop-blur-xl">
                        <SelectItem
                          value="en"
                          className="focus:bg-white/10 focus:text-white hover:text-white"
                        >
                          🇺🇸 English
                        </SelectItem>
                        <SelectItem
                          value="zh"
                          className="focus:bg-white/10 focus:text-white hover:text-white"
                        >
                          🇨🇳 中文 (Chinese)
                        </SelectItem>
                        <SelectItem
                          value="ja"
                          className="focus:bg-white/10 focus:text-white hover:text-white"
                        >
                          🇯🇵 日本語 (Japanese)
                        </SelectItem>
                        <SelectItem
                          value="es"
                          className="focus:bg-white/10 focus:text-white hover:text-white"
                        >
                          🇪🇸 Español (Spanish)
                        </SelectItem>
                        <SelectItem
                          value="de"
                          className="focus:bg-white/10 focus:text-white hover:text-white"
                        >
                          🇩🇪 Deutsch (German)
                        </SelectItem>
                        <SelectItem
                          value="ko"
                          className="focus:bg-white/10 focus:text-white hover:text-white"
                        >
                          🇰🇷 한국어 (Korean)
                        </SelectItem>
                        <SelectItem
                          value="mn"
                          className="focus:bg-white/10 focus:text-white hover:text-white"
                        >
                          🇲🇳 Монгол (Mongolian)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 focus:text-red-400 focus:bg-white/10 transition-colors duration-200"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
