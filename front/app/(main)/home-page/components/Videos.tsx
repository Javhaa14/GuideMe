import React from "react";

export const Videos = () => {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">🌟 Video</h2>

      <div className="w-full h-full mx-auto border rounded overflow-hidden">
        <video
          className="w-full h-full object-cover"
          controls
          poster="/video.png"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
