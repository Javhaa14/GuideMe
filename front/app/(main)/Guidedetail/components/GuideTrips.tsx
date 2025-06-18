"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, PenLine, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";

interface TripItem {
  id: string;
  _id: string;
  images: string;
  title: string;
  date: string;
  groupSize: number;
  price: number;
}

export const GuideTrips = () => {
  const [trips, setTrips] = useState<TripItem[]>([]);
  const router = useRouter();
  const params = useParams();
  const { user, status } = useUser();

  const fetchTrips = async () => {
    try {
      const res = await axiosInstance.get(`/tripPlan/${params.id}`);
      console.log("✅ Posts fetched:", res.data);
      setTrips(res.data.tripPlans);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {trips?.map((trip) => (
          <div
            key={trip._id}
            className="relative w-full overflow-hidden transition duration-300 transform bg-white shadow rounded-xl hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            onClick={() => router.push(`/tripdetail/${trip._id}`)}
          >
            {user?.id?.toString() === params.id?.toString() && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute z-10 p-2 text-gray-600 bg-white rounded-full shadow top-3 left-3 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/edit/${trip._id}`);
                }}
              >
                <PenLine size={18} />
              </Button>
            )}

            <div className="relative w-full h-48">
              <Image
                src={
                  typeof trip.images === "string" ? trip.images : trip.images[0]
                }
                alt={`Trip image: ${trip.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>

            <h3 className="px-5 pt-3 text-xl font-semibold">{trip.title}</h3>

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
                <span>{trip.groupSize}</span>
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
