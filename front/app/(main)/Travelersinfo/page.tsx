"use client";
import Image from "next/image";
import { Filter } from "./components/Filter";
import Travelerspost from "../components/Travelerpost";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/post`);
        console.log("✅ Posts fetched:", res.data);
        setPosts(res.data);
      } catch (err) {
        console.error("❌ Post fetch failed:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col w-screen h-full items-center bg-white gap-10 pt-[40px] px-[20px]">
      <div className="flex border-black border-[3px] gap-4 w-fit h-fit rounded-md p-4">
        {filters.map((v, i) => {
          return <Filter key={i} name={v} />;
        })}
      </div>
      <div className="flex flex-col gap-5 w-[800px] h-fit">
        {posts.map((v, i) => {
          return <Travelerspost post={v} key={i} />;
        })}
      </div>
    </div>
  );
}
