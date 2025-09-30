"use client";

import {
  BadgeCheck,
  Globe,
  MapPin,
  MessageCircle,
  Pencil,
  Star,
  VenusAndMars,
  Save,
  UploadCloud,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Ebooking from "./Ebooking";
import { Review } from "./Review";
import { Subscription } from "./Subscription";
import { GuideProfile } from "./GuideMainProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/utils";
import { motion } from "framer-motion";

export interface GuideCardProps {
  guide: GuideProfile;
  guideId: string;
  chat: boolean;
  setChat: (state: boolean) => void;
  onlineStatus: boolean;
  currentUserId?: string; // 🔑 нэмсэн
}

export const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  guideId,
  chat,
  setChat,
  onlineStatus,
  currentUserId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [backgroundImageLoading, setBackgroundImageLoading] = useState(false);

  const [editedGuide, setEditedGuide] = useState({
    username: guide.username,
    profileimage: guide.profileimage || "",
    backgroundimage: guide.backgroundimage || "",
    about: guide.about,
    location: guide.location,
    languages: Array.isArray(guide.languages) ? guide.languages.join(", ") : "",
    gender: guide.gender,
  });

  const handleInput = (field: keyof typeof editedGuide, value: string) => {
    setEditedGuide((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "guideme");

    setImageLoading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: form }
      );
      const result = await res.json();
      if (result.secure_url) {
        handleInput("profileimage", result.secure_url);
      }
    } catch {
      alert("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  const handleBackgroundImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "guideme");

    setBackgroundImageLoading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: form }
      );
      const result = await res.json();
      if (result.secure_url) {
        handleInput("backgroundimage", result.secure_url);
      }
    } catch {
      alert("Background image upload failed");
    } finally {
      setBackgroundImageLoading(false);
    }
  };

  const handleDeleteImage = () => {
    handleInput("profileimage", "");
  };

  const handleDeleteBackgroundImage = () => {
    handleInput("backgroundimage", "");
  };
  console.log(guide.likedBy, " likedBy");

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToSend = {
        ...editedGuide,
        languages: editedGuide.languages
          .split(",")
          .map((lang: string) => lang.trim())
          .filter((lang: string) => lang.length > 0),
      };
      await axiosInstance.put(`/gprofile/edit/${guideId}`, dataToSend);
      alert("Profile saved successfully!");
      setIsEditing(false);
    } catch (err: any) {
      alert("Error saving profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-6xl mx-auto shadow-2xl rounded-4xl overflow-hidden border-0">
        {/* Background Image */}
        <div className="relative w-full h-64 md:h-80">
          {editedGuide.backgroundimage ? (
            <Image
              src={editedGuide.backgroundimage}
              alt="Background"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-gray-500" />
            </div>
          )}

          {/* Upload/Edit Background when editing */}
          {isEditing && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center">
                {editedGuide.backgroundimage ? (
                  <Button
                    onClick={handleDeleteBackgroundImage}
                    variant="destructive"
                    size="sm"
                    disabled={backgroundImageLoading}
                    className="rounded-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                ) : (
                  <label className="cursor-pointer">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 hover:bg-white/30 shadow-lg">
                      {backgroundImageLoading ? (
                        <div className="text-white font-semibold">
                          Uploading...
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-white">
                          <UploadCloud className="w-10 h-10" />
                          <span className="font-semibold">
                            Upload Background
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleBackgroundImageUpload}
                        disabled={backgroundImageLoading}
                      />
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Edit button зөвхөн өөрийн profile үед харагдана */}
          {currentUserId === guideId && (
            <div className="absolute top-6 right-6">
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  size="lg"
                  className="rounded-full bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? "Saving..." : "Save"}
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  size="lg"
                  className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                >
                  <Pencil className="w-5 h-5 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative p-6 -mt-24">
          <div className="flex flex-col md:flex-row items-center md:items-end md:gap-8">
            {/* Profile Image */}
            <div className="relative w-40 h-40 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white flex-shrink-0">
              {isEditing ? (
                <div className="relative w-full h-full">
                  {editedGuide.profileimage ? (
                    <>
                      <Image
                        src={editedGuide.profileimage}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100">
                        <button
                          onClick={handleDeleteImage}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          disabled={imageLoading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-center bg-gray-100 hover:bg-gray-200">
                      {imageLoading ? (
                        "Uploading..."
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 text-gray-500" />
                          <span className="mt-2 text-xs font-semibold text-gray-600">
                            Upload Photo
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                        disabled={imageLoading}
                      />
                    </label>
                  )}
                </div>
              ) : (
                <Image
                  src={guide.profileimage || "/user.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}
              <span
                className={`absolute bottom-2 right-2 w-6 h-6 border-4 border-white rounded-full ${
                  onlineStatus ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              />
            </div>

            {/* Name & Rating */}
            <div className="flex-1 mt-4 md:mt-0 text-center md:text-left">
              {isEditing ? (
                <Input
                  value={editedGuide.username}
                  onChange={(e) => handleInput("username", e.target.value)}
                  className="text-4xl font-bold text-gray-800 bg-gray-100 border-2 border-gray-200"
                />
              ) : (
                <h1 className="text-4xl font-bold text-gray-800">
                  {guide.username}
                </h1>
              )}
              <div className="flex w-fit h-fit">
                <div className="flex gap-3 items-center text-md text-gray-500 mt-2 justify-center md:justify-start">
                  <BadgeCheck className="w-5 h-5 text-blue-500" />
                  <span>Verified Guide</span>
                  <span className="text-gray-300">|</span>
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{guide.rating || "No ratings"}</span>
                </div>
                <div className="mt-8 w-full h-auto flex items-center justify-center">
                  <Review userId={guideId} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="px-6 py-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* About & Details */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🌿 About Me
                </h2>
                {isEditing ? (
                  <Textarea
                    value={editedGuide.about}
                    onChange={(e) => handleInput("about", e.target.value)}
                    placeholder="Tell travelers about yourself..."
                    className="h-40 bg-gray-50 text-md"
                  />
                ) : (
                  <p className="text-md text-gray-600 leading-relaxed whitespace-pre-line">
                    {guide.about || "No description provided."}
                  </p>
                )}
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Key Details
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Location", field: "location" },
                    { icon: Globe, label: "Languages", field: "languages" },
                    { icon: VenusAndMars, label: "Gender", field: "gender" },
                  ].map(({ icon: Icon, label, field }) => (
                    <div key={field} className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-500">{label}</p>
                        {isEditing ? (
                          <Input
                            value={
                              editedGuide[field as keyof typeof editedGuide]
                            }
                            onChange={(e) =>
                              handleInput(
                                field as keyof typeof editedGuide,
                                e.target.value
                              )
                            }
                            className="text-lg font-medium text-gray-800"
                          />
                        ) : (
                          <p className="text-lg font-medium text-gray-800">
                            {editedGuide[field as keyof typeof editedGuide] ||
                              "Not specified"}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-900">{0}</div>
                  <div className="text-sm text-blue-700 mt-1">Posts</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                  <div className="text-3xl font-bold text-green-900">
                    {guide.likedBy.length || 0}
                  </div>
                  <div className="text-sm text-green-700 mt-1">Liked by</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-between items-center shadow-inner">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Connect
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setChat(!chat)}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-sky-700 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <MessageCircle className="w-6 h-6" />
                      Start Conversation
                    </button>
                    <Ebooking />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
