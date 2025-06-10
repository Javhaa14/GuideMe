"use client";

import { Calendar, Globe, Heart, Users, WalletCards } from "lucide-react";
import React, { useRef, useState } from "react";

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

  return (
    <div className="max-w-5xl p-4 mx-auto font-sans">
      <h1 className="mb-2 text-3xl font-bold">Khuvsgul lake</h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-4 ml-auto text-sm">
          <button className="flex items-center gap-1">
            <Heart size={16} color="red" /> Add to wishlist
          </button>
        </div>
      </div>

      {/* Image Grid */}
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

      {/* Description */}
      <p className="mb-6 text-base leading-relaxed text-gray-800">
        Khuvsgul Lake is located in the northwest of Mongolia, in the province
        of the same name, Khuvsgul Province. It is situated near the border with
        Russia, and its northern part extends into the Russian territory.
      </p>

      {/* Image Viewer Dialog */}
      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
           backdrop:bg-black/80 bg-transparent rounded-xl p-0 border-0 max-w-6xl w-[95vw] h-[85vh]"
      >
        <div className="relative flex items-center justify-center w-full h-full px-12">
          {/* Close button */}
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

          {/* Image */}
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

      <div className="max-w-5xl p-6 mx-auto space-y-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900">
          About this activity
        </h2>

        {/* Reserve and Pay */}
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <WalletCards className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Reserve now & pay later
            </h3>
            <p className="text-gray-600">
              Keep your travel plans flexible — book your spot and pay nothing
              today.
            </p>
          </div>
        </div>

        {/* Live Tour Guide */}
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <Globe className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Live tour guide
            </h3>
            <p className="text-gray-600">English, Mongolian</p>
          </div>
        </div>

        {/* Private Group */}
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <Users className="text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Private group
            </h3>
            <p className="text-gray-600">Only your group will participate</p>
          </div>
        </div>
      </div>

      <div className="bg-[#2b0347] mt-6 text-white rounded-2xl p-6 max-w-5xl mx-auto">
        <h2 className="mb-4 text-2xl font-bold">
          Select participants, date, and language
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          {/* Participant Dropdown */}
          <div className="relative flex items-center gap-2 px-4 py-2 text-black bg-white rounded-full w-52">
            <span className="flex items-center gap-2">
              <Users /> Person x 1
            </span>
            <span className="ml-auto">▼</span>

            {/* Dropdown panel */}
            <div className="absolute left-0 z-10 w-64 p-4 text-black bg-white shadow-lg top-14 rounded-xl">
              <div>
                <div className="flex items-center justify-between mt-3">
                  <button className="px-2 text-xl text-black">−</button>
                  <input
                    type="text"
                    value="1"
                    readOnly
                    className="w-10 text-center border rounded"
                  />
                  <button className="px-2 text-xl text-black">＋</button>
                </div>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2 px-4 py-2 text-black bg-white rounded-full w-52">
            <Calendar />
            <span>Select date</span>
            <span className="ml-auto">▼</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center w-40 gap-2 px-4 py-2 text-black bg-white rounded-full">
            <Globe />
            <span>English</span>
            <span className="ml-auto">▼</span>
          </div>

          {/* Button */}
          <button className="bg-[#3e016d] hover:bg-black text-white font-semibold px-6 py-3 rounded-full ml-auto">
            Check availability
          </button>
        </div>
      </div>
    </div>
  );
};
