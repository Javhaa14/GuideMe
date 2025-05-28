import Image from "next/image";

import { GuideProfile } from "./components/GuideProfile";
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
      <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })}
      </div>
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
