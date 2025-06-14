"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Clock,
  Users,
  Globe,
  DollarSign,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { MultiSelect } from "./Multi-selsect";
import ImageUpload from "./Image-upload";
import { languageOptions } from "@/lib/options";

interface BasicInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
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

export default function BasicInfoStep({
  formData,
  updateFormData,
}: BasicInfoStepProps) {
  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Basic Information
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Let's start with the essential details of your trip plan.
        </p>
      </div>

      <motion.div variants={item}>
        <div className="space-y-2">
          <Label className="text-base">Trip Title</Label>
          <Input
            placeholder="Enter a catchy title for your trip"
            className="py-6 text-lg"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
          />
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div variants={item}>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Date
            </Label>
            <Input
              placeholder="e.g., June 15, 2024"
              value={formData.date}
              onChange={(e) => updateFormData({ date: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Duration
            </Label>
            <Input
              placeholder="e.g., 3 days"
              value={formData.duration}
              onChange={(e) => updateFormData({ duration: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Group Size
            </Label>
            <Input
              placeholder="e.g., 2-8 people"
              value={formData.groupSize}
              onChange={(e) => updateFormData({ groupSize: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Price
            </Label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) =>
                updateFormData({ price: Number(e.target.value) })
              }
            />
          </div>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Languages
          </Label>
          <MultiSelect
            placeholder="Select languages"
            options={languageOptions}
            selected={formData.languages}
            onChange={(values) => updateFormData({ languages: values })}
          />
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            About This Trip
          </Label>
          <Textarea
            placeholder="Describe what makes this trip special..."
            className="resize-none min-h-32"
            value={formData.about}
            onChange={(e) => updateFormData({ about: e.target.value })}
          />
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="space-y-2">
          <Label>Trip Images</Label>
          <ImageUpload
            value={formData.images}
            onChange={(images) => updateFormData({ images })}
            maxFiles={5}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
