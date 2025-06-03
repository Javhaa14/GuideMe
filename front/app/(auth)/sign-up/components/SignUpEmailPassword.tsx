"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { axiosInstance } from "@/lib/utils";

const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be more than 8 letters" }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpEmailPasswordProps {
  username: string;
}

export function SignUpEmailPassword({ username }: SignUpEmailPasswordProps) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        email: values.email,
        username: username,
        password: values.password,
      });

      const message = response.data.message;

      if (message === "email already registered") {
        form.setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      } else if (message === "User created successfully") {
        // LocalStorage эсвэл cookie-д хадгалах
        localStorage.setItem("username", username);

        // Дараагийн хуудсанд чиглүүлэх
        router.push("/");
      } else {
        form.setError("email", {
          type: "manual",
          message: "Unexpected server response",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong. Try again.";
      form.setError("email", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <Card className="w-[440px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CardHeader>
            <CardTitle className="text-[20px] font-semibold">
              Welcome, {username}
            </CardTitle>
            <CardDescription>
              Connect your email and set a password
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full h-[44px]">
              Continue
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
