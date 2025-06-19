import React from "react";
import { TouristProfile } from "./components/TouristProfile";
import TravelerMainProfile from "./components/TravelerMainProfile";

export default function Home() {
  return (
    <div className="flex justify-center px-[200px] py-[50px]">
      <TouristProfile />
      {/* <TravelerMainProfile /> */}
    </div>
  );
}
