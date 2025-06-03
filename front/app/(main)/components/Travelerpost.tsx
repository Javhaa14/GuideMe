"use client";
import { useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, UsersRound } from "lucide-react";

export default function Travelerpost({ post }: any) {
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="text-black bg-white shadow-md rounded-md p-4 my-4 border-[1px] border-black">
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src="/download.jpg"
          alt="User"
          width={40}
          height={40}
          className="rounded-full size-[40px]"
        />
        <div className="flex items-center flex-row gap-3">
          <h4 className="font-semibold">{post.user}</h4>
          <p className="text-gray-500 text-sm">{post.date}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <CalendarDays className="size-5" />
        <p className="mb-3 text-blue-600">{post.date}</p>
        <MapPin className="size-5 ml-3" />
        <p className="mb-3 text-blue-600">{post.location}</p>
        <UsersRound className="size-5 ml-3" />
        <p className="mb-3 text-blue-600">{post.people}</p>
      </div>
      <p className="mb-3 ">{post.content}</p>

      <div className="flex gap-2 w-full overflow-scroll">
        {post.image &&
          post.image.map((val: any, i: any) => {
            return (
              <Image
                key={i}
                src={val}
                alt="Post"
                width={200}
                height={100}
                className="rounded-md mb-3 w-auto h-auto"
              />
            );
          })}
      </div>

      <div className="flex items-center space-x-4 mb-3">
        <button onClick={handleLike} className="text-blue-500 font-medium">
          Like ({likes})
        </button>
        <button className="text-blue-500 font-medium">Comments (6)</button>
      </div>
    </div>
  );
}
