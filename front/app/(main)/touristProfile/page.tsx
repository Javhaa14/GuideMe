"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProfile } from "@/app/context/ProfileContext";
import { TouristProfileForm } from "../components/TouristProfileForm";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const { currentRole, setCurrentRole, hasTouristProfile } = useProfile();

  useEffect(() => {
    setCurrentRole("Tourist");

    // If tourist profile exists, redirect to detail page, otherwise show form
    if (hasTouristProfile) {
      router.push(`/Touristdetail/${session?.user?.id}`);
    }
  }, [setCurrentRole, hasTouristProfile, session?.user?.id, router]);

  // If no profile exists, show the form
  if (!hasTouristProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <TouristProfileForm />
        </div>
      </div>
    );
  }

  return null;
}
