"use client";
import Image from "next/image";
import { Footer } from "./components/Footer";
import { Guides } from "./components/Guides";
import { ImageCarousel } from "./components/ImageCarousel";
import { Navigation } from "./components/Navigation";
import { Videos } from "./components/Videos";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navigation />
      <ImageCarousel />
      <Guides />
      <Videos />
      <Footer />
    </div>
  );
}
