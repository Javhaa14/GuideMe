"use client";
import {
  CircleDollarSign,
  Coins,
  Globe2,
  HandCoins,
  Heart,
  Map,
  MapPin,
  MapPinCheck,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { Guide } from "../page";
import { io } from "socket.io-client";
export const GuideProfile = ({
  id,
  name,
  location,
  about,
  price,
  rating,
  status,
  profileimage,
  post,
  languages,
  onclick,
}: {
  id: string;
  name: string;
  profileimage: string;
  location: string;
  about: string;
  price: number | string;
  rating: number;
  status: string;
  languages: string;
  post: Guide;
  onclick: () => void;
}) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(post.likedBy.includes(user?.id));
  const [showLikes, setShowLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedBy.length);

  const handleLikeClick = async () => {
    try {
      const response = await axiosInstance.put(`/gprofile`, {
        userId: user.id,
        guideId: id,
      });
      const updatedLikedBy = response.data.likedBy;

      setLikesCount(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));
      if (!liked) {
        setShowLikes(true);
        setTimeout(() => setShowLikes(false), 1000);
      }
    } catch (error) {
      console.error("❌ Like error:", error);
    }
  };

  return (
    <div className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-md max-w-3xl w-[500px] relative hover:bg-gray-200">
      {/* Profile Image */}
      <img
        src={profileimage || "/user.jpg"}
        alt={`${name || "Guide"}'s profile`}
        className="w-30 h-30 rounded-full object-cover border-2 border-white shadow-md"
      />

      {/* Content */}
      <div className="flex flex-col flex-1">
        {/* Top Row: Name + Status */}
        <div className="flex justify-between items-start">
          <div>
            <h2
              onClick={onclick}
              className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer"
            >
              {name}
            </h2>
            <span className="text-sm text-gray-600">{about}</span>
          </div>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              status === "available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status === "available" ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="flex flex-col items-baseline gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Globe2 className="size-4 text-gray-500" />
              {languages}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Coins className="w-3 h-3" />
              {price === "FREE" ? "Free" : `${price}$/h`}
            </span>
            <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">
              {rating} ★ Rating
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
              Local Tour Guide ({price === "FREE" ? "Free" : `$${price}/h`})
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
              City Guide ($50-100)
            </span>
          </div>

          {/* Like Button with Animation */}
          <div className="flex items-center gap-3 mt-4 relative">
            <button
              onClick={() => {
                setLiked(!liked);
                handleLikeClick();
              }}
              className={`size-7 flex justify-center items-center rounded-full text-red-500 relative ${
                liked ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <ThumbsUp className="size-4" />
              <AnimatePresence>
                {showLikes &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                      }}
                      animate={{
                        x: Math.cos((i / 8) * 2 * Math.PI) * 40,
                        y: Math.sin((i / 8) * 2 * Math.PI) * 40,
                        opacity: 0,
                        scale: 1.3,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      exit={{ opacity: 0 }}
                      className="absolute text-red-400 pointer-events-none"
                    >
                      👍
                    </motion.span>
                  ))}
              </AnimatePresence>
            </button>
            <span className="text-sm text-gray-700">{likesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
