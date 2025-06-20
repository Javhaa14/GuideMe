"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { GuideCard } from "./GuideCard";

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
}

export const Guides: React.FC<GuidesProps> = ({ guides }) => {
  const router = useRouter();

  if (!guides || guides.length === 0) {
    return (
      <div className="p-6 sm:p-10 h-fit">
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No guides available</p>
        </div>
      </div>
    );
  }

  const guideItems = guides.map((guide) => (
    <GuideCard key={guide._id} guide={guide} />
  ));

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
            className="mt-8 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300 px-8 py-3 text-lg">
            View All Guides
            <span className="ml-2">→</span>
          </Button>
        </div>

        {/* Auto-scrolling Guide Cards */}
        <div className="flex w-full items-center justify-center overflow-x-hidden pb-8 whitespace-nowrap will-change-scroll">
          <InfiniteMovingCards
            items={guideItems}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
};
