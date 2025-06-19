"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Calendar, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface TripItem {
  _id: string;
  title: string;
  location: string; // Хэрвээ API-д location байхгүй бол өөрөөр авна уу
  images: string[] | string;
  date: string;
  groupSize: number;
  price: number;
}

interface WishlistCardProps {
  id: string;
  onRemove?: () => void;
}

export default function WishlistCard({ id, onRemove }: WishlistCardProps) {
  const router = useRouter();
  const [trip, setTrip] = useState<TripItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {
    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${id}`);
      if (res.data.success && res.data.tripPlan) {
        setTrip(res.data.tripPlan);
      } else {
        toast.error("Аялал олдсонгүй");
      }
    } catch (err) {
      console.error(err);
      toast.error("Аялал авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const handleViewTrip = () => {
    if (trip?._id) router.push(`/tripdetail/${trip._id}`);
  };

  const handleRemove = async () => {
    try {
      const res = await axiosInstance.delete(`/wishlist/${id}`);
      if (res.data.success) {
        toast.success("Wishlist-с устгагдлаа");
        onRemove?.();
      } else {
        toast.error("Устгахад алдаа гарлаа");
      }
    } catch (err) {
      toast.error("Серверийн алдаа");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!trip) return <p>Аялал олдсонгүй</p>;

  const imageSrc = Array.isArray(trip.images)
    ? trip.images[0]
    : trip.images || "/placeholder.png";

  // Байршил (API-д байхгүй бол хоосон эсвэл өөр утга)
  const location = trip.location || "Unknown location";

  // Группын хэмжээ ангилал
  const groupSize = trip.groupSize <= 10 ? "small" : "big";

  return (
    <Card className="max-w-5xl w-full rounded-2xl overflow-hidden hover:shadow-xl transition">
      <div className="md:flex">
        <div className="relative md:w-2/5 h-60">
          <Image
            src={imageSrc}
            alt={trip.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-6 md:w-3/5">
          <div>
            <h3 className="text-2xl font-semibold">{trip.title}</h3>
            <div className="flex items-center gap-1 mt-2 text-gray-500">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1 mt-4 text-gray-500">
              <Calendar size={16} />
              <span>{new Date(trip.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 mt-4 text-gray-500">
              <Users size={16} />
              <span>
                {groupSize === "small" ? "4–10 travelers" : "11+ travelers"}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-2xl font-bold text-green-700">${trip.price}</p>
              <p className="text-xs text-gray-500">per person</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleRemove}>
                Remove
              </Button>
              <Button size="sm" onClick={handleViewTrip}>
                View Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
