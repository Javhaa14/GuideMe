"use client";

import React, { useEffect, useState } from "react";
import { Globe, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { toast } from "sonner";

interface TripItem {
  _id: string;
  price: number;
}

interface BookingProps {
  onCheck: (data: any) => void;
}

export const Booking: React.FC<BookingProps> = ({ onCheck }) => {
  const [participants, setParticipants] = useState({
    adult: 1,
    youth: 0,
    child: 0,
  });

  const [language, setLanguage] = useState("English");
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

  const adjustParticipant = (
    type: keyof typeof participants,
    delta: number
  ) => {
    setParticipants((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const totalParticipants =
    participants.adult + participants.youth + participants.child;

  const totalPrice = trip ? trip.price * totalParticipants : 0;

  const handleCheckClick = () => {
    const data = {
      participants,
      totalParticipants,
      language,
      totalPrice,
    };
    onCheck(data);
  };

  const participantOptions = [
    { label: "Adult", range: "Age 18-99", key: "adult" },
    { label: "Youth", range: "Age 13-17", key: "youth" },
    { label: "Child", range: "Age 12 and younger", key: "child" },
  ] as const;

  const languages = ["English", "Mongolian", "Korean", "Japanese"];

  return (
    <div className="bg-[#453C67] mt-6 text-white rounded-2xl p-6 max-w-5xl mx-auto shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        Select participants and language
      </h2>

      <div className="flex flex-wrap items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 text-black transition bg-white rounded-full w-52 hover:shadow">
              <Users className="text-[#453C67]" />
              <span>{`Person x ${totalParticipants}`}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="z-50 w-72">
            {participantOptions.map(({ label, range, key }) => (
              <div key={key} className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-gray-500">{range}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustParticipant(key, -1)}
                      className="w-8 h-8 text-xl transition bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="w-6 font-medium text-center">
                      {participants[key]}
                    </span>
                    <button
                      onClick={() => adjustParticipant(key, 1)}
                      className="w-8 h-8 text-xl transition bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      ＋
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 text-black transition bg-white rounded-full w-52 hover:shadow">
              <Globe className="text-[#453C67]" />
              <span>{language}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-44">
            {languages.map((lang) => (
              <div
                key={lang}
                onClick={() => setLanguage(lang)}
                className="p-2 transition rounded cursor-pointer hover:bg-gray-100"
              >
                {lang}
              </div>
            ))}
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-3 px-4 py-2 ml-auto text-black bg-white rounded-full shadow">
          <span className="text-sm text-gray-600">Total Price:</span>
          <span className="text-lg font-bold">${totalPrice}</span>
        </div>

        <button
          onClick={handleCheckClick}
          className="bg-[#6D67E4] hover:bg-[#46C2CB] transition text-white font-semibold px-6 py-3 rounded-full shadow-md"
        >
          Check availability
        </button>
      </div>
    </div>
  );
};
