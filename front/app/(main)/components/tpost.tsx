"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, CalendarDays, Users } from "lucide-react";
import { selectActivites } from "@/app/utils/FilterData";

export default function Tpost({ post, onclick, user }: any) {
  console.log(post, "tpos");
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-[#fdf4e3] rounded-3xl shadow-lg overflow-hidden p-3 hover:bg-[#6b6b6b12] ">
      {/* Header Image */}
      <div className="flex relative w-full h-80">
        <Image
          src={post.images?.[0] || "/fallback.jpg"}
          alt="Image"
          fill
          className="object-cover rounded-3xl"
        />

        {/* Activities Cards Section */}
        <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 w-[90%] overflow-x-auto no-scrollbar">
          <div className="flex gap-3 min-w-max px-1 justify-center items-center bg-transparent">
            {post.activities.map((el: string, i: number) => {
              return (
                <div key={i}>
                  <button
                    // onClick={item.onClick}
                    className="flex flex-col items-center justify-center bg-white shadow-md rounded-2xl min-w-[100px] py-4 px-2 transition-all hover:scale-105 active:scale-95"
                  >
                    {selectActivites.map((act) => {
                      if (act.activity === el) {
                        return <p>{act.icon}</p>;
                      }
                    })}
                    <span className="text-sm font-medium text-gray-700 mt-2">
                      {el}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="pt-12 px-4 pb-6">
        {/* Username + Profile */}
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={post.tprofileInfo?.profileimage || "/fallback.jpg"}
            alt="User"
            width={50}
            height={50}
            className="rounded-md border-2 border-gray-200 cursor-pointer"
            onClick={onclick}
          />
          <div>
            <h4
              className="font-semibold text-gray-900 cursor-pointer hover:text-blue-900"
              onClick={onclick}
            >
              {post.userInfo?.username}
            </h4>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Info */}
        <h3 className="text-md font-bold mt-4 mb-2">Trip Information</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {showFullDesc ? post.content : `${post.content?.slice(0, 120)}...`}
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-red-500 text-sm ml-1 font-semibold"
          >
            {showFullDesc ? "Show Less" : "See Full Description"}
          </button>
        </p>

        {/* Date, Address, Group Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="size-[16px]" />
            <span>
              {new Date(post.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(post.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={16} className="mt-0.5" />
            <span>
              {post.city && post.country
                ? `${post.city}, ${post.country}`
                : post.country}
            </span>
          </div>

          <div className="flex gap-2 text-sm text-gray-600">
            <Users className="size-[16px]" />
            <span className="font-medium">{post.people}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
