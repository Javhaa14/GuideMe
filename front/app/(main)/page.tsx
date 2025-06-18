"use client";
import { useEffect, useRef, useState } from "react";
import FloatingChatButton from "./components/FloatingChatButton 2";
import { Guides } from "./components/Guides";
import { GuideProfile } from "./Guidedetail/components/GuideMainProfile";
import { axiosInstance } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [guides, setGuides] = useState<GuideProfile[]>();
  const [scrollMessage, setScrollMessage] = useState("Welcome to GuideMe");

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sectionMessages = [
    "Welcome to GuideMe",
    "Welcome to Mongolia",
    "Discover your next adventure",
    "Book your guide today",
  ];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (entry.isIntersecting && index !== -1) {
            setScrollMessage(sectionMessages[index]);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Background video with content */}
      <div className="fixed w-full z-[-10]">
        <div className="relative w-full h-screen overflow-hidden z-0">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/videos/background.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black opacity-30 z-10" />
          {/* Animated message */}
          <div className="relative z-20 flex items-center justify-center h-full text-white transition-all duration-500 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.h1
                key={scrollMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center px-4">
                {scrollMessage}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scrollable sections that snap */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll z-10 relative">
        {sectionMessages.map((msg, i) => (
          <section
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            className="snap-start h-screen flex items-center justify-center"></section>
        ))}
      </div>

      {/* Rest of your content */}
      <Guides guides={guides!} />
      <FloatingChatButton />
    </div>
  );
}
