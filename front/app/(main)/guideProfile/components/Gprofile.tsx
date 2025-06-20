"use client";

import {
  Camera,
  Quote,
  User,
  MapPin,
  Languages,
  Globe,
  Heart,
  Car,
  Star,
  Upload,
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import dynamic from "next/dynamic";
import { SingleSelect, type OptionType } from "./Selectwrapper";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LocationFilterCard } from "../../Guidesinfo/components/SearchLocation";
import { useSearchLocation } from "@/app/context/SearchLocationContext";
import { fetchTProfile } from "@/app/utils/fetchProfile";

const MultiSelect = dynamic(
  () => import("./Selectwrapper").then((mod) => mod.MultiSelect),
  { ssr: false }
);

export interface TouristProfile {
  firstName?: string;
  lastName?: string;
  email: string;
  gender?: string;
  location?: string;
  languages?: string[];
  socialAddress?: string;
  profileimage?: string;
  backgroundimage?: string | null;
  price?: string;
  experience?: string;
  about?: string;
  slogan?: string;
  activities?: string[];
  car?: boolean;
}

const formSchema = z.object({
  username: z.string().min(2, "Username is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(1, "Location is required"),
  languages: z
    .array(z.string())
    .min(1, { message: "Select at least one language" }),
  socialAddress: z.string().min(2, "Social media link is required"),
  profileimage: z.string().min(1, "Profile image is required"),
  backgroundimage: z.string().nullable().optional(),
  price: z.string().min(1, "Price is required"),
  experience: z.string().min(1, "Experience is required"),
  about: z.string().min(1, "About is required"),
  slogan: z.string().min(1, "Slogan is required"),
  activities: z
    .array(z.string())
    .min(1, { message: "Select at least one activity" }),
  car: z.boolean(),
});

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

export function GProfile() {
  const { user } = useUser();
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [languageOptions, setLanguageOptions] = useState<OptionType[]>([]);
  const [tourist, setTourist] = useState<TouristProfile>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<
    string | null
  >(null);
  const { searchedValue, setSearchedValue } = useSearchLocation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.name,
      firstName: "",
      lastName: "",
      gender: "",
      location: "",
      languages: [],
      socialAddress: "",
      profileimage: "",
      backgroundimage: "",
      price: "",
      experience: "",
      about: "",
      slogan: "",
      activities: [],
      car: false,
    },
  });

  useEffect(() => {
    if (!user?.id) return;

    const loadData = async () => {
      try {
        const tpro = await fetchTProfile(user.id);
        setTourist(tpro);

        const resLang = await axios.get(
          "https://restcountries.com/v3.1/all?fields=languages"
        );
        const langsSet = new Set<string>();
        resLang.data.forEach((country: any) => {
          if (country.languages) {
            const languages = Object.values(country.languages) as string[];
            languages.forEach((lang) => langsSet.add(lang));
          }
        });
        const languageOptions = Array.from(langsSet).map((lang) => ({
          label: lang,
          value: lang,
        }));
        setLanguageOptions(languageOptions);
        const resCountries = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const countrySet = new Set<string>();
        resCountries.data.forEach((country: any) => {
          if (country.name && country.name.common) {
            countrySet.add(country.name.common);
          }
        });
        const countryOptions: OptionType[] = Array.from(countrySet)
          .sort((a, b) => a.localeCompare(b))
          .map((country) => ({
            label: country,
            value: country,
          }));
        setCountryOptions(countryOptions);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    loadData();
  }, [user]);

  useEffect(() => {
    if (tourist) {
      form.reset({
        username: user?.name || "",
        firstName: tourist.firstName || "",
        lastName: tourist.lastName || "",
        gender: tourist.gender || "",
        location: tourist.location || "",
        languages: tourist.languages || [],
        socialAddress: tourist.socialAddress || "",
        profileimage: tourist.profileimage || "",
        backgroundimage: tourist.backgroundimage || "",
        price: tourist.price || "",
        experience: tourist.experience || "",
        about: tourist.about || "",
        slogan: tourist.slogan || "",
        activities: tourist.activities || [],
        car: tourist.car || false,
      });

      if (tourist.profileimage) {
        setPreviewUrl(tourist.profileimage);
      }
      if (tourist.backgroundimage) {
        setBackgroundPreviewUrl(tourist.backgroundimage);
      }
    }
  }, [tourist, form, user]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "guideme");

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          form.setValue("profileimage", data.secure_url);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setBackgroundPreviewUrl(objectUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "guideme");

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          form.setValue("backgroundimage", data.secure_url);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axiosInstance.post("/gprofile", values);
      router.push("/");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MapPin className="h-8 w-8 text-blue-600" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Guide Profile
          </CardTitle>
        </div>
        <p className="text-gray-600 text-lg">
          Create your professional guide profile to connect with travelers
        </p>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Images Section */}
            <div className="flex justify-center">
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
                          onChange={handleProfileImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Background Image */}
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
                        onChange={handleBackgroundImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </FormItem>
                )}
              />
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
                        placeholder="Describe your guiding experience, specialties, and what makes you unique..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Guide Information */}
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
                    <FormLabel>Social Media Link</FormLabel>
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
                Create Guide Profile
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
