"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Globe, TimerReset, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { toast } from "sonner";

interface TripItem {
  _id: string;
  date: string;
  groupSize: number;
  duration: string;
  languages: string[];
}

const ActivityItem = ({
  icon: Icon,
  title,
  value,
  iconColor = "text-gray-800",
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  iconColor?: string;
}) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1">
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export const Activity = () => {
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
      <div className="p-6 text-center text-gray-500">
        No activity data found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-6 mx-auto space-y-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-900">About this activity</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border-b border-gray-200 pb-6">
        <div className="space-y-4">
          <ActivityItem
            icon={CalendarDays}
            title="Start date"
            value={trip.date}
          />
          <ActivityItem
            icon={Users}
            title="Group size"
            value={`${trip.groupSize}`}
            iconColor="text-emerald-500"
          />
        </div>

        <div className="space-y-4">
          <ActivityItem
            icon={TimerReset}
            title="Duration"
            value={`${trip.duration} days`}
          />

          <ActivityItem
            icon={Globe}
            title="Live tour guide"
            value={trip.languages
              .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
              .join(", ")}
            iconColor="text-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
