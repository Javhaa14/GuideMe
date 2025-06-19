"use client";
import { useState } from "react";
import Image from "next/image";

interface GuideProfile {
  name: string;
  location: string;
  bio: string;
  profileimage: string;
  coverImage: string;
  followers: number;
  following: number;
  posts: TourPost[];
}

interface TourPost {
  id: number;
  image: string;
  caption: string;
  date: string;
}

const sampleGuide: GuideProfile = {
  name: "Amira Hussein",
  location: "Cairo, Egypt",
  bio: "Passionate about sharing the beauty of Egyptian history. Let's explore the world together!",
  profileimage: "/profile.jpg",
  coverImage: "/cover.jpg",
  followers: 1250,
  following: 380,
  posts: [
    {
      id: 1,
      image: "/tour1.jpg",
      caption: "Exploring the Pyramids of Giza!",
      date: "2025-05-20",
    },
    {
      id: 2,
      image: "/tour2.jpg",
      caption: "Sunset at the Nile River.",
      date: "2025-05-15",
    },
    {
      id: 3,
      image: "/tour3.jpg",
      caption: "Walking through Khan El Khalili bazaar.",
      date: "2025-05-10",
    },
  ],
};

export default function GuideProfilePage() {
  const [guide] = useState<GuideProfile>(sampleGuide);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Cover Photo */}
      <div className="relative h-64 w-full rounded-xl overflow-hidden">
        <Image
          src={guide.coverImage}
          alt="Cover"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mt-[-4rem] p-4">
        <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <Image
            src={guide.profileimage}
            alt="Profile"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{guide.name}</h1>
          <p className="text-gray-600">{guide.location}</p>
          <p className="mt-2 text-sm text-gray-700">{guide.bio}</p>
          <div className="flex gap-4 text-sm text-gray-600 mt-2 justify-center md:justify-start">
            <span>
              <strong>{guide.followers}</strong> Followers
            </span>
            <span>
              <strong>{guide.following}</strong> Following
            </span>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {guide.posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={post.image}
                alt={post.caption}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium">{post.caption}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
