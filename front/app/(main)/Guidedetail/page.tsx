import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import GuideMainProfile from "./components/GuideMainProfile";

import { GuideProfileNav } from "./components/GuideProfileNav";
import { Trip } from "./components/Trip";

export default function Home() {
  return (
    <div className="flex flex-col">
      <GuideProfileNav />
      <GuideMainProfile />
      <Footer />
    </div>
  );
}
