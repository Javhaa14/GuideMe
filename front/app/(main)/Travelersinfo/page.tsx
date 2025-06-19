"use client";
import Image from "next/image";
import Travelerspost from "../components/Travelerpost";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; // Theme styling
import { act, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";
import { Button } from "@/components/ui/button";
import { selectActivites } from "@/app/utils/FilterData";
import { LocationFilterCard } from "../Guidesinfo/components/SearchLocation";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchLocation } from "@/app/context/SearchLocationContext";
import { date, number } from "zod";
import { Newsreader } from "next/font/google";
import Tpost from "../components/tpost";
import Tpostvertical from "../components/tpostvertical";
import TpostCard from "../components/tpostvertical";

export interface PostType {
  _id: string;
  userId: string;
  content: string;
  location: string;
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

type Value = {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
};

type Filters = {
  activities: string[];
};

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPost, setFileterdPost] = useState<PostType[]>(posts);
  const { user, status } = useUser();
  const { searchedValue, setSearchedValue } = useSearchLocation();
  const [value, setValue] = useState<Value>({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [filters, setFilters] = useState<Filters>({
    activities: [],
  });

  const formattedStartDate: string | null =
    value.startDate &&
    value.startDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formattedEndDate: string | null =
    value.endDate &&
    value.endDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  let formattedDate: (string | null)[] = [];
  if (value.startDate !== null && value.endDate !== null) {
    formattedDate.push(formattedStartDate, formattedEndDate);
  }

  const router = useRouter();
  const todetail = (id: string) => {
    router.push(`/Touristdetail/${id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get<PostType[]>(`/post`);
        setPosts(res.data);
        console.log(res.data, "post");
      } catch (err) {
        console.error("❌ Post fetch failed:", err);
      }
    };

    fetchPosts();
  }, []);

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

  const locationFilter = (filteredResult: PostType[], filterValue: string) => {
    let newData: PostType[] = [];
    if (searchedValue) {
      filteredResult.map((el) => {
        if (el.location === filterValue) {
          newData.push(el);
        }
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const dateFilter = (filteredResult: PostType[], selectedDate: Value) => {
    let newData: PostType[] = [];
    if (selectedDate.startDate !== null && selectedDate.endDate !== null) {
      filteredResult.map((el) => {
        if (
          new Date(el.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) >=
          selectedDate.startDate!.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        )
          if (
            new Date(el.endDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) <=
            selectedDate.endDate!.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          )
            newData.push(el);
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  useEffect(() => {
    let result = posts;
    result = locationFilter(result, searchedValue);
    result = activitiesFilter(result, filters);
    result = dateFilter(result, value);
    setFileterdPost(result);
  }, [posts, filters, searchedValue, value]);

  const handleClearButton = () => {
    setSearchedValue("");
    setValue({
      startDate: null,
      endDate: null,
      key: "selection",
    });
    setFilters({ activities: [] });
  };

  return (
    <div className="flex w-screen h-full items-start justify-between bg-white gap-5 py-[40px] px-[50px]">
      <div className="flex flex-wrap gap-5 w-full h-fit">
        {filteredPost.map((v, i) => {
          return (
            <TpostCard
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

      <div className="flex flex-col border-[3px] border-gray-200 rounded-md p-4 gap-6 w-fit">
        <h2 className="text-xl font-semibold">Filters</h2>
        {/* Location Filter */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <span className="text-sm font-medium text-gray-700">Location:</span>
          <LocationFilterCard
            isFilter={true}
            placeholder="Search Location ..."
            className="h-[40px] justify-center items-center"
          />
        </div>

        {/* Activity Filter */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <span className="text-sm font-medium text-gray-700">Activities:</span>
          <div className="grid grid-cols-2 gap-2">
            {selectActivites.map((act, i) => {
              const selected = filters.activities.includes(act.activity);
              return (
                <button
                  key={i}
                  onClick={() => handleSelectedActivites(act.activity)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition
              ${
                selected
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
                >
                  <span>{act.icon}</span>
                  <span className="text-sm font-medium">{act.activity}</span>
                  {selected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start justify-center">
          <span className="text-sm font-medium text-gray-700">Date:</span>
          <div className="p-3 flex flex-col items-center">
            <DateRange
              ranges={[value]}
              onChange={(item) => setValue(item.selection)}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
              minDate={new Date()}
            />
          </div>
          <div className="flex justify-end w-full mt-2">
            <Button onClick={handleClearButton} className="w-[150px]">
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
