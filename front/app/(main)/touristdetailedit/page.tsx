"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  MapPin,
  User,
  FileText,
  Save,
  X,
  Edit3,
  Globe,
  Star,
  Award,
  Users,
} from "lucide-react";

export default function EditProfile() {
  const [profileData, setProfileData] = useState({
    name: "Batbayar Monk",
    location: "Ulaanbaatar, Mongolia",
    about:
      "I am a tour guide introducing Mongolia’s rich culture, history, and nature. With 10 years of experience, I provide memorable journeys for travelers.",
    profileImage: "/placeholder.svg?height=120&width=120",
    backgroundImage: "/placeholder.svg?height=300&width=800",
    specialties: ["Cultural Tours", "Nature Trips", "Historical Sites"],
    languages: ["Mongolian", "English", "Chinese"],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: "profileImage" | "backgroundImage") => {
    console.log(`Uploading ${field}`);
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cffafe] via-white to-[#cbd5e1] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="relative h-64 bg-gradient-to-r from-[#06b6d4] to-[#14b8a6]">
            <img
              src={profileData.backgroundImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />

            <Button
              onClick={() => handleImageUpload("backgroundImage")}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
              size="sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Change Background
            </Button>

            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <Button
                  onClick={() => handleImageUpload("profileImage")}
                  className="absolute bottom-2 right-2 w-8 h-8 p-0 bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-white rounded-full"
                  size="sm"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-4">
              {[
                {
                  label: "Trust",
                  icon: <Star className="w-4 h-4" />,
                },
                {
                  label: "Trips",
                  icon: <Globe className="w-4 h-4" />,
                },
                {
                  label: "Likes",
                  icon: <Users className="w-4 h-4" />,
                },
              ].map(({ label, icon }, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-center flex flex-col items-center"
                >
                  <div className="text-lg font-bold flex items-center gap-1">
                    {icon}
                  </div>
                  <div className="text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-20 pb-6 px-8 flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-[#22d3ee] fill-current" />
                <Badge className="bg-[#06b6d4] text-white">Enjoy</Badge>
                <Badge className="bg-[#14b8a6] text-white">Verified</Badge>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={`${
                isEditing
                  ? "bg-[#475569] hover:bg-[#334155]"
                  : "bg-[#06b6d4] hover:bg-[#06b6d4]/90"
              } text-white`}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Basic Info + About */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#334155]">
                  <User className="w-5 h-5" />
                  Basic Info
                </CardTitle>
                <CardDescription>
                  Your name and location details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#475569] font-medium">
                    Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="border-[#cbd5e1] focus:border-[#06b6d4] focus:ring-[#06b6d4]"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-[#334155]">
                      {profileData.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-[#475569] font-medium flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="border-[#cbd5e1] focus:border-[#06b6d4] focus:ring-[#06b6d4]"
                    />
                  ) : (
                    <p className="text-[#475569] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#22d3ee]" />
                      {profileData.location}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#334155]">
                  <FileText className="w-5 h-5" />
                  About Me
                </CardTitle>
                <CardDescription>
                  Introduce yourself and your experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.about}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    rows={6}
                    className="border-[#cbd5e1] focus:border-[#06b6d4] focus:ring-[#06b6d4] resize-none"
                    placeholder="Introduce yourself..."
                  />
                ) : (
                  <p className="text-[#475569] leading-relaxed">
                    {profileData.about}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Specialties, Languages, Stats */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#334155]">
                  <Award className="w-5 h-5" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.map((item, i) => (
                    <Badge
                      key={i}
                      className="bg-[#22d3ee]/20 text-[#06b6d4] hover:bg-[#22d3ee]/30"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#334155]">
                  <Globe className="w-5 h-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((lang, i) => (
                    <Badge
                      key={i}
                      className="bg-[#2dd4bf]/20 text-[#14b8a6] hover:bg-[#2dd4bf]/30"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#06b6d4] to-[#14b8a6] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              size="lg"
              className="bg-[#14b8a6] hover:bg-[#14b8a6]/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
