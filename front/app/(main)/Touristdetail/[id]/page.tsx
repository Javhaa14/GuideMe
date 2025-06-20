"use client";

import TouristMainProfile from "../components/TouristMainProfile";
import { Reviews } from "../components/Reviews";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const profileId = params.id as string;

  return (
    <div className="flex flex-col">
      <TouristMainProfile />
      <Reviews userId={profileId} />
    </div>
  );
}
