"use client";

import { Heart } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import TourBookingPage from "./TourBookingPage";
import TourMap from "./TourMap";
import RoadRoute from "./RoadRoute";
import { Activity } from "./Activity";

const images = ["/altai.png", "/desert.jpg", "/lake.png", "/gobi.png"];

export const TripDetailPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openDialog = (index: number) => {
    setCurrentIndex(index);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToWishlist = () => {
    toast.success("Wishlist-д амжилттай нэмэгдлээ! 🎉");
  };

  return (
    <div className="max-w-5xl p-4 mx-auto font-sans">
      <h1 className="mb-2 text-3xl font-bold">Khuvsgul lake</h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-4 ml-auto text-sm">
          <button
            onClick={handleAddToWishlist}
            className="flex items-center gap-1 px-3 py-1 transition-all border border-gray-300 rounded-lg hover:bg-red-50 active:scale-95"
          >
            <Heart
              size={16}
              className="text-red-500 transition-transform group-hover:scale-110"
            />
            <span className="text-sm font-medium text-gray-700">
              Add to wishlist
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <img
          src="/altai.png"
          alt="Main"
          className="object-cover w-full col-span-1 rounded cursor-pointer h-60"
          onClick={() => openDialog(0)}
        />
        <img
          src="/desert.jpg"
          alt="Riding"
          className="object-cover w-full col-span-1 rounded cursor-pointer h-60"
          onClick={() => openDialog(1)}
        />
        <div className="grid grid-rows-2 gap-2">
          <img
            src="/lake.png"
            alt="Scenery"
            className="object-cover w-full rounded cursor-pointer h-29"
            onClick={() => openDialog(2)}
          />
          <img
            src="/gobi.png"
            alt="Turtle Rock"
            className="object-cover w-full rounded cursor-pointer h-29"
            onClick={() => openDialog(3)}
          />
        </div>
      </div>

      <p className="mb-6 text-base leading-relaxed text-gray-800">
        Khuvsgul Lake is located in the northwest of Mongolia, in the province
        of the same name, Khuvsgul Province. It is situated near the border with
        Russia, and its northern part extends into the Russian territory.
      </p>

      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          backdrop:bg-black/80 bg-transparent rounded-xl p-0 border-0 max-w-6xl w-[95vw] h-[85vh]"
      >
        <div className="relative flex items-center justify-center w-full h-full px-12">
          <button
            onClick={closeDialog}
            className="absolute z-20 flex items-center justify-center w-12 h-12 text-4xl text-white transition duration-200 rounded-full top-4 right-6 hover:text-gray-300 bg-black/40 hover:bg-black/60 backdrop-blur"
          >
            ×
          </button>

          <button
            onClick={prevImage}
            className="absolute left-0 z-30 px-3 py-2 text-3xl text-white transition duration-200 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur"
            aria-label="Previous Image"
          >
            ‹
          </button>

          <img
            src={images[currentIndex]}
            alt="Preview"
            className="object-contain max-w-full max-h-full rounded-lg shadow-lg"
          />

          <button
            onClick={nextImage}
            className="absolute right-0 z-30 px-3 py-2 text-3xl text-white transition duration-200 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur"
            aria-label="Next Image"
          >
            ›
          </button>
        </div>
      </dialog>

      <Activity />
      <TourBookingPage />
      <TourMap />
      <RoadRoute />
    </div>
  );
};
