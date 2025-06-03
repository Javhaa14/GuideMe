import React, { useRef, useEffect, useState } from "react";

export const Videos = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasBeenVisible]);

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">🌟 Video</h2>

      <div
        ref={containerRef}
        className="w-full h-[800px] flex justify-center mx-auto border rounded overflow-hidden"
      >
        {hasBeenVisible ? (
          <iframe
            width="2400px"
            height="800px"
            src="https://www.youtube.com/embed/N_UahGd75EY?autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-[2400px] h-[800px] bg-gray-200 flex items-center justify-center">
            <p>🔄 Scroll to load video...</p>
          </div>
        )}
      </div>
    </div>
  );
};
