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
import { useEffect, useMemo, useState } from "react";
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
import { TouristProfile } from "../../Touristdetail/components/TouristMainProfile";
import {
  CountryType,
  LanguageOption,
} from "../../touristProfile/components/TouristProfile";
import dynamic from "next/dynamic";
import type { OptionType } from "./Selectwrapper";
import { MultiValue, SingleValue } from "react-select";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";

const MultiSelect = dynamic(
  () => import("./Selectwrapper").then((mod) => mod.MultiSelect),
  { ssr: false }
);
type dataTypes = {
  name: string;
  description: string;
};

const formSchema = z.object({
  username: z.string().min(2, "First name is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(1, "Country is required"),
  languages: z
    .array(z.string())
    .min(1, { message: "Please select at least one language" }),
  socialAddress: z.string().min(2, "SocialAddress media link is required"),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      username: user.name,
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
      activities: [],
      car: false,
    },
  });
  const activityOptions = [
    { label: "Hiking", value: "hiking" },
    { label: "City Tour", value: "city-tour" },
    { label: "Museum Visit", value: "museum" },
    { label: "Food Tasting", value: "food" },
    { label: "Beach Day", value: "beach" },
  ];
  if (!user) {
    return <p>Loading user...</p>; // or a spinner
  }

  const [results, setResults] = useState<dataTypes[]>([]);
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>([]);
  const [tourist, setTourist] = useState<TouristProfile>();
  const [searchText, setSearchText] = useState(""); // new for input text for country search
  const [isShown, setIsShown] = useState<boolean>(true);
  const countryOptions = useMemo(
    () =>
      results.map((item) => ({
        label: item.name,
        value: item.name,
      })),
    [results]
  );

  useEffect(() => {
    if (!user || !user.id) return;
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/tprofile/${user?.id}`);
        console.log("✅ Posts fetched:", res.data);
        setTourist(res.data);
      } catch (err) {
        console.error("❌ Post fetch failed:", err);
      }
    };
    const fetchLanguages = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=languages"
        );

        const langsSet = new Set<string>();
        res.data.forEach((country: any) => {
          if (country.languages) {
            (Object.values(country.languages) as string[]).forEach((lang) =>
              langsSet.add(lang)
            );
          }
        });

        const options = Array.from(langsSet).map((lang) => ({
          label: lang,
          value: lang,
        }));

        setLanguageOptions(options);
      } catch (error) {
        console.error("Failed to fetch languages", error);
      }
    };
    const fetchResults = async (searchText: string) => {
      try {
        const res = await fetch(
          `https://d14w0rz7s8v3pz.cloudfront.net/predictions?s=${searchText}`
        );
        const data = await res.json();
        setResults(data || []);
      } catch (error) {
        console.error("Failed to fetch", error);
        setResults([]);
      }
    };

    fetchProfile();
    fetchLanguages();
  }, [user]);
  useEffect(() => {
    if (searchText.trim().length > 2) {
      const fetchResults = async () => {
        try {
          const res = await fetch(
            `https://d14w0rz7s8v3pz.cloudfront.net/predictions?s=${searchText}`
          );
          const data = await res.json();
          setResults(data || []);
        } catch (error) {
          console.error("Failed to fetch", error);
          setResults([]);
        }
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    if (tourist) {
      form.reset({
        gender: tourist.gender,
        location: tourist.location,
        about: tourist.about,
        profileimage: tourist.profileimage,
        backgroundimage: tourist.backgroundimage,
        languages: tourist.languages ?? [],
      });
    } else {
      return;
    }
  }, [tourist]);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      _id: user?.id || "",
      username: user?.name || "",
      firstName: values.firstName,
      lastName: values.lastName,
      languages: values.languages,
      price: values.price,
      experience: values.experience,
      car: values.car,
      activities: values.activities,
      socialAddress: values.socialAddress,
      location: values.location,
      about: values.about,
      gender: values.gender,
      profileimage: values.profileimage,
      backgroundimage: values.backgroundimage,
      status: "available",
      rating: 0,
    };
    console.log("Payload being sent to gprofile:", payload);

    if (payload.username !== user.name) {
      try {
        const res = await axiosInstance.put(`/user/${user.id}`, {
          username: payload.username,
        });

        console.log("✅ Username updated:", res.data);
      } catch (error) {
        console.error("❌ Username update failed:", error);
      }
    }

    if (
      payload.languages !== tourist?.languages ||
      payload.location !== tourist?.location ||
      payload.profileimage !== tourist?.profileimage ||
      payload.backgroundimage !== tourist?.backgroundimage ||
      payload.socialAddress !== tourist?.socialAddress ||
      payload.about !== tourist?.about ||
      payload.gender !== tourist?.gender
    ) {
    }
    try {
      const res = await axiosInstance.put(`/tprofile/${user.id}`, {
        languages: payload.languages,
        location: payload.location,
        profileimage: payload.profileimage,
        backgroundimage: payload.backgroundimage,
        socialAddress: payload.socialAddress,
        about: payload.about,
        gender: payload.gender,
      });
      console.log("Successfully updated touristprofile", res.data);
    } catch (error) {
      console.error("Profile updated failed", error);
    }
    console.log(payload, "gprofile");
    try {
      const res = await axiosInstance.post(`/gprofile`, payload);
      console.log("Successfully posted guideprofile", res.data);
      router.push("/");
    } catch (error) {
      console.error("Profile creation failed", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <div className="size-[160px] border-[1px] border-dashed rounded-full flex justify-center items-center relative">
                  <Camera />
                  <Input
                    className="size-[160px] rounded-full absolute opacity-0 z-1"
                    type="file"
                    accept="image/*"
                  />

                  <img
                    className="size-[160px] rounded-full absolute object-cover"
                    src={tourist?.profileimage}
                    alt="Existing Profile"
                  />
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
        <div className="flex w-full gap-4">
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

        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full relative">
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
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <MultiSelect
                    isMulti={false}
                    options={countryOptions}
                    value={
                      countryOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onInputChange={(value) => setSearchText(value)}
                    onChange={(newValue) => {
                      const selected = newValue as OptionType | null;
                      if (selected) {
                        setSearchText(selected.value);
                        field.onChange(selected.value);
                      } else {
                        setSearchText("");
                        field.onChange("");
                      }
                    }}
                    inputValue={searchText}
                    placeholder="Search your country"
                    isClearable
                  />
                </FormControl>
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="languages"
          render={({ field: { onChange, value, ref } }) => (
            <FormItem className="w-full relative">
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <MultiSelect
                  isMulti
                  options={languageOptions}
                  value={languageOptions.filter((option) =>
                    (value as string[]).includes(option.value)
                  )}
                  onChange={(
                    newValue: SingleValue<OptionType> | MultiValue<OptionType>
                  ) => {
                    if (Array.isArray(newValue)) {
                      onChange(newValue.map((item) => item.value));
                    }
                  }}
                  placeholder="Select languages"
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name="socialAddress"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Social media URL</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Write about yourself here"
                  {...field}
                />
              </FormControl>
              <FormMessage className=" absolute top-17" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>About</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Write about yourself here"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />
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

        <FormField
          control={form.control}
          name="activities"
          render={({ field: { onChange, value, ref } }) => (
            <FormItem className="w-full relative">
              <FormLabel>Activities</FormLabel>
              <FormControl>
                <MultiSelect
                  isMulti
                  options={activityOptions}
                  value={activityOptions.filter((option) =>
                    (value as string[]).includes(option.value)
                  )}
                  onChange={(
                    newValue: SingleValue<OptionType> | MultiValue<OptionType>
                  ) => {
                    if (Array.isArray(newValue)) {
                      onChange(newValue.map((item) => item.value));
                    }
                  }}
                  placeholder="Select activities"
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
}
