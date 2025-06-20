"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/context/ProfileContext";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Languages,
  Globe,
  Heart,
  Star,
  Car,
  Quote,
  Edit,
  Camera,
  Upload,
} from "lucide-react";
import { GuideProfileForm } from "../components/GuideProfileForm";
import { TouristProfileForm } from "../components/TouristProfileForm";

const getInitials = (name: string) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    currentRole,
    profileData,
    hasGuideProfile,
    hasTouristProfile,
    isLoading,
  } = useProfile();

  useEffect(() => {
    if (!session) {
      router.push("/log-in");
    }
  }, [session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading profile...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show profile form if no profile exists for current role
  if (currentRole === "Guide" && !hasGuideProfile) {
    return <GuideProfileForm />;
  }

  if (currentRole === "Tourist" && !hasTouristProfile) {
    return <TouristProfileForm />;
  }

  // Show existing profile data
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-gray-600">Profile not found</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              {currentRole === "Guide" ? (
                <MapPin className="h-8 w-8 text-blue-600" />
              ) : (
                <User className="h-8 w-8 text-purple-600" />
              )}
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {currentRole} Profile
              </CardTitle>
            </div>
            <p className="text-gray-600 text-lg">
              {currentRole === "Guide"
                ? "Your professional guide profile"
                : "Your tourist profile"}
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={profileData.profileimage}
                      alt={profileData.username}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {getInitials(profileData.username)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={() =>
                      router.push(`/${currentRole.toLowerCase()}Profile`)
                    }>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600">{profileData.username}</p>
                  <Badge variant="secondary" className="mt-2">
                    {currentRole}
                  </Badge>

                  {currentRole === "Guide" && profileData.slogan && (
                    <p className="text-gray-700 italic mt-2">
                      "{profileData.slogan}"
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900">{profileData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Gender
                    </label>
                    <p className="text-gray-900 capitalize">
                      {profileData.gender}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Location
                    </label>
                    <p className="text-gray-900">{profileData.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Languages className="h-4 w-4" />
                      Languages
                    </label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profileData.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* About Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Quote className="h-5 w-5" />
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {profileData.about}
                </p>
              </div>

              {/* Role-specific Information */}
              {currentRole === "Guide" && (
                <>
                  <Separator />
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Guide Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Price per Day
                        </label>
                        <p className="text-gray-900">${profileData.price}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Experience
                        </label>
                        <p className="text-gray-900">
                          {profileData.experience} years
                        </p>
                      </div>
                    </div>

                    {profileData.activities &&
                      profileData.activities.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            Activities & Specialties
                          </label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {profileData.activities.map((activity) => (
                              <Badge key={activity} variant="secondary">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-500">
                        Vehicle Available:
                      </span>
                      <Badge
                        variant={profileData.car ? "default" : "secondary"}>
                        {profileData.car ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </>
              )}

              {currentRole === "Tourist" &&
                profileData.interests &&
                profileData.interests.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Travel Preferences
                      </h3>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Travel Style
                        </label>
                        <p className="text-gray-900">
                          {profileData.travelStyle}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Interests
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profileData.interests.map((interest) => (
                            <Badge key={interest} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

              <Separator />

              {/* Social Media */}
              {profileData.socialAddress && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Social Media
                  </h3>
                  <a
                    href={profileData.socialAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline">
                    {profileData.socialAddress}
                  </a>
                </div>
              )}

              {/* Edit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  onClick={() =>
                    router.push(`/${currentRole.toLowerCase()}Profile`)
                  }
                  className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
