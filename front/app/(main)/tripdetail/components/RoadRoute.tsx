"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Camera, Utensils, Mountain, Trees, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { toast } from "sonner";

interface TripItem {
  title: string;
  image: string;
  highlights: string;
  tips: string;
  about: string;
}

export default function RoadRoute() {
  const [trip, setTrip] = useState<TripItem | null>(null);
  const params = useParams();

  const fetchTrip = async () => {
    const tripId = typeof params.id === "string" ? params.id : params.id?.[0];
    if (!tripId) {
      console.warn("⛔ params.id байхгүй байна");
      return;
    }

    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`);

      if (!res.data.success || !res.data.tripPlan) {
        console.warn("⛔ Аялал олдсонгүй:", res.data.message);
        toast.error("Аялал олдсонгүй: " + res.data.message);
        return;
      }

      const tripData = res.data.tripPlan;
      setTrip(tripData);
    } catch (error: any) {
      console.error(
        "❌ API fetch error:",
        error?.response?.data || error.message
      );
      toast.error("Алдаа гарлаа: " + error?.message);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  if (!trip) {
    return (
      <div className="max-w-5xl p-6 mx-auto text-center text-gray-500">
        Ачааллаж байна...
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <div className="mb-8 text-start">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {trip.title} Route
        </h1>
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 w-1 rounded-full left-8 bg-gradient-to-b from-blue-400 via-green-400 to-cyan-400"></div>

        <div className="space-y-8">
          <Card className="flex-1 transition-shadow duration-300 shadow-md hover:shadow-lg">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <img
                  src={trip.image || "/lake.png"}
                  alt={stop.name}
                  className="object-cover w-full h-32 rounded-t-lg md:w-48 md:rounded-l-lg md:rounded-t-none"
                />
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {stop.name}
                    </h3>
                  </div>
                  <p className="mb-3 text-gray-600">{trip.about}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative flex items-center justify-center mt-8">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-full shadow-lg">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="ml-4 text-lg font-semibold text-gray-700">
            Journey Complete!
          </span>
        </div>
      </div>

      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <h3 className="mb-3 text-lg font-semibold">Highlights</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {Array.isArray(trip.highlights)
              ? trip.highlights.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))
              : trip.highlights
                  .split("\n")
                  .filter(Boolean)
                  .map((item, index) => <li key={index}>• {item.trim()}</li>)}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <h3 className="mb-3 text-lg font-semibold">Route Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {Array.isArray(trip.tips)
              ? trip.tips.map((item, index) => <li key={index}>• {item}</li>)
              : trip.tips
                  .split("\n")
                  .filter(Boolean)
                  .map((item, index) => <li key={index}>• {item.trim()}</li>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
