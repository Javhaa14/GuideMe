"use client";
 
import type React from "react";
 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Camera,
  MapPin,
  Users,
  X,
  Sparkles,
  Globe,
  Heart,
  Plane,
  Mountain,
  Sun,
  Calendar,
  MapPlus,
  Flag,
  Map,
  MapIcon,
  Building2,
  Utensils,
  Telescope,
  ShoppingBag,
} from "lucide-react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { selectActivites } from "@/app/utils/FilterData";
 
// Updated Zod schema with optional fields
const postSchema = z.object({
  content: z.string().min(1, "Share your travel story!"),
  images: z.array(z.string()).optional(),
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  people: z.number().min(1, "At least one person required"),
});
 
type FormData = z.infer<typeof postSchema>;
type CreatePostProps = {
  onPostCreated?: () => void;
};
 
export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const params = useParams();
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
 
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      images: [],
      country: "",
      city: "",
      startDate: undefined,
      endDate: undefined,
      people: 1,
    },
  });
 
  const watchCountry = watch("country");
  const watchImages = watch("images");
  const watchContent = watch("content");
  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");
 
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => res.json())
      .then((data) => setCountries(data.map((c: any) => c.name.common).sort()))
      .catch((err) => console.error("Failed to load countries", err));
  }, []);
 
  useEffect(() => {
    if (!watchCountry) {
      setCities([]);
      return;
    }
    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: watchCountry }),
    })
      .then((res) => res.json())
      .then((data) => setCities(data.data || []))
      .catch((err) => console.error("Failed to load cities", err));
  }, [watchCountry]);
 
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
 
    const formattedData = {
      ...data,
      startDate: data.startDate?.toISOString(),
      endDate: data.endDate?.toISOString(),
      userId: params.id,
      activities: selectedActivities,
    };
    try {
      await axiosInstance.post(`/post`, formattedData);
      console.log("✅ Post created successfully");
      if (onPostCreated) onPostCreated();
 
      reset();
      setIsExpanded(false);
    } catch (err) {
      console.error("❌ Post failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
 
    const uploadedUrls: string[] = [];
 
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "guideme"); // Change this to your actual unsigned preset
 
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
 
        const data = await res.json();
 
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          console.error("Image upload failed:", data);
        }
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    }
 
    // Update form state with uploaded image URLs
    setValue("images", [...(watchImages || []), ...uploadedUrls]);
    console.log("Updated images in form:", [
      ...(watchImages || []),
      ...uploadedUrls,
    ]);
  };
 
  const removeImage = (index: number) => {
    const updated = [...(watchImages || [])];
    updated.splice(index, 1);
    setValue("images", updated);
  };
 
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
 
  const handleDateChange = (type: "start" | "end", value: string) => {
    if (value) {
      const date = new Date(value);
      setValue(type === "start" ? "startDate" : "endDate", date);
    } else {
      setValue(type === "start" ? "startDate" : "endDate", undefined);
    }
  };
 
  const handleSelectedActivities = (value: string) => {
    setSelectedActivities((prev) => [
      ...prev,
      selectedActivities.includes(value) ? "" : value,
    ]);
  };
 
  const removeActivites = () => {
        selectedActivities.pop()
  }
 
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl opacity-50"></div>
 
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Post Your Adventure
            </h3>
            <p className="text-gray-600">
              Tell the world about your amazing journey!
            </p>
          </div>
 
          {/* Content Textarea */}
          <div className="relative">
            <textarea
              {...register("content")}
              onFocus={() => setIsExpanded(true)}
              placeholder="✨ What's your next adventure? Share your travel dreams, experiences, or ask for recommendations..."
              className="w-full p-6 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 resize-none transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 text-gray-800 placeholder-gray-500"
              rows={isExpanded ? 5 : 3}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <Heart size={14} />
                {errors.content.message}
              </p>
            )}
          </div>
 
          {isExpanded && (
            <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
              {/* Image Upload Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-700">
                      Photos (Optional)
                    </span>
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl cursor-pointer hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Camera size={18} />
                    Add Photo
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
 
                {watchImages && watchImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {watchImages.map((img, i) => (
                      <div key={i} className="relative group">
                        <div className="relative w-full h-28 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Adventure ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
 
              {/* Travel Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Location Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-700">
                      Destination
                    </span>
                  </div>
 
                  <div className="space-y-4">
                    {/* Country */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin size={14} className="text-green-600" />
                        Country *
                      </label>
                      <select
                        {...register("country")}
                        className="w-full p-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-white/80 transition-all duration-200"
                      >
                        <option value="">🌍 Select your destination</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
 
                    {/* City (Optional) */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mountain size={14} className="text-green-600" />
                        City (Optional)
                      </label>
                      <select
                        {...register("city")}
                        className="w-full p-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-white/80 transition-all duration-200"
                        disabled={!watchCountry}
                      >
                        <option value="">🏙️ Choose a city (optional)</option>
                        {cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
 
                {/* Travel Info Section */}
                <div className="space-y-6">
                  {/* Date Range (Optional) */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                      <Sun size={16} className="text-orange-600" />
                      Travel Dates (Optional)
                    </label>
 
                    <div className="grid grid-cols-2 gap-3">
                      {/* Start Date */}
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">
                          From
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={
                              watchStartDate
                                ? watchStartDate.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              handleDateChange("start", e.target.value)
                            }
                            className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white/80 transition-all duration-200 text-sm"
                          />
                          <Calendar className="absolute right-3 top-3 w-4 h-4 text-orange-400 pointer-events-none" />
                        </div>
                      </div>
 
                      {/* End Date */}
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">
                          To
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={
                              watchEndDate
                                ? watchEndDate.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              handleDateChange("end", e.target.value)
                            }
                            min={
                              watchStartDate
                                ? watchStartDate.toISOString().split("T")[0]
                                : undefined
                            }
                            className="w-full p-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white/80 transition-all duration-200 text-sm"
                          />
                          <Calendar className="absolute right-3 top-3 w-4 h-4 text-orange-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
 
                    {/* Date Display */}
                    {(watchStartDate || watchEndDate) && (
                      <div className="mt-3 p-3 bg-orange-100 rounded-lg">
                        <p className="text-sm text-orange-800">
                          📅{" "}
                          {watchStartDate
                            ? formatDate(watchStartDate)
                            : "Start date"}
                          {watchStartDate && watchEndDate && " → "}
                          {watchEndDate
                            ? formatDate(watchEndDate)
                            : watchStartDate
                            ? " → End date"
                            : ""}
                        </p>
                      </div>
                    )}
                  </div>
 
                  {/* People Count */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                      <Users size={16} className="text-purple-600" />
                      Travel Companions
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        max={50}
                        {...register("people", { valueAsNumber: true })}
                        className="w-full p-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 bg-white/80 transition-all duration-200"
                        placeholder="How many adventurers?"
                      />
                      <div className="absolute right-3 top-3 text-purple-400">
                        <Users size={18} />
                      </div>
                    </div>
                    {errors.people && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.people.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
 
              <div className="space-y-4">
                {/* Activities */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-rose-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Flag className="w-5 h-5 text-rose-600" />
                    <span className="font-semibold text-gray-700">
                      Activities
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    {selectedActivities.map((el, index) => (
                    <div key={index} className="flex bg-white/80 justify-center items-center border solid rounded-md px-2 py-0 gap-1 text-sm">
                      {el} <Button onClick={removeActivites} variant="ghost" className="flex justify-center items-center p-0" > <X className="w-1 h-1 p-0"/> </Button>
                    </div>
                  ))}
                  </div>
          
                  <Select
                    // {...register("activities")}
                    // value={activity}
                    onValueChange={(value) => handleSelectedActivities(value)}
                  >
                    <SelectTrigger className="w-full p-3 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:border-rose-400 bg-white/80 transition-all duration-200">
                      <SelectValue placeholder="Select a activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectActivites.map((act, index) => (
                          <SelectItem key={index} value={act.activity}>
                            {act.icon}{act.activity}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* {errors.activities && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.activities.message}
                        </p>
                      )} */}
                </div>
              </div>
 
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!watchContent.trim() || isSubmitting}
                  className="relative px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sharing Magic...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plane size={18} />
                      Post your trip
                    </div>
                  )}
 
                  {/* Sparkle animation */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-200"></div>
                    <div className="absolute bottom-2 left-4 w-1 h-1 bg-white rounded-full animate-ping animation-delay-400"></div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};