import { MapPin, Star } from "lucide-react";
import React from "react";

export const Guides = () => {
  const guides = [
    {
      name: "Zaya",
      description: "Exploring The World In Comfort.",
      image: "/user.png",
      location: "Ulaanbaatar, Mongolia",
      price: 22,
      rating: 5,
    },
    {
      name: "Bataa",
      description:
        "The world is a book, and those who do not travel read only a page.",
      image: "/user.png",
      location: "Gobi Desert, Mongolia",
      price: 28,
      rating: 4,
    },
    {
      name: "Solongo",
      description: "Ready to show around my city...",
      image: "/user.png",
      location: "Erdenet, Mongolia",
      price: 20,
      rating: 5,
    },
  ];

  return (
    <div className="p-6 sm:p-10 bg-gray-50 h-fit">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">🌟 Top Guides</h2>
        <a
          href="#"
          className="text-green-600 text-sm font-medium hover:underline hover:text-blue-800 transition"
        >
          See more →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="flex bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition"
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-40 h-40 object-cover object-center sm:w-48 sm:h-full"
            />

            <div className="p-5 flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {guide.name}
                  </h3>
                  <p className="text-sm text-gray-500">{guide.location}</p>
                </div>
                <div className="text-right text-green-600 font-bold text-lg">
                  ${guide.price}
                  <span className="text-sm font-normal text-gray-500">/h</span>
                </div>
              </div>

              <blockquote className="italic text-gray-600 text-sm mt-3 mb-4">
                “{guide.description}”
              </blockquote>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < guide.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-2">{guide.rating}.0</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
