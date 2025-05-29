"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log("Form values:", values);
  };

  return (
    <div className="w-[1200px] mx-auto rounded-xl border border-[#E4E4E7] bg-white shadow-md p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-[#09090B]">Personal Info</h2>
        <p className="text-sm text-muted-foreground">
          Add your personal information here
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#09090B]">
                  Profile photo
                </FormLabel>
                <FormControl>
                  <label
                    htmlFor="image-upload"
                    className="relative w-[120px] h-[120px] cursor-pointer"
                  >
                    {field.value ? (
                      <>
                        <img
                          src={
                            typeof field.value === "string"
                              ? field.value
                              : URL.createObjectURL(field.value)
                          }
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover border"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-0">
                          <CameraIcon className="text-white w-6 h-6" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center rounded-full border-2 border-dashed text-gray-400">
                        <CameraIcon className="w-6 h-6" />
                      </div>
                    )}
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
                        }
                      }}
                    />
                  </label>
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
                  <Input className="h-[44px]" {...field} />
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
                  <Textarea className="resize-none min-h-[100px]" {...field} />
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
                  <Input className="h-[44px]" {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="h-[44px] bg-[#09090B] text-white mt-2 hover:bg-[#1c1c1f] transition-colors"
            type="submit"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
