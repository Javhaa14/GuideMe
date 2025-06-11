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
  duration: string;
  type: "attraction" | "restaurant" | "viewpoint" | "nature" | "beach";
  rating: number;
  image: string;
  distance: string;
}

const routeStops: RouteStop[] = [
  {
    id: 1,
    name: "Downtown Historic District",
    description:
      "Explore charming cobblestone streets and colonial architecture",
    duration: "2-3 hours",
    type: "attraction",
    rating: 4.8,
    image: "/placeholder.svg?height=120&width=200",
    distance: "Start",
  },
  {
    id: 2,
    name: "Scenic Mountain Overlook",
    description: "Breathtaking panoramic views of the valley below",
    duration: "1 hour",
    type: "viewpoint",
    rating: 4.9,
    image: "/placeholder.svg?height=120&width=200",
    distance: "15 km",
  },
  {
    id: 3,
    name: "Local Farm Restaurant",
    description: "Farm-to-table dining with locally sourced ingredients",
    duration: "1.5 hours",
    type: "restaurant",
    rating: 4.7,
    image: "/placeholder.svg?height=120&width=200",
    distance: "8 km",
  },
  {
    id: 4,
    name: "Pine Forest Trail",
    description: "Easy hiking trail through ancient pine forests",
    duration: "2 hours",
    type: "nature",
    rating: 4.6,
    image: "/placeholder.svg?height=120&width=200",
    distance: "12 km",
  },
  {
    id: 5,
    name: "Crystal Lake Beach",
    description: "Perfect spot for swimming and relaxation",
    duration: "3 hours",
    type: "beach",
    rating: 4.8,
    image: "/placeholder.svg?height=120&width=200",
    distance: "20 km",
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

export default function Road() {
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Scenic Mountain Route
        </h1>
        <p className="text-gray-600">
          A perfect day trip through nature's best attractions
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Full Day (8-10 hours)</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>75 km total</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Road line */}
        <div className="absolute top-0 bottom-0 w-1 rounded-full left-8 bg-gradient-to-b from-blue-400 via-green-400 to-cyan-400"></div>

        {/* Route stops */}
        <div className="space-y-8">
          {routeStops.map((stop, index) => (
            <div key={stop.id} className="relative flex items-start gap-6">
              {/* Stop marker */}
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

              {/* Stop content */}
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
                        <Badge variant="secondary" className="ml-2">
                          {stop.distance}
                        </Badge>
                      </div>
                      <p className="mb-3 text-gray-600">{stop.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{stop.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{stop.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Distance connector (except for last item) */}
              {index < routeStops.length - 1 && (
                <div className="absolute px-2 py-1 text-xs text-gray-400 bg-white border rounded shadow-sm left-12 top-20">
                  {routeStops[index + 1].distance}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* End marker */}
        <div className="relative flex items-center justify-center mt-8">
          <div className="flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-full shadow-lg">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="ml-4 text-lg font-semibold text-gray-700">
            Journey Complete!
          </span>
        </div>
      </div>

      {/* Route summary */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <h3 className="mb-3 text-lg font-semibold">Route Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Best visited during spring and fall for optimal weather</li>
            <li>• Bring comfortable walking shoes and a camera</li>
            <li>• Consider packing a picnic for the mountain overlook</li>
            <li>• Check restaurant hours in advance, especially on weekdays</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
