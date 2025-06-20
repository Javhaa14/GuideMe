"use client";
<<<<<<< HEAD
import { GuideProfile } from "./components/GuideProfile";
import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Filters } from "./components/Filter";
import { useFilteredData } from "@/app/context/FilteredDataContext";
=======

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Filters } from "./components/Filters";
import { useFilteredData } from "@/app/context/FilteredDataContext";
import { GuideProfile } from "./components/GuideProfile";
import { useTranslation } from "@/lib/translationHelpers";
import { useProfile } from "@/app/context/ProfileContext";

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
export interface Guide {
  _id: string;
  location: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  price: string;
  languages: string[];
<<<<<<< HEAD
  status: "available" | "inavailable" | "busy";
=======
  status: "available" | "unavailable" | "busy";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  rating: number;
  comments: string[];
  experience: string;
  about: string;
<<<<<<< HEAD
=======
  slogan: string;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
  const { t } = useTranslation();
  const { requireAuth } = useProfile();
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

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

<<<<<<< HEAD
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
=======
  const handleGuideClick = (guideId: string) => {
    if (requireAuth("view guide details")) {
      router.push(`/Guidedetail/${guideId}`);
    }
  };

  return (
    <div className="flex w-fit h-screen items-start justify-center bg-white gap-10 py-[50px] px-[80px]">
      <div className=" flex flex-wrap gap-5 p-4 h-fit">
        {filteredData.length !== 0 ? (
          filteredData
            ?.sort((a, b) => b.rating - a.rating)
            .map((guide, index) => (
              <div key={index}>
                <GuideProfile
                  post={guide}
                  id={guide._id}
                  onclick={() => handleGuideClick(guide._id)}
                  key={guide._id || index}
                  status={guide.status}
                  profileimage={guide.profileimage || ""}
                  rating={guide.rating || 0}
                  languages={guide.languages.join(", ")}
                  price={guide.price || 0}
                  name={guide.username || ""}
                  location={guide.location || ""}
                  slogan={guide.slogan || ""}
                />
              </div>
            ))
        ) : (
          <p>{t("noResults")}</p>
        )}
      </div>
      <Filters guides={guides} />
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    </div>
  );
}
