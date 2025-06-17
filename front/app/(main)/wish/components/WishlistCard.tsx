"use client";

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
  );
}
