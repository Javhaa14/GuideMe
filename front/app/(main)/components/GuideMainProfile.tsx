"use client";

import Image from "next/image";
import React, { useState } from "react";

type GuideProfie = {
  firstName: string;
  lastName: string;
  motto: string;
  profileImage: string;
  coverImage: string;
  languageKnowledge: string;
  id: number;
  rating: number;
  comment: string;
  location: string;
  gender: string;
  cardNumber: string;
  socialAddress: string;
  price: number;
  about: string;
  car: string;
  Trip: TourPost[];
};

type TourPost = {
  id: number;
  image: string;
  caption: string;
  date: string;
};
const sampleGuide: GuideProfie = {
  id: 123,
  firstName: "Baldanpurev",
  lastName: "Eldenpurev",
  profileImage: "/profileImg.jpeg",
  coverImage: "/coverImage.jpg",
  motto:
    "Passionate about sharing the beauty of Mongolian nature. Let's explore the world together!",
  languageKnowledge: "Englsh, French, Mandarin",
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
      image: "/terelj.jpg",
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
      image: "/terelj.jpg",
      caption: "Explore and experience the Khuvsgol lake!",
      date: "2025-07-21",
    },
  ],
};

export default function GuideMainProfile() {
  const [guide, setGuide] = useState<GuideProfie>(sampleGuide);
  return (
    <div className="w-max p-5 h-screen flex flex-col">
      {/* coverImage */}
      <div className="w-full h-1/3 relative">
        <Image
          src={guide.coverImage}
          alt="cover"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* Profile Section */}
      <div className="flex flex-col p-4">
        <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <Image
            src={guide.profileImage}
            alt="Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center md:text-left relative">
          <h1 className="text-2xl font-bold">{guide.firstName}</h1>
          <h1 className="text-2xl font-bold">{guide.lastName}</h1>
          <p className="text-gray-600">{guide.gender}</p>
          <p className="text-gray-600">{guide.location}</p>
          <p className="mt-2 text-sm text-gray-700">{guide.motto}</p>
          <div className="flex gap-4 text-sm text-gray-600 mt-2 justify-center md:justify-start">
            <p>{guide.languageKnowledge}</p>
          </div>
        </div>
      </div>
      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {guide.Trip.map((Trip) => (
          <div
            key={Trip.id}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={Trip.image}
                alt={Trip.caption}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium">{Trip.caption}</p>
              <p className="text-xs text-gray-500">
                {new Date(Trip.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
