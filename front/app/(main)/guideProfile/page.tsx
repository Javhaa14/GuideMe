<<<<<<< HEAD
import React from "react";
import { GProfile } from "./components/Gprofile";

const page = () => {
  return (
    <div className="flex justify-center px-[200px] py-[50px]">
      <GProfile />
    </div>
  );
=======
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProfile } from "@/app/context/ProfileContext";
import { GuideProfileForm } from "../components/GuideProfileForm";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { currentRole, setCurrentRole, hasGuideProfile } = useProfile();

  useEffect(() => {
    setCurrentRole("Guide");

    // If guide profile exists, redirect to detail page, otherwise show form
    if (hasGuideProfile) {
      router.push(`/Guidedetail/${session?.user?.id}`);
    }
  }, [setCurrentRole, hasGuideProfile, session?.user?.id, router]);

  // If no profile exists, show the form
  if (!hasGuideProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GuideProfileForm />
        </div>
      </div>
    );
  }

  return null;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
};

export default page;
