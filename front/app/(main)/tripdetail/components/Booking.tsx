"use client";

import React, { useEffect, useState } from "react";
import { Globe, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GuideProfile } from "../../Guidedetail/components/GuideMainProfile";

interface RouteItem {
  image?: string;
  title: string;
  about?: string;
  iconType?: string;
  _id: string;
}
export interface TripItem {
  _id: string;
  title: string;
  about: string;
  date: string;
  duration: string;
  groupSize: string;
  guideId: GuideProfile;
  highlights: string[];
  images: string[];
  languages: string[];
  price: number;
  route: RouteItem[];
  tips: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BookingProps {
  onCheck: (data: any) => void;
  trip: TripItem | null;
  alreadyBooked: boolean;
  checkingOpen: boolean;
  setCheckingOpen: (open: boolean) => void;
  bookingStatus: string;
  refreshBooking: () => void; // ✅ ADDED
}

export const Booking: React.FC<BookingProps> = ({
  onCheck,
  trip,
  alreadyBooked,
  setCheckingOpen,
  checkingOpen,
  bookingStatus,
  refreshBooking, // ✅
}) => {
  const [participants, setParticipants] = useState({
    adult: 1,
    child: 0,
  });

  const [language, setLanguage] = useState("English");

  const adjustParticipant = (
    type: keyof typeof participants,
    delta: number
  ) => {
    setParticipants((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const totalParticipants = participants.adult + participants.child;
  const totalPrice = trip ? trip.price * totalParticipants : 0;

  useEffect(() => {
    const data = {
      participants,
      totalParticipants,
      language,
      totalPrice,
    };

    // Only call onCheck if booking is not already confirmed
    if (!alreadyBooked) {
      onCheck(data);
    }
  }, [participants, language, totalPrice, alreadyBooked]);

  useEffect(() => {
    if (bookingStatus === "" || bookingStatus === "no booking") {
      setParticipants({ adult: 1, child: 0 });
      setLanguage("English");
      refreshBooking(); // ✅ Re-check booking after cancel
    }
  }, [bookingStatus, refreshBooking]); // ✅ added refreshBooking to deps

  const participantOptions = [
    { label: "Adult", range: "Age 18-99", key: "adult" },
    { label: "Child", range: "Age 12 and younger", key: "child" },
  ] as const;

  const languages = ["English", "Mongolian", "Korean", "Japanese"];

  return (
    <div className="bg-[#453C67] mt-6 text-white rounded-2xl p-6 max-w-5xl mx-auto shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        {alreadyBooked
          ? "You have successfully joined this trip"
          : "Select participants and language"}
      </h2>

      <div className="flex flex-wrap items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <button
              disabled={alreadyBooked}
              className="flex items-center gap-2 px-4 py-2 text-black transition bg-white rounded-full w-52 hover:shadow disabled:opacity-50"
            >
              <Users className="text-[#453C67]" />
              <span>{`Person x ${totalParticipants}`}</span>
            </button>
          </PopoverTrigger>
          {!alreadyBooked && (
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
          )}
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button
              disabled={alreadyBooked}
              className="flex items-center gap-2 px-4 py-2 text-black transition bg-white rounded-full w-52 hover:shadow disabled:opacity-50"
            >
              <Globe className="text-[#453C67]" />
              <span>{language}</span>
            </button>
          </PopoverTrigger>
          {!alreadyBooked && (
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
          )}
        </Popover>

        <div className="flex items-center gap-3 px-4 py-2 ml-auto text-black bg-white rounded-full shadow">
          <span className="text-sm text-gray-600">Total Price:</span>
          <span className="text-lg font-bold">${totalPrice}</span>
        </div>

        <button
          onClick={() => setCheckingOpen(!checkingOpen)}
          className={`${
            alreadyBooked
              ? "bg-red-400 hover:bg-red-500"
              : "bg-[#6D67E4] hover:bg-[#46C2CB]"
          } transition text-white font-semibold px-6 py-3 rounded-full shadow-md`}
        >
          {alreadyBooked
            ? checkingOpen
              ? "Close Edit"
              : "Cancel/Edit"
            : checkingOpen
            ? "Close Availability"
            : "Check availability"}
        </button>
      </div>
    </div>
  );
};
