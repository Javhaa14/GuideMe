import { Footer } from "../../components/Footer";
import GuideMainProfile from "../components/GuideMainProfile";
import { GuideProfileNav } from "../components/GuideProfileNav";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* <GuideProfileNav /> */}
      <GuideMainProfile />
      {/* <TouristSee /> */}
    </div>
  );
}
