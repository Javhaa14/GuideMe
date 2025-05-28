import React from "react";

export const Videos = () => {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">🌟 Video</h2>

      <div className="w-full h-[900px] mx-auto border rounded overflow-hidden">
        <iframe
          width="1800px"
          height="900px"
          src="https://www.youtube.com/embed/N_UahGd75EY?si=5Oe_Ge32Qq3VoQQ_"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};
