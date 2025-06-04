"use client";

import ChatBot from "@/components/ui/Chatbot";
import { Footer } from "./components/Footer";
import { Guides } from "./components/Guides";
import { ImageCarousel } from "./components/ImageCarousel";
import { Navigation } from "./components/Navigation";
import { Videos } from "./components/Videos";
import { useRef, useState } from "react";
import FloatingChatButton from "./components/FloatingChatButton";

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
      <FloatingChatButton />
    </div>
  );
}
