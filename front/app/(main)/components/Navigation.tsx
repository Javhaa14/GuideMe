"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, NotebookIcon, Settings, TentTree } from "lucide-react";
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

export const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-lg">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <TentTree color="black" size={28} />
        <span className="text-xl font-extrabold text-gray-800">Guide</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavButton label="Guides" path="/Guidesinfo" />
        <NavButton label="Travelers" path="/Travelersinfo" />
      </div>

      <div className="flex items-center gap-3">
        <NavButton label="Guide болох" path="/guideProfile" variant="primary" />
        <NavButton
          label="Tourist болох"
          path="/touristProfile"
          variant="primary"
        />
        <NavButton label="Log In" path="/log-in" variant="dark" />

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
            <SelectTrigger className="w-[100px] border-none shadow-none bg-gray-800 text-white hover:bg-gray-700 p-4 rounded-md">
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
      </div>

      <div
        onClick={() => router.push("/notification")}
        className="cursor-pointer p-2 hover:bg-gray-100 rounded-full"
      >
        <Bell color="black" />
      </div>
    </nav>
  );
};
