"use client";
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
  post,
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
  post: Guide;
  onclick: () => void;
}) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(post.likedBy.includes(user?.id));
  const [showLikes, setShowLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedBy.length);
  const { filteredData, setFilteredData } = useFilteredData();
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
  );
};
