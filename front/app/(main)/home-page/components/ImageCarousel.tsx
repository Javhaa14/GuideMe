"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

type ImageType = {
  id: number;
  backdrop_path: string;
};

export function ImageCarousel() {
  const [Data, setData] = useState<ImageType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setData([
      {
        id: 1,
        backdrop_path: "/lake.png",
      },
      {
        id: 2,
        backdrop_path: "/gobi.png",
      },
      {
        id: 3,
        backdrop_path: "/altai.png",
      },
      {
        id: 4,
        backdrop_path: "/horse.png",
      },
    ]);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < Data.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full h-[800px] flex items-center justify-center overflow-hidden object-cover">
      <div className="w-full h-full">
        <Carousel className="w-full relative overflow-hidden">
          <CarouselContent
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Data.map((image) => (
              <CarouselItem
                key={image.id}
                className="w-full flex-shrink-0 h-[800px]"
              >
                <img
                  src={image.backdrop_path}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {Data.map((_, index) => (
              <input
                key={index}
                type="radio"
                name="carousel"
                checked={currentIndex === index}
                onChange={() => setCurrentIndex(index)}
                className="w-4 h-4 cursor-pointer accent-white appearance-none rounded-full border border-white checked:bg-white"
              />
            ))}
          </div>

          {currentIndex > 0 && (
            <CarouselPrevious
              className="left-11 w-10 h-10"
              onClick={handlePrev}
            />
          )}
          {currentIndex < Data.length - 1 && (
            <CarouselNext className="right-11 w-10 h-10" onClick={handleNext} />
          )}
        </Carousel>
      </div>
    </div>
  );
}
