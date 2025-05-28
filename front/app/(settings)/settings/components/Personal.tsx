"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  image: z
    .union([
      z.string().min(1, { message: "Please upload your image" }),
      z.instanceof(File),
    ])
    .refine(
      (val) => {
        if (typeof val === "string") return val.length > 0;
        if (val instanceof File) return val.size > 0;
        return false;
      },
      { message: "Please upload your image" }
    ),
  name: z.string().min(1, { message: "Please enter name" }),
  about: z
    .string()
    .min(10, { message: "Must be at least 10 characters." })
    .max(160),
  link: z.string().url({ message: "Please enter a valid URL" }),
});

export function Personal() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      image: "",
      name: "Jake",
      about:
        "I’m a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along.",
      link: "https://buymeacoffee.com/baconpancakes1",
    },
    mode: "onChange",
  });

  const [file, setFile] = useState<File>();

  return (
    <div className="w-[650px] rounded-lg border border-[#E4E4E7] p-6 flex flex-col gap-6">
      <p className="text-[#09090B] text-[16px] font-bold">Personal Info</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#09090B]">
                  Add photo
                </FormLabel>
                <FormControl>
                  {field.value ? (
                    <div className="relative w-[120px] h-[120px]">
                      <img
                        src={
                          typeof field.value === "string"
                            ? field.value
                            : URL.createObjectURL(field.value)
                        }
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover border"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                        <CameraIcon className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-[120px] h-[120px]">
                      <label
                        htmlFor="image-upload"
                        className="w-full h-full flex items-center justify-center rounded-full border-2 border-dashed cursor-pointer"
                      >
                        <CameraIcon className="text-gray-400 w-6 h-6" />
                      </label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("image", file, {
                              shouldValidate: true,
                            });
                            setFile(file);
                          }
                        }}
                      />
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#09090B]">
                  Name
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#09090B]">
                  About
                </FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#09090B]">
                  Social media URL
                </FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-[#09090B] text-white mt-2 hover:bg-[#1c1c1f]"
            type="submit"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
