"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

export function SignUpEmailPassword({ username }: SignUpEmailPasswordProps) {
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/signup",
        { ...values, username },
        { withCredentials: true }
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
      form.setError("email", { type: "manual", message: msg });
    }
  };

  const inputStyle =
    "h-12 text-black bg-white border-gray-300 placeholder:text-black/50 focus:border-sky-500 focus:ring-sky-500/20 rounded-xl hover:bg-gray-50";

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, {
      callbackUrl: `/welcome?username=${encodeURIComponent(username)}`,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-[440px] bg-white border border-gray-200 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-black">
                Welcome, {username}
              </CardTitle>
              <CardDescription className="text-black/70">
                Connect your email and create a password or use a social login
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black/90">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className={cn(inputStyle)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-black" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black/90">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className={cn(inputStyle)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-black" />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full h-12 font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl hover:shadow-lg"
              >
                Create Account
              </Button>
            </CardFooter>
          </form>
        </Form>

        <div className="px-6 pb-6 pt-4 text-center">
          <p className="mb-4 text-gray-500 text-sm">Or sign up with</p>
          <div className="flex justify-center gap-4 items-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-700 border border-gray-300 rounded-xl px-5 py-2 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-gray-50 hover:scale-105"
              onClick={() => handleSocialSignIn("google")}
            >
              <img
                src="/google.png"
                alt="Google"
                className="w-5 h-5"
                loading="lazy"
              />
              <span>Google</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
