"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";

interface Step {
  image: string;
  title: string;
  about: string;
}

export interface RoudEditRef {
  getData: () => Step[];
}

export const RoudEdit = forwardRef<RoudEditRef>((props, ref) => {
  const [steps, setSteps] = useState<Step[]>([
    {
      image: "/lake.png",
      title: "Ulaanbaatar",
      about: "The capital city of Mongolia",
    },
    {
      image: "/altai.png",
      title: "Amarbaysgalant Monastery",
      about: "A monastery with over 300 years of history",
    },
    {
      image: "/horse.png",
      title: "Erdenet City",
      about: "The center of Orkhon province and home to a major copper mine",
    },
    {
      image: "/gobi.png",
      title: "Selenge River",
      about: "One of the largest rivers in Mongolia",
    },
  ]);

  const handleStepChange = (index: number, key: keyof Step, value: string) => {
    const updated = [...steps];
    updated[index][key] = value;
    setSteps(updated);
  };

  useImperativeHandle(ref, () => ({
    getData: () => steps,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Route Editor</h2>
      {steps.map((step, index) => (
        <div key={index} className="space-y-2">
          <input
            type="text"
            value={step.image}
            onChange={(e) => handleStepChange(index, "image", e.target.value)}
            placeholder="Image URL"
            className="w-full p-2 text-sm border rounded"
          />
          <input
            type="text"
            value={step.title}
            onChange={(e) => handleStepChange(index, "title", e.target.value)}
            className="w-full text-lg font-bold border-b border-gray-300"
          />
          <textarea
            value={step.about}
            onChange={(e) => handleStepChange(index, "about", e.target.value)}
            className="w-full p-2 border rounded"
            rows={2}
          />
        </div>
      ))}
    </div>
  );
});
