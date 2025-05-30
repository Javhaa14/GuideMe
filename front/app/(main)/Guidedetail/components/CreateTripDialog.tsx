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
import { CardContent, CardFooter } from "@/components/ui/card";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type CountryType = {
  name: {
    common: string;
  };
};

const loginSchema = z.object({
  location: z.string().min(1, { message: "This field is required" }),
  country: z.string().min(1, { message: "Please select a country" }),
  dateFrom: z.string().min(1, { message: "Please select a day" }),
  dateTo: z.string().min(1, { message: "Please select a day" }),
  people: z.string().min(1, { message: "Please select people" }),
  local: z.string().optional(),
});

export function CreateTripDialog() {
  const [data, setData] = useState<CountryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://restcountries.com/v3.1/all?fields=name`
      );
      setData(res.data);
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      location: "",
      country: "",
      dateFrom: "",
      dateTo: "",
      people: "",
      local: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
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
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full h-[40px]">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.map((val, index) => (
                            <SelectItem key={index} value={val.name.common}>
                              {val.name.common}
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
                <FormItem className="w-full relative">
                  <FormLabel>Number of people</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="w-full h-[40px]">
                        <SelectValue placeholder="Select number of people" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"one"}>just me</SelectItem>
                          <SelectItem value={"two"}>two people</SelectItem>
                          <SelectItem value={"three"}>three people</SelectItem>
                          <SelectItem value={"more"}>
                            more than three
                          </SelectItem>
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
              name="local"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                  <FormLabel>Do you need a local guide?</FormLabel>
                  <div>
                    <Checkbox
                      checked={field.value === "female"}
                      onCheckedChange={() => {
                        field.onChange(
                          field.value === "female" ? "" : "female"
                        );
                      }}
                    />
                    <FormLabel className="ml-1">Female</FormLabel>
                  </div>

                  <div>
                    <Checkbox
                      checked={field.value === "male"}
                      onCheckedChange={() => {
                        field.onChange(field.value === "male" ? "" : "male");
                      }}
                    />
                    <FormLabel className="ml-1">Male</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button className="w-full h-[44px] cursor-pointer" type="submit">
              CREATE A NEW TRIP
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
