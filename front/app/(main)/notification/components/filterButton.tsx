"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronDown } from "lucide-react";

const FormSchema = z.object({
  review: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  chargeStatus: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

const reviews = [
  {
    id: 1,
    label: "*",
  },
  {
    id: 2,
    label: "* *",
  },
  {
    id: 3,
    label: "* * *",
  },
  {
    id: 4,
    label: "* * * *",
  },
  {
    id: 5,
    label: "* * * * *",
  },
] as const;

const chargeStatus = [
  {
    id: 1,
    label: "Paid",
  },
  {
    id: 2,
    label: "Free",
  },
] as const;

export const FilterButton = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      review: [],
      chargeStatus: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Review <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="review"
                render={() => (
                  <FormItem className="flex flex-col w-[100px]">
                    {reviews?.map((review) => (
                      <FormField
                        key={review.id}
                        control={form.control}
                        name="review"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={review.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(review.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          // ...field.value,
                                          review.label,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== review.label
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {review.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Charge Status <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="chargeStatus"
                render={() => (
                  <FormItem className="flex flex-col w-[100px]">
                    {chargeStatus?.map((status) => (
                      <FormField
                        key={status.id}
                        control={form.control}
                        name="chargeStatus"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={status.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(status.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          // ...field.value,
                                          status.label,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== status.label
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {status.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
};
