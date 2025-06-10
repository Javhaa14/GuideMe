"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface TripItem {
  id: number;
  image: string;
  caption: string;
  date: string;
  group: string;
  price: number;
}

interface GuideProfile {
  Trip: TripItem[];
}

const sampleGuide: GuideProfile = {
  Trip: [
    {
      id: 1,
      image: "/horse.png",
      caption: "Gorkhi-Terelj National Park",
      date: "2025-07-20",
      group: "Small group",
      price: 100,
    },
    {
      id: 2,
      image: "/terelj.jpg",
      caption: "Buir Lake",
      date: "2025-08-20",
      group: "Middle group",
      price: 150,
    },
    {
      id: 3,
      image: "/lake.png",
      caption: "Khuvsgol lake",
      date: "2025-07-30",
      group: "Big group",
      price: 200,
    },
  ],
};

export const GuideTrips = () => {
  const [guide] = useState<GuideProfile>(sampleGuide);
  const router = useRouter();

  return (
    <div onClick={() => router.push("/TripDetail")}>
      <div className="flex justify-between gap-6">
        {guide.Trip.map((trip) => (
          <div
            key={trip.id}
            className="w-full max-w-sm overflow-hidden transition duration-300 transform bg-white shadow rounded-xl hover:shadow-2xl hover:scale-105"
          >
            <div className="relative w-full h-48">
              <Image
                src={trip.image}
                alt={`Trip image: ${trip.caption}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>

            <h3 className="px-5 pt-2 text-xl font-semibold">{trip.caption}</h3>

            <div className="px-5 py-3">
              <div className="flex items-center gap-2 mb-1 text-gray-600">
                <Calendar size={20} />
                <span>
                  {new Date(trip.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1 text-gray-600">
                <Users size={20} />
                <span>{trip.group}</span>
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-500">From</span>
                <span className="text-lg font-bold text-gray-600">
                  ${trip.price} per person
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
