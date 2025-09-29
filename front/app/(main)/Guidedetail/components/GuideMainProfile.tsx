"use client";

import React, { useEffect, useState } from "react";
import Chat from "@/app/(main)/components/Chat";
import { useParams } from "next/navigation";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { useOnlineStatus } from "@/app/context/Onlinestatus";
import { NewTrip } from "../components/NewTrip";
import { GuideTrips } from "../components/GuideTrips";
import { GuideCard } from "./GuideCards";

type TourPost = {
  id: number;
  image: string;
  caption: string;
  date: string;
};

export type GuideProfile = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profileimage: string;
  backgroundimage: string;
  languages: string;
  gender: string;
  rating: number;
  price: number;
  comment: string;
  socialAddress: string;
  about: string;
  car: string;
  location: string;
  Trip: TourPost[];
  likedBy: number[];
};

export default function GuideMainProfile() {
  const params = useParams();
  const profileId =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "";

  const [guide, setGuide] = useState<GuideProfile>();
  const [chat, setChat] = useState(false);
  const { onlineUsers } = useOnlineStatus();
  const { user, status } = useUser();

  useEffect(() => {
    if (!profileId) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/gprofile/${profileId}`);
        setGuide(res.data);
      } catch (err) {
        console.error("❌ Post fetch failed:", err);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (!profileId) return <p>Invalid profile ID</p>;
  if (!user || status === "loading") return <p>Loading user...</p>;
  if (!guide) return <p>Loading guide profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Chat Box */}
      {chat && user && (
        <div className="fixed z-50 bottom-6 right-6 w-80 h-fit rounded-2xl shadow-2xl bg-white border border-gray-200 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="p-4 pb-0 text-white bg-gradient-to-r from-green-500 to-emerald-600 flex justify-between items-center">
              <h3 className="font-semibold">Chat with {guide.username}</h3>
              <button
                onClick={() => setChat(false)}
                className="hover:text-gray-200 cursor-pointer"
              >
                x
              </button>
            </div>
            <Chat onlineUsers={onlineUsers} user={user} />
          </div>
        </div>
      )}

      {/* Profile Content */}
      <div className="container max-w-6xl px-4 py-8 mx-auto">
        <GuideCard
          guide={guide}
          guideId={guide._id}
          chat={chat}
          setChat={setChat}
          onlineStatus={!!onlineUsers[profileId]?.isOnline}
        />

        <div className="pb-4 mt-8">
          <NewTrip profileId={guide._id} />
        </div>

        <GuideTrips />
      </div>
    </div>
  );
}
