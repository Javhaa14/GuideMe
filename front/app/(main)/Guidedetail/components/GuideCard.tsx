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
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Ebooking from "./Ebooking";
import { Review } from "./Review";
import { Subscription } from "./Subscription";
import { GuideProfile } from "./GuideMainProfile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/utils";

interface GuideCardProps {
  guide: GuideProfile;
  guideId: { _id: string };
  chat: boolean;
  setChat: (value: boolean) => void;
  onlineStatus: boolean;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  guideId,
  chat,
  setChat,
  onlineStatus,
}) => {
  console.log(guideId._id);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [editedGuide, setEditedGuide] = useState({
    username: guide.username,
    profileimage: guide.profileimage || "",
    about: guide.about,
    location: guide.location,
    languages: (guide.languages as any).join(", "),
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
        {
          method: "POST",
          body: form,
        }
      );
      const result = await res.json();
      if (result.secure_url) {
        handleInput("profileimage", result.secure_url);
      }
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  const handleDeleteImage = () => {
    handleInput("profileimage", "");
  };

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
      const response = await axiosInstance.put(
        `/gprofile/edit/${guideId._id}`,
        dataToSend
      );
      console.log("Updated:", response.data);
      alert("Profile saved successfully!");
      setIsEditing(false);
    } catch (err: any) {
      alert("Error saving profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-6xl mx-auto backdrop-blur-lg shadow-lg hover:scale-[1.01] transition-transform">
      <CardHeader className="bg-gradient-to-br from-indigo-600 to-rose-500 text-white rounded-t-3xl px-8 py-10">
        <div className="flex items-center gap-6">
          <div className="relative w-36 h-36 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
            {editedGuide.profileimage && !isEditing && (
              <Image
                src={editedGuide.profileimage}
                alt="Profile"
                fill
                className="object-cover"
              />
            )}
            {isEditing && (
              <div className="relative w-full h-full">
                {editedGuide.profileimage ? (
                  <>
                    <Image
                      src={editedGuide.profileimage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                      disabled={imageLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-center px-2">
                    {imageLoading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <UploadCloud />
                        <span className="mt-2 text-xs">Upload image</span>
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
            )}
            <span
              className={`absolute button-2 left-2 w-5 h-5 border-2 border-white rounded-full ${
                onlineStatus ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            />
          </div>

          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editedGuide.username}
                onChange={(e) => handleInput("username", e.target.value)}
                className="text-2xl font-bold text-black"
              />
            ) : (
              <h1 className="text-3xl font-extrabold">
                {editedGuide.username}
              </h1>
            )}
            <div className="flex gap-3 items-center text-sm mt-2">
              <span>🌏 Travel Enthusiast</span>
              <Badge className="bg-green-500 text-white flex items-center gap-1 rounded-full px-2">
                <BadgeCheck className="w-4 h-4" />
                Verified
              </Badge>
            </div>
          </div>

          <div>
            {isEditing ? (
              <Button onClick={handleSave} disabled={loading}>
                <Save className="mr-1" /> {loading ? "Saving..." : "Save"}
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Pencil className="mr-1" /> Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="bg-white rounded-b-3xl px-6 py-6">
        <div className="mb-6">
          <h2 className="font-semibold mb-2">🌿 About</h2>
          {isEditing ? (
            <Textarea
              value={editedGuide.about}
              onChange={(e) => handleInput("about", e.target.value)}
              placeholder="Tell travelers about yourself..."
            />
          ) : (
            <p className="whitespace-pre-line">
              {editedGuide.about || "No description provided"}
            </p>
          )}
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-3 my-6">
          {["location", "languages", "gender"].map((field) => {
            const iconMap: any = {
              location: <MapPin />,
              languages: <Globe />,
              gender: <VenusAndMars />,
            };
            return (
              <div
                key={field}
                className="p-4 border rounded-lg hover:shadow-md transition"
              >
                {isEditing ? (
                  <Input
                    value={editedGuide[field as keyof typeof editedGuide]}
                    onChange={(e) =>
                      handleInput(
                        field as keyof typeof editedGuide,
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2 font-medium">
                    {iconMap[field]}{" "}
                    {editedGuide[field as keyof typeof editedGuide] ||
                      "Not specified"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={() => setChat(!chat)}>
            <MessageCircle className="mr-2" /> Chat
          </Button>
          <Review userId={guideId._id} />
          <Subscription />
          <Ebooking />
        </div>
      </CardContent>
    </Card>
  );
};
