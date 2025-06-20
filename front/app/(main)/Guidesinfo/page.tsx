"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Filters } from "./components/Filters";
import { useFilteredData } from "@/app/context/FilteredDataContext";
import { GuideProfile } from "./components/GuideProfile";
import { useTranslation } from "@/lib/translationHelpers";
import { useProfile } from "@/app/context/ProfileContext";

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
  slogan: string;
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
  const { t } = useTranslation();
  const { requireAuth } = useProfile();

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

  const handleGuideClick = (guideId: string) => {
    if (requireAuth("view guide details")) {
      router.push(`/Guidedetail/${guideId}`);
    }
  };

  return (
    <div className="flex w-fit h-screen items-start justify-center bg-white gap-10 py-[50px] px-[80px]">
      <div className=" flex flex-wrap gap-5 p-4 h-fit overflow-x-scroll">
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
    </div>
  );
}
