"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";

type CountryType = {
  name: {
    common: string;
  };
};

const formSchema = z.object({
  photo: z.instanceof(File, {
    message: "Please upload a valid image",
  }),
  country: z.string().min(1, { message: "Please select a country" }),
  dateFrom: z.string().min(1, { message: "Please select a start date" }),
  dateTo: z.string().min(1, { message: "Please select an end date" }),
  people: z.string().min(1, { message: "Please select the number of people" }),
});

type FormData = z.infer<typeof formSchema>;

export function CreateTripDialog() {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      dateFrom: "",
      dateTo: "",
      people: "",
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/all?fields=name`
        );
        setCountries(res.data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      form.setValue("photo", file, { shouldValidate: true });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <DialogContent className="w-[700px]">
      <DialogHeader>
        <DialogTitle>Create a New Trip</DialogTitle>
        <DialogDescription>
          Please fill in the details below to create your trip.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <div className="w-full h-[200px] border-dashed border rounded-3xl relative flex justify-center items-center">
                    <Camera />
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute opacity-0 w-full h-full"
                      onChange={handleImageChange}
                    />
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="absolute rounded-3xl w-full h-[200px] object-cover"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {countries.map((country, index) => (
                          <SelectItem key={index} value={country.name.common}>
                            {country.name.common}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From (Date)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To (Date)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="people"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of People</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-[40px]">
                      <SelectValue placeholder="Select number of people" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="one">Just me</SelectItem>
                        <SelectItem value="two">Two</SelectItem>
                        <SelectItem value="three">Three</SelectItem>
                        <SelectItem value="more">More than three</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" className="w-full">
              CREATE A NEW TRIP
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
