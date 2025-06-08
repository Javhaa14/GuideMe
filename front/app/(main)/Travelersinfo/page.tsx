"use client";
import Image from "next/image";
import { Filter } from "./components/Filter";
import Travelerspost from "../components/Travelerpost";
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";
interface PostType {
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
  const filters = [
    "Most Recent",
    "For you",
    "Date",
    "Languages",
    "Gender",
    "Location",
    "Activites",
  ];
  const [posts, setPosts] = useState<PostType[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const { id }: { id?: string } = useParams();
  const { user, status } = useUser(); // <-- get user from context

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
  console.log("post !!!", posts);
  return (
    <div className="flex flex-col w-screen h-full items-center bg-white gap-10 pt-[40px] px-[20px]">
      <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })}
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
