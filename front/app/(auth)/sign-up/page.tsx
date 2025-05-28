"use client";

import { useRouter } from "next/navigation";
import { SignUpPage } from "./components/SignUpPage";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-[710px] flex flex-col items-center justify-center min-h-screen">
      <button
        className="w-[73px] h-[40px] bg-[#F4F4F5] rounded-[6px] absolute top-8 right-20 text-sm font-medium hover:bg-black hover:text-white"
        onClick={() => router.push("/log-in")}
      >
        Log in
      </button>
      <SignUpPage />
    </div>
  );
}
