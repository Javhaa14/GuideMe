"use client";

<<<<<<< HEAD
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
=======
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, Users, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WishlistCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  startDate: string;
  groupSize: "small" | "big";
  price: number;
  currency?: string;
  isFavorite?: boolean;
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
  isFavorite = true,
  onRemove,
}: WishlistCardProps) {
  const router = useRouter();

  const handleViewTrip = () => {
    router.push(`/tripdetail/${id}`);
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-5xl overflow-hidden transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl rounded-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-2/5">
            <Image
              src={image || "/lake.png"}
              alt={name}
              width={600}
              height={400}
              className="object-cover w-full h-60 md:h-full transition-all duration-300"
              placeholder="blur"
              blurDataURL="/blur-placeholder.png"
            />
            <div className="absolute flex gap-2 right-3 top-3 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 text-rose-500 hover:bg-white"
              >
                <Heart fill={isFavorite ? "red" : "none"} />
              </Button>
            </div>
            <Badge className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs bg-gradient-to-r from-fuchsia-500 to-pink-500 shadow-md">
              Featured
            </Badge>
          </div>

          <div className="flex flex-col justify-between md:w-3/5 p-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold line-clamp-1">
                    {name}
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1 text-rose-400" />
                    <span>{location || "Mongolia"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                  <span>
                    Starting:{" "}
                    <span className="font-medium">
                      {new Date(startDate).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-indigo-500" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        {groupSize === "small"
                          ? "4–10 travelers"
                          : "11+ travelers"}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {groupSize === "small"
                          ? "Intimate experience with a small group"
                          : "Social experience with a larger group"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-gray-200 pt-4">
              <div>
                <p className="text-2xl font-bold text-teal-700">
                  {currency === "USD" ? "$" : "€"}
                  {price}
                </p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
              <div className="flex items-center gap-2">
                {onRemove && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                    onClick={onRemove}
                  >
                    Remove
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                  onClick={handleViewTrip}
                >
                  View Trip
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
  );
}
