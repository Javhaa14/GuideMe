"use client";

import { Guides } from "./components/Guides";
import { ImageCarousel } from "./components/ImageCarousel";
import { Videos } from "./components/Videos";
import { useEffect, useState } from "react";
import FloatingChatButton from "./components/FloatingChatButton";
import { MouseImage } from "./components/MouseImage";
import { Card } from "./Guidedetail/components/Card";
import { DragCards } from "./components/Card";
import { GuideProfile } from "./Guidedetail/components/GuideMainProfile";
import { axiosInstance } from "@/lib/utils";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [guides, setGuides] = useState<GuideProfile[]>();
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axiosInstance.get("/gprofile");
        setGuides(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch guides:", error);
      }
    };

    fetchGuides();
  }, []);
  return (
    <div className="flex flex-col relative min-h-screen">
      <ImageCarousel />
      <Guides guides={guides!} />
      <Videos />
      <DragCards />
      <MouseImage />
      <FloatingChatButton />
    </div>
  );
}
