"use client";

import React, { Dispatch, SetStateAction } from "react";
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
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setUsername(values.username);
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      <Card className="w-[440px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader>
              <CardTitle className="text-[20px] font-semibold">
                Create Your Account
              </CardTitle>
              <CardDescription>Choose a username for your page</CardDescription>
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username here"
                        {...field}
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
