"use client";

import type React from "react";
import { Coins, Globe2, MapPin, ThumbsUp, Clock, Award } from "lucide-react";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { useState } from "react";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import type { Guide } from "../page";
import Image from "next/image";

const Tag = ({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "price" | "rating" | "location" | "language";
}) => {
  const variants = {
    default: "border-[1px] border-grey-400",
    price: "border-[1px] border-grey-400",
    rating: "border-[1px] border-grey-400",
    location: "border-[1px] border-grey-400",
    language: "border-[1px] border-grey-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const GuideProfile = ({
  id,
  name,
  profileimage,
  location,
  slogan,
  price,
  rating,
  status,
  languages,
  post,
  onclick,
}: {
  id: string;
  name: string;
  profileimage: string;
  location: string;
  slogan: string;
  price: number | string;
  rating: number;
  status: string;
  languages: string;
  post: Guide;
  onclick: () => void;
}) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(() =>
    post.likedBy.includes(user?.id || "")
  );
  const [likesCount, setLikesCount] = useState(post.likedBy.length);

  const handleLikeClick = async () => {
    if (!user?.id) return;
    try {
      const res = await axiosInstance.put(`/gprofile`, {
        userId: user.id,
        guideId: id,
      });
      const updatedLikedBy: string[] = res.data.likedBy;
      setLikesCount(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));
    } catch (e) {
      console.error("Like error:", e);
    }
  };

  return (
    <div className="group relative overflow-hidden bg-white rounded-3xl shadow-md p-4 sm:p-5 space-y-4 border border-gray-200">
      {/* Status badge */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
        <div
          className={`flex items-center gap-2 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-full backdrop-blur-sm ${
            status === "available"
              ? "bg-emerald-100/80 text-emerald-700 border border-emerald-200"
              : "bg-red-100/80 text-red-600 border border-red-200"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              status === "available" ? "bg-emerald-500" : "bg-red-500"
            } animate-pulse`}
          />
          {status === "available" ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Main section */}
      <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="relative w-[96px] h-[96px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={profileimage || "/user.jpg"}
              alt={`${name}'s profile`}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 justify-between relative z-10">
          <div className="space-y-2 sm:space-y-3">
            <h2
              onClick={onclick}
              className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200"
            >
              {name}
            </h2>

            <div className="flex items-center gap-2 mt-1 sm:mt-2">
              <BiSolidQuoteLeft className="w-4 h-4 text-gray-400" />
              <p className="text-sm sm:text-base text-gray-600 italic font-medium">
                {slogan}
              </p>
              <BiSolidQuoteRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Tag variant="location">
                <MapPin className="w-3 h-3" />
                {location}
              </Tag>
              <Tag variant="language">
                <Globe2 className="w-3 h-3" />
                {languages}
              </Tag>
            </div>

            <div className="flex flex-wrap gap-2">
              <Tag variant="price">
                <Coins className="w-3 h-3" />
                {price === "FREE" ? "Free Tours" : `$${price}/hour`}
              </Tag>
              <Tag variant="rating">
                <Award className="w-3 h-3" />
                Rated Guide
              </Tag>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Tag>
                <Clock className="w-3 h-3" />
                <span className="text-[11px] sm:text-xs">
                  Local Tours {price === "FREE" ? "(Free)" : `($${price}/h)`}
                </span>
              </Tag>
              <Tag>
                <MapPin className="w-3 h-3" />
                <span className="text-[11px] sm:text-xs">
                  City Guide ($50–100)
                </span>
              </Tag>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleLikeClick}
                aria-label={liked ? "Unlike this guide" : "Like this guide"}
                className={`relative w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-full transition-all duration-300 ${
                  liked
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-red-100 hover:to-pink-100 hover:text-red-500"
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                    liked ? "scale-110" : ""
                  }`}
                />
              </button>
              <span className="text-base sm:text-lg font-semibold">
                {likesCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs (mobile дээр нуух) */}
      <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700" />
    </div>
  );
};
