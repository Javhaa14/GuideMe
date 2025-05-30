"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import Chat from "../../components/Chat";
import { Review } from "./Review";
import { Subscription } from "./Subscription";
import { CreateTripDialog } from "./CreateTripDialog";


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

export default function GuideMainProfile() {
  const [guide, setGuide] = useState<GuideProfie>(sampleGuide);

  const [chat, setChat] = useState(false);

  return (
    <div className="w-max p-5 h-screen flex flex-col relative">
      <div
        className={`w-fit h-fit mx-[20px]  rounded-md bg-green-500 absolute z-1 right-[20px] bottom-[20px] ${
          chat === false && "hidden"
        }`}
      >
        <Chat />
      </div>
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
          <div className="flex w-full justify-between">
            <div className="flex-col">
              <span className="text-2xl font-bold">{guide.firstName}</span>
              <span className="text-2xl font-bold">{guide.lastName}</span>
            </div>
            <div className="flex justify-center items-center gap-[20px]">
              <span
                onClick={() => {
                  setChat(!chat);
                }}
                className="cursor-pointer flex justify-center items-center rounded-2xl w-[100px] h-[30px] text-white bg-blue-400"
              >
                chat
              </span>

              <Review guideName="Baldanpurev Eldenpurev" />
              <Subscription />
            </div>
          </div>
          <span className="text-gray-600 block">{guide.gender}</span>
          <span className="text-gray-600 block">{guide.location}</span>
          <span className="mt-2 text-sm text-gray-700">{guide.motto}</span>
          <div className="flex gap-4 text-sm text-gray-600 mt-2 justify-center md:justify-start">
            <span>{guide.languageKnowledge}</span>
          </div>
        </div>
      </div>
      {/* Activities Grid */}
      <Dialog>
        <DialogTrigger>
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
        </DialogTrigger>
        <CreateTripDialog />
      </Dialog>

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
              <span className="text-sm font-medium">{Trip.caption}</span>
              <span className="text-xs text-gray-500">
                {new Date(Trip.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
