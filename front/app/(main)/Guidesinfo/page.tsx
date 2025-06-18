"use client";

import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Filters } from "./components/Filter";
import { useFilteredData } from "@/app/context/FilteredDataContext";
import { GuideProfile } from "./components/GuideProfile";
import { Filters2 } from "./components/test1";

export interface Guide {
  _id: string;
  location: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  price: string;
  languages: string[];
  status: "available" | "unavailable" | "busy";
  rating: number;
  comments: string[];
  experience: string;
  about: string;
  SocialAddress: string;
  car: "true" | "false";
  likedBy: string[];
  activities: string[];
  createdAt: string;
  updatedAt: string;
  image?: string;
  name: string;
  profileimage: string;
}
export default function Home() {
  const { filteredData, setFilteredData } = useFilteredData();

  const [guides, setGuides] = useState<Guide[]>([]);
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
    <div className="flex w-screen h-screen items-start justify-center bg-white gap-10 py-[50px] px-[20px]">
      <div className=" flex flex-wrap gap-5 px-30 h-fit">
        {filteredData.length !== 0 ? (
          filteredData
            ?.sort((a, b) => b.rating - a.rating)
            .map((guide, index) => (
              <div key={index}>
                <GuideProfile
                  post={guide}
                  id={guide._id}
                  onclick={() => router.push(`/Guidedetail/${guide._id}`)}
                  key={guide._id || index}
                  status={guide.status}
                  profileimage={guide.profileimage || ""}
                  rating={guide.rating || 0}
                  languages={guide.languages.join(", ")}
                  price={guide.price || 0}
                  name={guide.username || ""}
                  location={guide.location || ""}
                  about={guide.about || ""}
                />
              </div>
            ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      {/* <Filters guides={guides} /> */}
      <Filters2 guides={guides} />
    </div>
  );
}
