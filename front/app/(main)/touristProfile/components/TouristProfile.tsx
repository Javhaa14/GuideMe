"use client";

import { Camera } from "lucide-react";
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
import ReactSelect from "react-select";

import axios from "axios";
import { useUser } from "@/app/context/Usercontext";
import { axiosInstance } from "@/lib/utils";
import {
  MultiSelect,
  OptionType,
} from "../../guideProfile/components/Selectwrapper";

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
  languages: z
    .array(z.string())
    .min(1, { message: "Please select at least one language" }),

  about: z.string().min(2, {
    message: "Please enter info about yourself",
  }),
  profileimage: z.string({ required_error: "Must upload image" }),
  social: z.string().min(2, {
    message: "Please enter a social link",
  }),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      about: "",
      social: "",
      gender: "",
      location: "",
      languages: [], // <-- must be array
      profileimage: "",
    },
  });

  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>([]);
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch countries for country select
  // Fetch unique languages for language select
  useEffect(() => {
    if (!user || !user._id) return;

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
        username: user.username,
        about: "",
        social: "",
        gender: "",
        location: "",
        languages: [],
        profileimage: "",
      });
    }
    fetchCountries();
    fetchLanguages();
  }, [user]);

  const handlePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    if (!user || !user._id) return;

    if (values.username !== user.username) {
      try {
        const res = await axiosInstance.put(`/user/${user._id}`, {
          username: values.username,
        });

        console.log("✅ Username updated:", res.data);
      } catch (error) {
        console.error("❌ Username update failed:", error);
      }
    }

    try {
      const res = await axiosInstance.post(`/tprofile`, {
        _id: user?._id,
        socialAddress: values.social,
        gender: values.gender,
        location: values.location,
        languages: values.languages,
        about: values.about,
        profileimage: values.profileimage,
        backgroundimage: "",
      });

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
                    value={field.value || ""}>
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

          <FormField
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
          />
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
  );
};
