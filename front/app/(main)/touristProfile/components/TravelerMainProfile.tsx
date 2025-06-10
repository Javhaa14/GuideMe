"use client";

import React, { useState } from "react";
import Image from "next/image";
import Chat from "../../components/Chat";
import { MapPin, Globe, MessageCircle, User } from "lucide-react";
import { useUser } from "@/app/context/Usercontext";

type TripMemory = {
  id: number;
  image: string;
  caption: string;
  date: string;
};

type TravelerProfile = {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  location: string;
  languages: string;
  gender: string;
  TripMemories: TripMemory[];
};

const sampleTraveler: TravelerProfile = {
  id: 456,
  firstName: "Anujin",
  lastName: "Batbayar",
  profileImage: "/travelerProfile.jpeg",
  coverImage: "/desert.jpg",
  bio: "Adventure seeker. Nature lover. Always chasing sunsets.",
  location: "UB, Mongolia",
  languages: "English, Mongolian, Korean",
  gender: "female",
  TripMemories: [
    {
      id: 1,
      image: "/gobi.png",
      caption: "Camel riding in the Gobi desert!",
      date: "2025-05-15",
    },
    {
      id: 2,
      image: "/Monastery.png",
      caption: "Exploring ancient monasteries in Uvurkhangai!",
      date: "2025-06-01",
    },
  ],
};

export default function TravelerMainProfile() {
  const [traveler] = useState<TravelerProfile>(sampleTraveler);
  const [chat, setChat] = useState(false);
  const { user } = useUser();

  return (
    <div className="w-screen px-4 md:px-20 pt-4 pb-20">
      {chat && (
        <div className="w-fit h-fit mx-5 rounded-md bg-green-500 absolute z-10 right-5 bottom-5">
          <Chat user={user!} />
        </div>
      )}

      <div className="rounded-2xl overflow-hidden shadow-xl border bg-white">
        <div className="relative w-full h-72 md:h-96">
          <Image
            src={traveler.coverImage}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative px-10 pb-12 pt-24 bg-white">
          <div className="absolute -top-24 left-10 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <Image
              src={traveler.profileImage}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <div className="ml-60">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {traveler.firstName} {traveler.lastName}
            </h1>
            <p className="text-lg text-gray-700 mt-3">{traveler.bio}</p>
            <p className="text-base text-gray-500 mt-3 flex gap-1">
              <MapPin size={20} /> {traveler.location}
            </p>
            <p className="text-base text-gray-500 mt-3 flex gap-1">
              <Globe size={20} /> {traveler.languages}
            </p>
            <p className="text-sm md:text-base text-gray-700 mt-3 flex gap-1">
              <User size={20} /> {traveler.gender}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 justify-end">
              <button
                onClick={() => setChat(!chat)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-2xl hover:scale-105">
                <MessageCircle className="w-5 h-5" />
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Traveler's Trip Memories Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">My Travel Memories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {traveler.TripMemories.map((trip) => (
            <div
              key={trip.id}
              className="rounded-xl overflow-hidden shadow-lg border bg-white">
              <div className="relative h-48 w-full">
                <Image
                  src={trip.image}
                  alt={trip.caption}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-md font-medium text-gray-900">
                  {trip.caption}
                </p>
                <p className="text-sm text-gray-500 mt-1">{trip.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
