import Image from "next/image";

import { GuideProfile } from "./components/GuideProfile";
import { Filter } from "./components/Filter";
import { ListFilter, Search, SearchCheckIcon } from "lucide-react";

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
      location: "Ulaanbaatar,Mongolia",
      about: "It will be awesome trip",
      price: 10,
      rating: 4.5,
      image: "/download.jpg",
      status: "active",
    },
    {
      name: "Javhaa",
      location: "Tokyo,Japan",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
      image: "/download.jpg",
      status: "active",
    },
    {
      name: "Javhaa",
      location: "Ulaanbaatar",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
      image: "/download.jpg",
      status: "inactive",
    },
    {
      name: "Javhaa",
      location: "Bejing,China",
      about: "Hiiiiiii",
      price: 10,
      rating: 4.5,
      image: "/download.jpg",
      status: "active",
    },
    {
      name: "Cat",
      location: "Madrid",
      about: "lol",
      price: 90,
      rating: 5,
      status: "inactive",
      image: "",
    },
    {
      name: "Javhaa",
      location: "Ulaanbaatar",
      about: "Hiiiiiii",
      price: "FREE",
      rating: 4.5,
      image: "/download.jpg",
      status: "inactive",
    },
  ];
  return (
    <div className="flex flex-col w-screen h-full items-center bg-white gap-10 pt-[40px] px-[20px]">
      <div className="w-[400px] text-black h-[30px] flex items-center border-[1px] border-black rounded-xl">
        <Search className=" size-5 ml-3" />
        <input
          placeholder="Where you gonna travel?"
          className="w-full ml-2"></input>
        <div className="bg-blue-400 w-[80px] flex items-center justify-center rounded-r-xl h-full">
          <ListFilter />
        </div>
      </div>
      {/* <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })}
      </div> */}
      <div className="grid grid-cols-2 gap-5 w-full px-30 h-fit">
        {guides.map((v, i) => {
          return (
            <GuideProfile
              status={v.status}
              image={v.image}
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
