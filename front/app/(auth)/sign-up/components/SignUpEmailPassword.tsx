"use client";

import React, { useContext } from "react";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
// import { axiosInstance } from "@/lib/utils";
// import { AuthContext } from "@/app/context/AuthContext";

const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be more than 8 letters" }),
});

export function SignUpEmailPassword({ username }: { username: string }) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //   const { setUser } = useContext(AuthContext);
  const router = useRouter();

  //   const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
  //     try {
  //       const response = await axiosInstance.post("/auth/signup", {
  //         email: values.email,
  //         username,
  //         password: values.password,
  //       });

  //       const message = response.data.message;

  //       if (message === "email already registered") {
  //         form.setError("email", {
  //           type: "manual",
  //           message: "This email is already registered",
  //         });
  //       } else if (message === "User created successfully") {
  //         setUser(response.data.user);
  //         localStorage.setItem("username", username);
  //         router.push("/create-profile");
  //       } else {
  //         form.setError("email", {
  //           type: "manual",
  //           message: "Unexpected server response",
  //         });
  //       }
  //     } catch (error: any) {
  //       const errorMessage =
  //         error?.response?.data?.message || "Something went wrong. Try again.";
  //       form.setError("email", {
  //         type: "manual",
  //         message: errorMessage,
  //       });
  //     }
  //   };

  return (
    <div>
      <Card className="w-[407px]">
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(handleSignUp)}
            className="flex flex-col gap-6"
          >
            <CardHeader>
              <CardTitle className="text-[20px] font-semibold">
                Welcome, {username}
              </CardTitle>
              <CardDescription>
                Connect email and set a password
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
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
                        placeholder="Enter your password here"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button className="w-full h-[44px]" type="submit">
                Continue
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
