"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { TentTree } from "lucide-react";
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

  const onSubmit = async (values: FormValues) => {
    try {
      await axiosInstance.post("/auth/check-user", {
        username: values.username,
      });
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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-[440px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-sky-500">
                <TentTree size={32} color="white" />
              </div>
              <CardTitle className="text-3xl font-bold text-black">
                Let the Journey Begin
              </CardTitle>
              <CardDescription className="text-black/70">
                Choose a username for your page
              </CardDescription>
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 text-black"
                        placeholder="Enter your username here"
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
                Continue
              </Button>
            </CardFooter>

            <div className="flex justify-center gap-4 pt-4">
              <p className="text-black/70">Already have an account?</p>
              <button
                type="button"
                className="font-semibold text-sky-600 hover:text-sky-500"
                onClick={() => router.push("/log-in")}
              >
                Sign in
              </button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
