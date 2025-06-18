"use client";
import Image from "next/image";

import Travelerspost from "../components/Travelerpost";
import { act, useEffect, useState } from "react";
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
import { useSearchLocation } from "@/app/context/SearchLocationContext";

export interface PostType {
  _id: string;
  userId: string;
  content: string;
  country: string;
  city: string;
  images: string[];
  activities: string[];
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

type Filters = {
  activities: string[];
};

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPost, setFileterdPost] = useState<PostType[]>(posts);
  const { user, status } = useUser();
  const [startDate, onChangeStart] = useState(new Date());
  const [endDate, onChangeEnd] = useState(new Date());
  const { searchedValue, setSearchedValue } = useSearchLocation();
  const [filters, setFilters] = useState<Filters>({
    activities: [],
  });
  console.log(filters, "act");

  const handleSelectedActivites = (activity: string) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.activities.includes(activity);
      return {
        ...prevFilters,
        activities: isSelected
          ? prevFilters.activities.filter((a) => a !== activity)
          : [...prevFilters.activities, activity],
      };
    });
  };

  const activitiesFilter = (
    filteredResult: PostType[],
    filterValue: Filters
  ) => {
    let newData: PostType[] = [];
    if (filterValue.activities.length > 0) {
      filterValue.activities.forEach((value) => {
        filteredResult.map((el) =>
          el.activities.forEach((activity) => {
            if (activity === value)
              newData.includes(el) ? "" : newData.push(el);
          })
        );
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  useEffect(() => {
    let result = posts;
    result = activitiesFilter(result, filters);
    setFileterdPost(result);
  }, [posts, filters, searchedValue]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get<PostType[]>(`/post`);
        setPosts(res.data);
        console.log(res.data);
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
                {/* <Calendar value={startDate} onChange={onChangeStart} /> */}
                <Ebooking />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost">Activities</Button>
          {selectActivites.map((act, i) => (
            <Button
              key={i}
              variant="secondary"
              onClick={() => handleSelectedActivites(act.activity)}
              className={`${
                filters.activities.includes(act.activity)
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {act.icon}
              {act.activity}
            </Button>
          ))}
        </div>
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
