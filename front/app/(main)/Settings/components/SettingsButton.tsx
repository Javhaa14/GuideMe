"use client";

import React from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const SettingsButton = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tab = (params.get("tab") || "personal").toLowerCase();

  const buttons = [
    { label: "My profile", value: "personal" },
    { label: "Password", value: "password" },
  ];

  return (
    <div className="w-screen py-4 bg-green-100 rounded-full">
      <div className="flex items-center gap-20 px-48">
        <div className="flex space-x-3">
          {buttons.map((item) => (
            <button
              key={item.value}
              onClick={() => router.push(`/settings?tab=${item.value}`)}
              className={`text-sm px-4 py-1.5 rounded-full transition ${
                tab === item.value
                  ? "border border-gray-300 font-medium text-black bg-gray-100"
                  : "text-gray-500 hover:text-black hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>
    </div>
  );
};
