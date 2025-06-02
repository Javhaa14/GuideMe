"use client";

import React, { useState } from "react";
import Image from "next/image";
import Chat from "../../components/Chat";
import { Review } from "./Review";
import { Subscription } from "./Subscription";
import { Globe, MapPin, MessageCircle, VenusAndMars } from "lucide-react";
import { Trip } from "./Trip";
import { TouristSeeTrip } from "./TouristSeeTrip";

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
  profileImage: string;
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

const sampleGuide: GuideProfile = {
  id: 123,
  firstName: "Baldanpurev",
  lastName: "Eldenpurev",
  profileImage: "/profileImg.jpeg",
  coverImage: "/altai.png",
  motto:
    "Passionate about sharing the beauty of Mongolian nature. Let's explore the world together!",
  languageKnowledge: "English, French, Mandarin",
  gender: "male",
  rating: 5,
  price: 22,
  comment: "",
  cardNumber: "",
  socialAddress: "",
  about: "My name's Baldanpurev. I love to travel.",
  car: "available",
  location: "UB, Mongolia",
  Trip: [
    {
      id: 1,
      image: "/horse.png",
      caption: "Let's explore the Terelj in comfort!",
      date: "2025-07-20",
    },
    {
      id: 2,
      image: "/terelj.jpg",
      caption: "Let me show you the Buir lake!",
      date: "2025-08-20",
    },
    {
      id: 3,
      image: "/lake.png",
      caption: "Explore and experience the Khuvsgol lake!",
      date: "2025-07-21",
    },
  ],
};

export default function TouristSee() {
  const [guide] = useState<GuideProfile>(sampleGuide);
  const [chat, setChat] = useState(false);

  return (
    <div className="w-screen px-4 md:px-20 pt-4 pb-20">
      {chat && (
        <div className="w-fit h-fit mx-5 rounded-md bg-green-500 absolute z-10 right-5 bottom-5">
          <Chat />
        </div>
      )}

      <div className="rounded-2xl overflow-hidden shadow-xl border bg-white">
        <div className="relative w-full h-72 md:h-96">
          <Image
            src={guide.coverImage}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative px-10 pb-12 pt-24 bg-white">
          <div className="absolute -top-24 left-10 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <Image
              src={guide.profileImage}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <div className="ml-60">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {guide.firstName} {guide.lastName}
            </h1>
            <p className="text-lg max-w-4xl text-gray-700 mt-3 leading-relaxed">
              🌿 {guide.motto}
            </p>
            <p className="text-base text-gray-500 mt-3 flex gap-1">
              <MapPin size={20} color="black" /> {guide.location}
            </p>
            <p className="text-base text-gray-500 mt-3 flex gap-1">
              <Globe size={20} color="black" /> {guide.languageKnowledge}
            </p>
            <p className="text-sm md:text-base text-gray-700 mt-3 flex gap-1">
              <VenusAndMars size={20} color="black" /> {guide.gender}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 justify-end">
              <button
                onClick={() => setChat(!chat)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-2xl hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Chat
              </button>
              <Review guideName={`${guide.firstName} ${guide.lastName}`} />
              <Subscription />
            </div>
          </div>
        </div>
      </div>

      <TouristSeeTrip />
    </div>
  );
}
