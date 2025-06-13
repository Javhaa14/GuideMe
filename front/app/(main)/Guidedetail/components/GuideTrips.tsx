"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, PenLine, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
      price: 2000,
    },
  ],
};

export const GuideTrips = () => {
  const [guide] = useState<GuideProfile>(sampleGuide);
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {guide.Trip.map((trip) => (
          <div
            key={trip.id}
            className="relative w-full overflow-hidden transition duration-300 transform bg-white shadow rounded-xl hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            onClick={() => router.push("/TripDetail")}
          >
            <Button
              size="icon"
              variant="secondary"
              className="absolute z-10 p-2 text-gray-600 bg-white rounded-full shadow top-3 left-3 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/edit`);
                //  router.push(`/TripDetail/edit/${trip.id}`);
              }}
            >
              <PenLine size={18} />
            </Button>

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

            <h3 className="px-5 pt-3 text-xl font-semibold">{trip.caption}</h3>

            <div className="px-5 py-3">
              <div className="flex items-center gap-2 mb-1 text-gray-600">
                <Calendar size={18} />
                <span>
                  {new Date(trip.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1 text-gray-600">
                <Users size={18} />
                <span>{trip.group}</span>
              </div>

              <div className="flex items-center justify-between pt-2 mt-3 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-500">From</span>
                <span className="text-lg font-bold text-gray-700">
                  ${trip.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
