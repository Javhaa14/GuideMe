"use client";

import React, { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

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

import { useSession } from "next-auth/react";

const FloatingStars = ({ count = 20 }: { count?: number }) => {
  // ... your existing FloatingStars code unchanged
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
          }}
        >
          <Star className="w-2 h-2 text-white/20" />
        </div>
      ))}
    </div>
  );
};

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be more than 8 characters" }),
});

export function LogInEmailPassword() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (result?.error) {
      form.setError("email", {
        type: "manual",
        message: "Invalid credentials",
      });
      form.setError("password", {
        type: "manual",
        message: "Invalid credentials",
      });
    } else if (result?.ok && result.url) {
      router.push(result.url);
    }
  };

  // Example OAuth sign-in button handler with redirect
  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  const inputStyle =
    "h-12 text-white bg-white/10 border-white/20 placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl hover:bg-white/15";

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0">
        <div className="absolute rounded-full w-72 h-72 top-1/4 left-1/4 bg-purple-500/30 blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 top-3/4 right-1/4 bg-blue-500/20 blur-3xl rounded-full animate-pulse delay-[1000ms]" />
        <div className="absolute w-80 h-80 bottom-1/4 left-1/3 bg-indigo-500/25 blur-3xl rounded-full animate-pulse delay-[2000ms]" />
      </div>

      <FloatingStars />

      <Card className="relative z-10 w-[440px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-white/70">
                Log in with your email and password
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
                className="w-full h-12 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={form.formState.isSubmitting}
              >
                Continue
              </Button>
            </CardFooter>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3 px-6 py-4">
              <button
                type="button"
                onClick={() => handleOAuthSignIn("google")}
                className="w-full py-3 font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition"
              >
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn("github")}
                className="w-full py-3 font-semibold text-white bg-gray-800 rounded-xl hover:bg-gray-900 transition"
              >
                Continue with GitHub
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn("facebook")}
                className="w-full py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
              >
                Continue with Facebook
              </button>
            </div>

            <div className="flex justify-center gap-2 py-4 text-sm border-t border-white/10 text-white/70">
              <span>Don’t have an account?</span>
              <button
                type="button"
                onClick={() => router.push("/sign-up")}
                className="font-medium text-purple-300 hover:text-purple-200"
              >
                Sign up
              </button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
