"use client";

import { useState } from "react";
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
import {
  Plus,
  Trash2,
  MapPin,
  Utensils,
  Tent,
  Hotel,
  Bus,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import MapSearch from "./Map-search";

interface RouteItem {
  title: string;
  about: string;
  iconType: string;
  image: string;
}

interface RouteStepProps {
  formData: {
    route: RouteItem[];
  };
  updateFormData: (data: { route: RouteItem[] }) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
  const [uploading, setUploading] = useState(false);

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

  const updateRouteItem = (
    index: number,
    field: keyof RouteItem,
    value: any
  ) => {
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

  const handleImageUploadForRoute = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "guideme");

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        throw new Error("Cloudinary cloud name is not set.");
      }

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      if (result.secure_url) {
        updateRouteItem(index, "image", result.secure_url);
      } else {
        console.error("Upload error:", result);
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    }

    setUploading(false);
  };

  return (
    <motion.div
      className="space-y-8 flex flex-col gap-1.5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Trip Route</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Add locations to your trip route. Search for locations or enter them
          manually.
        </p>
      </div>

      <motion.div variants={item} className="flex flex-col gap-1.5">
        <MapSearch onLocationSelect={handleLocationSelect} />
      </motion.div>

      <div className="space-y-6">
        {formData.route.map((route, index) => {
          const IconComponent =
            iconComponents[route.iconType as keyof typeof iconComponents] ||
            MapPin;

          return (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col gap-1.5"
            >
              <Card className="overflow-hidden border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-medium">
                          Stop {index + 1}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveRouteItem(index, index - 1)}
                          disabled={index === 0}
                          className="w-8 h-8"
                        >
                          <MapPin className="w-4 h-4 rotate-180" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveRouteItem(index, index + 1)}
                          disabled={index === formData.route.length - 1}
                          className="w-8 h-8"
                        >
                          <MapPin className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRouteItem(index)}
                          className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <Label>Location Name</Label>
                        <Input
                          value={route.title}
                          onChange={(e) =>
                            updateRouteItem(index, "title", e.target.value)
                          }
                          placeholder="e.g. Gobi Desert"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <Label>Location Type</Label>
                        <Select
                          value={route.iconType}
                          onValueChange={(value) =>
                            updateRouteItem(index, "iconType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="location">
                              <MapPin className="w-4 h-4 mr-2" />
                              Location
                            </SelectItem>
                            <SelectItem value="food">
                              <Utensils className="w-4 h-4 mr-2" />
                              Food
                            </SelectItem>
                            <SelectItem value="activity">
                              <Tent className="w-4 h-4 mr-2" />
                              Activity
                            </SelectItem>
                            <SelectItem value="hotel">
                              <Hotel className="w-4 h-4 mr-2" />
                              Hotel
                            </SelectItem>
                            <SelectItem value="transport">
                              <Bus className="w-4 h-4 mr-2" />
                              Transport
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label>Description</Label>
                      <Textarea
                        value={route.about}
                        onChange={(e) =>
                          updateRouteItem(index, "about", e.target.value)
                        }
                        placeholder="Write a short description about this stop..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label>Trip Image</Label>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">
                            Upload image for this location
                          </span>
                          <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:scale-105 transition">
                            <Camera size={18} className="mr-2 inline" />
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUploadForRoute(e, index)
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                        {uploading && (
                          <p className="text-sm text-muted-foreground">
                            Uploading...
                          </p>
                        )}
                        {route.image && (
                          <div className="relative w-full h-40 rounded-xl overflow-hidden shadow">
                            <Image
                              src={route.image}
                              alt="Route Image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        <motion.div variants={item} className="flex flex-col gap-1.5">
          <Button
            type="button"
            variant="outline"
            onClick={addRouteItem}
            className="w-full h-16 border-dashed relative group"
          >
            <span className="absolute inset-0 transition-all duration-300 ease-out transform -skew-x-12 opacity-0 bg-primary group-hover:opacity-10 group-hover:skew-x-0 group-hover:translate-x-0" />
            <Plus className="w-5 h-5 mr-2 text-primary" />
            <span className="relative">Add New Location</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
