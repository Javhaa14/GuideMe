"use client";
import Image from "next/image";

import Travelerspost from "../components/Travelerpost";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";
import { Button } from "@/components/ui/button";
import { selectActivites } from "@/app/utils/FilterData";
import { LocationFilterCard } from "../Guidesinfo/components/SearchLocation";
import Ebooking from "../Guidedetail/components/Ebooking";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "./components/Filter";

export interface PostType {
  _id: string;
  userId: string;
  content: string;
  country: string;
  city: string;
  images: string[];
  people: number;
  likes: number;
  likedBy: string[];
  startDate: string;
  endDate: string;
  createdAt: string;
  tprofileInfo?: {
    gender: string;
    languages: string[];
    location: string;
    profileimage: string;
    backgroundimage: string;
    socialAddress: string;
    about: string;
  };
  userInfo?: {
    _id?: string;
    username: string;
    email: string;
    role: string;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user, status } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get<PostType[]>(`/post`);
        setPosts(res.data);
      } catch (err) {
        console.error("❌ Post fetch failed:", err);
      }
    };

    fetchPosts();
  }, []);

  const router = useRouter();
  const todetail = (id: string) => {
    router.push(`/Touristdetail/${id}`);
  };
  return (
    <div className="flex flex-col w-screen h-full items-center bg-white gap-5 py-[40px] px-[20px]">
      <div className="flex flex-col border-gray-200 border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        <div className="flex gap-3">
          <Button variant="ghost">Search Location</Button>
          <Filter isFilter={false} placeholder="Search Location ..." />
        </div>

        <div className="flex gap-3">
          <Button variant="ghost">Choose a date:</Button>
          <div>
            <Popover>
              <PopoverTrigger>Start Date</PopoverTrigger>
              <PopoverContent className="flex items-start size-50 [&>button]:hidden bg-transparent border-none p-0 gap-0 margin-0 top-[30%] left-[30%] shadow-0 rounded-t">
                {" "}
                <Ebooking />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Popover>
              <PopoverTrigger>End Date</PopoverTrigger>
              <PopoverContent className="flex items-start size-50 [&>button]:hidden bg-transparent border-none p-0 gap-0 margin-0 top-[30%] left-[30%] shadow-0 rounded-t">
                {" "}
                <Ebooking />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost">Activities</Button>
          {selectActivites.map((act, index) => (
            <Button variant="secondary">
              {act.icon}
              {act.activity}
            </Button>
          ))}
        </div>

        {/* {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })} */}
      </div>

      <div className="flex flex-col gap-5 w-[800px] h-fit">
        {posts.map((v, i) => {
          return (
            <Travelerspost
              onclick={() => {
                todetail(v.userId);
              }}
              post={v}
              key={i}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
}
