"use client";

import {
  Camera,
  Upload,
  User,
  MapPin,
  Languages,
  Globe,
  Heart,
  Car,
  Star,
  Quote,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/translationHelpers";
import { motion } from "framer-motion";

// Base schema for both profiles
const baseSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(1, "Location is required"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  about: z.string().min(10, "About must be at least 10 characters"),
  profileimage: z.string().min(1, "Profile image is required"),
  socialAddress: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

// Guide-specific schema
const guideSchema = baseSchema.extend({
  price: z.string().min(1, "Price is required"),
  experience: z.string().min(1, "Experience is required"),
  slogan: z.string().min(5, "Slogan must be at least 5 characters"),
  activities: z.array(z.string()).min(1, "Select at least one activity"),
  car: z.boolean(),
  backgroundimage: z.string().optional(),
});

// Tourist-specific schema
const touristSchema = baseSchema.extend({
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  travelStyle: z.string().min(1, "Travel style is required"),
});

type GuideProfile = z.infer<typeof guideSchema>;
type TouristProfile = z.infer<typeof touristSchema>;

interface UnifiedProfileFormProps {
  type: "guide" | "tourist";
  initialData?: any;
}

const activityOptions = [
  "Hiking",
  "Camping",
  "Rock Climbing",
  "Mountain Biking",
  "Skiing",
  "Snowboarding",
  "Water Sports",
  "Cultural Tours",
  "Food Tours",
  "Photography",
  "Wildlife Watching",
  "Historical Sites",
  "Museums",
  "Shopping",
  "Nightlife",
  "Relaxation",
  "Adventure Sports",
];

const interestOptions = [
  "Culture",
  "History",
  "Nature",
  "Adventure",
  "Food",
  "Photography",
  "Art",
  "Music",
  "Sports",
  "Shopping",
  "Relaxation",
  "Nightlife",
  "Architecture",
  "Local Life",
];

const travelStyleOptions = [
  "Budget Traveler",
  "Luxury Traveler",
  "Backpacker",
  "Family Traveler",
  "Solo Traveler",
  "Group Traveler",
  "Business Traveler",
  "Digital Nomad",
];

export function UnifiedProfileForm({
  type,
  initialData,
}: UnifiedProfileFormProps) {
  const { user } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
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

  const schema = type === "guide" ? guideSchema : touristSchema;
  const form = useForm<GuideProfile | TouristProfile>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user?.name || "",
      firstName: "",
      lastName: "",
      email: user?.email || "",
      gender: "",
      location: "",
      languages: [],
      about: "",
      profileimage: "",
      socialAddress: "",
      ...(type === "guide"
        ? {
            price: "",
            experience: "",
            slogan: "",
            activities: [],
            car: false,
            backgroundimage: "",
          }
        : {
            interests: [],
            travelStyle: "",
          }),
    },
  });

  // Fetch countries and languages
  useEffect(() => {
    const fetchData = async () => {
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
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Load initial data
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      if (initialData.profileimage) {
        setPreviewUrl(initialData.profileimage);
      }
      if (initialData.backgroundimage) {
        setBackgroundPreviewUrl(initialData.backgroundimage);
      }
    }
  }, [initialData, form]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "background"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    if (type === "profile") {
      setPreviewUrl(objectUrl);
    } else {
      setBackgroundPreviewUrl(objectUrl);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "guideme");

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
        if (type === "profile") {
          form.setValue("profileimage", data.secure_url);
        } else {
          form.setValue("backgroundimage", data.secure_url);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (values: GuideProfile | TouristProfile) => {
    try {
      if (type === "guide") {
        await axiosInstance.post("/gprofile", values);
      } else {
        await axiosInstance.post("/tprofile", values);
      }
      router.push("/");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              {type === "guide" ? (
                <MapPin className="h-8 w-8 text-blue-600" />
              ) : (
                <User className="h-8 w-8 text-purple-600" />
              )}
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {type === "guide" ? "Guide Profile" : "Tourist Profile"}
              </CardTitle>
            </div>
            <p className="text-gray-600 text-lg">
              {type === "guide"
                ? "Create your professional guide profile to connect with travelers"
                : "Tell us about yourself to find the perfect guides"}
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
                    <FormField
                      control={form.control}
                      name="profileimage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                            <Camera className="h-5 w-5" />
                            Profile Photo
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Background Image (Guide only) */}
                  {type === "guide" && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="backgroundimage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                              <Globe className="h-5 w-5" />
                              Background Image
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
                                onChange={(e) =>
                                  handleImageUpload(e, "background")
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <SelectValue placeholder="Select your gender" />
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
                  </div>
                </div>

                <Separator />

                {/* Location & Languages */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location & Languages
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <SelectValue placeholder="Select your location" />
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
                  </div>
                </div>

                <Separator />

                {/* About Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Quote className="h-5 w-5" />
                    About
                  </h3>

                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell us about yourself</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-32 border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                            placeholder={
                              type === "guide"
                                ? "Describe your guiding experience, specialties, and what makes you unique..."
                                : "Tell us about your travel interests, experiences, and what you're looking for..."
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Guide-specific fields */}
                {type === "guide" && (
                  <>
                    <Separator />
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Guide Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price per Day ($)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                                  placeholder="Enter your daily rate"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years of Experience</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                                  placeholder="Enter years of experience"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="slogan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Slogan</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                                placeholder="Your professional tagline"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="activities"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Heart className="h-4 w-4" />
                              Activities & Specialties
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
                                  <SelectValue placeholder="Select activities" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {activityOptions.map((activity) => (
                                  <SelectItem key={activity} value={activity}>
                                    {activity}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.value?.map((activity) => (
                                <Badge
                                  key={activity}
                                  variant="secondary"
                                  className="cursor-pointer hover:bg-red-100"
                                  onClick={() => {
                                    field.onChange(
                                      field.value?.filter((a) => a !== activity)
                                    );
                                  }}>
                                  {activity} ×
                                </Badge>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="car"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base flex items-center gap-2">
                                <Car className="h-4 w-4" />
                                Vehicle Available
                              </FormLabel>
                              <div className="text-sm text-gray-500">
                                Do you have a vehicle for transportation?
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                {/* Tourist-specific fields */}
                {type === "tourist" && (
                  <>
                    <Separator />
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Travel Preferences
                      </h3>

                      <FormField
                        control={form.control}
                        name="travelStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Travel Style</FormLabel>
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

                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interests</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                const current = field.value || [];
                                if (!current.includes(value)) {
                                  field.onChange([...current, value]);
                                }
                              }}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                                  <SelectValue placeholder="Select your interests" />
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
                  </>
                )}

                <Separator />

                {/* Social Media */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Social Media
                  </h3>

                  <FormField
                    control={form.control}
                    name="socialAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Social Media Link (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                            placeholder="https://instagram.com/yourprofile"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {type === "guide"
                      ? "Create Guide Profile"
                      : "Create Tourist Profile"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
