import * as z from "zod";

// Define the route item schema
const routeItemSchema = z.object({
  title: z.string().min(1, "Location name is required"),
  about: z.string().optional(),
  iconType: z.string().optional(),
  image: z.string().optional(),
});

// Define the trip plan schema
export const tripPlanSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  images: z.array(z.string()).optional().default([]),
  about: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  duration: z.string().min(1, "Duration is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  groupSize: z.string().min(1, "Group size is required"),
  price: z.number().min(0, "Price must be a positive number"),
  route: z
    .array(routeItemSchema)
    .min(1, "At least one route location is required"),
  highlights: z.array(z.string()).optional().default([]),
  tips: z.array(z.string()).optional().default([]),
});

export type TripPlanFormValues = z.infer<typeof tripPlanSchema>;
