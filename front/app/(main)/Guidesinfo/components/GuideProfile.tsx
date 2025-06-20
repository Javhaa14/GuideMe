"use client";
<<<<<<< HEAD
import { HandCoins, Heart, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/app/context/Usercontext";
import axios from "axios";
import { axiosInstance } from "@/lib/utils";
import { Guide } from "../page";
import { useFilteredData } from "@/app/context/FilteredDataContext";
export const GuideProfile = ({
  id,
  name,
  location,
  about,
  price,
  rating,
  status,
  profileimage,
=======

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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  post,
  onclick,
}: {
  id: string;
  name: string;
  profileimage: string;
  location: string;
<<<<<<< HEAD
  about: string;
  price: number | string;
  rating: number;
  status: string;
=======
  slogan: string;
  price: number | string;
  rating: number;
  status: string;
  languages: string;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  post: Guide;
  onclick: () => void;
}) => {
  const { user } = useUser();
<<<<<<< HEAD
  const [liked, setLiked] = useState(post.likedBy.includes(user?.id));
  const [showLikes, setShowLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedBy.length);
  const { filteredData, setFilteredData } = useFilteredData();
  const handleLikeClick = async () => {
=======
  const [liked, setLiked] = useState(() =>
    post.likedBy.includes(user?.id || "")
  );
  const [showLikes, setShowLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedBy.length);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = async () => {
    if (!user?.id) return;

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    try {
      const response = await axiosInstance.put(`/gprofile`, {
        userId: user.id,
        guideId: id,
      });
<<<<<<< HEAD
      const updatedLikedBy = response.data.likedBy;

      setLikesCount(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));
      if (!liked) {
        setShowLikes(true);
        setTimeout(() => setShowLikes(false), 1000);
      }
    } catch (error) {
      console.error("❌ Like error:", error);
=======

      const updatedLikedBy: string[] = response.data.likedBy;
      setLikesCount(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));

      if (!liked) {
        setShowLikes(true);
        setTimeout(() => setShowLikes(false), 1500);
      }
    } catch (error) {
      console.error("Like error:", error);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    }
  };

  return (
<<<<<<< HEAD
    <div className="w-[500px] h-[200px] border-[1px] border-black rounded-lg flex flex-row gap-2">
      <img
        src={profileimage == "" ? "/user.jpg" : profileimage}
        className="size-[200px] rounded-lg"
      ></img>
      <div className="flex flex-col justify-between py-2 w-full px-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col gap-1 w-full">
            <p
              onClick={onclick}
              className="text-[23px] text-black font-bold hover:cursor-pointer"
            >
              {name}
            </p>
            <p className="text-[14px] text-blue-400">{location}</p>
          </div>
          <HandCoins className="text-blue-600 size-5 mr-2" />
          {price == "FREE" ? (
            <p className="text-blue-400 font-bold">{price}</p>
          ) : (
            <p className="text-blue-400 font-bold">{price}$/h</p>
          )}
          <div
            className={`w-3 h-2 rounded-full ml-3 ${
              status == "available" ? "bg-green-500" : "bg-red-600"
            }`}
          ></div>
        </div>
        <div className="w-full h-[1px] border-[1px] border-gray-300"></div>
        <p className="text-[14px] text-black">{about}</p>
        <div className="flex w-full justify-between flex-row gap-5">
          <div className="flex gap-2">
            <p className="text-[14px] text-black">Rating</p>

            <p className="text-black">{rating}</p>
            <Star className="size-5 text-yellow-300" />
          </div>
          <div className="flex items-center gap-3">
            {likesCount}
            <button
              onClick={() => {
                setLiked(!liked);
                handleLikeClick();
              }}
              className={`size-10 flex  justify-center items-center rounded-full text-red-500  ${
                liked ? " bg-green-200" : "bg-red-200"
              }`}
            >
              {" "}
              <ThumbsUp />
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
                      className="absolute  text-red-400 pointer-events-none"
                    >
                      👍
                    </motion.span>
                  ))}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </div>
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  );
};
