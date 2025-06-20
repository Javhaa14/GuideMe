"use client";

<<<<<<< HEAD
import { Camera } from "lucide-react";
=======
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
import { Textarea } from "@/components/ui/textarea";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
=======
  email: string;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  gender?: string;
  location?: string;
  languages?: string[];
  socialAddress?: string;
  profileimage?: string;
  backgroundimage?: string | null;
  price?: string;
  experience?: string;
  about?: string;
<<<<<<< HEAD
=======
  slogan?: string;
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  activities?: string[];
  car?: boolean;
}

const formSchema = z.object({
  username: z.string().min(2, "Username is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
<<<<<<< HEAD
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
=======
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  languages: z
    .array(z.string())
    .min(1, { message: "Select at least one language" }),
  socialAddress: z.string().min(2, "Social media link is required"),
  profileimage: z.string().min(1, "Profile image is required"),
  backgroundimage: z.string().nullable().optional(),
  price: z.string().min(1, "Price is required"),
  experience: z.string().min(1, "Experience is required"),
  about: z.string().min(1, "About is required"),
<<<<<<< HEAD
=======
  slogan: z.string().min(1, "Slogan is required"),
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  activities: z
    .array(z.string())
    .min(1, { message: "Select at least one activity" }),
  car: z.boolean(),
});

<<<<<<< HEAD
=======
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

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
export function GProfile() {
  const { user } = useUser();
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
<<<<<<< HEAD

  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [selectedcity, setSelectedcity] = useState<string>("");

  const [languageOptions, setLanguageOptions] = useState<OptionType[]>([]);
  const [tourist, setTourist] = useState<TouristProfile>();
=======
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [languageOptions, setLanguageOptions] = useState<OptionType[]>([]);
  const [tourist, setTourist] = useState<TouristProfile>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState<
    string | null
  >(null);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  const { searchedValue, setSearchedValue } = useSearchLocation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
<<<<<<< HEAD
      username: user?.name || "",
      firstName: "",
      lastName: "",
      gender: "",
      country: "",
      city: "",
=======
      username: user?.name,
      firstName: "",
      lastName: "",
      gender: "",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      languages: [],
      socialAddress: "",
      profileimage: "",
      backgroundimage: "",
      price: "",
      experience: "",
      about: "",
<<<<<<< HEAD
=======
      slogan: "",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      activities: [],
      car: false,
    },
  });
<<<<<<< HEAD
=======

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
    const fetchCities = async (countryName: string) => {
      if (!countryName) return;

      try {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            country: countryName,
          }
        );

        const options: OptionType[] = res.data.data
          .sort((a: string, b: string) => a.localeCompare(b))
          .map((city: string) => ({
            label: city,
            value: city,
          }));

        setCityOptions(options);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities(selectedCountry);
  }, [selectedCountry]);
  useEffect(() => {
    if (tourist) {
      const [city = "", country = ""] =
        tourist.location?.split(",").map((x) => x.trim()) ?? [];

=======
    if (tourist) {
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      form.reset({
        username: user?.name || "",
        firstName: tourist.firstName || "",
        lastName: tourist.lastName || "",
        gender: tourist.gender || "",
<<<<<<< HEAD
        country,
        city,
=======
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        languages: tourist.languages || [],
        socialAddress: tourist.socialAddress || "",
        profileimage: tourist.profileimage || "",
        backgroundimage: tourist.backgroundimage || "",
        price: tourist.price || "",
        experience: tourist.experience || "",
        about: tourist.about || "",
<<<<<<< HEAD
=======
        slogan: tourist.slogan || "",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        activities: tourist.activities || [],
        car: tourist.car || false,
      });

<<<<<<< HEAD
      if (country) {
      }
    }
  }, [tourist]);
=======
      if (tourist.profileimage) {
        setPreviewUrl(tourist.profileimage);
      }
      if (tourist.backgroundimage) {
        setBackgroundPreviewUrl(tourist.backgroundimage);
      }
    }
  }, [tourist, form, user]);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
<<<<<<< HEAD
    const reader = new FileReader();
    reader.onload = () => {
      form.setValue("profileimage", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);

    if (!user?.id) return;

    const payload = {
      _id: user.id,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      languages: values.languages,
      price: values.price,
      experience: values.experience,
      car: values.car,
      activities: values.activities,
      socialAddress: values.socialAddress,
      location: searchedValue,
      about: values.about,
      gender: values.gender,
      profileimage: values.profileimage,
      backgroundimage: values.backgroundimage,
      status: "available",
      rating: 0,
    };

    try {
      if (payload.username !== user.name) {
        await axiosInstance.put(`/user/${user.id}`, {
          username: payload.username,
        });
      }

      // Update tourist profile (if needed)
      // await axiosInstance.put(`/tprofile/${user.id}`, {
      //   languages: payload.languages,
      //   location: payload.location,
      //   profileimage: payload.profileimage,
      //   backgroundimage: payload.backgroundimage,
      //   socialAddress: payload.socialAddress,
      //   about: payload.about,
      //   gender: payload.gender,
      // });

      // Create or update guide profile — better to check if exists and then put/post accordingly
      await axiosInstance.post(`/gprofile`, payload);

      router.push("/");
    } catch (error) {
      console.error("Profile creation/update failed", error);
    }
  };

  const activityOptions: OptionType[] = [
    { value: "hiking", label: "Hiking" },
    { value: "city-tour", label: "City Tour" },
    { value: "museums", label: "Museums" },
    { value: "food", label: "Food" },
    { value: "shopping", label: "Shopping" },
  ];
  if (!user) return <p>Loading user...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[500px]"
      >
        <p className="text-[24px] font-bold">
          Complete your guide profile page, {user?.name}
        </p>

        <FormField
          control={form.control}
          name="profileimage"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Add photo</FormLabel>
              <FormControl>
                <div className="size-[160px] border border-dashed rounded-full flex justify-center items-center relative">
                  <Camera />
                  <Input
                    className="absolute size-[160px] rounded-full opacity-0 z-10 cursor-pointer"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                  {field.value && (
                    <img
                      className="absolute size-[160px] rounded-full object-cover"
                      src={field.value}
                      alt="Profile preview"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className="absolute top-47" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter a new username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First and Last Name Fields */}
        <div className="flex w-full gap-4 justify-between">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
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
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Gender*/}
        <div className="flex w-full justify-between gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-[300px]">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Languages MultiSelect */}
          <FormField
            control={form.control}
            name="languages"
            render={({ field: { onChange, value } }) => (
              <FormItem className="w-[400px] ">
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <MultiSelect
                    styles={{
                      valueContainer: (base) => ({
                        ...base,
                      }),
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#f0f0f0", // Custom background color
                        borderRadius: "8px", // Custom border radius
                        borderColor: "white", // Custom border color
                        padding: "", // Custom padding
                        boxShadow: "none", // Remove default box shadow
                        "&:hover": {
                          borderColor: "gray-500", // Change border color on hover
                        },
                      }),
                      option: (base) => ({
                        ...base,
                        padding: "10px 15px", // Custom padding for options
                        backgroundColor: "white", // Default background for options
                        color: "black", // Default text color
                        cursor: "pointer", // Pointer cursor
                        "&:hover": {
                          backgroundColor: "black", // Light blue background on hover
                          color: "white", // Text color on hover
                          borderColor: "#4C9AFF", // Border color on hover (though border doesn't show in options)
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        minWidth: 65,
                        backgroundColor: "black", // Custom background color for multi-select tags
                        borderRadius: "4px", // Rounded corners for multi-value tags
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "white", // White text color for selected options
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: "white", // White color for the "remove" button
                        cursor: "pointer", // Pointer cursor for "remove" button
                        "&:hover": {
                          backgroundColor: "black", // Light background on hover for "remove" button
                        },
                      }),
                    }}
                    isMulti
                    options={languageOptions}
                    value={languageOptions.filter((opt) =>
                      (value as string[]).includes(opt.value)
                    )}
                    onChange={(newVal) => {
                      onChange(
                        Array.isArray(newVal)
                          ? newVal.map((item) => item.value)
                          : []
                      );
                    }}
                    placeholder="Select languages"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <LocationFilterCard /> */}

        <div className="flex w-full gap-4 justify-between">
          <FormField
            control={form.control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <FormItem className="w-[207px]">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <SingleSelect
                    styles={{
                      valueContainer: (base) => ({
                        ...base,
                      }),
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#f0f0f0", // Custom background color
                        borderRadius: "8px", // Custom border radius
                        borderColor: "white", // Custom border color
                        padding: "", // Custom padding
                        boxShadow: "none", // Remove default box shadow
                        "&:hover": {
                          borderColor: "gray-500", // Change border color on hover
                        },
                      }),
                      option: (base) => ({
                        ...base,
                        padding: "10px 15px", // Custom padding for options
                        backgroundColor: "white", // Default background for options
                        color: "black", // Default text color
                        cursor: "pointer", // Pointer cursor
                        "&:hover": {
                          backgroundColor: "black", // Light blue background on hover
                          color: "white", // Text color on hover
                          borderColor: "#4C9AFF", // Border color on hover (though border doesn't show in options)
                        },
                      }),
                    }}
                    options={countryOptions}
                    value={
                      countryOptions.find((opt) => opt.value === value) || null
                    }
                    onChange={(newVal) => {
                      onChange(newVal ? newVal.value : "");
                      setSelectedCountry(newVal ? newVal.value : "");
                    }}
                    placeholder="Select a country"
                    className="text-sm text-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <FormItem className="w-[207px]">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <SingleSelect
                    styles={{
                      valueContainer: (base) => ({
                        ...base,
                      }),
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#f0f0f0", // Custom background color
                        borderRadius: "8px", // Custom border radius
                        borderColor: "white", // Custom border color
                        padding: "", // Custom padding
                        boxShadow: "none", // Remove default box shadow
                        "&:hover": {
                          borderColor: "gray-500", // Change border color on hover
                        },
                      }),
                      option: (base) => ({
                        ...base,
                        padding: "10px 15px", // Custom padding for options
                        backgroundColor: "white", // Default background for options
                        color: "black", // Default text color
                        cursor: "pointer", // Pointer cursor
                        "&:hover": {
                          backgroundColor: "black", // Light blue background on hover
                          color: "white", // Text color on hover
                          borderColor: "#4C9AFF", // Border color on hover (though border doesn't show in options)
                        },
                      }),
                    }}
                    options={cityOptions}
                    value={
                      cityOptions.find((opt) => opt.value === value) || null
                    }
                    onChange={(newVal) => {
                      onChange(newVal ? newVal.value : "");
                      setSelectedcity(newVal ? newVal.value : "");
                    }}
                    placeholder="Select a city"
                    className="text-sm text-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Price and Car */}
        <div className="flex gap-4 w-full items-center">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[40px]"
                    placeholder="Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="car"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have a car?</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Social Media URL */}
        <FormField
          control={form.control}
          name="socialAddress"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Social media URL</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Enter a link to your social media"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        {/* About */}
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>About</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Tell something about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        {/* Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[510px] h-[40px]">
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Experience</SelectLabel>
                      <SelectItem value="over-5-years">Over 5 years</SelectItem>
                      <SelectItem value="2-3-years">2-3 years</SelectItem>
                      <SelectItem value="1-2-years">1-2 years</SelectItem>
                      <SelectItem value="under-1-year">Under 1 year</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        {/* Activities MultiSelect */}
        <FormField
          control={form.control}
          name="activities"
          render={({ field: { onChange, value } }) => (
            <FormItem className="w-full relative">
              <FormLabel>Activities</FormLabel>
              <FormControl>
                <MultiSelect
                  isMulti
                  options={activityOptions}
                  value={activityOptions.filter((opt) =>
                    (value as string[]).includes(opt.value)
                  )}
                  onChange={(newVal) => {
                    onChange(
                      Array.isArray(newVal)
                        ? newVal.map((item) => item.value)
                        : []
                    );
                  }}
                  placeholder="Select activities"
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-8">
          Save Profile
        </Button>
      </form>
    </Form>
=======

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
                          onChange={handleProfileImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  );
}
