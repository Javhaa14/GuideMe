"use client";

import { useState } from "react";
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

// 🧩 Props type
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
  isFavorite = false,
  onRemove,
}: WishlistCardProps) {
  const router = useRouter();

  const handleViewTrip = () => {
    router.push(`/trips/${id}`);
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-5xl overflow-hidden transition-all hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Image section */}
          <div className="relative md:w-2/5">
            <Image
              src={image || "/lake.png"}
              alt={name}
              width={600}
              height={400}
              className="object-cover w-full h-60 md:h-full"
            />

            <div className="absolute flex gap-2 right-2 top-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 text-rose-500"
              >
                <Heart fill="red" />
              </Button>
            </div>
            <Badge className="absolute left-2 top-2 bg-gradient-to-r from-violet-500 to-purple-700 hover:from-violet-600 hover:to-purple-800">
              Featured
            </Badge>
          </div>

          {/* Right Content section */}
          <div className="flex flex-col justify-between md:w-3/5">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold line-clamp-1">{name}</h3>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{location}</span>
                  </div>
                </div>
                <Badge
                  variant={groupSize === "small" ? "outline" : "secondary"}
                  className="ml-2 whitespace-nowrap"
                >
                  {groupSize === "small" ? "Small Group" : "Large Group"}
                </Badge>
              </div>

              <div className="grid gap-3 mb-4">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                  <span>
                    Starting: <span className="font-medium">{startDate}</span>
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

              {/* Price and Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-dashed">
                <div>
                  <p className="text-2xl font-bold text-teal-700">
                    {currency === "USD" ? "$" : "€"}
                    {price}
                  </p>
                  <p className="text-xs text-muted-foreground">per person</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                    onClick={onRemove}
                  >
                    Remove
                  </Button>
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
        </div>
      </Card>
    </TooltipProvider>
  );
}
