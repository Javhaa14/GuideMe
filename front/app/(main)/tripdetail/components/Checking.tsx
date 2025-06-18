"use client";

import React, { useEffect, useState } from "react"; // ✅ useEffect нэмэгдлээ
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, MapPin, Users, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { toast } from "sonner";

// ✅ TripItem интерфэйс тодорхойлсон
interface TripItem {
  _id: string;
  title: string;
  price: number;
  date: Date;
}

interface CheckingProps {
  data: {
    participants: {
      adult: number;
      youth: number;
      child: number;
    };
    totalParticipants: number;
    language: string;
    totalPrice: number;
  };
}

export const Checking: React.FC<CheckingProps> = ({ data }) => {
  const { participants, totalParticipants, language, totalPrice } = data;

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

      const tripData = res.data.tripPlan;
      console.log("➡️ tripData:", tripData);
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
      <Card className="max-w-5xl p-8 mt-6 text-center border shadow-lg md:p-10 rounded-2xl">
        <p className="text-gray-500">Loading trip data...</p>
      </Card>
    );
  }

  const unitPrice = trip.price || 100;

  return (
    <Card className="max-w-5xl p-8 mt-6 space-y-8 border shadow-lg md:p-10 rounded-2xl">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{trip.title}</h2>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#453C67]" />
            <span>Ulaanbaatar, Mongolia</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#453C67]" />
            <span>{language}-speaking guide</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 pt-6 border-t md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#F0F7FF]">
              <Calendar className="w-5 h-5 text-[#453C67]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Available time
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#EFF6FF] text-[#453C67]">
                  {new Date(trip.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#F0F7FF]">
              <Users className="w-5 h-5 text-[#453C67]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">People count</p>
              <p className="font-medium text-gray-800">
                {totalParticipants} person(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-4 border-t">
        <h3 className="text-xl font-semibold text-gray-900">Price breakdown</h3>

        <div className="space-y-3">
          {["adult", "youth", "child"].map((type) => {
            const count = participants[type as keyof typeof participants];
            return (
              <div
                key={type}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {type.charAt(0).toUpperCase() + type.slice(1)} × {count}
                  </p>
                  <p className="text-sm text-gray-500">
                    {type === "adult"
                      ? "Age 18–99"
                      : type === "youth"
                      ? "Age 13–17"
                      : "Age 0–12"}
                  </p>
                </div>
                <span className="font-medium text-gray-800">
                  ${count * unitPrice}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">${totalPrice}</p>
            <p className="text-sm text-gray-500">Includes all taxes and fees</p>
          </div>
          <Button className="px-8 py-6 text-lg font-semibold bg-[#453C67] hover:bg-[#5a4f8a] transition">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
