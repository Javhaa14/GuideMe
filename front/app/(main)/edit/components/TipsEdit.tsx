"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface TipsEditRef {
  getData: () => { highlights: string[]; tips: string[] };
}

export const TipsEdit = forwardRef<TipsEditRef>((props, ref) => {
  const [highlights, setHighlights] = useState<string[]>([
    "This tour operates during Mongolia's winter months, so temperatures can be extremely cold. Guests should pack warm, layered clothing suitable for sub-zero conditions.",
    "The tour is graded as easy and suitable for most fitness levels; however, some light hiking and optional riding activities are included.",
  ]);

  const [tips, setTips] = useState<string[]>([
    "This tour operates during Mongolia's winter months, so temperatures can be extremely cold. Guests should pack warm, layered clothing suitable for sub-zero conditions.",
    "The tour is graded as easy and suitable for most fitness levels; however, some light hiking and optional riding activities are included.",
    "Optional activities like horse riding, camel riding, and dog sledding are not included in the price and can be booked on-site for an additional fee.",
    "Check restaurant hours in advance, especially on weekdays",
  ]);

  useImperativeHandle(ref, () => ({
    getData: () => ({ highlights, tips }),
  }));

  const handleChange = (
    type: "highlight" | "tip",
    index: number,
    value: string
  ) => {
    const list = type === "highlight" ? [...highlights] : [...tips];
    list[index] = value;
    type === "highlight" ? setHighlights(list) : setTips(list);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Highlights</h3>
        {highlights.map((item, index) => (
          <textarea
            key={index}
            value={item}
            onChange={(e) => handleChange("highlight", index, e.target.value)}
            className="w-full p-2 mt-2 border rounded resize-none"
            rows={2}
          />
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold">Route Tips</h3>
        {tips.map((item, index) => (
          <textarea
            key={index}
            value={item}
            onChange={(e) => handleChange("tip", index, e.target.value)}
            className="w-full p-2 mt-2 border rounded resize-none"
            rows={2}
          />
        ))}
      </div>
    </div>
  );
});
