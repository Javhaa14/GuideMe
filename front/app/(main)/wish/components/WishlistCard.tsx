"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, Users, Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WishlistCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  startDate: string;
  groupSize: string;
  price: number;
  rating: number;
  difficulty: "Easy" | "Moderate" | "Hard";
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
  rating,
  difficulty,
  currency = "USD",
  onRemove,
}: WishlistCardProps) {
  const router = useRouter();

  const handleViewTrip = () => {
    router.push(`/tripdetail/${id}`);
  };

  const difficultyColor = {
    Easy: "bg-emerald-100 text-emerald-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  }[difficulty];

  return (
    <Card className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-md bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 mb-6">
      <div className="relative md:w-1/2 h-60 md:h-auto">
        <Image
          src={image || "/lake.png"}
          alt={name}
          width={600}
          height={400}
          className="object-cover w-full h-full"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow">
            Enjoy
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-gray-800/70 text-white text-xs px-3 py-1 rounded-full">
          <MapPin className="inline w-3 h-3 mr-1" />
          {location}
        </div>
      </div>

      {/* Right: Info */}
      <div className="md:w-1/2 p-6 flex flex-col justify-between bg-white/60 backdrop-blur-sm">
        <div>
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">
            {name}
          </h2>

          <div className="flex gap-4 text-sm mb-4">
            <div className="bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{new Date(startDate).toLocaleDateString()}</span>
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-xl flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{groupSize}</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">
              {currency === "USD" ? "$" : "€"}
              {price.toLocaleString()}
              <span className="text-sm text-gray-500 ml-1 font-normal">
                /USD
              </span>
            </p>
            <p className="text-sm text-muted-foreground">per person</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4 justify-end">
          <Button
            variant="outline"
            className="text-rose-600 border-rose-300 hover:bg-rose-50"
            onClick={onRemove}
          >
            Remove
          </Button>
          <Button
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white"
            onClick={handleViewTrip}
          >
            View Trip
          </Button>
        </div>
      </div>
    </Card>
  );
}
