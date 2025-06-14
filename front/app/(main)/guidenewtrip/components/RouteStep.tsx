"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, MapPin, Utensils, Tent, Hotel, Bus } from "lucide-react";

import { motion } from "framer-motion";
import MapSearch from "./Map-search";
import ImageUpload from "./Image-upload";

interface RouteStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const iconComponents = {
  location: MapPin,
  food: Utensils,
  activity: Tent,
  hotel: Hotel,
  transport: Bus,
};

export default function RouteStep({
  formData,
  updateFormData,
}: RouteStepProps) {
  const handleLocationSelect = (location: any) => {
    const newRoute = [
      ...formData.route,
      {
        title: location.place_name || "New Location",
        about: "",
        iconType: "location",
        image: "",
      },
    ];
    updateFormData({ route: newRoute });
  };

  const updateRouteItem = (index: number, field: string, value: any) => {
    const newRoute = [...formData.route];
    newRoute[index] = { ...newRoute[index], [field]: value };
    updateFormData({ route: newRoute });
  };

  const removeRouteItem = (index: number) => {
    const newRoute = [...formData.route];
    newRoute.splice(index, 1);
    updateFormData({ route: newRoute });
  };

  const addRouteItem = () => {
    updateFormData({
      route: [
        ...formData.route,
        { title: "", about: "", iconType: "location", image: "" },
      ],
    });
  };

  const moveRouteItem = (from: number, to: number) => {
    if (to >= 0 && to < formData.route.length) {
      const newRoute = [...formData.route];
      const item = newRoute.splice(from, 1)[0];
      newRoute.splice(to, 0, item);
      updateFormData({ route: newRoute });
    }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trip Route
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Add locations to your trip route. Search for locations or enter them
          manually.
        </p>
      </div>

      <motion.div variants={item}>
        <MapSearch onLocationSelect={handleLocationSelect} />
      </motion.div>

      <div className="space-y-6">
        {formData.route.map((route: any, index: number) => {
          const IconComponent =
            iconComponents[route.iconType as keyof typeof iconComponents] ||
            MapPin;

          return (
            <motion.div
              key={index}
              variants={item}
              className="location-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Card className="overflow-hidden border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-medium">
                          Stop {index + 1}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveRouteItem(index, index - 1)}
                            className="w-8 h-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-arrow-up">
                              <path d="m5 12 7-7 7 7" />
                              <path d="M12 19V5" />
                            </svg>
                          </Button>
                        )}
                        {index < formData.route.length - 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveRouteItem(index, index + 1)}
                            className="w-8 h-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-arrow-down">
                              <path d="M12 5v14" />
                              <path d="m19 12-7 7-7-7" />
                            </svg>
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRouteItem(index)}
                          disabled={formData.route.length === 1}
                          className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Location Name</Label>
                        <Input
                          value={route.title}
                          onChange={(e) =>
                            updateRouteItem(index, "title", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Location Type</Label>
                        <Select
                          value={route.iconType}
                          onValueChange={(value) =>
                            updateRouteItem(index, "iconType", value)
                          }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="location">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>Location</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="food">
                              <div className="flex items-center gap-2">
                                <Utensils className="w-4 h-4" />
                                <span>Food</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="activity">
                              <div className="flex items-center gap-2">
                                <Tent className="w-4 h-4" />
                                <span>Activity</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="hotel">
                              <div className="flex items-center gap-2">
                                <Hotel className="w-4 h-4" />
                                <span>Hotel</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="transport">
                              <div className="flex items-center gap-2">
                                <Bus className="w-4 h-4" />
                                <span>Transport</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={route.about}
                        onChange={(e) =>
                          updateRouteItem(index, "about", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Image</Label>
                      <ImageUpload
                        value={route.image ? [route.image] : []}
                        onChange={(urls) =>
                          updateRouteItem(index, "image", urls[0] || "")
                        }
                        maxFiles={1}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        <motion.div variants={item}>
          <Button
            type="button"
            variant="outline"
            className="relative w-full h-16 overflow-hidden border-dashed group"
            onClick={addRouteItem}>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 opacity-0 bg-primary group-hover:opacity-10 group-hover:-skew-x-0 group-hover:translate-x-0"></span>
            <Plus className="w-5 h-5 mr-2 text-primary" />
            <span className="relative">Add New Location</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
