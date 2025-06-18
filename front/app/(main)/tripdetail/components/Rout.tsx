"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { toast } from "react-hot-toast";

import { MapPin, Utensils, Tent, Hotel, Bus } from "lucide-react";
import { axiosInstance } from "@/lib/utils";

const iconComponents = {
  location: MapPin,
  food: Utensils,
  activity: Tent,
  hotel: Hotel,
  transport: Bus,
};

// Төрлийн тодорхойлолт
type RouteItem = {
  _id: string;
  image: string;
  title: string;
  about: string;
  iconType: keyof typeof iconComponents;
};

type TripItem = {
  title: string;
  route: RouteItem[];
  highlights: string[];
  tips: string[];
};

export default function Rout() {
  const [trip, setTrip] = useState<TripItem | null>(null);
  const params = useParams();

  const fetchTrip = async () => {
    const tripId = typeof params.id === "string" ? params.id : params.id?.[0];
    if (!tripId) return console.warn("⛔ params.id байхгүй байна");

    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`);
      if (!res.data.success || !res.data.tripPlan) {
        console.warn("⛔ Аялал олдсонгүй:", res.data.message);
        toast.error("Аялал олдсонгүй: " + res.data.message);
        return;
      }

      setTrip(res.data.tripPlan);
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

  if (!trip) return <p className="text-center py-10">Loading trip data...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {trip.title} Route
        </h1>
        <p className="text-gray-600 text-lg">
          Follow this curated route for the perfect one-day escape
        </p>
      </div>

      {/* ROUTE LIST */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>

        {trip.route.map((stop, index) => {
          const IconComponent = iconComponents[stop.iconType];
          const isLast = index === trip.route.length - 1;

          return (
            <div
              key={stop._id}
              className="relative flex items-start mb-12 group transition-all"
            >
              {/* Icon bubble */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-500 rounded-full shadow-xl transition group-hover:scale-105">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-blue-600">
                      #{index + 1}
                    </span>
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                {!isLast && (
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-green-400 mt-2 rounded-full"></div>
                )}
              </div>

              {/* Content */}
              <div className="ml-6 flex-1">
                <div className="rounded-2xl shadow-lg border border-gray-200 bg-white/70 backdrop-blur-md overflow-hidden transition hover:shadow-2xl">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <Image
                        src={stop.image}
                        alt={stop.title}
                        width={300}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {stop.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{stop.about}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <IconComponent className="w-4 h-4 mr-2" />
                        <span className="capitalize">{stop.iconType} Stop</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SUMMARY + CARDS */}
      <div className="mt-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-8 shadow-md">
        {/* Summary by type */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries(iconComponents).map(([type, IconComponent]) => {
            const count = trip.route.filter(
              (stop) => stop.iconType === type
            ).length;
            return (
              <div
                key={type}
                className="flex items-center space-x-2 text-sm text-gray-700"
              >
                <IconComponent className="w-5 h-5 text-blue-700" />
                <span>
                  {count} {type}
                  {count !== 1 ? "s" : ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Highlights & Tips Cards */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              🌟 Highlights
            </h3>
            {trip.highlights?.length ? (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {trip.highlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No highlights provided.</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              💡 Tips
            </h3>
            {trip.tips?.length ? (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {trip.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No tips provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
