"use client";

import { Camera } from "lucide-react";
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
  gender?: string;
  location?: string;
  languages?: string[];
  socialAddress?: string;
  profileimage?: string;
  backgroundimage?: string | null;
  price?: string;
  experience?: string;
  about?: string;
  activities?: string[];
  car?: boolean;
}

const formSchema = z.object({
  username: z.string().min(2, "Username is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  languages: z
    .array(z.string())
    .min(1, { message: "Select at least one language" }),
  socialAddress: z.string().min(2, "Social media link is required"),
  profileimage: z.string().min(1, "Profile image is required"),
  backgroundimage: z.string().nullable().optional(),
  price: z.string().min(1, "Price is required"),
  experience: z.string().min(1, "Experience is required"),
  about: z.string().min(1, "About is required"),
  activities: z
    .array(z.string())
    .min(1, { message: "Select at least one activity" }),
  car: z.boolean(),
});

export function GProfile() {
  const { user } = useUser();
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [selectedcity, setSelectedcity] = useState<string>("");

  const [languageOptions, setLanguageOptions] = useState<OptionType[]>([]);
  const [tourist, setTourist] = useState<TouristProfile>();
  const { searchedValue, setSearchedValue } = useSearchLocation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.name || "",
      firstName: "",
      lastName: "",
      gender: "",
      country: "",
      city: "",
      languages: [],
      socialAddress: "",
      profileimage: "",
      backgroundimage: "",
      price: "",
      experience: "",
      about: "",
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

      form.reset({
        username: user?.name || "",
        firstName: tourist.firstName || "",
        lastName: tourist.lastName || "",
        gender: tourist.gender || "",
        country,
        city,
        languages: tourist.languages || [],
        socialAddress: tourist.socialAddress || "",
        profileimage: tourist.profileimage || "",
        backgroundimage: tourist.backgroundimage || "",
        price: tourist.price || "",
        experience: tourist.experience || "",
        about: tourist.about || "",
        activities: tourist.activities || [],
        car: tourist.car || false,
      });

      if (country) {
      }
    }
  }, [tourist]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
  );
}
