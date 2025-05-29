"use client";

import React from "react";
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password should be at least 8 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function Password() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSave = async (values: z.infer<typeof passwordSchema>) => {
    console.log("New password set:", values);
  };

  return (
    <div className="w-[1200px] mx-auto">
      <Card className="rounded-2xl shadow-md border border-[#E4E4E7]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="flex flex-col gap-4"
          >
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold text-[#09090B]">
                Set a new password
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Please enter a strong password and confirm it below.
              </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 pt-2">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#09090B]">
                      New password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter new password"
                        {...field}
                        type="password"
                        className="h-[44px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[#09090B]">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        {...field}
                        type="password"
                        className="h-[44px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full h-[44px] bg-[#09090B] text-white hover:bg-[#1c1c1f] transition-colors"
              >
                Save changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
