import Image from "next/image";
import { Filter } from "./components/Filter";

export default function Home() {
  const filters = [
    "Top Rated",
    "Price",
    "Language",
    "Gender",
    "Car",
    "Experienced",
    "Location",
  ];

  return (
    <div className="flex w-screen h-screen justify-center bg-white pt-[40px] px-[20px]">
      <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })}
      </div>
      <div className="grid grid-cols-2 gap-10"></div>
    </div>
  );
}
