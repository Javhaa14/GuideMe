"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Chat from "../../components/Chat";
import { Review } from "./Review";
import { Subscription } from "./Subscription";
import { Globe, MapPin, MessageCircle, VenusAndMars } from "lucide-react";
import { NewTrip } from "./NewTrip";
import { Trip } from "./Trip";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

type TourPost = {
  id: number;
  image: string;
  caption: string;
  date: string;
};

type GuideProfile = {
  id: number;
  firstName: string;
  lastName: string;
  profileimage: string;
  coverImage: string;
  motto: string;
  languageKnowledge: string;
  gender: string;
  rating: number;
  price: number;
  comment: string;
  cardNumber: string;
  socialAddress: string;
  about: string;
  car: string;
  location: string;
  Trip: TourPost[];
};

type UserPayload = {
  _id: string;
  username: string;
  role: string;
};

export default function GuideMainProfile() {
  const params = useParams();
  const [guide, setGuide] = useState<GuideProfile>();
  const [chat, setChat] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch {
      console.log("No user logged in or error fetching user");
    }
  };
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/gprofile/${params.id}`
      );
      console.log("✅ Posts fetched:", res.data);
      setGuide(res.data);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchProfile();
  }, []);

  const router = useRouter();
  const todetail = (id: string) => {
    router.push(`/Guidedetail/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Chat Box */}
      {chat && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-110 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="h-full w-full flex flex-col">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 pb-0 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Chat with</h3>
                <button
                  onClick={() => setChat(false)}
                  className="text-white hover:text-gray-200 transition-colors">
                  x
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <Chat user={user!} />
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="rounded-3xl overflow-hidden shadow-2xl border bg-white">
          <div className="relative w-full h-72 md:h-96">
            <Image
              src={""}
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative px-10 pb-12 pt-24 bg-white">
            <div className="absolute -top-24 left-10 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden">
              <Image src="" alt="Profile" fill className="object-cover" />
            </div>

            <div className="ml-60">
              <h1 className="text-4xl font-extrabold text-gray-900"></h1>
              <p className="text-lg max-w-4xl text-gray-700 mt-3 leading-relaxed">
                🌿
              </p>
              <p className="text-base text-gray-500 mt-3 flex gap-1">
                <MapPin size={20} />
              </p>
              <p className="text-base text-gray-500 mt-2 flex gap-1">
                <Globe size={20} />
              </p>
              <p className="text-base text-gray-500 mt-2 flex gap-1">
                <VenusAndMars size={20} />
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 justify-end">
                <button
                  onClick={() => setChat(!chat)}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-2xl hover:scale-105">
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </button>
                <Review userId="683fadbacc15c5230fa20412" />
                <Subscription />
              </div>
            </div>
          </div>
        </div>

        {/* New Trip and Trip List */}
        <div className="mt-12 space-y-10">
          <NewTrip />
          <Trip />
        </div>
      </div>
    </div>
  );
}
