"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bus, Globe, MapPin, Users, Calendar } from "lucide-react";

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

  return (
    <Card className="max-w-5xl p-8 mt-6 space-y-8 border shadow-lg md:p-10 rounded-2xl">
      {/* Header section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          From Ulaanbaatar: Khuvsgul Lake Tour
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#453C67]" />
            <span>Ulaanbaatar, Mongolia</span>
          </div>
          <div className="flex items-center gap-2 transition-colors cursor-pointer hover:text-blue-600">
            <Bus className="w-4 h-4" />
            <span className="underline">View pickup locations</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#453C67]" />
            <span>{language}-speaking guide</span>
          </div>
        </div>
      </div>

      {/* Tour details section */}
      <div className="grid gap-6 pt-6 border-t md:grid-cols-2">
        {/* Available time */}
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
                  2025/07/25 8:00 AM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Group size */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#F0F7FF]">
              <Users className="w-5 h-5 text-[#453C67]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Group size</p>
              <p className="font-medium text-gray-800">
                {totalParticipants} person(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Price breakdown section */}
      <div className="pt-6 space-y-4 border-t">
        <h3 className="text-xl font-semibold text-gray-900">Price breakdown</h3>

        <div className="space-y-3">
          {/* Adult */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">
                Adult × {participants.adult}
              </p>
              <p className="text-sm text-gray-500">Age 18–99</p>
            </div>
            <span className="font-medium text-gray-800">
              ${participants.adult * 100}
            </span>
          </div>

          {/* Youth */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">
                Youth × {participants.youth}
              </p>
              <p className="text-sm text-gray-500">Age 13–17</p>
            </div>
            <span className="font-medium text-gray-800">
              ${participants.youth * 100}
            </span>
          </div>

          {/* Child */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">
                Child × {participants.child}
              </p>
              <p className="text-sm text-gray-500">Age 0–12</p>
            </div>
            <span className="font-medium text-gray-800">
              ${participants.child * 100}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">${totalPrice}.00</p>
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
