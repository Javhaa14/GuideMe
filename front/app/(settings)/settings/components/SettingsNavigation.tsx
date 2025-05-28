"use client";

import { Settings, TentTree } from "lucide-react";
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
    <button
      onClick={() => router.push(path)}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {label}
    </button>
  );
};

export const SettingsNavigation = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-[150px] py-4 bg-white shadow-lg">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <TentTree color="black" size={28} />
        <span className="text-xl font-extrabold text-gray-800">Guide</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavButton label="Guides" path="/guides" />
        <NavButton label="Travelers" path="/travelers" />
      </div>
    </nav>
  );
};
