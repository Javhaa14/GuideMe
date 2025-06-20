"use client";

<<<<<<< HEAD
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
=======
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
import { useEffect, useState } from "react";

type ImageType = {
  id: number;
  backdrop_path: string;
};

export function ImageCarousel() {
<<<<<<< HEAD
  const [Data, setData] = useState<ImageType[]>([]);
=======
  const [data, setData] = useState<ImageType[]>([]);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setData([
<<<<<<< HEAD
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
=======
      { id: 1, backdrop_path: "/lake.png" },
      { id: 2, backdrop_path: "/gobi.png" },
      { id: 3, backdrop_path: "/altai.png" },
      { id: 4, backdrop_path: "/horse.png" },
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    ]);
  }, []);

  const handleNext = () => {
<<<<<<< HEAD
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
=======
    setCurrentIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden font-sans text-white">
      {/* Image Slides */}
      {data.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={image.backdrop_path}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />

          {/* Content */}
          <div className="absolute bottom-20 left-20 z-30 max-w-[700px]">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight drop-shadow-md">
              Closer to Nature—
              <br /> Closer to Yourself
            </h1>
            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              Spend unforgettable and remarkable time in the Mongolian
              wilderness with our unique experiences.
            </p>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full border border-white transition ${
              currentIndex === index ? "bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/30 hover:bg-white/70 text-white hover:text-black flex items-center justify-center text-xl font-bold rounded-full"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/30 hover:bg-white/70 text-white hover:text-black flex items-center justify-center text-xl font-bold rounded-full"
      >
        ›
      </button>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    </div>
  );
}
