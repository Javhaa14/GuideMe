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
  Camera,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { MultiSelect } from "./Multi-selsect";
import Image from "next/image";
import { languageOptions } from "@/lib/options";
import { useState } from "react";
<<<<<<< HEAD
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
=======
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305

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
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "guideme");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const result = await res.json();

        if (result.secure_url) {
          uploadedUrls.push(result.secure_url);
        } else {
          console.error("Upload error:", result);
        }
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
      }
    }

    setUploading(false);
    updateFormData({
      images: [...(formData.images || []), ...uploadedUrls],
    });
  };

  const removeImage = (index: number) => {
    const updated = formData.images.filter((_: any, i: number) => i !== index);
    updateFormData({ images: updated });
  };

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        <p className="text-muted-foreground">
          Let’s start with the essential details of your trip plan.
        </p>
      </div>

      <motion.div variants={item} className="flex flex-col gap-1.5">
        <Label>Trip Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="Enter a catchy title"
        />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div variants={item} className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Date
          </Label>
          <Input
            value={formData.date}
            onChange={(e) => updateFormData({ date: e.target.value })}
            placeholder="e.g., 2025-06-16"
          />
        </motion.div>

<<<<<<< HEAD
        {/* Duration dropdown */}
=======
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
        <motion.div variants={item} className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Duration
          </Label>
<<<<<<< HEAD
          <Select
            value={formData.duration}
            onValueChange={(value) => updateFormData({ duration: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5</SelectItem>
              <SelectItem value="6-10">6-10</SelectItem>
              <SelectItem value="11-15">11-15</SelectItem>
              <SelectItem value="16-20">16-20</SelectItem>
              <SelectItem value="21+">21+</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Group size dropdown */}
=======
          <Input
            value={formData.duration}
            onChange={(e) => updateFormData({ duration: e.target.value })}
            placeholder="e.g., 3 days"
          />
        </motion.div>

>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
        <motion.div variants={item} className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Group Size
          </Label>
<<<<<<< HEAD
          <Select
            value={formData.groupSize}
            onValueChange={(value) => updateFormData({ groupSize: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select group size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1–5 people">1–5 people</SelectItem>
              <SelectItem value="6–10 people">6–10 people</SelectItem>
              <SelectItem value="11–15 people">11–15 people</SelectItem>
              <SelectItem value="16–20 people">16–20 people</SelectItem>
              <SelectItem value="21+ people">21+ people</SelectItem>
            </SelectContent>
          </Select>
=======
          <Input
            value={formData.groupSize}
            onChange={(e) => updateFormData({ groupSize: e.target.value })}
            placeholder="e.g., 2–8 people"
          />
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Price
          </Label>
          <Input
            type="number"
            placeholder="0.00"
            min={0}
            value={formData.price}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || Number(val) >= 0) {
                updateFormData({ price: val });
              }
            }}
          />
        </motion.div>
      </div>

      <motion.div variants={item} className="flex flex-col gap-1.5">
        <Label className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          Languages
        </Label>
        <MultiSelect
          placeholder="Select languages"
          options={languageOptions}
          selected={formData.languages}
          onChange={(langs) => updateFormData({ languages: langs })}
        />
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-1.5">
        <Label className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          About This Trip
        </Label>
        <Textarea
          className="resize-none min-h-32"
          placeholder="Describe what makes this trip special..."
          value={formData.about}
          onChange={(e) => updateFormData({ about: e.target.value })}
        />
      </motion.div>

      <motion.div variants={item} className="flex flex-col gap-1.5">
        <Label>Trip Images</Label>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border">
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700">
              Photos (You need 4 images)
            </span>
            <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl cursor-pointer hover:scale-105 transition">
              <Camera size={18} />
              Add Photo
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {uploading && (
            <p className="text-sm text-muted-foreground">Uploading...</p>
          )}

          {formData.images?.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((img: string, i: number) => (
                <div key={i} className="relative group">
                  <div className="relative w-full h-28 rounded-xl overflow-hidden shadow">
                    <Image
                      src={img}
                      alt={`Photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
