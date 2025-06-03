// "use client";

import Signup from "@/app/(main)/components/signup";

// import { useRouter } from "next/navigation";
// import { LogInEmailPassword } from "./components/LogInEmailPassword";

export default function Home() {
  // const router = useRouter();

  return (
    // <div className="relative w-[710px] flex flex-col items-center justify-center min-h-screen">
    //   <button
    //     className="w-[73px] h-[40px] bg-[#F4F4F5] rounded-[6px] absolute top-8 right-20 text-sm font-medium hover:bg-black hover:text-white"
    //     onClick={() => router.push("/sign-up")}
    //   >
    //     Sign up
    //   </button>
    //   <LogInEmailPassword />
    // </div>
    <div>
      <Signup />
    </div>
  );
}
