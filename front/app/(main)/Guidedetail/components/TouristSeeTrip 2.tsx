"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TripEdit } from "./TripEdit";
import { TouristSeeDetail } from "./TouristSeeDetail";

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

export const TouristSeeTrip = () => {
  const [guide] = useState<GuideProfile>(sampleGuide);
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-wrap justify-between gap-4 pt-6">
          {guide.Trip.map((trip) => (
            <div
              key={trip.id}
              className="w-[465px] rounded-xl overflow-hidden shadow bg-white transform transition duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="relative w-full h-48">
                <Image
                  src={trip.image}
                  alt={trip.caption}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-base">{trip.caption}</p>
                <p className="text-sm text-gray-500">
                  {new Date(trip.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DialogTrigger>
      <DialogContent className="w-[800px] [&>button]:hidden">
        <DialogHeader>
          <TouristSeeDetail />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
