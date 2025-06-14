"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface MainEditRef {
  getData: () => { title: string; description: string };
}

export const MainEdit = forwardRef<MainEditRef>((props, ref) => {
  const [title, setTitle] = useState("Khuvsgul lake Route");
  const [description, setDescription] = useState(
    "Route through the most scenic locations of Mongolia"
  );

  useImperativeHandle(ref, () => ({
    getData: () => ({ title, description }),
  }));

  return (
    <div className="space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-bold border-b border-gray-300"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        rows={2}
      />
    </div>
  );
});
