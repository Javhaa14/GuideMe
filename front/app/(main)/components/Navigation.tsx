"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Bell, Settings, TentTree } from "lucide-react";

// Simple translations object (expand as needed)
const translations = {
  en: {
    guides: "Guides",
    travelers: "Travelers",
    becomeGuide: "Become a Guide",
    becomeTourist: "Become a Tourist",
    login: "Log In",
    settings: "Settings",
    logout: "Log out",
    welcome: "Welcome",
  },
  mn: {
    guides: "Гайдууд",
    travelers: "Аялагчид",
    becomeGuide: "Гайд болох",
    becomeTourist: "Аялагч болох",
    login: "Нэвтрэх",
    settings: "Тохиргоо",
    logout: "Гарах",
    welcome: "Тавтай морил",
  },
};

const NavButton = ({
  label,
  path,
  variant = "default",
}: {
  label: string;
  path: string;
  variant?: "default" | "primary" | "dark";
}) => {
  const router = useRouter();

  const baseStyle = "px-4 py-2 text-sm font-medium rounded-lg transition";
  const variants = {
    default: "text-gray-700 hover:bg-emerald-100 hover:text-emerald-600",
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    dark: "bg-gray-800 text-white hover:bg-gray-700",
  };

  return (
    <span
      onClick={() => router.push(path)}
      className={`${baseStyle} ${variants[variant]} cursor-pointer`}>
      {label}
    </span>
  );
};

export const Navigation = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [language, setLanguage] = useState<"en" | "mn">("en");
  console.log(session); // If null, you're signed out

  const t = translations[language];

  // Show loading or nothing if session is loading (optional)
  if (status === "loading") return null;

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-lg">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}>
        <TentTree color="black" size={28} />
        <span className="text-xl font-extrabold text-gray-800">Guide</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavButton label={t.guides} path="/Guidesinfo" />
        <NavButton label={t.travelers} path="/Travelersinfo" />
      </div>

      <div className="flex items-center gap-3">
        <NavButton
          label={t.becomeGuide}
          path="/guideProfile"
          variant="primary"
        />
        <NavButton
          label={t.becomeTourist}
          path="/touristProfile"
          variant="primary"
        />

        {/* Conditionally render login or user info */}
        {session?.user ? (
          <>
            {/* Optional: Show welcome and username */}
            <span className="text-gray-800 font-semibold">
              {t.welcome}, {session.user.name || session.user.email}
            </span>

            {/* Settings / Logout dropdown */}
            <Select
              onValueChange={(value) => {
                if (value === "logout") {
                  signOut({ callbackUrl: "/log-in" });
                } else if (value === "settings") {
                  router.push("/Settings");
                }
              }}
              defaultValue="">
              <SelectTrigger className="w-[100px] border-none shadow-none bg-gray-800 text-white hover:bg-gray-700 p-4 rounded-md">
                <Settings color="white" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="settings">{t.settings}</SelectItem>
                  <SelectItem value="logout">{t.logout}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        ) : (
          // If not logged in, show login button
          <NavButton label={t.login} path="/log-in" variant="dark" />
        )}

        {/* Language Selector */}
        <Select
          onValueChange={(value) => setLanguage(value as "en" | "mn")}
          defaultValue={language}>
          <SelectTrigger className="w-[100px] border border-gray-300 p-2 rounded-md">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="mn">Монгол</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div
        onClick={() => router.push("/notification")}
        className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
        <Bell color="black" />
      </div>
    </nav>
  );
};
