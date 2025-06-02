"use client";

import ChatBot from "@/components/ui/Chatbot";
import { Footer } from "./components/Footer";
import { Guides } from "./components/Guides";
import { ImageCarousel } from "./components/ImageCarousel";
import { Navigation } from "./components/Navigation";
import { Videos } from "./components/Videos";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const footerRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col relative min-h-screen">
      <Navigation />
      <ImageCarousel />
      <Guides />
      <Videos />
      
      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>

      {/* Floating Chatbot Button */}
      <div
        onClick={handleClick}
        className={`fixed ${
          stuck ? "bottom-32" : "bottom-6"
        } right-6 w-16 h-16 rounded-full bg-green-400 flex items-center justify-center shadow-lg cursor-pointer z-50 transition-all duration-300`}
      >
        💬
      </div>

      {/* Chatbot Panel */}
      {open && (
        <div className="fixed bottom-[300px] right-6 w-[350px] h-[500px] bg-white border rounded-lg shadow-lg z-40">
          <ChatBot />
        </div>
      )}
    </div>
  );
}
