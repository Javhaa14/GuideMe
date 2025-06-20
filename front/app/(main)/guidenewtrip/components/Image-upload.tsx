"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({
  value = [],
  onChange,
  maxFiles = 3,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if we're exceeding the max files limit
    if (value.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    setIsUploading(true);

    try {
      // In a real app, you would upload to your storage service
      // For this example, we'll create placeholder URLs
      const newUrls = Array.from(files).map(
        (_, index) =>
          `/placeholder.svg?height=300&width=400&text=Image ${
            value.length + index + 1
          }`
      );

      // In a real implementation, you would get back URLs from your server
      onChange([...value, ...newUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {value.map((url, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={url || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute w-6 h-6 rounded-full top-2 right-2"
<<<<<<< HEAD
                onClick={() => handleRemove(index)}>
=======
                onClick={() => handleRemove(index)}
              >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        {value.length < maxFiles && (
          <Card className="aspect-square">
            <CardContent className="flex flex-col items-center justify-center h-full p-4">
              <label
                htmlFor="image-upload"
<<<<<<< HEAD
                className="flex flex-col items-center justify-center w-full h-full transition-colors border-2 border-dashed rounded-md cursor-pointer border-muted-foreground/25 hover:border-muted-foreground/50">
=======
                className="flex flex-col items-center justify-center w-full h-full transition-colors border-2 border-dashed rounded-md cursor-pointer border-muted-foreground/25 hover:border-muted-foreground/50"
              >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                <div className="flex flex-col items-center justify-center py-4">
                  <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium text-center">
                    {isUploading ? "Uploading..." : "Upload Image"}
                  </p>
                  <p className="mt-1 text-xs text-center text-muted-foreground">
                    {`${value.length}/${maxFiles} images`}
                  </p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleUpload}
                  disabled={isUploading}
                />
              </label>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
