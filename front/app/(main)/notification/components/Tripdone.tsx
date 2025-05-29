"use client";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const Tripdone = () => {
  const router = useRouter();
  const handleonclick = () => {
    router.push("/Guidedetail");
  };
  return (
    <div
      onClick={handleonclick}
      className="flex items-center justify-between text-gray-800 hover:underline hover:text-green-600 w-[600px] cursor-pointer rounded-md border border-gray-300 bg-yellow-50 p-4 shadow-md hover:bg-green-100 transition"
    >
      <p className=" font-medium ">
        Hello! How was your travel? Please review our guide quickly.
      </p>
      <ArrowUpRight className="text-green-600 w-5 h-5" />
    </div>
  );
};
