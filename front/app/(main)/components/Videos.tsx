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
    <div className="p-4">
      <h2 className="mb-10 text-4xl font-bold text-gray-800">🌟 Video</h2>

      <div ref={containerRef} className="relative w-full aspect-video">
        {hasBeenVisible ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/N_UahGd75EY?autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        ) : (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-200">
            <p>🔄 Scroll to load video...</p>
          </div>
        )}
      </div>
    </div>
  );
};
