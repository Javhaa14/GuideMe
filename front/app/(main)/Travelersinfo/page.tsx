import Image from "next/image";
import { Filter } from "./components/Filter";
import Travelerspost from "./components/Travelerpost";

export default function Home() {
  const filters = [
    "Most Recent",
    "For you",
    "Date",
    "Languages",
    "Gender",
    "Location",
    "Activites",
  ];

  const dummyPost = [
    {
      user: "John Doe",
      postdate: "May 27, 2025",
      content: "I want to go this places",
      image: ["/or.jpg", "/download.jpg", "/ger.jpg"],
      likes: 3,
      comments: ["Looks fun!", "Awesome pics!"],
      date: "2025/10/06-2025/1015",
      location: "Mongolia,Ulaanbaatar",
      people: 3,
    },
    {
      user: "John Doe",
      postdate: "May 27, 2025",
      content: "I want to go this places",
      image: ["/or.jpg", "/download.jpg", "/ger.jpg"],
      likes: 3,
      comments: ["Looks fun!", "Awesome pics!"],
      date: "2025/10/06-2025/1015",
      location: "Mongolia,Ulaanbaatar",
      people: 3,
    },
    {
      user: "John Doe",
      postdate: "May 27, 2025",
      content: "I want to go this places",
      image: ["/or.jpg", "/download.jpg", "/ger.jpg", "/ger.jpg", "/ger.jpg"],
      likes: 3,
      comments: ["Looks fun!", "Awesome pics!"],
      date: "2025/10/06-2025/1015",
      location: "Mongolia,Ulaanbaatar",
      people: 1,
    },
    {
      user: "John Doe",
      postdate: "May 27, 2025",
      content: "I dont know where to go?",
      image: [],
      likes: 3,
      comments: ["Looks fun!", "Awesome pics!"],
      date: "2025/10/06-2025/1015",
      location: "Mongolia,Ulaanbaatar",
      people: 10,
    },
    {
      user: "John Doe",
      postdate: "May 27, 2025",
      content: "I need guide",
      image: ["/or.jpg", "/download.jpg", "/ger.jpg"],
      likes: 3,
      comments: ["Looks fun!", "Awesome pics!"],
      date: "2025/10/06-2025/1015",
      location: "Mongolia,Ulaanbaatar",
      people: 3,
    },
  ];
  return (
    <div className="flex flex-col w-screen h-full items-center bg-white gap-10 pt-[40px] px-[20px]">
      <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })}
      </div>
      <div className="flex flex-col gap-5 w-[800px] h-fit">
        {dummyPost.map((v, i) => {
          return <Travelerspost post={v} key={i} />;
        })}
      </div>
    </div>
  );
}
