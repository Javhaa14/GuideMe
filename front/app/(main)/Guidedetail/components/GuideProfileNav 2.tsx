"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Bell, Settings, TentTree } from "lucide-react";
import { useRouter } from "next/navigation";

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
      className={`${baseStyle} ${variants[variant]} cursor-pointer`}
    >
      {label}
    </span>
  );
};

export const GuideProfileNav = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-20 py-4 bg-white shadow-lg cursor-pointer">
      <div
        className="flex items-center gap-3r"
        onClick={() => router.push("/")}
      >
        <TentTree color="black" size={28} />
        <span className="text-xl font-extrabold text-gray-800">Guide</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavButton label="Guides" path="/Guidesinfo" />
        <NavButton label="Travelers" path="/Travelersinfo" />
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-3">
          <Select
            onValueChange={(value) => {
              if (value === "logout") {
                router.push("/log-in");
              } else if (value === "settings") {
                router.push("/Settings");
              }
            }}
          >
            <SelectTrigger className="w-[70px] border-none shadow-none bg-gray-800 text-white hover:bg-gray-700 p-4 rounded-md">
              <Settings color="white" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="logout">Log out</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div
          onClick={() => router.push("/notification")}
          className="cursor-pointer p-2 rounded-full bg-gray-800 hover:bg-gray-700"
        >
          <Bell color="white" size={20} />
        </div>
      </div>
    </nav>
  );
};
