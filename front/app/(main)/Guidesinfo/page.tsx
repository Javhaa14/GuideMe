"use client";
import { GuideProfile } from "./components/GuideProfile";
import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Filters } from "./components/Filter";
import { useFilteredData } from "@/app/context/FilteredDataContext";
export interface Guide {
  _id: string;
  location: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  price: string;
  languages: string[];
  status: "available" | "inavailable" | "busy";
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
    <div className="flex flex-col w-screen h-full items-center bg-white gap-10 pt-[40px] px-[20px]">
      <Filters guides={guides} />

      <div className="grid grid-cols-2 gap-5 w-full px-30 h-fit">
        {/* {guides?.map((guide, i) => (
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
        ))} */}
        {filteredData.length !== 0 ? (
          filteredData?.map((guide, index) => (
            <div key={index}>
              <GuideProfile
                post={guide}
                id={guide._id}
                onclick={() => router.push(`/Guidedetail/${guide._id}`)}
                key={guide._id || index}
                status={guide.status}
                profileimage={guide.profileimage || ""}
                rating={guide.rating || 0}
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
    </div>
  );
}
