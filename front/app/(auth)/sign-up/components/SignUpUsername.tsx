"use client";

import React, { Dispatch, SetStateAction, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Star, TentTree } from "lucide-react";
import { axiosInstance } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(4, { message: "Please enter at least 4 letters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function SignUpUsername({
  setStep,
  setUsername,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  const router = useRouter();

  const stars = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`,
      })),
    []
  );

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await axiosInstance.post(
        "/auth/check-user",
        {
          username: values.username,
        },
        {
          withCredentials: true, // <---- ADD THIS
        }
      );

      setUsername(values.username);
      setStep((prev) => prev + 1);
    } catch (error: any) {
      if (
        error.response?.status === 409 &&
        error.response.data?.message === "Username already taken"
      ) {
        form.setError("username", {
          type: "manual",
          message: "This username is already taken",
        });
      } else {
        form.setError("username", {
          type: "manual",
          message: "Error checking username. Try again.",
        });
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0">
        <div className="absolute rounded-full w-72 h-72 top-1/4 left-1/4 bg-purple-500/30 blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 top-3/4 right-1/4 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-[1000ms]" />
        <div className="absolute w-80 h-80 bottom-1/4 left-1/3 bg-indigo-500/25 rounded-full blur-3xl animate-pulse delay-[2000ms]" />
      </div>

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

      <Card className="relative z-10 w-[440px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 animate-bounce">
                <TentTree size={32} color="white" />
              </div>
              <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text">
                Let the Journey Begin
              </CardTitle>
              <CardDescription className="text-white/70">
                Choose a username for your page
              </CardDescription>
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 text-white bg-white/10 border-white/20 placeholder:text-white/50 rounded-xl hover:bg-white/15 focus:border-purple-400 focus:ring-purple-400/20"
                        placeholder="Enter your username here"
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
                Continue
              </Button>
            </CardFooter>

            <div className="flex justify-center gap-4 pt-4 border-t border-white/10">
              <p className="text-white/70">Already have an account?</p>
              <button
                type="button"
                className="font-semibold text-purple-300 hover:text-purple-200"
                onClick={() => router.push("/log-in")}>
                Sign in
              </button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
