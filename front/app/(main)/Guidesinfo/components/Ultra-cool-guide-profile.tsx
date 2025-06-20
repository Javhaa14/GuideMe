"use client";

import type React from "react";

import {
  Coins,
  Globe2,
  MapPin,
  Star,
  Clock,
  Award,
  Zap,
  Heart,
  Sparkles,
} from "lucide-react";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import Image from "next/image";

export type Guide = {
  id: string;
  name: string;
  profileimage: string;
  location: string;
  slogan: string;
  price: number | string;
  rating: number;
  status: string;
  languages: string;
  post: {
    likedBy: string[];
  };
  onclick?: () => void;
};

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -100],
      x: [0, Math.random() * 40 - 20],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 2,
    }}
    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

const NeonTag = ({
  children,
  className = "",
  variant = "default",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "price"
    | "rating"
    | "location"
    | "language"
    | "premium";
  glow?: boolean;
}) => {
  const variants = {
    default:
      "bg-gradient-to-r from-slate-800/90 to-slate-700/90 text-slate-100 border border-slate-600/50",
    price:
      "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-400/50",
    rating:
      "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-400/50",
    location:
      "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-400/50",
    language:
      "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-400/50",
    premium:
      "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-400/50",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 ${
        variants[variant]
      } ${glow ? "shadow-lg shadow-current/25" : ""} ${className}`}
    >
      {children}
    </motion.span>
  );
};

export const UltraCoolGuideProfile = ({
  id,
  name,
  profileimage,
  location,
  slogan,
  price,
  rating,
  status,
  languages,
  post,
  onclick,
}: Guide) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(() =>
    post.likedBy.includes(user?.id || "")
  );
  const [showLikes, setShowLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedBy.length);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });
  };

  const handleLikeClick = async () => {
    if (!user?.id) return;

    try {
      const response = await axiosInstance.put(`/gprofile`, {
        userId: user.id,
        guideId: id,
      });

      const updatedLikedBy: string[] = response.data.likedBy;

      setLikesCount(updatedLikedBy.length);
      setLiked(updatedLikedBy.includes(user.id));

      if (!liked) {
        setShowLikes(true);
        setTimeout(() => setShowLikes(false), 2000);
      }
    } catch (error) {
      console.error("❌ Like error:", error);
    }
  };

  return (
    <div className="perspective-1000 group">
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl hover:shadow-4xl max-w-8xl w-full transition-all duration-500 transform-gpu"
        style={{
          rotateX,
          rotateY,
          background: `
      radial-gradient(circle at ${((mousePosition.x + 300) / 600) * 100}% ${
            ((mousePosition.y + 300) / 600) * 100
          }%,
      rgba(59, 130, 246, 0.15) 0%,
      rgba(147, 51, 234, 0.1) 25%,
      rgba(15, 23, 42, 0.8) 50%),
      linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
    `,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} />
          ))}
        </div>

        {/* Dynamic Gradient Overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `
              radial-gradient(circle at ${
                ((mousePosition.x + 300) / 600) * 100
              }% ${((mousePosition.y + 300) / 600) * 100}%, 
              rgba(59, 130, 246, 0.2) 0%, 
              rgba(147, 51, 234, 0.15) 30%, 
              transparent 70%)
            `,
          }}
        />

        {/* Holographic Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px] group-hover:from-blue-400/40 group-hover:via-purple-400/40 group-hover:to-pink-400/40 transition-all duration-500">
          <div className="w-full h-full rounded-3xl bg-slate-900/90" />
        </div>

        {/* Status Indicator with Pulse Effect */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md border ${
              status === "available"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-lg shadow-emerald-500/25"
                : "bg-red-500/20 text-red-300 border-red-400/50 shadow-lg shadow-red-500/25"
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className={`w-2 h-2 rounded-full ${
                status === "available" ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {status === "available" ? "Available Now" : "Unavailable"}
            <Zap className="w-3 h-3" />
          </motion.div>
        </div>

        <div className="relative flex gap-8 z-10">
          {/* Ultra Enhanced Profile Image */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative w-[200px] h-[200px] rounded-3xl overflow-hidden"
            >
              {/* Glowing Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-[2px] group-hover:animate-pulse">
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <Image
                    src={
                      profileimage || "/placeholder.svg?height=200&width=200"
                    }
                    alt={`${name}'s profile`}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Rating Badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-3 -right-3 z-20"
              >
                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 rounded-full text-white font-bold shadow-lg shadow-amber-500/50">
                  <Star className="w-4 h-4 fill-white" />
                  {rating}
                </div>
              </motion.div>

              {/* Premium Badge */}
              <div className="absolute -top-2 -left-2 z-20">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg shadow-yellow-500/50"
                >
                  <Award className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Ultra Enhanced Info Section */}
          <div className="flex flex-col flex-1 justify-between relative">
            {/* Header with Neon Effect */}
            <div className="space-y-4">
              <div>
                <motion.h2
                  onClick={onclick}
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                  }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer transition-all duration-300"
                >
                  {name}
                </motion.h2>

                <div className="flex items-center gap-2 mt-3">
                  <BiSolidQuoteLeft className="w-5 h-5 text-blue-400" />
                  <motion.p
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="text-slate-300 italic font-medium text-lg"
                  >
                    {slogan}
                  </motion.p>
                  <BiSolidQuoteRight className="w-5 h-5 text-purple-400" />
                </div>
              </div>

              {/* Neon Tags */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <NeonTag variant="location" glow>
                    <MapPin className="w-3 h-3" />
                    {location}
                  </NeonTag>
                  <NeonTag variant="language" glow>
                    <Globe2 className="w-3 h-3" />
                    {languages}
                  </NeonTag>
                </div>

                <div className="flex flex-wrap gap-3">
                  <NeonTag variant="price" glow>
                    <Coins className="w-3 h-3" />
                    {price === "FREE" ? "Free Tours" : `$${price}/hour`}
                  </NeonTag>
                  <NeonTag variant="premium" glow>
                    <Sparkles className="w-3 h-3" />
                    Premium Guide
                  </NeonTag>
                </div>
              </div>
            </div>

            {/* Enhanced Services with Glow */}
            <div className="mt-6">
              <h4 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Services Offered
              </h4>
              <div className="flex flex-wrap gap-3">
                <NeonTag glow>
                  <Clock className="w-3 h-3" />
                  Local Tours {price === "FREE" ? "(Free)" : `($${price}/h)`}
                </NeonTag>
                <NeonTag glow>
                  <MapPin className="w-3 h-3" />
                  City Guide ($50–100)
                </NeonTag>
              </div>
            </div>

            {/* Ultra Enhanced Like Section */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex items-center gap-4">
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-slate-300 font-medium"
                >
                  {likesCount}{" "}
                  {likesCount === 1 ? "person loves" : "people love"} this guide
                </motion.span>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handleLikeClick}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={liked ? "Unlike this guide" : "Like this guide"}
                  className={`relative w-14 h-14 flex justify-center items-center rounded-full transition-all duration-300 ${
                    liked
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50"
                      : "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-400 border border-slate-600"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 transition-all duration-200 ${
                      liked ? "fill-current scale-110" : ""
                    }`}
                  />

                  {/* Epic Like Animation */}
                  <AnimatePresence>
                    {showLikes && (
                      <>
                        {/* Particle Explosion */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                            animate={{
                              x:
                                Math.cos((i / 20) * 2 * Math.PI) *
                                (80 + Math.random() * 40),
                              y:
                                Math.sin((i / 20) * 2 * Math.PI) *
                                (80 + Math.random() * 40),
                              opacity: 0,
                              scale: 1.5 + Math.random(),
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1.5 + Math.random() * 0.5,
                              ease: "easeOut",
                              delay: i * 0.03,
                            }}
                            className="absolute text-2xl pointer-events-none"
                          >
                            {["❤️", "💖", "✨", "🌟", "💫", "🎉"][i % 6]}
                          </motion.div>
                        ))}

                        {/* Shockwave Effect */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={`wave-${i}`}
                            initial={{ scale: 0, opacity: 0.8 }}
                            animate={{ scale: 4 + i, opacity: 0 }}
                            transition={{
                              duration: 1 + i * 0.2,
                              ease: "easeOut",
                            }}
                            className="absolute inset-0 rounded-full border-2 border-red-400/50"
                          />
                        ))}

                        {/* Central Burst */}
                        <motion.div
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 6, opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/30 to-pink-500/30"
                        />
                      </>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.span
                  key={likesCount}
                  initial={{ scale: 1.3, color: "#ef4444" }}
                  animate={{ scale: 1, color: "#e2e8f0" }}
                  className="text-2xl font-bold text-slate-200"
                >
                  {likesCount}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700"
        />

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-50" />
      </motion.div>
    </div>
  );
};
