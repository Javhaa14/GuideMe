"use client";

import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import Image from "next/image";
import { Calendar, PenLine, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";

interface TripItem {
  id: number;
  image: string;
  caption: string;
  date: string;
  group: string;
=======
import { Calendar, PenLine, Users, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useProfile } from "@/app/context/ProfileContext";
import { Button } from "@/components/ui/button";

interface TripItem {
  id: string;
  _id: string;
  images: string | string[];
  title: string;
  date: string;
  groupSize: number;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  price: number;
}

export const GuideTrips = () => {
  const [trips, setTrips] = useState<TripItem[]>([]);
  const router = useRouter();
  const params = useParams();
<<<<<<< HEAD
  const { user, status } = useUser();
=======
  const { user } = useUser();
  const { requireAuth } = useProfile();
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

  const fetchTrips = async () => {
    try {
      const res = await axiosInstance.get(`/tripPlan/${params.id}`);
<<<<<<< HEAD
      console.log("✅ Posts fetched:", res.data);
      setTrips(res.data.tripPlans); // <-- Use the correct array
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
=======
      setTrips(res.data.tripPlans);
    } catch (err) {
      console.error("❌ Post fetch failed:", err);
      toast.error("Аяллын жагсаалтыг авахад алдаа гарлаа");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Та энэ аяллыг устгахдаа итгэлтэй байна уу?");
    if (!confirmed) return;

    try {
      const res = await axiosInstance.delete(`/tripPlan/${id}`);
      if (res.data.success) {
        toast.success("Аялал амжилттай устгагдлаа");
        setTrips((prev) => prev.filter((trip) => trip._id !== id));
      } else {
        toast.error("Устгах үед алдаа гарлаа");
      }
    } catch (err) {
      console.error("❌ Delete failed:", err);
      toast.error("Серверийн алдаа");
    }
  };

  const handleTripClick = (tripId: string) => {
    if (requireAuth("view trip details")) {
      router.push(`/tripdetail/${tripId}`);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
            key={trip.id}
            className="relative w-full overflow-hidden transition duration-300 transform bg-white shadow rounded-xl hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            onClick={() => router.push("/tripdetail")}>
            {user.id === params.id && (
=======
            key={trip._id}
            className="relative w-full overflow-hidden transition duration-300 transform bg-white shadow rounded-xl hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            onClick={() => handleTripClick(trip._id)}
          >
            {/* Edit Button */}
            {user?.id?.toString() === params.id?.toString() && (
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
              <Button
                size="icon"
                variant="secondary"
                className="absolute z-10 p-2 text-gray-600 bg-white rounded-full shadow top-3 left-3 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
<<<<<<< HEAD
                  router.push(`/edit`);
                }}>
=======
                  if (requireAuth("edit trip")) {
                    router.push(`/edit/${trip._id}`);
                  }
                }}
              >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                <PenLine size={18} />
              </Button>
            )}

<<<<<<< HEAD
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
=======
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(trip._id);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
              title="Устгах"
            >
              <Trash2 size={18} />
            </button>

            {/* Image and info */}
            <div className="relative w-full h-48">
              <img
                src={
                  typeof trip.images === "string"
                    ? trip.images
                    : trip.images?.[0]
                }
                alt={`Trip image: ${trip.title}`}
                className="object-cover w-full h-full"
              />
            </div>

            <h3 className="px-5 pt-3 text-xl font-semibold">{trip.title}</h3>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

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
<<<<<<< HEAD
                <span>{trip.group}</span>
=======
                <span>{trip.groupSize}</span>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
