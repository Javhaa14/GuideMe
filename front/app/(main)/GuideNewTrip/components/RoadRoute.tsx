"use client";

import { useState } from "react";
import {
  MapPin,
  Camera,
  Utensils,
  Mountain,
  Trees,
  Waves,
  Clock,
  Star,
  Navigation,
  Car,
  Fuel,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RouteStop {
  id: number;
  name: string;
  description: string;
  duration: string;
  type: "attraction" | "restaurant" | "viewpoint" | "nature" | "beach";
  rating: number;
  reviews: number;
  image: string;
  distance: string;
  price: string;
  highlights: string[];
}

const routeStops: RouteStop[] = [
  {
    id: 1,
    name: "Historic Old Town Square",
    description:
      "Immerse yourself in centuries of history with stunning baroque architecture and charming cafes",
    duration: "2-3 hours",
    type: "attraction",
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=200&width=300",
    distance: "Start",
    price: "Free",
    highlights: ["UNESCO Heritage", "Photo Spots", "Local Markets"],
  },
  {
    id: 2,
    name: "Eagle's Peak Viewpoint",
    description:
      "Spectacular 360° panoramic views stretching across three valleys and distant mountain ranges",
    duration: "1.5 hours",
    type: "viewpoint",
    rating: 4.9,
    reviews: 892,
    image: "/placeholder.svg?height=200&width=300",
    distance: "18 km",
    price: "$5",
    highlights: ["Sunset Views", "Photography", "Hiking Trail"],
  },
  {
    id: 3,
    name: "Mountain View Bistro",
    description:
      "Award-winning farm-to-table restaurant featuring locally sourced organic ingredients",
    duration: "2 hours",
    type: "restaurant",
    rating: 4.7,
    reviews: 634,
    image: "/placeholder.svg?height=200&width=300",
    distance: "12 km",
    price: "$$$",
    highlights: ["Michelin Guide", "Wine Pairing", "Terrace Dining"],
  },
  {
    id: 4,
    name: "Whispering Pines Forest",
    description:
      "Ancient forest sanctuary with towering 300-year-old pines and crystal-clear streams",
    duration: "2.5 hours",
    type: "nature",
    rating: 4.6,
    reviews: 445,
    image: "/placeholder.svg?height=200&width=300",
    distance: "15 km",
    price: "$3",
    highlights: ["Wildlife Spotting", "Nature Trail", "Meditation Spots"],
  },
  {
    id: 5,
    name: "Sapphire Lake Resort",
    description:
      "Pristine alpine lake with crystal-clear waters perfect for swimming and water sports",
    duration: "3-4 hours",
    type: "beach",
    rating: 4.8,
    reviews: 756,
    image: "/placeholder.svg?height=200&width=300",
    distance: "22 km",
    price: "$8",
    highlights: ["Water Sports", "Beach Club", "Sunset Deck"],
  },
];

const getIcon = (type: RouteStop["type"]) => {
  switch (type) {
    case "attraction":
      return <Camera className="w-6 h-6" />;
    case "restaurant":
      return <Utensils className="w-6 h-6" />;
    case "viewpoint":
      return <Mountain className="w-6 h-6" />;
    case "nature":
      return <Trees className="w-6 h-6" />;
    case "beach":
      return <Waves className="w-6 h-6" />;
    default:
      return <MapPin className="w-6 h-6" />;
  }
};

const getGradient = (type: RouteStop["type"]) => {
  switch (type) {
    case "attraction":
      return "from-blue-500 to-indigo-600";
    case "restaurant":
      return "from-orange-500 to-red-500";
    case "viewpoint":
      return "from-purple-500 to-pink-500";
    case "nature":
      return "from-green-500 to-emerald-600";
    case "beach":
      return "from-cyan-500 to-blue-500";
    default:
      return "from-gray-500 to-gray-600";
  }
};

export default function RoadRoute() {
  const [activeStop, setActiveStop] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Header */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl px-6 py-16 mx-auto">
          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold text-transparent bg-gradient-to-r from-white to-blue-100 bg-clip-text">
              Alpine Discovery Route
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
              Experience the perfect blend of culture, nature, and culinary
              excellence on this carefully curated journey
            </p>

            {/* Route Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                <span>Full Day (10-12 hours)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Navigation className="w-4 h-4" />
                <span>67 km total distance</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Car className="w-4 h-4" />
                <span>Scenic driving route</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Users className="w-4 h-4" />
                <span>Perfect for 2-6 people</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-24 h-24 rounded-full -top-4 -right-4 bg-white/10 blur-xl"></div>
          <div className="absolute w-32 h-32 rounded-full top-1/2 -left-8 bg-pink-300/20 blur-2xl"></div>
          <div className="absolute bottom-0 w-40 h-40 rounded-full right-1/4 bg-blue-300/20 blur-2xl"></div>
        </div>
      </div>

      <div className="max-w-6xl px-6 py-12 mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Journey</h2>
            <Badge variant="outline" className="text-sm">
              5 Amazing Stops
            </Badge>
          </div>
          <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></div>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="relative">
          {/* Enhanced Road Line */}
          <div className="absolute top-0 bottom-0 w-1 rounded-full shadow-lg left-12 bg-gradient-to-b from-indigo-400 to-cyan-400">
            <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-b from-indigo-400 to-cyan-400 animate-pulse"></div>
          </div>

          {/* Route Stops */}
          <div className="space-y-12">
            {routeStops.map((stop, index) => (
              <div
                key={stop.id}
                className={`relative transition-all duration-500 ${
                  activeStop === stop.id ? "scale-105" : "hover:scale-102"
                }`}
                onMouseEnter={() => setActiveStop(stop.id)}
                onMouseLeave={() => setActiveStop(null)}
              >
                {/* Enhanced Stop Marker */}
                <div className="relative flex items-start gap-8">
                  <div
                    className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${getGradient(
                      stop.type
                    )} text-white shadow-2xl transform transition-all duration-300 ${
                      activeStop === stop.id
                        ? "rotate-6 scale-110"
                        : "hover:rotate-3 hover:scale-105"
                    }`}
                  >
                    {getIcon(stop.type)}
                    <div className="absolute p-2 bg-white rounded-full shadow-lg -top-3 -right-3">
                      <span className="text-sm font-bold text-gray-700">
                        {index + 1}
                      </span>
                    </div>

                    {/* Floating badge */}
                    <div className="absolute transform -translate-x-1/2 -bottom-2 left-1/2">
                      <Badge
                        className={`bg-gradient-to-r ${getGradient(
                          stop.type
                        )} text-white text-xs px-2 py-1`}
                      >
                        {stop.price}
                      </Badge>
                    </div>
                  </div>

                  {/* Enhanced Stop Content */}
                  <Card
                    className={`flex-1 overflow-hidden transition-all duration-300 ${
                      activeStop === stop.id
                        ? "shadow-2xl ring-2 ring-indigo-200 bg-gradient-to-br from-white to-indigo-50"
                        : "shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm"
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Image with overlay */}
                        <div className="relative h-48 overflow-hidden lg:w-80 lg:h-auto">
                          <img
                            src={stop.image || "/placeholder.svg"}
                            alt={stop.name}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex flex-wrap gap-2">
                              {stop.highlights.map((highlight, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs text-gray-800 bg-white/90"
                                >
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                                {stop.name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                  <span className="font-semibold">
                                    {stop.rating}
                                  </span>
                                  <span>({stop.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{stop.duration}</span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-sm font-semibold"
                            >
                              {stop.distance}
                            </Badge>
                          </div>

                          <p className="mb-6 leading-relaxed text-gray-700">
                            {stop.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-3">
                              <Button
                                size="sm"
                                className={`bg-gradient-to-r ${getGradient(
                                  stop.type
                                )} hover:opacity-90`}
                              >
                                View Details
                              </Button>
                              <Button size="sm" variant="outline">
                                Add to Plan
                              </Button>
                            </div>
                            <div className="text-sm text-right text-gray-500">
                              <div>Next stop in</div>
                              <div className="font-semibold">
                                {index < routeStops.length - 1
                                  ? routeStops[index + 1].distance
                                  : "End"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Distance Connector */}
                {index < routeStops.length - 1 && (
                  <div className="absolute z-20 left-16 top-32">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                      <Car className="w-4 h-4" />
                      {routeStops[index + 1].distance}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Journey Complete */}
          <div className="relative flex items-center justify-center mt-16">
            <div className="flex items-center justify-center w-20 h-20 text-white rounded-full shadow-2xl bg-gradient-to-br from-green-500 to-emerald-600 animate-bounce">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Journey Complete!
              </h3>
              <p className="text-gray-600">
                What an amazing adventure you've had!
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Route Summary */}
        <Card className="mt-16 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-6 text-2xl font-bold text-gray-800">
                  Essential Travel Tips
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-indigo-500 rounded-full"></div>
                    <span>
                      Best visited during spring (April-May) and fall
                      (September-October) for optimal weather and fewer crowds
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
                    <span>
                      Bring comfortable hiking boots, layers for changing
                      weather, and a high-quality camera
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-pink-500 rounded-full"></div>
                    <span>
                      Make restaurant reservations 2-3 days in advance,
                      especially for weekend visits
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-orange-500 rounded-full"></div>
                    <span>
                      Download offline maps and check weather conditions before
                      departure
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-6 text-2xl font-bold text-gray-800">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 text-center bg-white/60 backdrop-blur-sm rounded-xl">
                    <Fuel className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                    <div className="text-2xl font-bold text-gray-800">~$25</div>
                    <div className="text-sm text-gray-600">Fuel Cost</div>
                  </div>
                  <div className="p-4 text-center bg-white/60 backdrop-blur-sm rounded-xl">
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-bold text-gray-800">2-6</div>
                    <div className="text-sm text-gray-600">Group Size</div>
                  </div>
                  <div className="p-4 text-center bg-white/60 backdrop-blur-sm rounded-xl">
                    <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold text-gray-800">4.8</div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                  <div className="p-4 text-center bg-white/60 backdrop-blur-sm rounded-xl">
                    <Mountain className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold text-gray-800">5</div>
                    <div className="text-sm text-gray-600">Must-See Spots</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Start Your Journey
                <Navigation className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
