import Image from "next/image";
import { Filter } from "./components/Filter";
import { GuideProfile } from "./components/GuideProfile";

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
  const guides = [
    {
      name: "Javhaa",
      location: "Ulaanbaatar",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
    },
    {
      name: "Javhaa",
      location: "Ulaanbaatar",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
    },
    {
      name: "Javhaa",
      location: "Ulaanbaatar",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
    },
    {
      name: "Javhaa",
      location: "Ulaanbaatar",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
    },
    { name: "Cat", location: "Madrid", about: "lol", price: 90, rating: 5 },
    {
      name: "Javhaa",
      location: "Ulaanbaatar",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
    },
  ];
  return (
    <div className="flex flex-col w-screen h-screen items-center bg-white gap-10 pt-[40px] px-[20px]">
      <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })}
      </div>
      <div className="grid grid-cols-2 gap-10 w-full h-fit">
        {guides.map((v, i) => {
          return (
            <GuideProfile
              rating={v.rating}
              price={v.price}
              key={i}
              name={v.name}
              location={v.location}
              about={v.about}
            />
          );
        })}
      </div>
    </div>
  );
}
