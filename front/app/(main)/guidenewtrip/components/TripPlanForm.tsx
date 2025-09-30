"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import BasicInfoStep from "./BasicInfoStep";
import RouteStep from "./RouteStep";
import HighlightsStep from "./HighlightsStep";
import ReviewStep from "./ReviewStep";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { axiosInstance } from "@/lib/utils";
import { useUser } from "@/app/context/Usercontext";
import { useRouter } from "next/navigation";

const steps = [
  { id: "basic-info", title: "Basic Info" },
  { id: "route", title: "Route" },
  { id: "highlights", title: "Highlights & Tips" },
  { id: "review", title: "Review" },
];

export default function TripPlanForm() {
  const [activeStep, setActiveStep] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    about: "",
    date: "",
    duration: "",
    languages: [] as string[],
    groupSize: "",
    price: 0,
    route: [{ title: "", about: "", iconType: "location", image: "" }],
    highlights: [""],
    tips: [""],
    images: [] as string[],
  });

  const activeStepIndex = steps.findIndex((step) => step.id === activeStep);

  const updateFormData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    let canProceed = true;

    if (activeStep === "basic-info") {
      const { title, date, duration, languages, groupSize } = formData;
      canProceed = Boolean(
        title && date && duration && languages.length > 0 && groupSize
      );
    } else if (activeStep === "route") {
      const routes = formData.route;
      canProceed = routes.length > 0 && routes.every((r) => r.title);
    }

    if (canProceed && currentIndex < steps.length - 1) {
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps([...completedSteps, activeStep]);
      }
      setActiveStep(steps[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast("Error", {
        description: "Failed to create trip plan. Please try again.",
        className: "bg-red-100 text-red-800 border border-red-300",
      });
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user?.id) return;

      const res = await axiosInstance.post(`/tripPlan`, {
        guideId: user.id,
        ...formData,
      });

      console.log("Form submitted:", res.data);

      toast("Success", {
        description: "Trip plan created successfully! Redirecting...",
        className: "bg-green-100 text-green-800 border border-green-300",
        duration: 2000,
      });

      setTimeout(() => {
        router.push(`/Guidedetail/${user.id}`);
      }, 5000);
    } catch (error) {
      console.error("Error creating trip plan:", error);
      toast("Error", {
        description: "Failed to create trip plan. Please try again.",
        className: "bg-red-100 text-red-800 border border-red-300",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Toaster />
      <div className="relative mb-8">
        <div className="absolute left-0 w-full h-1 -translate-y-1/2 bg-gray-200 rounded-full top-1/2 dark:bg-gray-700" />
        <div
          className="absolute left-0 h-1 transition-all duration-500 ease-in-out -translate-y-1/2 rounded-full top-1/2 bg-primary"
          style={{ width: `${(activeStepIndex / (steps.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = completedSteps.includes(step.id);

            return (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                    isActive
                      ? "bg-primary text-white"
                      : isCompleted
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-sky-600 text-gray-400 border border-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                  {isActive && (
                    <span className="absolute w-full h-full rounded-full bg-primary opacity-20 animate-ping" />
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-black-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="overflow-hidden border-none shadow-xl bg-white">
        <CardContent className="p-0">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="p-6 md:p-8">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep === "basic-info" && (
                  <BasicInfoStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {activeStep === "route" && (
                  <RouteStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {activeStep === "highlights" && (
                  <HighlightsStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}
                {activeStep === "review" && <ReviewStep formData={formData} />}
              </motion.div>
            </div>

            <div className="flex items-center justify-between p-6 border-t bg-gray-50 dark:bg-gray-900/50">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={activeStepIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {activeStepIndex === steps.length - 1 ? (
                <div className="flex items-center gap-4">
                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 text-white bg-sky-600 hover:bg-sky-700"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      "Create Trip"
                    )}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="gap-2 px-8 text-white bg-sky-600 hover:bg-sky-700"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
