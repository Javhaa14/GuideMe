import Image from "next/image";
import GuideProfilePage from "./components/simple";
import GuideMainProfile from "./components/GuideMainProfile";

export default function Home() {
  return (
    <div className=" w-max h-screen">
      <GuideMainProfile />
    </div>
  );
}
