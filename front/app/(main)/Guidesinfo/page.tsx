"use client";
import { GuideProfile } from "./components/GuideProfile";
import { Filter } from "./components/Filter";
import { ListFilter, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const filters = [
    "Top Rated",
    "Price",
    "Language",
    "Gender",
    "Car",
    "Experienced",
    "Status",
  ];

  const [guides, setGuides] = useState([
    {
      name: "Javhaa",
      location: "Ulaanbaatar,Mongolia",
      about: "It will be awesome trip",
      price: 10,
      rating: 2,
      image: "/download.jpg",
      status: "active",
    },
    {
      name: "Javhaa",
      location: "Tokyo,Japan",
      about: "Hiiiiiii",
      price: 10,
      rating: 3,
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
      rating: 3.5,
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
  ]);

  const [pop, setPop] = useState(false);
  const [originalGuides] = useState([...guides]);
  const [activeFilters, setActiveFilters] = useState<number[]>([]);

  const togglePop = () => setPop(!pop);

  const filter = (index: number) => {
    let updatedFilters = [...activeFilters];

    if (updatedFilters.includes(index)) {
      // Remove filter if already active
      updatedFilters = updatedFilters.filter((i) => i !== index);
    } else {
      // Add filter if not active
      updatedFilters.push(index);
    }

    setActiveFilters(updatedFilters);

    // Apply all selected filters
    let filteredGuides = [...originalGuides];

    updatedFilters.forEach((filterIndex) => {
      switch (filterIndex) {
        case 0: // Top Rated
          filteredGuides = filteredGuides.sort((a, b) => b.rating - a.rating); // example threshold
          break;

        case 1: // Price (sort by price ascending)
          filteredGuides = filteredGuides.sort((a, b) => {
            const priceA = a.price === "FREE" ? 0 : Number(a.price);
            const priceB = b.price === "FREE" ? 0 : Number(b.price);
            return priceA - priceB;
          });
          break;

        // Add other filters here, for example:
        case 2: // Language - example filtering if you have language data
          // filteredGuides = filteredGuides.filter(g => g.language === 'English');
          break;

        case 3: // Gender
          // filteredGuides = filteredGuides.filter(g => g.gender === 'Female');
          break;

        // ... and so on for your filters
      }
    });

    setGuides(filteredGuides);
  };

  return (
    <div className="flex flex-col w-screen h-full items-center bg-white gap-10 pt-[40px] px-[20px]">
      <div className="w-[400px] text-black h-[30px] flex items-center border-[1px] border-black rounded-xl">
        <Search className="size-5 ml-3" />
        <input placeholder="Where you gonna travel?" className="w-full ml-2" />
        <div
          onClick={togglePop}
          className="bg-blue-400 w-[80px] flex items-center justify-center rounded-r-xl h-full cursor-pointer">
          <ListFilter />
        </div>
      </div>
      {pop && (
        <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
          {filters.map((v, i) => (
            <Filter
              onclick={filter}
              key={i}
              name={v}
              index={i}
              active={activeFilters.includes(i)}
            />
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-5 w-full px-30 h-fit">
        {guides.map((v, i) => (
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
        ))}
      </div>
    </div>
  );
}
