"use client";
import { GuideProfile } from "./components/GuideProfile";
import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
export interface Guide {
  _id: string;
  location?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  price?: string;
  languages?: string[];
  status: "available" | "inavailable" | "busy";
  rating?: number;
  comments?: string[];
  experience?: string;
  about?: string;
  SocialAddress?: string;
  car: "true" | "false";
  likedBy: string[];
  activities?: string[];
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  name?: string;
  profileimage: string;
}
export default function Home() {
  const filters = [
    "Top Rated",
    "Price",
    "Language",
    "Gender",
    "Car",
    "Experienced",
    "Status",
  ];

  const [guides, setGuides] = useState<Guide[] | undefined>(undefined);
  const fetchGuides = async () => {
    try {
      const res = await axiosInstance.get<Guide[]>(`/gprofile`);
      setGuides(res.data);
    } catch (error) {
      console.log("No guides");
    }
  };
  console.log(guides);

  useEffect(() => {
    fetchGuides();
  }, []);
  const router = useRouter();
  return (
    <div className="flex flex-col w-screen h-full items-center bg-white gap-10 pt-[40px] px-[20px]">
      <div className="w-[400px] text-black h-[30px] flex items-center border-[1px] border-black rounded-xl">
        <Search className="size-5 ml-3" />
        <input placeholder="Where you gonna travel?" className="w-full ml-2" />
        <div className="bg-blue-400 w-[80px] flex items-center justify-center rounded-r-xl h-full cursor-pointer">
          <ListFilter />
        </div>
      </div>
      {/* <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
          {filters.map((v, i) => (
            <Filter
              onclick={filter}
              key={i}
              name={v}
              index={i}
              active={activeFilters.includes(i)}
            />
          ))}
        </div> */}

      <div className="grid grid-cols-2 gap-5 w-full px-30 h-fit">
        {guides?.map((guide, i) => (
          <GuideProfile
            post={guide}
            id={guide._id}
            onclick={() => router.push(`/Guidedetail/${guide._id}`)}
            key={guide._id || i}
            status={guide.status}
            profileimage={guide.profileimage || ""}
            rating={guide.rating || 0}
            price={guide.price || 0}
            name={guide.username || ""}
            location={guide.location || ""}
            about={guide.about || ""}
          />
        ))}
      </div>
    </div>
  );
}
