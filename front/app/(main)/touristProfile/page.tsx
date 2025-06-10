import React from "react";
import { TouristProfile } from "./components/TouristProfile";
import TravelerMainProfile from "./components/TravelerMainProfile";

const page = () => {
  return (
    <div className="flex justify-center px-[200px] py-[50px]">
      <TouristProfile />
      {/* <TravelerMainProfile /> */}
    </div>
  );
};

export default page;
