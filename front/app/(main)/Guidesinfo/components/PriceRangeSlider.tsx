"use client";

import { Dispatch, SetStateAction, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { usePriceRange } from "@/app/context/PriceRangeContext";

export default function PriceFilterCard() {
  const { priceRange, setPriceRange } = usePriceRange();
  const maxPrice = 100;

  // Calculate positions for the price labels with smooth positioning
  const getLeftPosition = (value: number) => {
    const percentage = (value / maxPrice) * 100;
    // Adjust positioning to keep labels visible and centered on handles
    const offset = percentage < 10 ? 0 : percentage > 90 ? -40 : -20;
    return `calc(${percentage}% + ${offset}px)`;
  };

  const handleValueChange = (newValues: number[]) => {
    // Ensure the minimum value doesn't exceed the maximum value
    const [min, max] = newValues;
    if (min <= max) {
      setPriceRange([min, max]);
    }
  };

  const handleClearButton = () => {
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="flex flex-col w-[400px] items-start gap-2">
      <h2 className="flex text-base font-medium text-gray-700">Price Range:</h2>

      <div className="w-full max-w-sm px-2 py-1 gap-2">
        {/* Display current range */}
        <div className="flex items-center justify-center text-center text-gray-600 gap-2">
          Selected range:{" "}
          <span className="font-semibold">
            ${priceRange[0]} - ${priceRange[1]} per hour
          </span>
        </div>

        {/* Price labels that move smoothly with handles */}
        <div className="relative mt-2 h-8">
          <div
            className="absolute transition-all duration-300 ease-out font-bold text-sm transform -translate-x-1/18"
            style={{
              left: getLeftPosition(priceRange[0]),
              transform: "translateX(-20%)",
            }}
          >
            ${priceRange[0]}/h
          </div>
          <div
            className="absolute transition-all duration-300 ease-out font-bold text-sm transform -translate-x-1/2"
            style={{
              left: getLeftPosition(priceRange[1]),
              transform: "translateX(30%)",
            }}
          >
            ${priceRange[1]}/h
          </div>
        </div>

        {/* Slider component */}
        <div className="relative">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-2"
            value={priceRange}
            onValueChange={handleValueChange}
            min={0}
            max={maxPrice}
            step={1}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className="bg-amber-700 relative grow rounded-full h-2 transition-all duration-200">
              <Slider.Range className="absolute bg-amber-700 rounded-full h-full transition-all duration-300" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white rounded-full border-3 border-amber-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-amber-700 focus:ring-offset-2 transition-all duration-200 hover:scale-110 cursor-grab active:cursor-grabbing"
              aria-label="Minimum price"
            />
            <Slider.Thumb
              className="block w-5 h-5 bg-white rounded-full border-3 border-amber-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-amber-700 focus:ring-offset-2 transition-all duration-200 hover:scale-110 cursor-grab active:cursor-grabbing"
              aria-label="Maximum price"
            />
          </Slider.Root>

          {/* Min and max labels */}
          <div className="flex justify-between mt-1 text-gray-500 text-sm">
            <span>Free</span>
            <span>${maxPrice}/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
