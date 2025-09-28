"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Globe,
  DollarSign,
  Route,
  Lightbulb,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ReviewStepProps {
  formData: any;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const iconComponents = {
  location: MapPin,
  food: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-utensils"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  activity: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-tent"
    >
      <path d="M19 20 10 4" />
      <path d="m5 20 9-16" />
      <path d="M3 20h18" />
      <path d="m12 15-3 5" />
      <path d="m12 15 3 5" />
    </svg>
  ),
  hotel: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-hotel"
    >
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
      <path d="M8 7h.01" />
      <path d="M16 7h.01" />
      <path d="M12 7h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
      <path d="M8 11h.01" />
      <path d="M10 22v-6.5m4 0V22" />
    </svg>
  ),
  transport: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-bus"
    >
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  ),
};

export default function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Review Trip Plan
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Review all the information before creating your trip plan.
        </p>
      </div>

      <motion.div variants={item}>
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
            {formData.images && formData.images.length > 0 ? (
              <Image
                src={formData.images[0] || "/placeholder.svg"}
                alt={formData.title}
                fill
                className="object-cover opacity-50"
              />
            ) : null}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="p-6">
                <h1 className="text-3xl font-bold text-white">
                  {formData.title}
                </h1>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              {formData.about && (
                <p className="text-gray-700 dark:text-gray-300">
                  {formData.about}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Date
                    </p>
                    <p className="font-medium">{formData.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Duration
                    </p>
                    <p className="font-medium">{formData.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Group Size
                    </p>
                    <p className="font-medium">{formData.groupSize}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Price
                    </p>
                    <p className="font-medium">${formData.price}</p>
                  </div>
                </div>

                <div className="flex items-center col-span-2 gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 sm:col-span-1">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Languages
                    </p>
                    <p className="font-medium truncate">
                      {formData.languages.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Route className="w-5 h-5 text-blue-500" />
                  <h4 className="text-lg font-semibold">Trip Route</h4>
                </div>

                <div className="relative pl-8 space-y-8">
                  {/* Vertical line */}
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                  {formData.route.map((location: any, index: number) => {
                    const IconComponent =
                      iconComponents[
                        location.iconType as keyof typeof iconComponents
                      ] || MapPin;

                    return (
                      <div key={index} className="relative">
                        {/* Circle on the line */}
                        <div className="absolute top-0 w-4 h-4 bg-blue-500 border-2 border-white rounded-full -left-5 dark:border-gray-800"></div>

                        <div className="flex flex-col gap-4 md:flex-row">
                          {location.image && (
                            <div className="relative w-full h-32 overflow-hidden rounded-lg md:w-1/3">
                              <Image
                                src={location.image || "/placeholder.svg"}
                                alt={location.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div
                            className={`w-full ${
                              location.image ? "md:w-2/3" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <h5 className="text-lg font-medium">
                                {location.title}
                              </h5>
                            </div>

                            {location.about && (
                              <p className="mt-2 text-gray-600 dark:text-gray-400">
                                {location.about}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-blue-500" />
                    <h4 className="text-lg font-semibold">Highlights</h4>
                  </div>

                  <ul className="pl-5 space-y-2">
                    {formData.highlights.map(
                      (highlight: string, index: number) =>
                        highlight ? (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1 text-blue-500">•</span>
                            <span>{highlight}</span>
                          </li>
                        ) : null
                    )}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-blue-500" />
                    <h4 className="text-lg font-semibold">Tips</h4>
                  </div>

                  <ul className="pl-5 space-y-2">
                    {formData.tips.map((tip: string, index: number) =>
                      tip ? (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1 text-blue-500">✓</span>
                          <span>{tip}</span>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
