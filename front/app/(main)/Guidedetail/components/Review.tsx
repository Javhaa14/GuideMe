"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Toaster, toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarRating } from "./Starrating";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  communication: z.number().min(1, "Please review"),
  languageKnowledge: z.number().min(1, "Please review"),
  attitude: z.number().min(1, "Please review"),
  tripSatisfaction: z.number().min(1, "Please review"),
  recommend: z.enum(["yes", "no"]),
  review: z.string().optional(),
});

type ReviewProps = {
  userId: string;
};
type UserPayload = {
  _id: string;
  username: string;
  role: string;
};
export const Review = ({ userId }: ReviewProps) => {
  const [open, setOpen] = useState(false);
  const [currentuser, setCurrentuser] = useState<UserPayload | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communication: 0,
      languageKnowledge: 0,
      attitude: 0,
      tripSatisfaction: 0,
      recommend: "no",
      review: "",
    },
  });
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        {
          withCredentials: true,
        }
      );
      const userData = res.data.user;
      setCurrentuser(userData);
    } catch (error) {
      console.log("No user logged in or error fetching user");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const total =
      Number(values.communication) +
      Number(values.languageKnowledge) +
      Number(values.attitude) +
      Number(values.tripSatisfaction);

    const average = total / 4;
    if (!currentuser) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    const reviewWithGuide = {
      userId, // the guide's user ID
      reviewerId: currentuser._id, // the reviewer
      rating: average, // calculated average
      review: values.review, // new name instead of 'comments'
      recommend: values.recommend,
    };

    console.log(reviewWithGuide, average);
    console.log(form.formState.errors);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment`,
        reviewWithGuide
      );

      console.log("✅ Comment created successfully");
    } catch (err) {
      console.error("❌ Comment failed:", err);
    }
    toast.success("Thank you for your review!");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Toaster />
      <DialogTrigger>
        <span className="cursor-pointer flex justify-center items-center rounded-2xl w-[120px] h-[35px] text-white bg-blue-500">
          Review Guide
        </span>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>How was ?</DialogTitle>
          <DialogDescription>
            We’d love to hear your feedback!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
              {" "}
              {[
                { name: "communication", label: "Communication Skill" },
                {
                  name: "languageKnowledge",
                  label: "Language Knowledge & Information",
                },
                { name: "attitude", label: "Attitude & Professionalism" },
                { name: "tripSatisfaction", label: "Trip Satisfaction" },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as any}
                  render={({ field }) => (
                    <FormField
                      control={form.control}
                      name={name as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <StarRating
                              value={parseInt(field.value)}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <FormField
                control={form.control}
                name="recommend"
                render={({ field }) => (
                  <FormItem className="flex items-center ">
                    <FormLabel>
                      Would you recommend this guide to other travelers?
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 ">
                        <Switch
                          className="border-black border-[1px] rounded-full"
                          checked={field.value === "yes"}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "yes" : "no")
                          }
                        />
                        <span className="text-l font-bold ">
                          {field.value === "yes" ? "Yes" : "No"}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any thoughts about the guide?"
                        className=" resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="cursor-pointer" type="submit">
              Submit Review
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
