"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Globe,
  TimerReset,
  Users,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface TripItem {
  _id: string;
  date: string;
  groupSize: number;
  duration: string;
  languages: string[];
}

export const Activity = () => {
  const [trip, setTrip] = useState<TripItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<TripItem | null>(null);

  const params = useParams();
  const tripId = typeof params.id === "string" ? params.id : params.id?.[0];

  const fetchTrip = async () => {
    if (!tripId) return toast.error("Аяллын ID олдсонгүй");

    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`);
      if (res.data.success && res.data.tripPlan) {
        setTrip(res.data.tripPlan);
        setEditValues(res.data.tripPlan);
      } else {
        toast.error("Аялал олдсонгүй");
      }
    } catch (error: any) {
      toast.error("Алдаа гарлаа: " + (error.message || "Unknown error"));
    }
  };

  const handleSave = async () => {
    if (!editValues || !tripId) return;

    try {
      const res = await axiosInstance.put(`/tripPlan/${tripId}`, {
        date: editValues.date,
        groupSize: editValues.groupSize,
        duration: editValues.duration,
        languages: editValues.languages,
      });

      if (res.data.success) {
        toast.success("Амжилттай хадгалагдлаа!");
        setTrip(editValues);
        setIsEditing(false);
      } else {
        toast.error("Хадгалах үед алдаа гарлаа");
      }
    } catch (error: any) {
      toast.error("Серверийн алдаа: " + error.message);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  if (!trip || !editValues) {
    return (
      <div className="p-6 text-center text-gray-500">
        No activity data found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-6 mx-auto space-y-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">
          About this activity
        </h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditValues(trip);
                }}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                <X size={16} /> Cancel
              </button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600">
              <Pencil size={16} /> Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border-b border-gray-200 pb-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-start gap-4">
            <CalendarDays className="w-6 h-6 text-gray-800 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Start date
              </h3>
              {isEditing ? (
                <input
                  type="date"
                  value={editValues.date.slice(0, 10)}
                  onChange={(e) =>
                    setEditValues({ ...editValues, date: e.target.value })
                  }
                  className="w-full p-2 mt-1 border rounded"
                />
              ) : (
                <p className="text-gray-600">{trip.date}</p>
              )}
            </div>
          </div>

          {/* Group Size */}
          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 text-emerald-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Group size
              </h3>
              {isEditing ? (
                <input
                  type="number"
                  value={editValues.groupSize}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      groupSize: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 mt-1 border rounded"
                />
              ) : (
                <p className="text-gray-600">{trip.groupSize}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Duration */}
          <div className="flex items-start gap-4">
            <TimerReset className="w-6 h-6 text-gray-800 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={editValues.duration}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      duration: e.target.value,
                    })
                  }
                  className="w-full p-2 mt-1 border rounded"
                />
              ) : (
                <p className="text-gray-600">{trip.duration} days</p>
              )}
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-start gap-4">
            <Globe className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={editValues.languages.join(", ")}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      languages: e.target.value
                        .split(",")
                        .map((lang) => lang.trim()),
                    })
                  }
                  className="w-full p-2 mt-1 border rounded"
                />
              ) : (
                <p className="text-gray-600">
                  {trip.languages
                    .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
                    .join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
