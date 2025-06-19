"use client";

import type React from "react";
import {
  Coins,
  Globe2,
  MapPin,
  ThumbsUp,
  Star,
  Clock,
  Award,
} from "lucide-react";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    default:
      "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200",
    price:
      "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200",
    rating:
      "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-200",
    location:
      "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200",
    language:
      "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
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
  const [showLikes, setShowLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedBy.length);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = async () => {
    if (!user?.id) return;

    try {
      const response = await axiosInstance.put(`/gprofile`, {
        userId: user.id,
        guideId: id,
      });

      const updatedLikedBy: string[] = response.data.likedBy;
      setLikesCount(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));

      if (!liked) {
        setShowLikes(true);
        setTimeout(() => setShowLikes(false), 1500);
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl max-w-4xl w-full transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-4 right-4 z-10">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${
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
        </motion.div>
      </div>

      <div className="relative flex gap-6">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-[180px] h-[180px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={profileimage || "/user.jpg"}
              alt={`${name}'s profile`}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
        </div>

        <div className="flex flex-col flex-1 justify-between relative z-10">
          <div className="space-y-3">
            <motion.h2
              onClick={onclick}
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors duration-200"
            >
              {name}
            </motion.h2>

            <div className="flex items-center gap-2 mt-2">
              <BiSolidQuoteLeft className="w-4 h-4 text-gray-400" />
              <p className="text-gray-600 italic font-medium">{slogan}</p>
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

          <div className="mt-4 flex gap-3">
            <div className="flex flex-wrap gap-3">
              <Tag>
                <Clock className="w-3 h-3" />
                Local Tours {price === "FREE" ? "(Free)" : `($${price}/h)`}
              </Tag>
              <Tag>
                <MapPin className="w-3 h-3" />
                City Guide ($50–100)
              </Tag>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleLikeClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={liked ? "Unlike this guide" : "Like this guide"}
                className={`relative w-12 h-12 flex justify-center items-center rounded-full transition-all duration-300 ${
                  liked
                    ? "bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-red-100 hover:to-pink-100 hover:text-red-500"
                }`}
              >
                <ThumbsUp
                  className={`w-5 h-5 transition-transform duration-200 ${
                    liked ? "scale-110" : ""
                  }`}
                />

                <AnimatePresence>
                  {showLikes && (
                    <>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                          animate={{
                            x: Math.cos((i / 12) * 2 * Math.PI) * 60,
                            y: Math.sin((i / 12) * 2 * Math.PI) * 60,
                            opacity: 0,
                            scale: 1.5,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            delay: i * 0.05,
                          }}
                          className="absolute text-2xl pointer-events-none"
                        >
                          {"👍❤️🎉✨"[i % 4]}
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/30 to-pink-500/30"
                      />
                    </>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.span
                key={likesCount}
                initial={{ scale: 1.2, color: "#ef4444" }}
                animate={{ scale: 1, color: "#374151" }}
                className="text-lg font-semibold"
              >
                {likesCount}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/50 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700" />
    </motion.div>
  );
};
