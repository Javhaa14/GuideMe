"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Calendar, Users, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface WishlistCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  startDate: string;
  groupSize: "small" | "big";
  price: number;
  currency?: string;
  onRemove?: () => void;
}

export default function WishlistCard({
  id,
  name,
  location,
  image,
  startDate,
  groupSize,
  price,
  currency = "USD",
  onRemove,
}: WishlistCardProps) {
  const router = useRouter();

  const handleViewTrip = () => router.push(`/tripdetail/${id}`);

  const handleRemove = async () => {
    try {
      const res = await axiosInstance.delete(`/wishlist/${id}`);
      if (res.data.success) {
        toast.success("Removed from wishlist");
        onRemove?.();
      } else toast.error("Remove failed");
    } catch (err: any) {
      toast.error("Server error");
    }
  };

  return (
    <Card className="max-w-5xl w-full rounded-2xl overflow-hidden hover:shadow-xl transition">
      <div className="md:flex">
        <div className="relative md:w-2/5 h-60">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-between p-6 md:w-3/5">
          <div>
            <h3 className="text-2xl font-semibold">{name}</h3>
            <div className="flex items-center gap-1 mt-2 text-gray-500">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1 mt-4 text-gray-500">
              <Calendar size={16} />
              <span>{new Date(startDate).toLocaleDateString()}</span>
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
              <p className="text-2xl font-bold text-green-700">
                {currency === "USD" ? "$" : "€"}
                {price}
              </p>
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
