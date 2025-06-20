import {
  Calendar,
  Globe,
  MapPin,
  MessageCircle,
  Users,
  VenusAndMarsIcon,
  Pencil,
  Save,
  UploadCloud,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PostType } from "../../Travelersinfo/page";
import { OnlineUsers } from "./TouristMainProfile";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/utils";
import { motion } from "framer-motion";

export type TouristProfile = {
  _id: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
  gender: string;
  languages: string[];
  location: string;
  profileimage: string;
  backgroundimage: string;
  socialAddress: string;
  about: string;
  createdAt: string;
  updatedAt: string;
};

type MainProfileProps = {
  tourist: TouristProfile;
  post: PostType[];
  chat: boolean;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  onlineUsers: OnlineUsers;
};

export const MainProfile = ({
  tourist,
  post,
  chat,
  setChat,
  onlineUsers,
}: MainProfileProps) => {
  const params = useParams();
  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [backgroundImageLoading, setBackgroundImageLoading] = useState(false);

  const [editedTourist, setEditedTourist] = useState({
    username: tourist?._id.username || "",
    profileimage: tourist?.profileimage || "",
    backgroundimage: tourist?.backgroundimage || "",
    about: tourist?.about || "",
    location: tourist?.location || "",
    languages: tourist?.languages?.join(", ") || "",
    gender: tourist?.gender || "",
  });

  const handleInput = (field: keyof typeof editedTourist, value: string) => {
    setEditedTourist((prev) => ({ ...prev, [field]: value }));
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
        {
          method: "POST",
          body: form,
        }
      );
      const result = await res.json();
      if (result.secure_url) {
        handleInput("backgroundimage", result.secure_url);
      }
    } catch (err) {
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

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToSend = {
        ...editedTourist,
        languages: editedTourist.languages
          .split(",")
          .map((lang: string) => lang.trim())
          .filter((lang: string) => lang.length > 0),
      };
      const response = await axiosInstance.put(
        `/tprofile/edit/${profileId}`,
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

  if (!profileId) {
    return <p>User ID not found in URL params.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="bg-white rounded-4xl overflow-hidden shadow-2xl border-0">
        {/* Cover Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          {editedTourist.backgroundimage ? (
            <Image
              src={editedTourist.backgroundimage}
              alt="Cover"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-gray-500" />
            </div>
          )}

          {isEditing && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300">
              <div className="text-center">
                {editedTourist.backgroundimage ? (
                  <Button
                    onClick={handleDeleteBackgroundImage}
                    variant="destructive"
                    size="sm"
                    disabled={backgroundImageLoading}
                    className="rounded-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                ) : (
                  <label className="cursor-pointer">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 hover:bg-white/30 transition-colors shadow-lg">
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

          {/* Edit Button */}
          <div className="absolute top-6 right-6">
            {isEditing ? (
              <Button
                onClick={handleSave}
                disabled={loading}
                size="lg"
                className="rounded-full bg-green-600 hover:bg-green-700">
                <Save className="w-5 h-5 mr-2" />{" "}
                {loading ? "Saving..." : "Save"}
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                size="lg"
                className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
                <Pencil className="w-5 h-5 mr-2" /> Edit
              </Button>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 md:px-12 pb-12 -mt-20 md:-mt-24">
          {/* Profile Image */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white flex-shrink-0">
              {isEditing ? (
                <div className="relative w-full h-full">
                  {editedTourist.profileimage ? (
                    <>
                      <Image
                        src={editedTourist.profileimage}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={handleDeleteImage}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                          disabled={imageLoading}>
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-center p-2 bg-gray-100 hover:bg-gray-200 transition">
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
                  src={tourist?.profileimage || "/user.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}

              {/* Online Status */}
              {onlineUsers[profileId]?.isOnline ? (
                <div className="absolute bottom-2 right-2 w-7 h-7 animate-pulse bg-green-500 border-4 border-white rounded-full"></div>
              ) : (
                <div className="absolute bottom-2 right-2 w-7 h-7 bg-gray-400 border-4 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 mt-4 md:mt-0 text-center md:text-left">
              {isEditing ? (
                <Input
                  value={editedTourist.username}
                  onChange={(e) => handleInput("username", e.target.value)}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 bg-gray-100 border-2 border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                />
              ) : (
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                  {tourist?._id.username}
                </h1>
              )}
              <p className="text-lg text-gray-500 mt-2">
                Travel Enthusiast & Storyteller
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                {/* About Section */}
                <div className="p-8 bg-gray-50 rounded-2xl shadow-inner mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    About Me
                  </h3>
                  {isEditing ? (
                    <Textarea
                      value={editedTourist.about}
                      onChange={(e) => handleInput("about", e.target.value)}
                      placeholder="Tell others about yourself..."
                      className="h-40 bg-white text-md"
                    />
                  ) : (
                    <p className="text-md text-gray-600 leading-relaxed">
                      {tourist?.about || "No details provided."}
                    </p>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Location", field: "location" },
                    { icon: Globe, label: "Languages", field: "languages" },
                    {
                      icon: VenusAndMarsIcon,
                      label: "Gender",
                      field: "gender",
                    },
                    { icon: Calendar, label: "Joined", field: "createdAt" },
                  ].map(({ icon: Icon, label, field }) => (
                    <div key={field} className="flex items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-500">{label}</p>
                        {isEditing && field !== "createdAt" ? (
                          <Input
                            value={
                              editedTourist[
                                field as keyof Omit<
                                  typeof editedTourist,
                                  "createdAt"
                                >
                              ]
                            }
                            onChange={(e) =>
                              handleInput(
                                field as keyof typeof editedTourist,
                                e.target.value
                              )
                            }
                            className="text-lg font-medium text-gray-800"
                            placeholder={
                              label === "Languages" ? "Comma-separated" : ""
                            }
                          />
                        ) : (
                          <p className="text-lg font-medium text-gray-800 capitalize">
                            {field === "createdAt"
                              ? new Date(
                                  tourist?.createdAt ?? ""
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                })
                              : editedTourist[
                                  field as keyof typeof editedTourist
                                ] || "Not specified"}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                    <div className="text-3xl font-bold text-blue-900">
                      {post.length}
                    </div>
                    <div className="text-sm text-blue-700 mt-1">Posts</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                    <div className="text-3xl font-bold text-green-900">{2}</div>
                    <div className="text-sm text-green-700 mt-1">Liked by</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-900">
                      {1}
                    </div>
                    <div className="text-sm text-purple-700 mt-1">Liked</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-8 bg-gray-50 rounded-2xl shadow-inner">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Connect
                  </h3>
                  <button
                    onClick={() => setChat(!chat)}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                    <MessageCircle className="w-6 h-6" />
                    Start Conversation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
