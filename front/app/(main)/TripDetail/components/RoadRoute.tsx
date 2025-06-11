"use client";

import {
  MapPin,
  Camera,
  Utensils,
  Mountain,
  Trees,
  Waves,
  Clock,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RouteStop {
  id: number;
  name: string;
  description: string;
  type: "attraction" | "restaurant" | "viewpoint" | "nature" | "beach";
  image: string;
}

const routeStops: RouteStop[] = [
  {
    id: 1,
    name: "Ulaanbaatar",
    description: "The capital city of Mongolia",
    image: "/altai.png",
    type: "attraction",
  },
  {
    id: 2,
    name: "Amarbayasgalant Monastery",
    description: "A monastery with over 300 years of history",
    image: "/desert.jpg",
    type: "viewpoint",
  },
  {
    id: 3,
    name: "Erdenet City",
    description:
      "The center of Orkhon province and home to a major copper mine",
    image: "/horse.png",
    type: "attraction",
  },
  {
    id: 4,
    name: "Selenge River",
    description: "One of the largest rivers in Mongolia",
    image: "/lake.png",
    type: "nature",
  },
  {
    id: 5,
    name: "Uvur-Uur Pass",
    description: "A scenic high mountain pass in the north",
    image: "/horse.png",
    type: "viewpoint",
  },
  {
    id: 6,
    name: "Murun City",
    description: "The capital of Khuvsgul province",
    image: "/altai.png",
    type: "restaurant",
  },
  {
    id: 7,
    name: "Khuvsgul Lake",
    description: "The deepest freshwater lake in Mongolia",
    image: "/altai.png",
    type: "beach",
  },
];

const getIcon = (type: RouteStop["type"]) => {
  switch (type) {
    case "attraction":
      return <Camera className="w-5 h-5" />;
    case "restaurant":
      return <Utensils className="w-5 h-5" />;
    case "viewpoint":
      return <Mountain className="w-5 h-5" />;
    case "nature":
      return <Trees className="w-5 h-5" />;
    case "beach":
      return <Waves className="w-5 h-5" />;
    default:
      return <MapPin className="w-5 h-5" />;
  }
};

const getTypeColor = (type: RouteStop["type"]) => {
  switch (type) {
    case "attraction":
      return "bg-blue-500";
    case "restaurant":
      return "bg-orange-500";
    case "viewpoint":
      return "bg-purple-500";
    case "nature":
      return "bg-green-500";
    case "beach":
      return "bg-cyan-500";
    default:
      return "bg-gray-500";
  }
};

export default function RoadRoute() {
  return (
    <div className="max-w-5xl p-6 mx-auto">
      <div className="mb-8 text-start">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Khuvsgul lake Route
        </h1>
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 w-1 rounded-full left-8 bg-gradient-to-b from-blue-400 via-green-400 to-cyan-400"></div>

        <div className="space-y-8">
          {routeStops.map((stop, index) => (
            <div key={stop.id} className="relative flex items-start gap-6">
              <div
                className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${getTypeColor(
                  stop.type
                )} text-white shadow-lg`}
              >
                {getIcon(stop.type)}
                <div className="absolute p-1 bg-white rounded-full shadow-md -top-2 -right-2">
                  <span className="text-xs font-bold text-gray-700">
                    {index + 1}
                  </span>
                </div>
              </div>

              <Card className="flex-1 transition-shadow duration-300 shadow-md hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={stop.image || "/placeholder.svg"}
                      alt={stop.name}
                      className="object-cover w-full h-32 rounded-t-lg md:w-48 md:rounded-l-lg md:rounded-t-none"
                    />
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {stop.name}
                        </h3>
                      </div>
                      <p className="mb-3 text-gray-600">{stop.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="relative flex items-center justify-center mt-8">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-full shadow-lg">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="ml-4 text-lg font-semibold text-gray-700">
            Journey Complete!
          </span>
        </div>
      </div>

      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <h3 className="mb-3 text-lg font-semibold">Route Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              • This tour operates during Mongolia's winter months, so
              temperatures can be extremely cold. Guests should pack warm,
              layered clothing suitable for sub-zero conditions.
            </li>
            <li>
              • The tour is graded as easy and suitable for most fitness levels;
              however, some light hiking and optional riding activities are
              included.
            </li>
            <li>
              • Optional activities like horse riding, camel riding, and dog
              sledding are not included in the price and can be booked on-site
              for an additional fee.
            </li>
            <li>• Check restaurant hours in advance, especially on weekdays</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
