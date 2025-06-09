"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "./formSchema";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";

export function CreateTripDialog() {
  const [countries, setCountries] = useState<{ name: { common: string } }[]>(
    []
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      title: "",
      about: "",
      dateFrom: "",
      dateTo: "",
      people: "",
      price: "",
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        setCountries(res.data);
      } catch (error) {
        console.error("Улс мэдээлэл татахад алдаа гарлаа:", error);
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

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo);
      formData.append("country", data.country);
      formData.append("title", data.title);
      formData.append("about", data.about);
      formData.append("dateFrom", data.dateFrom);
      formData.append("dateTo", data.dateTo);
      formData.append("people", data.people);
      formData.append("price", data.price);

      const response = await axios.post("/tripPlan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Аялал амжилттай нэмэгдлээ:", response.data);
    } catch (error) {
      console.error("Аялал нэмэхэд алдаа гарлаа:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Зураг</FormLabel>
              <FormControl>
                <div className="relative w-full h-48 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center">
                  <Camera className="absolute text-gray-500" />
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleImageChange(e);
                    }}
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Зураг урьдчилсан харалт"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
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
              <FormLabel>Улс</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Улс сонгоно уу" />
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Гарчиг</FormLabel>
              <FormControl>
                <Input placeholder="Гарчиг оруулна уу" {...field} />
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
              <FormLabel>Аяллын тухай</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Аяллын тухай бичнэ үү"
                  {...field}
                  className="w-full h-32 border rounded-lg p-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="dateFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Эхлэх огноо</FormLabel>
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
                <FormLabel>Дуусах огноо</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Хүмүүний тоо</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Хүмүүний тоо сонгоно уу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="one">1 хүн</SelectItem>
                      <SelectItem value="two">1-5 хүн</SelectItem>
                      <SelectItem value="three">5-10 хүн</SelectItem>
                      <SelectItem value="more">10-аас дээш</SelectItem>
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Үнэ</FormLabel>
              <FormControl>
                <Input placeholder="Үнэ оруулна уу" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activities</FormLabel>
              <FormControl>
                <Input placeholder="Please write activities" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-6">
          Аялал үүсгэх
        </Button>
      </form>
    </Form>
  );
}
