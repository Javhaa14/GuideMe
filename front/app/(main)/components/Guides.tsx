"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { StatsSection } from "./Stats";
import {
  Star,
  Heart,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Shield,
  Award,
} from "lucide-react";

export type GuideProfile = {
  profileimage: string;
  firstName: string;
  lastName: string;
  location: string;
  price: number;
  comment: string;
  rating: number;
  motto?: string;
  isActive?: boolean;
  likes?: number;
  isLiked?: boolean;
  _id: string;
};

interface GuidesProps {
  guides: GuideProfile[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const Guides: React.FC<GuidesProps> = ({
  guides,
  direction = "left",
  speed = "fast",
}) => {
  const router = useRouter();

  // Memoize duplicated guides for stable array and keys
  const duplicatedGuides = React.useMemo(
    () => [...(guides || []), ...(guides || []), ...(guides || [])],
    [guides]
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  if (!guides || guides.length === 0) {
    return (
      <div className="p-6 sm:p-10 h-fit">
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No guides available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-26 mt-1 relative overflow-hidden min-h-[600px]">
      {/* Background Image with Heavy Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          filter: "blur(20px)",
          transform: "scale(1.1)", // Prevent blur edge artifacts
        }}
      />

      {/* Additional Blur Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />

      {/* Gradient Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12 px-6">
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Meet Our Expert Guides
          </h2>
          <p className="text-white/90 text-xl max-w-2xl mx-auto drop-shadow-lg">
            Professional, experienced, and passionate about creating
            unforgettable travel experiences
          </p>
          <Button
            onClick={() => router.push("/Guidesinfo")}
            className="mt-8 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300 px-8 py-3 text-lg"
          >
            View All Guides
            <span className="ml-2">→</span>
          </Button>
        </div>

        {/* Auto-scrolling Guide Cards */}
        <div
          ref={containerRef}
          className="flex w-full items-center justify-center overflow-x-hidden pb-8 whitespace-nowrap will-change-scroll"
        >
          <InfiniteMovingCards
            guides={duplicatedGuides}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
};
