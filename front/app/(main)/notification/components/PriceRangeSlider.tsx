"use client";

import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export default function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState([20, 71]);
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

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-medium text-gray-700 mb-6">Price Range</h2>

      {/* Price labels that move smoothly with handles */}
      <div className="relative mb-12 h-8">
        <div
          className="absolute transition-all duration-300 ease-out font-bold text-xl transform -translate-x-1/2"
          style={{
            left: getLeftPosition(priceRange[0]),
            transform: "translateX(-50%)",
          }}>
          ${priceRange[0]}/h
        </div>
        <div
          className="absolute transition-all duration-300 ease-out font-bold text-xl transform -translate-x-1/2"
          style={{
            left: getLeftPosition(priceRange[1]),
            transform: "translateX(-50%)",
          }}>
          ${priceRange[1]}/h
        </div>
      </div>

      {/* Slider component */}
      <div className="relative">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={priceRange}
          onValueChange={handleValueChange}
          min={0}
          max={maxPrice}
          step={1}
          minStepsBetweenThumbs={1}>
          <Slider.Track className="bg-orange-500 relative grow rounded-full h-3 transition-all duration-200">
            <Slider.Range className="absolute bg-orange-500 rounded-full h-full transition-all duration-300" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-7 h-7 bg-white rounded-full border-3 border-orange-500 shadow-lg hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-orange-300 focus:ring-offset-2 transition-all duration-200 hover:scale-110 cursor-grab active:cursor-grabbing"
            aria-label="Minimum price"
          />
          <Slider.Thumb
            className="block w-7 h-7 bg-white rounded-full border-3 border-orange-500 shadow-lg hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-orange-300 focus:ring-offset-2 transition-all duration-200 hover:scale-110 cursor-grab active:cursor-grabbing"
            aria-label="Maximum price"
          />
        </Slider.Root>

        {/* Min and max labels */}
        <div className="flex justify-between mt-4 text-gray-500 text-sm">
          <span>Free</span>
          <span>${maxPrice}/h</span>
        </div>
      </div>

      {/* Display current range */}
      <div className="mt-6 text-center text-gray-600">
        Selected range:{" "}
        <span className="font-semibold">
          ${priceRange[0]} - ${priceRange[1]} per hour
        </span>
      </div>
    </div>
  );
}
