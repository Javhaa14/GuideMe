import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import GuideMainProfile from "./components/GuideMainProfile";
import { GuideTrips } from "./components/GuideTrips";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* <GuideMainProfile /> */}
      <GuideTrips />
    </div>
  );
}
