"use client";
import { Star } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { GuideProfile } from "../Guidedetail/components/GuideMainProfile";

export type TourPost = {
  // define TourPost fields if needed
};

interface GuidesProps {
  guides: GuideProfile[];
}

export const Guides: React.FC<GuidesProps> = ({ guides }) => {
  const router = useRouter();
  if (!guides || guides.length === 0) {
    return <p>No guides available</p>;
  }

  return (
    <div className="p-6 sm:p-10 bg-gray-50 h-fit">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">🌟 Top Guides</h2>
        <p
          onClick={() => router.push("/Guidesinfo")}
          className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-blue-800 hover:underline transition cursor-pointer">
          See more
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <div
            key={i}
            className="flex bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition">
            <img
              src={guide.profileimage}
              alt={`${guide.firstName} ${guide.lastName}`}
              className="w-40 h-40 object-cover object-center sm:w-48 sm:h-full"
            />

            <div className="p-5 flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {guide.firstName} {guide.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{guide.location}</p>
                </div>
                <div className="text-right text-green-600 font-bold text-lg">
                  ${guide.price}
                  <span className="text-sm font-normal text-gray-500">/h</span>
                </div>
              </div>

              <blockquote className="italic text-gray-600 text-sm mt-3 mb-4">
                “{guide.comment}”
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
