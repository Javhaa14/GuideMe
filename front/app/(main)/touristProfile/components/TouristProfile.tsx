"use client";

<<<<<<< HEAD
import { Camera } from "lucide-react";
=======
import {
  Camera,
  Upload,
  User,
  MapPin,
  Languages,
  Globe,
  Heart,
  Quote,
} from "lucide-react";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
<<<<<<< HEAD
import ReactSelect from "react-select";

=======
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
import axios from "axios";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import {
  MultiSelect,
  OptionType,
} from "../../guideProfile/components/Selectwrapper";
import { LocationFilterCard } from "../../Guidesinfo/components/SearchLocation";
import { useSearchLocation } from "@/app/context/SearchLocationContext";
<<<<<<< HEAD
=======
import { useRouter } from "next/navigation";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

export type CountryType = {
  name: {
    common: string;
  };
};

export type LanguageOption = {
  value: string;
  label: string;
};
export const dynamic = "force-dynamic";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters. Please enter name",
  }),
<<<<<<< HEAD
  languages: z
    .array(z.string())
    .min(1, { message: "Please select at least one language" }),

  about: z.string().min(2, {
    message: "Please enter info about yourself",
  }),
=======
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(1, "Location is required"),
  languages: z
    .array(z.string())
    .min(1, { message: "Please select at least one language" }),
  about: z.string().min(10, "About must be at least 10 characters"),
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  profileimage: z.string({ required_error: "Must upload image" }),
  social: z.string().min(2, {
    message: "Please enter a social link",
  }),
<<<<<<< HEAD
  gender: z.string({
    required_error: "Select gender to continue",
  }),
  location: z.string({
    required_error: "Select country to continue",
  }),
});

export const TouristProfile = () => {
  const { user } = useUser();
  if (!user) {
    return <p>Loading user...</p>; // or a spinner
  }
=======
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  travelStyle: z.string().min(1, "Travel style is required"),
});

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

export const TouristProfile = () => {
  const { user } = useUser();
  if (!user) {
    return <p>Loading user...</p>;
  }
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>([]);
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { searchedValue, setSearchedValue } = useSearchLocation();
  const router = useRouter();
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.name,
<<<<<<< HEAD
=======
      firstName: "",
      lastName: "",
      email: user.email || "",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      about: "",
      social: "",
      gender: "",
      location: "",
<<<<<<< HEAD
      languages: [], // <-- must be array
      profileimage: "",
    },
  });

  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>([]);
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { searchedValue, setSearchedValue } = useSearchLocation();

=======
      languages: [],
      profileimage: "",
      interests: [],
      travelStyle: "",
    },
  });

>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  // Fetch countries for country select
  // Fetch unique languages for language select
  useEffect(() => {
    if (!user || !user.id) return;

    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const options = res.data
          .map((country: CountryType) => ({
            label: country.name.common,
            value: country.name.common,
          }))
          .sort((a: OptionType, b: OptionType) =>
            a.label.localeCompare(b.label)
          );
        setCountryOptions(options);
      } catch (error) {
        console.error("Failed to fetch countries", error);
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
    if (user) {
      form.reset({
        username: user.name,
<<<<<<< HEAD
=======
        firstName: "",
        lastName: "",
        email: user.email || "",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
        about: "",
        social: "",
        gender: "",
        location: "",
        languages: [],
        profileimage: "",
<<<<<<< HEAD
=======
        interests: [],
        travelStyle: "",
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      });
    }
    fetchCountries();
    fetchLanguages();
  }, [user]);

  const handlePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
<<<<<<< HEAD
=======
    console.log(file);
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

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
        form.setValue("profileimage", data.secure_url, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "Form submit values");
    if (!user || !user.id) return;

    if (values.username !== user.name) {
      try {
<<<<<<< HEAD
        const res = await axiosInstance.put(`/user/${user.id}`, {
          username: values.username,
        });

        console.log("✅ Username updated:", res.data);
      } catch (error) {
        console.error("❌ Username update failed:", error);
      }
    }
    const tpro = {
      _id: user?.id,
      socialAddress: values.social,
      gender: values.gender,
      location: values.location,
      languages: searchedValue,
      about: values.about,
      profileimage: values.profileimage,
      backgroundimage: "",
    };
    console.log("sending", tpro);

    try {
      const res = await axiosInstance.post(`/tprofile`, tpro);

      console.log("Successfully created tourist profile", res.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    console.log("Validation errors:", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p className="text-[24px] font-bold">Complete your profile page</p>

        <FormField
          control={form.control}
          name="profileimage"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel></FormLabel>
              <FormControl>
                <div className="size-[160px] border-[1px] border-dashed rounded-full flex justify-center items-center relative">
                  <Camera />
                  <input
                    type="file"
                    accept="image/*"
                    name={field.name}
                    ref={field.ref}
                    onChange={(event) => {
                      field.onChange(event);
                      handlePreview(event);
                    }}
                    className="size-[160px] rounded-full flex justify-center items-center opacity-0 absolute z-1"
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="size-[160px] rounded-full absolute"
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
            <FormItem className="relative">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="w-[510px] h-[40px]"
                  placeholder="Enter your name here"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute top-17" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem {...field} className="w-full relative">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value={"Male"}>Male</SelectItem>
                        <SelectItem value={"Female"}>Female</SelectItem>
                        <SelectItem value={"Other"}>Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          />

          <LocationFilterCard />

          {/* <FormField
            control={form.control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <FormItem className="w-full relative">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <MultiSelect
                    isMulti={false}
                    options={countryOptions}
                    value={
                      countryOptions.find((option) => option.value === value) ||
                      null
                    }
                    onChange={(newValue) => {
                      onChange((newValue as OptionType | null)?.value || "");
                    }}
                    placeholder="Select a country"
                    isClearable
                  />
                </FormControl>
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          /> */}
        </div>

        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <Controller
                    control={form.control}
                    name="languages"
                    render={({ field: { onChange, value, ref } }) => (
                      <ReactSelect
                        ref={ref}
                        isMulti
                        options={languageOptions}
                        value={languageOptions.filter((c) =>
                          value?.includes(c.value)
                        )}
                        onChange={(selected) => {
                          onChange(
                            selected
                              ? selected.map((option) => option.value)
                              : []
                          );
                        }}
                        placeholder="Select languages"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        instanceId="tourist-profile-languages"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage className="absolute top-17" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="social"
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
              <FormMessage className="absolute top-17" />
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
                  placeholder="https://"
                  {...field}
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
=======
        await axiosInstance.put(`/user/${user.id}`, {
          username: values.username,
        });
      } catch (error) {
        console.error("Failed to update username:", error);
      }
    }

    const payload = {
      _id: user.id,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      about: values.about,
      social: values.social,
      gender: values.gender,
      location: values.location,
      languages: values.languages,
      profileimage: values.profileimage,
      interests: values.interests,
      travelStyle: values.travelStyle,
    };

    try {
      await axiosInstance.post("/tprofile", payload);
      router.push("/");
    } catch (error) {
      console.error("Profile creation/update failed", error);
    }
  }

  const handleSubmitButton = () => {
    router.push("/");
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <User className="h-8 w-8 text-purple-600" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Tourist Profile
          </CardTitle>
        </div>
        <p className="text-gray-600 text-lg">
          Tell us about yourself to find the perfect guides
        </p>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Image */}
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
                          onChange={handlePreview}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
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
                          className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                          className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                          className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                          <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors">
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
                          <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors">
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
                          <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors">
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
                        className="min-h-32 border-2 border-gray-200 focus:border-purple-500 transition-colors resize-none"
                        placeholder="Tell us about your travel interests, experiences, and what you're looking for..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Travel Preferences */}
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
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors">
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
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors">
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

            <Separator />

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media
              </h3>

              <FormField
                control={form.control}
                name="social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Link (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Create Tourist Profile
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  );
};
