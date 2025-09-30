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
import { selectActivities } from "@/app/utils/FilterData";
import { axiosInstance } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Island_Moments } from "next/font/google";

// const activityColors: Record<string, string> = {
//   Hiking: "bg-green-100 text-green-800",
//   Stargazing: "bg-blue-100 text-blue-800",
//   Shopping: "bg-cyan-100 text-cyan-800",
//   Citytour: "bg-yellow-100 text-yellow-800",
//   Festivals: "bg-purple-100 text-purple-800",
//   Food: "bg-pink-100 text-pink-800",
//   horseRiding: "bg-pink-100 text-pink-800",
//   Sightseeing: "bg-[#7373FF] text-gray-300",
//   default: "bg-gray-100 text-gray-700",
// };

type TpostCardProps = {
  post: {
    _id: string;
    likedBy: [{ userId: string }];
    images?: string[];
    tprofileInfo?: { profileimage?: string };
    userInfo?: { username?: string };
    createdAt: string;
    activities: string[];
    content: string;
    startDate: string;
    endDate: string;
    city?: string;
    country: string;
    people: string;
  };
  onclick: () => void;
  user: { id: string };
};

export default function TpostCard({ post, onclick, user }: any) {
  const [likes, setLikes] = useState<number>(post.likedBy.length);
  const alreadyLiked = post.likedBy.some(
    (liked: any) => liked.userId === user.id
  );
  const [liked, setLiked] = useState<boolean>(alreadyLiked);
  const [showHearts, setShowHearts] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = async () => {
    console.log("Like button clicked, current liked state:", liked);
    try {
      const newLikedState = !liked;
      console.log(newLikedState, "new");
      setLiked(newLikedState);
      setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

      if (newLikedState) {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 800);
      }
      const response = await axiosInstance.put(`/post`, {
        userId: user.id,
        postId: post._id,
      });
      const updatedLikedBy = response.data.likedBy;
      console.log(updatedLikedBy, "up");
      setLikes(updatedLikedBy.length);
      const isLiked = updatedLikedBy.some(
        (liked: { userId: string }) => liked.userId === user.id
      );
      setLiked(isLiked);

      console.log("Like updated successfully, new state:", newLikedState);
    } catch (error) {
      console.error("❌ Like error:", error);
      setLiked(!liked);
      setLikes((prev) => (liked ? prev + 1 : prev - 1));
    }
  };
  // ["/fallback.jpg"];
  const images = post.images?.length ? post.images : [];

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col justify-between w-full max-w-[448px]  bg-white rounded-3xl shadow-md p-5 space-y-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src={post.tprofileInfo?.profileimage || ""}
            alt="User"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p
              className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
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

        {/* Fixed Like Button */}
        <div className="flex justify-center items-center gap-2 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`relative group flex justify-center items-center p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              liked
                ? "bg-red-50 hover:bg-red-100 border-red-200"
                : "bg-gray-50 hover:bg-gray-100 border-gray-200"
            } border`}
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                liked
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              fill={liked ? "currentColor" : "none"}
            />

            {/* Flying Hearts Animation */}
            <AnimatePresence>
              {showHearts &&
                Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                    animate={{
                      x: Math.cos((i / 8) * 2 * Math.PI) * 40,
                      y: Math.sin((i / 8) * 2 * Math.PI) * 40,
                      opacity: 0,
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    exit={{ opacity: 0 }}
                    className="absolute text-red-400 pointer-events-none text-sm"
                  >
                    ❤️
                  </motion.div>
                ))}
            </AnimatePresence>
          </Button>
          <span className="text-sm font-medium text-gray-600">({likes})</span>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Looking for a trip partner to {post.activities?.join(", ")}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {showFullDesc ? post.content : `${post.content?.slice(0, 100)}...`}
          {post.content?.length > 100 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-blue-600 text-sm ml-1 font-medium hover:text-blue-700 transition-colors"
            >
              {showFullDesc ? "Show Less" : "Read More"}
            </button>
          )}
        </p>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100">
        {images[currentImageIndex] ? <Image
          src={images[currentImageIndex]}
          alt={`Post image ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
        /> : null}
       
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-200 hover:scale-110 disabled:invisible"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-200 hover:scale-110 disabled:invisible"
            >
              <ChevronRight size={18} />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white shadow-md"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Activity Tags */}
      <div className="flex flex-wrap gap-2">
        {post.activities.slice(0, 4).map((activityName: string, i: number) => {
          const activity = selectActivities.find(
            (act) => act.activity === activityName
          );
          // const colorClass =
          //   activityColors[activityName] || activityColors.default;

          return (
            <span
              key={i}
              className={`text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1 shadow-sm`}
            >
              <span>{activity?.icon}</span>
              <span>{activity?.activity || activityName}</span>
            </span>
          );
        })}
      </div>

      {/* Trip Metadata */}
      <div className="flex flex-col gap-3 text-sm text-gray-700 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <span className="font-medium">
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
          <span className="font-medium">
            {post.city && post.country
              ? `${post.city}, ${post.country}`
              : post.country}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span className="font-medium">{post.people} people</span>
        </div>
      </div>

      {/* Visit Profile Button */}

      <button
        onClick={onclick}
        className=" w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
      >
        Visit Profile
      </button>
    </div>
  );
}
