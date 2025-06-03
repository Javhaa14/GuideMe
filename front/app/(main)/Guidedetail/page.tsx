import { Footer } from "../components/Footer";
import GuideMainProfile from "./components/GuideMainProfile";
import { GuideProfileNav } from "./components/GuideProfileNav";
import TouristSee from "./components/TouristSee";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* <GuideProfileNav /> */}
      <GuideMainProfile />
      {/* <TouristSee /> */}
      <Footer />
    </div>
  );
}
