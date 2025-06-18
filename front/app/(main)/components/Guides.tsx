"use client";
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
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type TourPost = {
  // define TourPost fields if needed
};

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
};

interface GuidesProps {
  guides: GuideProfile[];
}

export const Guides: React.FC<GuidesProps> = ({ guides }) => {
  const router = useRouter();
  const [likedGuides, setLikedGuides] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;

    const scroll = () => {
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 0.5;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!guides || guides.length === 0) {
    return (
      <div className="p-6 sm:p-10 h-fit">
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No guides available</p>
        </div>
      </div>
    );
  }

  // Duplicate guides for seamless scrolling
  const duplicatedGuides = [...guides, ...guides, ...guides];

  return (
    <div className="py-16 relative overflow-hidden min-h-[600px]">
      {/* Background Image with Heavy Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/placeholder.svg?height=800&width=1600')`,
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
            🌟 Meet Our Expert Guides
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
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden pb-8"
          style={{ scrollBehavior: "auto" }}>
          {duplicatedGuides.map((guide, i) => (
            <div
              key={`${i}-${Math.random()}`}
              className="flex-shrink-0 w-96 group cursor-pointer"
              onClick={() => router.push(`/guide/${i % guides.length}`)}>
              {/* Card with Glassmorphism */}
              <div className="bg-white/15 max-h-[530px] h-[530px] flex flex-col justify-between backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-100  hover:bg-white/20 shadow-2xl hover:shadow-3xl overflow-hidden ">
                {/* Card Header */}
                <div className="relative p-8 pb-6">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

                  <div className="flex flex-col items-start gap-6 relative z-10">
                    <div className="flex w-full justify-between gap-4">
                      {" "}
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
                        {/* Verified Badge
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                          <Shield size={14} className="text-white" />
                        </div> */}
                      </div>
                      {/* Guide Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-[100px]">
                            <h3 className="text-2xl font-bold text-white drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-300">
                              {guide.firstName} {guide.lastName}
                            </h3>
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
                            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110">
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

                    {/* Professional Tags */}
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-green-500/80 text-white text-xs rounded-full backdrop-blur-sm">
                        <Award size={12} className="inline mr-1" />
                        Verified
                      </span>
                      <span className="px-3 py-1 bg-blue-500/80 text-white text-xs rounded-full backdrop-blur-sm">
                        Pro Guide
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-8 pb-8 space-y-6">
                  {/* Enhanced Motto */}
                  {guide.motto && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <p className="text-white font-medium italic text-center drop-shadow">
                        "{guide.motto}"
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-white/90 leading-relaxed drop-shadow line-clamp-3">
                    {guide.comment}
                  </p>

                  {/* Enhanced Price Section */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign size={24} className="text-green-400" />
                        <span className="text-3xl font-bold text-white drop-shadow">
                          {guide.price}
                        </span>
                        <span className="text-white/70">/hour</span>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 text-sm font-medium">
                          Starting from
                        </p>
                        <p className="text-white/80 text-xs">
                          Flexible pricing available
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle contact action
                      }}>
                      <Phone size={16} className="mr-2" />
                      Contact
                    </Button>
                    <Button
                      className="flex-1 bg-red-500/80 backdrop-blur-sm hover:bg-red-500 text-white border border-red-400/50 hover:border-red-400 transition-all duration-300 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/book/${i % guides.length}`);
                      }}>
                      Book Now
                    </Button>
                  </div>

                  {/* Enhanced Quick Stats */}
                  <div className="flex items-center justify-between text-sm text-white/80 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-blue-400" />
                        <span>Quick response</span>
                      </div>
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
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-16 px-6">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 max-w-2xl mx-auto">
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
        </div>
      </div>
    </div>
  );
};
