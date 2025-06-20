"use client";

import {
  Camera,
  Upload,
  User,
  MapPin,
  Languages,
  Globe,
  Heart,
  Plane,
  Quote,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/app/context/ProfileContext";
import { useSession } from "next-auth/react";

const touristProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Must be a valid email"),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(1, "Location is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  about: z.string().min(10, "About must be at least 10 characters"),
  profileimage: z.string().min(1, "Profile image is required"),
  backgroundimage: z.string().optional(),
  socialAddress: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  travelStyle: z.string().min(1, "Travel style is required"),
});

type TouristProfile = z.infer<typeof touristProfileSchema>;

const interestOptions = [
  "Adventure",
  "Culture",
  "Food & Dining",
  "Nature",
  "History",
  "Photography",
  "Shopping",
  "Relaxation",
  "Sports",
  "Art & Museums",
  "Music",
  "Nightlife",
  "Architecture",
  "Wildlife",
  "Beach",
  "Mountains",
  "City Life",
  "Rural Life",
];

const travelStyleOptions = [
  "Budget Traveler",
  "Luxury Traveler",
  "Backpacker",
  "Family Traveler",
  "Solo Traveler",
  "Group Traveler",
  "Business Traveler",
  "Adventure Seeker",
  "Cultural Explorer",
  "Relaxation Seeker",
];

export const TouristProfileForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { updateProfile, refreshProfiles } = useProfile();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<
    string | null
  >(null);
  const [languageOptions, setLanguageOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [countryOptions, setCountryOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const form = useForm<TouristProfile>({
    resolver: zodResolver(touristProfileSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: session?.user?.email || "",
      gender: "",
      location: "",
      languages: [],
      about: "",
      profileimage: "",
      backgroundimage: "",
      socialAddress: "",
      interests: [],
      travelStyle: "",
    },
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch countries
        const countriesRes = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const countriesData = await countriesRes.json();
        const countries = countriesData
          .map((country: any) => ({
            label: country.name.common,
            value: country.name.common,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label));
        setCountryOptions(countries);

        // Fetch languages
        const languagesRes = await fetch(
          "https://restcountries.com/v3.1/all?fields=languages"
        );
        const languagesData = await languagesRes.json();
        const langsSet = new Set<string>();
        languagesData.forEach((country: any) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang: any) =>
              langsSet.add(lang)
            );
          }
        });
        const languages = Array.from(langsSet)
          .sort()
          .map((lang) => ({ label: lang, value: lang }));
        setLanguageOptions(languages);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "background"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.url;

        if (type === "profile") {
          form.setValue("profileimage", imageUrl);
          setPreviewUrl(imageUrl);
        } else {
          form.setValue("backgroundimage", imageUrl);
          setBackgroundPreviewUrl(imageUrl);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (data: TouristProfile) => {
    try {
      await updateProfile(data, "Tourist");
      await refreshProfiles();
      router.push(`/Touristdetail/${session?.user?.id}`);
    } catch (error) {
      console.error("Error creating tourist profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Plane className="h-8 w-8 text-purple-600" />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Tourist Profile
              </CardTitle>
            </div>
            <p className="text-gray-600 text-lg">
              Set up your tourist profile to discover amazing travel experiences
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                {/* Profile Images Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Profile Image */}
                  <div className="space-y-4">
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Profile Image
                    </FormLabel>
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "profile")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="profileimage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} className="hidden" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Background Image */}
                  <div className="space-y-4">
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Background Image (Optional)
                    </FormLabel>
                    <div className="relative">
                      <div className="w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                        {backgroundPreviewUrl ? (
                          <img
                            src={backgroundPreviewUrl}
                            alt="Background preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "background")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="backgroundimage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} className="hidden" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              placeholder="Enter your username"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              placeholder="Enter your first name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              placeholder="Enter your last name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              placeholder="Enter your email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countryOptions.map((country) => (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Languages */}
                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Languages className="h-4 w-4" />
                          Languages
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const current = field.value || [];
                            if (!current.includes(value)) {
                              field.onChange([...current, value]);
                            }
                          }}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                              <SelectValue placeholder="Select languages" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languageOptions.map((language) => (
                              <SelectItem
                                key={language.value}
                                value={language.value}>
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value?.map((lang) => (
                            <Badge
                              key={lang}
                              variant="secondary"
                              className="cursor-pointer hover:bg-red-100"
                              onClick={() => {
                                field.onChange(
                                  field.value?.filter((l) => l !== lang)
                                );
                              }}>
                              {lang} ×
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* About */}
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-24 border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                            placeholder="Tell us about yourself, your travel experiences, and what you're looking for..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tourist Specific Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    Travel Preferences
                  </h3>

                  <FormField
                    control={form.control}
                    name="travelStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          Travel Style
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                              <SelectValue placeholder="Select your travel style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {travelStyleOptions.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Interests */}
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Travel Interests
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const current = field.value || [];
                            if (!current.includes(value)) {
                              field.onChange([...current, value]);
                            }
                          }}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                              <SelectValue placeholder="Select interests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {interestOptions.map((interest) => (
                              <SelectItem key={interest} value={interest}>
                                {interest}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value?.map((interest) => (
                            <Badge
                              key={interest}
                              variant="secondary"
                              className="cursor-pointer hover:bg-red-100"
                              onClick={() => {
                                field.onChange(
                                  field.value?.filter((i) => i !== interest)
                                );
                              }}>
                              {interest} ×
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Social Media */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Social Media
                  </h3>

                  <FormField
                    control={form.control}
                    name="socialAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Media Profile (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="url"
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                            placeholder="https://instagram.com/yourprofile"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Create Tourist Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
