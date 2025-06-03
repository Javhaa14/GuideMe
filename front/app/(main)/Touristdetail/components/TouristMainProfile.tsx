"use client";

import Image from "next/image";
import Chat from "../../components/Chat";
import {
  Globe,
  MapPin,
  MessageCircle,
  SpaceIcon as VenusAndMars,
  Calendar,
  Users,
} from "lucide-react";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import TravelersPost from "../../notification/page";
import Travelerpost from "../../components/Travelerpost";
import axios from "axios";
type TripMemory = {
  id: number;
  image: string;
  caption: string;
  date: string;
};
type TravelerProfile = {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
  coverImage: string;
  languageKnowledge: string;
  gender: string;
  about: string;
  location: string;
  joinDate: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  TripMemories: TripMemory[];
};
const sampleTraveler: TravelerProfile = {
  id: 123,
  firstName: "Baldanpurev",
  lastName: "Eldenpurev",
  profileImage: "/placeholder.svg",
  coverImage: "/placeholder.svg",
  languageKnowledge: "English, French, Mandarin",
  gender: "Male",
  about:
    "Adventure seeker and culture enthusiast. I love exploring new places, meeting locals, and sharing travel experiences. Always looking for my next adventure and travel companions!",
  location: "Ulaanbaatar, Mongolia",
  joinDate: "January 2023",
  postsCount: 24,
  followersCount: 156,
  followingCount: 89,
  TripMemories: [
    {
      id: 1,
      image: "/gobi.png",
      caption: "Camel riding in the Gobi desert!",
      date: "2025-05-15",
    },
    {
      id: 2,
      image: "/Monastery.png",
      caption: "Exploring ancient monasteries in Uvurkhangai!",
      date: "2025-06-01",
    },
  ],
};

export default function TravelerProfile() {
  const [traveler] = useState<TravelerProfile>(sampleTraveler);
  const [chat, setChat] = useState(false);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/post/683e58ba60f8d25ee9dc85d9`
        );
        console.log("✅ Posts fetched:", res.data);
        setPost(res.data);
      } catch (err) {
        console.error("❌ Post fetch failed:", err);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Chat Component */}
      {chat && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-110 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="h-full w-full flex flex-col">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 pb-0 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  Chat with {traveler.firstName}
                </h3>
                <button
                  onClick={() => setChat(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  x
                </button>
              </div>
            </div>
            <div className="flex w-full">
              <Chat />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          {/* Cover Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              src={traveler.coverImage || "/placeholder.svg"}
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Profile Content */}
          <div className="relative px-6 md:px-12 pb-12 pt-20 md:pt-24">
            {/* Profile Image */}
            <div className="absolute -top-16 md:-top-20 left-6 md:left-12">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-6 border-white shadow-2xl overflow-hidden bg-white">
                <Image
                  src={traveler.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Online Status */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-3 border-white rounded-full"></div>
            </div>

            <div className="md:ml-52">
              {/* Name and Basic Info */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {traveler.firstName} {traveler.lastName}
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    Travel Enthusiast
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 py-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">
                      {traveler.postsCount}
                    </div>
                    <div className="text-sm text-blue-700">Posts</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-900">
                      {traveler.followersCount}
                    </div>
                    <div className="text-sm text-green-700">Followers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-900">
                      {traveler.followingCount}
                    </div>
                    <div className="text-sm text-purple-700">Following</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <span className="text-lg">{traveler.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Globe size={20} className="text-green-600" />
                    </div>
                    <span className="text-lg">
                      {traveler.languageKnowledge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <VenusAndMars size={20} className="text-purple-600" />
                    </div>
                    <span className="text-lg capitalize">
                      {traveler.gender}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-orange-600" />
                    </div>
                    <span className="text-lg">Joined {traveler.joinDate}</span>
                  </div>
                </div>

                {/* About Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    About Me
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {traveler.about}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={() => setChat(!chat)}
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Start Conversation
                  </button>

                  <button className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-green-600 text-green-600 rounded-2xl hover:bg-green-50 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl">
                    <Users className="w-6 h-6" />
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Traveler's Trip Memories Section */}
        {/* <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">My Travel Memories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sampleTraveler.TripMemories.map((trip) => (
              <div
                key={trip.id}
                className="rounded-xl overflow-hidden shadow-lg border bg-white">
                <div className="relative h-48 w-full">
                  <Image
                    src={trip.image}
                    alt={trip.caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-md font-medium text-gray-900">
                    {trip.caption}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{trip.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Your posts</h2>
          <div className="flex flex-col">
            {post.map((v, i) => {
              return <Travelerpost key={i} post={v} />;
            })}
          </div>
        </div>
        {/* Create Post Section */}
        <div className="mt-8">
          <CreatePost />
        </div>
      </div>
    </div>
  );
}
