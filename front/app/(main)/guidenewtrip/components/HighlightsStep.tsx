"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Lightbulb, Info } from "lucide-react";
import { motion } from "framer-motion";

interface HighlightsStepProps {
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

export default function HighlightsStep({
  formData,
  updateFormData,
}: HighlightsStepProps) {
  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    updateFormData({ highlights: newHighlights });
  };

  const addHighlight = () => {
    updateFormData({ highlights: [...formData.highlights, ""] });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...formData.highlights];
    newHighlights.splice(index, 1);
    updateFormData({ highlights: newHighlights });
  };

  const updateTip = (index: number, value: string) => {
    const newTips = [...formData.tips];
    newTips[index] = value;
    updateFormData({ tips: newTips });
  };

  const addTip = () => {
    updateFormData({ tips: [...formData.tips, ""] });
  };

  const removeTip = (index: number) => {
    const newTips = [...formData.tips];
    newTips.splice(index, 1);
    updateFormData({ tips: newTips });
  };

  return (
    <motion.div
      className="space-y-10"
      variants={container}
      initial="hidden"
<<<<<<< HEAD
      animate="show">
=======
      animate="show"
    >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
      <motion.div variants={item} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trip Highlights
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 pl-9">
            Add key highlights of your trip that will attract travelers.
          </p>
        </div>

        <div className="space-y-3 pl-9">
          {formData.highlights.map((highlight: string, index: number) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
<<<<<<< HEAD
              transition={{ delay: index * 0.05 }}>
=======
              transition={{ delay: index * 0.05 }}
            >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Enter a highlight"
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    className="pl-8 transition-all focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <span className="absolute -translate-y-1/2 left-3 top-1/2 text-amber-500">
                    •
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeHighlight(index)}
                disabled={formData.highlights.length === 1}
<<<<<<< HEAD
                className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
=======
                className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-amber-300 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/50"
<<<<<<< HEAD
            onClick={addHighlight}>
=======
            onClick={addHighlight}
          >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
            <Plus className="w-4 h-4 mr-2" />
            Add Highlight
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              <Info className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Travel Tips
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 pl-9">
            Add useful tips for travelers taking this trip.
          </p>
        </div>

        <div className="space-y-3 pl-9">
          {formData.tips.map((tip: string, index: number) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
<<<<<<< HEAD
              transition={{ delay: 0.3 + index * 0.05 }}>
=======
              transition={{ delay: 0.3 + index * 0.05 }}
            >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Enter a travel tip"
                    value={tip}
                    onChange={(e) => updateTip(index, e.target.value)}
                    className="pl-8 transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="absolute text-blue-500 -translate-y-1/2 left-3 top-1/2">
                    ✓
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeTip(index)}
                disabled={formData.tips.length === 1}
<<<<<<< HEAD
                className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
=======
                className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full text-blue-600 border-blue-300 border-dashed hover:bg-blue-50 hover:text-blue-700 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/50"
<<<<<<< HEAD
            onClick={addTip}>
=======
            onClick={addTip}
          >
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
            <Plus className="w-4 h-4 mr-2" />
            Add Tip
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
