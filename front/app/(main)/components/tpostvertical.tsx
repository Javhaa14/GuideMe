"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MapPin,
  CalendarDays,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { selectActivites } from "@/app/utils/FilterData";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const activityColors: Record<string, string> = {
  Hiking: "bg-green-100 text-green-800",
  Skiing: "bg-blue-100 text-blue-800",
  Surfing: "bg-cyan-100 text-cyan-800",
  Food: "bg-yellow-100 text-yellow-800",
  Culture: "bg-purple-100 text-purple-800",
  City: "bg-pink-100 text-pink-800",
  // Add more based on your actual activities
  default: "bg-gray-100 text-gray-700",
};

export default function TpostCard({ post, onclick, user }: any) {
  const [likes, setLikes] = useState<number>(post.likedBy.length);
  const [liked, setLiked] = useState<boolean>(post.likedBy.includes(user?.id));
  const [showHearts, setShowHearts] = useState(false);

  const handleLike = async () => {
    try {
      const response = await axiosInstance.put(`/post`, {
        userId: user.id,
        postId: post._id,
      });
      const updatedLikedBy = response.data.likedBy;
      setLikes(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));
      if (!liked) {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 800);
      }
    } catch (error) {
      console.error("❌ Like error:", error);
    }
  };

  const [showFullDesc, setShowFullDesc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = post.images?.length ? post.images : ["/fallback.jpg"];

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-md p-5 space-y-4 border border-gray-200 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={post.tprofileInfo?.profileimage || "/fallback.jpg"}
            alt="User"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p
              className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
              onClick={onclick}
            >
              {post.userInfo?.username || "Unknown User"}
            </p>
            <p className="text-sm text-gray-500">
              Posted{" "}
              {Math.floor(
                (Date.now() - new Date(post.createdAt).getTime()) / 3600000
              )}
              h ago
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Button
            variant="outline"
            onClick={() => {
              handleLike();
              setLiked(!liked);
            }}
            className={`relative group flex justify-center items-center p-1 rounded-full border transition-colors ${
              liked
                ? "bg-red-100 hover:bg-red-200"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Heart
              size={18}
              className={`transition-all duration-300 group-hover:scale-110 ${
                liked ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
              fill={liked ? "red" : ""}
              stroke={liked ? "red" : ""}
            />
            <AnimatePresence>
              {showHearts &&
                Array.from({ length: 8 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{
                      x: Math.cos((i / 8) * 2 * Math.PI) * 40,
                      y: Math.sin((i / 8) * 2 * Math.PI) * 40,
                      opacity: 0,
                      scale: 1.5,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    exit={{ opacity: 0 }}
                    className="absolute text-red-400 pointer-events-none text-xl"
                  >
                    ❤️
                  </motion.span>
                ))}
            </AnimatePresence>
          </Button>
          <p className="text-l ">({likes})</p>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          Looking for a trip partner to {post.activities?.join(", ")}
        </h3>
        <p className="text-sm text-gray-500 leading-snug">
          {showFullDesc ? post.content : `${post.content?.slice(0, 60)}...`}
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-blue-500 text-sm ml-1 font-medium"
          >
            {showFullDesc ? "Show Less" : "See More"}
          </button>
        </p>
      </div>

      {/* Activity Tags */}
      <div className="flex flex-wrap gap-2">
        {post.activities.slice(0, 4).map((el: string, i: number) => {
          const activity = selectActivites.find((act) => act.activity === el);
          const colorClass =
            activityColors[activity?.activity || ""] || activityColors.default;

          return (
            <span
              key={i}
              className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${colorClass}`}
            >
              <span>{activity?.icon}</span>
              <span>{activity?.activity || el}</span>
            </span>
          );
        })}
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-56 rounded-2xl overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`Post image ${currentImageIndex + 1}`}
          fill
          className="object-cover transition duration-300"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/70 hover:bg-white rounded-full"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/70 hover:bg-white rounded-full"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Trip Metadata */}
      <div className="flex flex-col gap-2 text-sm text-gray-700 pt-2 border-t">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <span>
            {new Date(post.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            –{" "}
            {new Date(post.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={16} className="mt-0.5" />
          <span>
            {post.city && post.country
              ? `${post.city}, ${post.country}`
              : post.country}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span className="font-medium">{post.people}</span>
        </div>
      </div>

      {/* Visit Profile Button */}
      <button
        onClick={onclick}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
      >
        Visit Profile
      </button>
    </div>
  );
}
