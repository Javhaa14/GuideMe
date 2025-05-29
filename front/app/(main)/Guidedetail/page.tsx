import Image from "next/image";
import GuideMainProfile from "./components/GuideMainProfile";

export default function Home() {
  return (
    <div className="flex flex-col">
      <GuideMainProfile />
    </div>
  );
}
