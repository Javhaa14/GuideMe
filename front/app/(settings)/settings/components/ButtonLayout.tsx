"use client";

import { useRouter } from "next/navigation";

export const ButtonLayout = () => {
  const router = useRouter();

  return (
    <div className="w-[150px] h-screen flex flex-col px-[150px] pt-9 gap-10">
      <div className="flex flex-col gap-4 text-[#18181B] text-[14px] font-medium">
        <button
          className="w-[200px] h-[36px] rounded-md flex items-center pl-6 gap-2 hover:bg-[#F4F4F5]"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          className="w-[200px] h-[36px] rounded-md flex items-center pl-6 gap-2 hover:bg-[#F4F4F5]"
          onClick={() => router.push("/account-settings")}
        >
          Account settings
        </button>
      </div>
    </div>
  );
};
