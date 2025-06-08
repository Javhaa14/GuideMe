"use client";
import { useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, UsersRound, Heart } from "lucide-react";
import { axiosInstance } from "@/lib/utils";

export default function Travelerpost({ post, onclick, user }: any) {
  const [likes, setLikes] = useState<number>(post.likedBy.length);
  const [liked, setLiked] = useState<boolean>(post.likedBy.includes(user?.id));

  const handleLike = async () => {
    try {
      const response = await axiosInstance.put(`/post`, {
        userId: user.id,
        postId: post._id,
      });

      // Assuming backend returns updated likedBy array
      const updatedLikedBy = response.data.likedBy;

      setLikes(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));
    } catch (error) {
      console.error("❌ Like error:", error);
    }
  };

  return (
    <div className="max-w-xl w-[800px] mx-auto bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 p-6 my-6 transition-transform hover:scale-[1.02]">
      {/* User info */}
      <div className="flex items-center space-x-4 mb-5">
        <Image
          onClick={onclick}
          src={post.tprofileInfo.profileimage}
          alt="User"
          width={50}
          height={50}
          className="size-[80px] cursor-pointer rounded-full border-2 border-blue-400 shadow-sm"
        />
        <div>
          <h4
            onClick={onclick}
            className="cursor-pointer font-semibold text-gray-900 hover:text-blue-400 text-lg"
          >
            {post.userInfo.username}
          </h4>
          <div className="flex gap-10">
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <div className="flex flex-wrap gap-6 text-blue-600 text-sm font-medium mb-5">
              <div className="flex items-center gap-1">
                <CalendarDays size={18} />
                <span>
                  {new Date(post.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  -
                  {new Date(post.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <span>
                  {post.city && post.country
                    ? (post.city, post.country)
                    : post.country}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <UsersRound size={18} />
                <span>{post.people}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 leading-relaxed mb-6">{post.content}</p>

      {/* Images carousel */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 mb-6">
        {post.images &&
          post.images.map((val: any, i: number) => (
            <div
              key={i}
              className="relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <Image
                src={val}
                alt={`Post image ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => {
            handleLike();
          }}
          className={`flex items-center gap-2 font-semibold ${
            liked ? "text-red-500" : "text-blue-500"
          } transition-colors hover:text-red-500`}
          aria-label="Like button"
        >
          <Heart
            size={22}
            className={`transition-transform ${
              liked ? "scale-125" : "scale-100"
            }`}
            fill={liked ? "red" : "none"}
            stroke={liked ? "red" : undefined}
          />
          Like ({likes})
        </button>
        <button className="text-blue-500 font-semibold hover:underline">
          Comments (6)
        </button>
      </div>
    </div>
  );
}
