"use client";

import React, { useEffect, useState } from "react";
import { Globe, Users, Pencil, Save } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GuideProfile } from "../../Guidedetail/components/GuideMainProfile";
import { axiosInstance } from "@/lib/utils";
import { toast } from "react-hot-toast";

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
  refreshBooking: () => void;
}

export const Booking: React.FC<BookingProps> = ({
  onCheck,
  trip,
  alreadyBooked,
  setCheckingOpen,
  checkingOpen,
  bookingStatus,
  refreshBooking,
}) => {
  const [participants, setParticipants] = useState({ adult: 1, child: 0 });
  const [language, setLanguage] = useState("English");
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState<number>(trip?.price || 0);

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
  const totalPrice = newPrice * totalParticipants;

  useEffect(() => {
    const data = {
      participants,
      totalParticipants,
      language,
      totalPrice,
    };
    if (!alreadyBooked) onCheck(data);
  }, [participants, language, newPrice]);

  useEffect(() => {
    if (bookingStatus === "" || bookingStatus === "no booking") {
      setParticipants({ adult: 1, child: 0 });
      setLanguage("English");
      refreshBooking();
    }
  }, [bookingStatus]);

  const handleSavePrice = async () => {
    if (!trip) return;
    try {
      const res = await axiosInstance.put(`/tripPlan/${trip._id}`, {
        price: newPrice,
      });

      if (res.data.success) {
        toast.success("Үнэ амжилттай хадгалагдлаа");
        setIsEditingPrice(false);
        refreshBooking();
      } else {
        toast.error("Хадгалах үед алдаа гарлаа");
      }
    } catch (error) {
      toast.error("Серверийн алдаа: " + error);
    }
  };

  return (
    <div className="bg-[#453C67] mt-6 text-white rounded-2xl p-6 max-w-5xl mx-auto shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">
        {alreadyBooked
          ? "You have successfully joined this trip"
          : "Select participants and language"}
      </h2>

      <div className="flex flex-wrap items-center gap-4">
        {/* Participants Selector */}
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
              {(["adult", "child"] as const).map((key) => (
                <div key={key} className="mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold capitalize">{key}</p>
                      <p className="text-sm text-gray-500">
                        {key === "adult" ? "Age 18-99" : "Age 12 and younger"}
                      </p>
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

        {/* Language Selector */}
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
              {["English", "Mongolian", "Korean", "Japanese"].map((lang) => (
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

        {/* Price Display / Edit */}
        <div className="flex items-center gap-2 px-4 py-2 ml-auto text-black bg-white rounded-full shadow">
          <span className="text-sm text-gray-600">Total Price:</span>
          <span className="text-lg font-bold">${totalPrice}</span>

          {!alreadyBooked &&
            (isEditingPrice ? (
              <>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && handleSavePrice()}
                  className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-violet-300 bg-gray-100"
                />
                <Save
                  onClick={handleSavePrice}
                  className="w-5 h-5 text-green-500 cursor-pointer hover:text-green-600"
                />
              </>
            ) : (
              <Pencil
                onClick={() => setIsEditingPrice(true)}
                className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600"
              />
            ))}
        </div>

        {/* Check / Cancel Button */}
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
