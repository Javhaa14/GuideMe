"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { axiosInstance, cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signIn } from "next-auth/react";

const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpEmailPasswordProps {
  username: string;
}

const FloatingStars = ({ count = 20 }: { count?: number }) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-[float_6s_ease-in-out_infinite]"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}>
          <Star className="w-2 h-2 text-white/20" />
        </div>
      ))}
    </div>
  );
};

export function SignUpEmailPassword({ username }: SignUpEmailPasswordProps) {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/signup",
        {
          ...values,
          username,
        },
        {
          withCredentials: true,
        }
      );

      if (data.message === "email already registered") {
        form.setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      } else if (data.message === "User created successfully") {
        localStorage.setItem("username", username);
        router.push("/");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      form.setError("email", {
        type: "manual",
        message: msg,
      });
    }
  };

  const inputStyle =
    "h-12 text-white bg-white/10 border-white/20 placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl hover:bg-white/15";

  const handleSocialSignIn = (provider: string) => {
    // Pass username along as a callback param or use sessionStorage/localStorage if preferred
    signIn(provider, {
      callbackUrl: `/welcome?username=${encodeURIComponent(username)}`,
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0">
        <div className="absolute rounded-full w-72 h-72 top-1/4 left-1/4 bg-purple-500/30 blur-3xl animate-pulse" />
        <div className="absolute delay-1000 rounded-full w-96 h-96 top-3/4 right-1/4 bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute rounded-full w-80 h-80 bottom-1/4 left-1/3 bg-indigo-500/25 blur-3xl animate-pulse delay-2000" />
      </div>

      <FloatingStars />

      <Card className="relative z-10 w-[440px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Welcome, {username}
              </CardTitle>
              <CardDescription className="text-white/70">
                Connect your email and create a password or use a social login
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className={cn(inputStyle)}
                        {...field}
                      />
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
                    <FormLabel className="text-white/90">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className={cn(inputStyle)}
                        {...field}
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
                className="w-full h-12 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                Create Account
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
