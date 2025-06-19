"use client";
<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import FloatingChatButton from "./components/FloatingChatButton 2";
import { Guides } from "./components/Guides";
import { GuideProfile } from "./Guidedetail/components/GuideMainProfile";
import { axiosInstance } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { StatsSection } from "./components/Stats";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";

export default function Home() {
  const [guides, setGuides] = useState<GuideProfile[]>();
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = scrollContainerRef.current?.scrollTop ?? 0;
      setShowBackToTop(scrollTop > 100);
    };

    const scrollEl = scrollContainerRef.current;
    scrollEl?.addEventListener("scroll", onScroll);

    return () => scrollEl?.removeEventListener("scroll", onScroll);
  }, []);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Text messages shown on top as heading
  const scrollMessages = ["", "", "", ""];

  // Actual scrollable section content
  const scrollSections = [
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-white text-7xl">
      Welcome to GuideMe
    </motion.div>,

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true }}
      className="text-white text-7xl">
      Welcome to Mongolia
    </motion.div>,

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="text-white text-7xl">
      Discover your next adventure
    </motion.div>,

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="w-full relative flex justify-center">
      <StatsSection />
    </motion.div>,
  ];
  const [scrollMessage, setScrollMessage] = useState("Welcome to GuideMe");

  const sectionMessages = [
    "Welcome to GuideMe",
    "Welcome to Mongolia",
    "Discover your next adventure",
    "Book your guide today",
  ];

=======

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
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axiosInstance.get("/gprofile");
        setGuides(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch guides:", error);
      }
    };
<<<<<<< HEAD
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
            setScrollIndex(index);
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
            src="https://res.cloudinary.com/dgwpwmmle/video/upload/v1750296010/Beautiful_Mongolia_2_ady0yc.mov"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black opacity-30 z-10" />

          {/* Animated heading */}
          <div className="relative z-20 flex items-center justify-center h-full text-white pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.h1
                key={scrollMessages[scrollIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center px-4">
                {scrollMessages[scrollIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scrollable sections that snap */}
      <div
        className="snap-y snap-mandatory h-screen overflow-y-scroll z-10 relative"
        ref={scrollContainerRef}>
        {scrollSections.map((sectionContent, i) => (
          <motion.section
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            className="snap-start h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            {sectionContent}
          </motion.section>
        ))}
        <section
          ref={(el) => {
            sectionRefs.current[scrollSections.length] = el;
          }}
          className="snap-start h-screen overflow-y-auto flex justify-center items-start">
          <Guides guides={guides!} />
        </section>
        <section className="relative flex-col h-full snap-start flex justify-center items-center">
          {/* Same blurred background effect */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              filter: "blur(20px)",
              transform: "scale(1.1)",
              backgroundImage: `url('/path-to-background.jpg')`, // Optional static background or remove if not using
            }}
          />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

          {/* Content */}
          <div className="h-full flex justify-center items-center px-6 text-center">
            <div className="mt-30 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 max-w-2xl mx-auto mb-12">
              <p className="text-white/90 text-lg mb-6 drop-shadow">
                All our guides are verified professionals with extensive local
                knowledge and excellent safety records
              </p>
              <Button
                onClick={() => router.push("/become-guide")}
                className="bg-gradient-to-r from-yellow-500/80 to-orange-500/80 backdrop-blur-sm border border-yellow-400/50 text-white hover:from-yellow-500 hover:to-orange-500 px-8 py-3 text-lg font-bold">
                Become a Guide
              </Button>
            </div>

            {/* Footer */}
          </div>
          <Footer />
        </section>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => {
              scrollContainerRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="fixed bottom-25 right-6 z-50 p-3 size-16 rounded-full bg-white/20 text-white hover:bg-white/30 transition shadow-lg backdrop-blur-md">
            ↑
          </button>
        )}
      </div>
=======

    fetchGuides();
  }, []);
  return (
    <div className="flex flex-col relative min-h-screen">
      <ImageCarousel />
      <Guides guides={guides!} />
      <Videos />
      <DragCards />
      <MouseImage />
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
      <FloatingChatButton />
    </div>
  );
}
