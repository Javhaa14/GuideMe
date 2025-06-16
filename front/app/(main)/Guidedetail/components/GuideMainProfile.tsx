"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Chat from "../../components/Chat";
import { Review } from "./Review";
import { Subscription } from "./Subscription";
import { Globe, MapPin, MessageCircle, VenusAndMars } from "lucide-react";
import { NewTrip } from "./NewTrip";
import { useParams, useRouter } from "next/navigation";
import Ebooking from "./Ebooking";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { useOnlineStatus } from "@/app/context/Onlinestatus";
import { GuideTrips } from "./GuideTrips";

type TourPost = {
  id: number;
  image: string;
  caption: string;
  date: string;
};

export type GuideProfile = {
  id: number;
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
};

export default function GuideMainProfile() {
  const params = useParams();
  if (!params.id) return <p>Missing guide ID</p>;

  const guideId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [guide, setGuide] = useState<GuideProfile>();
  const [chat, setChat] = useState(false);
  const { onlineUsers, fetchOnlineUsers } = useOnlineStatus();
  const { user, status } = useUser();

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(`/gprofile/${guideId}`);
      console.log("✅ Posts fetched:", res.data);
      setGuide(res.data);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [guideId]);

  const router = useRouter();
  const todetail = (id: string) => {
    router.push(`/Guidedetail/${id}`);
  };

  if (!user || status === "loading") {
    return <p>Loading user...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Chat Box */}
      {chat && user && (
        <div className="fixed z-50 overflow-hidden bg-white border border-gray-200 shadow-2xl bottom-6 right-6 w-80 h-110 rounded-2xl animate-in slide-in-from-bottom-4">
          <div className="flex flex-col w-full h-full">
            <div className="p-4 pb-0 text-white bg-gradient-to-r from-green-500 to-emerald-600">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Chat with</h3>
                <button
                  onClick={() => setChat(false)}
                  className="text-white transition-colors hover:text-gray-200">
                  x
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <Chat onlineUsers={onlineUsers} user={user} />
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="container max-w-6xl px-4 py-8 mx-auto">
        <div className="overflow-hidden bg-white border shadow-2xl rounded-3xl">
          <div className="relative w-full h-72 md:h-96">
            {guide?.backgroundimage && (
              <Image
                src={guide.backgroundimage}
                alt="Cover"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="relative px-10 pb-12 bg-white">
            <div className="absolute w-40 h-40 overflow-hidden border-4 border-white rounded-full shadow-xl -top-24 left-10">
              {guide?.profileimage && (
                <Image
                  src={guide.profileimage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}
              {guide?.firstName} {guide?.lastName}
            </div>
            <div className="ml-60">
              <div>
                <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                  {guide?.username}
                </h1>
                <p className="mt-2 text-lg text-gray-600">Travel Enthusiast</p>
              </div>
              <p className="max-w-4xl mt-3 text-lg leading-relaxed text-gray-700">
                🌿{guide?.about}
              </p>
              <p className="flex gap-1 mt-3 text-base text-gray-500">
                <MapPin size={20} /> {guide?.location}
              </p>
              <p className="flex gap-1 mt-2 text-base text-gray-500">
                <Globe size={20} />
                {guide?.languages}
              </p>
              <p className="flex gap-1 mt-2 text-base text-gray-500">
                <VenusAndMars size={20} />
                {guide?.gender}
              </p>
              <div className="flex flex-wrap items-center justify-end gap-6 mt-6">
                <button
                  onClick={() => setChat(!chat)}
                  className="inline-flex items-center gap-2 px-6 py-2 text-lg font-semibold text-white transition-all duration-300 bg-green-600 rounded-full shadow-md hover:bg-green-700 hover:shadow-2xl hover:scale-105">
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </button>
                <Review userId={guideId} />
                <Subscription />
                <Ebooking />
              </div>
            </div>
          </div>
        </div>

        {/* New Trip and Trip List */}
        <div className="mt-12 space-y-10">
          {user.id === params.id && <NewTrip />}
          <GuideTrips />
        </div>
      </div>
    </div>
  );
}
