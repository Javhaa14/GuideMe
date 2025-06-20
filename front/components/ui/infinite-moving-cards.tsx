"use client";

import { GuideProfile } from "@/app/(main)/components/Guides";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Star, Heart, MapPin, DollarSign, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import Link from "next/link";

export const InfiniteMovingCards = ({
  guides,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  guides: GuideProfile[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const router = useRouter();
  const [likedGuides, setLikedGuides] = useState<Set<number>>(new Set());

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
  const handleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedGuides = new Set(likedGuides);
    if (newLikedGuides.has(index)) {
      newLikedGuides.delete(index);
    } else {
      newLikedGuides.add(index);
    }
    setLikedGuides(newLikedGuides);
  };

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
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {guides.map((guide, i) => {
          const keyIndex = i % guides.length;
          return (
            <div
              key={`guide-${keyIndex}-${Math.floor(i / guides.length)}`}
              className="flex-shrink-0 w-96 group cursor-pointer"
              // onClick={() => router.push(`/Guidedetail/${guide._id}`)}
            >
              {/* Card with Glassmorphism */}
              <div className="bg-white/15 max-h-[530px] h-[530px] flex flex-col justify-between backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-100  hover:bg-white/20 shadow-2xl hover:shadow-3xl overflow-hidden ">
                {/* Card Header */}
                <div className="relative p-8 pb-6">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

                  <div className="flex flex-col items-start gap-6 relative z-10">
                    <div className="flex w-full justify-between gap-4">
                      {/* Enhanced Profile Image */}
                      <div className="relative">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl group-hover:border-white/50 transition-all duration-300">
                          <img
                            src={
                              guide.profileimage ||
                              "/placeholder.svg?height=96&width=96"
                            }
                            alt={`${guide.firstName} ${guide.lastName}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        {/* Enhanced Active Status */}
                        {guide.isActive !== false && (
                          <div className="absolute top-[-4] -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      {/* Guide Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-[100px]">
                            <Link href={`/Guidedetail/${guide._id}`}>
                              <h3 className="text-2xl font-bold text-white drop-shadow-lg group-hover:text-green-400 transition-colors duration-300">
                                {guide.firstName} {guide.lastName}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                              <MapPin size={16} className="text-red-400" />
                              <span className="drop-shadow">
                                {guide.location}
                              </span>
                            </div>
                          </div>

                          {/* Enhanced Like Button */}
                          <button
                            onClick={(e) => handleLike(i, e)}
                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          >
                            <Heart
                              size={20}
                              className={`transition-all duration-300 ${
                                likedGuides.has(i) || guide.isLiked
                                  ? "text-red-400 fill-red-400 scale-110"
                                  : "text-white/80 hover:text-red-300"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Enhanced Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={18}
                            className={
                              starIndex < guide.rating
                                ? "text-yellow-400 fill-yellow-400 drop-shadow"
                                : "text-white/30"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-white font-bold text-lg drop-shadow">
                        {guide.rating}.0
                      </span>
                      <span className="text-white/70 text-sm">
                        ({(guide.likes || 12) + Math.floor(Math.random() * 20)}{" "}
                        reviews)
                      </span>
                    </div>
                    {/* Enhanced Motto */}
                    {guide.motto && (
                      <div className="flex w-full justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                        <p className="text-white font-medium italic text-center drop-shadow">
                          "{guide.motto}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-8 pb-8 space-y-6">
                  {/* Enhanced Price Section */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30">
                    <div className="flex justify-center items-center">
                      <div className="flex items-center gap-2">
                        <DollarSign size={24} className="text-green-400" />
                        <span className="text-3xl font-bold text-white drop-shadow">
                          {guide.price}
                        </span>
                        <span className="text-white/70">/hour</span>
                      </div>
                    </div>
                  </div>
                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-red-500/80 backdrop-blur-sm hover:bg-red-500 text-white border border-red-400/50 hover:border-red-400 transition-all duration-300 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle contact action
                      }}
                    >
                      <MessageCircle size={16} className="mr-2" />
                      Chat with {guide.firstName}
                    </Button>
                  </div>

                  {/* Enhanced Quick Stats */}
                  <div className="flex items-center justify-between text-sm text-white/80 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>
                          {(guide.likes || 0) + (likedGuides.has(i) ? 1 : 0)}{" "}
                          likes
                        </span>
                      </div>
                    </div>
                    <span className="text-green-400 font-medium flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Available today
                    </span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
