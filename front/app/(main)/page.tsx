"use client";

import { Guides } from "./components/Guides";
import { ImageCarousel } from "./components/ImageCarousel";
import { Videos } from "./components/Videos";
import { useState } from "react";
import FloatingChatButton from "./components/FloatingChatButton";
import { MouseImage } from "./components/MouseImage";
import { Card } from "./Guidedetail/components/Card";
import { DragCards } from "./components/Card";

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      <ImageCarousel />
      <Guides />
      <Videos />
      <DragCards />
      <MouseImage />
      <FloatingChatButton />
    </div>
  );
}
