"use client";

import React from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/context/ProfileContext";
import { useUser } from "@/app/context/Usercontext";

interface NewTripProps {
  profileId: string;
}

export const NewTrip: React.FC<NewTripProps> = ({ profileId }) => {
  const router = useRouter();
  const { requireAuth } = useProfile();
  const { user } = useUser();

  const isOwner = user?._id === profileId;

  if (!isOwner) return null;

  return (
    <div className="pt-18">
      <button
        onClick={() => {
          if (requireAuth("create a new trip")) {
            router.push("/guidenewtrip");
          }
        }}
        className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 bg-green-700 rounded-full shadow-md hover:bg-green-800 hover:shadow-2xl hover:scale-105"
      >
        <PlusCircle className="w-5 h-5" />
        Create New Trip
      </button>
    </div>
  );
};
