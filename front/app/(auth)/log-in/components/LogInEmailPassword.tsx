"use client";

import React, { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { io } from "socket.io-client";

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
  const socket = useMemo(() => {
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
    }
    return io(process.env.NEXT_PUBLIC_BACKEND_URL);
  }, []);

  useEffect(() => {
    if (status !== "authenticated") return;

    const onConnect = () => {
      if (session?.user?.id) {
        socket.emit("identify", session.user.id);
        console.log("Emitted identify for user:", session.user.id);
      }
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, [status, session?.user?.id, socket]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [socket]);
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

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">
      <Card className="relative z-10 w-[440px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-black">
                Welcome back
              </CardTitle>
              <CardDescription className="text-black">
                Log in with your email and password
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="h-12 text-black"
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
                        className="h-12 text-black "
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
                className="w-full h-12 font-semibold text-white transition-all duration-300 bg-sky-600 hover:bg-sky-700 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={form.formState.isSubmitting}
              >
                Continue
              </Button>
            </CardFooter>

            <div className="flex flex-col gap-3 px-6">
              <button
                type="button"
                onClick={() => handleOAuthSignIn("google")}
                className="flex items-center justify-center gap-3 w-full py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-200 transition"
              >
                <img
                  src="/google.png"
                  alt="Google"
                  className="w-5 h-5"
                  loading="lazy"
                />
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="flex justify-center gap-2 py-4 text-sm border-t border-black/10 text-black/70">
              <span>Don’t have an account?</span>
              <button
                type="button"
                onClick={() => router.push("/sign-up")}
                className="font-medium text-black/90 hover:text-black"
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
