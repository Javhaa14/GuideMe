"use client";

import React, { useState } from "react";
import { Star, StarOff } from "lucide-react";

type StarRatingProps = {
  value: number;
  onChange: (val: number) => void;
};

export function StarRatingFilter({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      className="rating flex items-start justify-center gap-1 relative w-[145px] select-none rtl"
      dir="rtl"
    >
      {[5, 4, 3, 2, 1].map((star) => {
        const isActive = hovered >= star || (!hovered && value >= star);
        return (
          <label
            key={star}
            className={`cursor-pointer size-7 inline-block p-1 transition-colors ${
              isActive ? "text-amber-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            <input
              type="radio"
              name="star"
              value={star}
              className="hidden"
              checked={value === star}
              onChange={() => onChange(star)}
            />
            <span className="select-none">
              {isActive ? (
                <Star className="w-8 h-8 fill-amber-400" />
              ) : (
                <Star className="w-8 h-8 fill-gray-300" />
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
