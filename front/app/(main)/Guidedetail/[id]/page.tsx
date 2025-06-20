"use client";

import GuideMainProfile from "../components/GuideMainProfile";
import { Reviews } from "../components/Reviews";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const profileId = params.id as string;
  return (
    <div className="flex flex-col">
      <GuideMainProfile />
      <Reviews userId={profileId} />
    </div>
  );
}
