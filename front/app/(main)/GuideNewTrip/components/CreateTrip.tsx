"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Upload,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TripStop {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  language: string;
  image: string;
}

interface TripData {
  title: string;
  description: string;
  totalDuration: string;
  difficulty: string;
  groupSize: string;
  price: number;
  stops: TripStop[];
  tips: string[];
  images: string[];
  language: "english" | "japanese" | "korean" | "german" | "russian" | "";
}

const initialTripData: TripData = {
  title: "",
  description: "",
  totalDuration: "",
  difficulty: "",
  groupSize: "",
  price: 0,
  stops: [],
  tips: [],
  images: [],
  language: "",
};

export default function CreateTrip() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripData>(initialTripData);
  const [newHighlight, setNewHighlight] = useState("");
  const [newTip, setNewTip] = useState("");

  const totalSteps = 4;

  const addStop = () => {
    const newStop: TripStop = {
      id: Date.now().toString(),
      name: "",
      description: "",
      duration: "",
      price: 0,
      image: "",
      language: "",
    };
    setTripData({ ...tripData, stops: [...tripData.stops, newStop] });
  };

  const updateStop = (id: string, field: keyof TripStop, value: any) => {
    setTripData({
      ...tripData,
      stops: tripData.stops.map((stop) =>
        stop.id === id ? { ...stop, [field]: value } : stop
      ),
    });
  };

  const removeStop = (id: string) => {
    setTripData({
      ...tripData,
      stops: tripData.stops.filter((stop) => stop.id !== id),
    });
  };

  const addTip = () => {
    if (newTip.trim()) {
      setTripData({ ...tripData, tips: [...tripData.tips, newTip.trim()] });
      setNewTip("");
    }
  };

  const removeTip = (index: number) => {
    setTripData({
      ...tripData,
      tips: tripData.tips.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    console.log("Trip Data:", tripData);
    alert("Trip created successfully!");
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Basic Trip Information
        </h2>
        <p className="text-gray-600">
          Let's start with the essential details of your trip.
        </p>
      </div>

      {/* Trip Title */}
      <div>
        <div className="space-y-2">
          <Label htmlFor="title">Trip Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Khuvsgul Lake"
            value={tripData.title}
            onChange={(e) =>
              setTripData({ ...tripData, title: e.target.value })
            }
            className="text-lg"
          />
        </div>
      </div>

      {/* Trip Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Trip Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe what makes this trip special..."
          value={tripData.description}
          onChange={(e) =>
            setTripData({ ...tripData, description: e.target.value })
          }
          rows={4}
        />
      </div>

      {/* Duration & Group Size */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="duration">Total Duration</Label>
          <Input
            id="duration"
            placeholder="e.g., 5 days"
            value={tripData.totalDuration}
            onChange={(e) =>
              setTripData({ ...tripData, totalDuration: e.target.value })
            }
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="groupSize">Group Size</Label>
          <Select
            value={tripData.difficulty}
            onValueChange={(value) =>
              setTripData({ ...tripData, difficulty: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select group size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (2-6 people)</SelectItem>
              <SelectItem value="middle">Middle (7-15 people)</SelectItem>
              <SelectItem value="big">Big (16-25 people)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Language & Price */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={tripData.language}
            onValueChange={(value) =>
              setTripData({
                ...tripData,
                language: value as TripData["language"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="korean">Korean</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="russian">Russian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            placeholder="e.g., $1200"
            value={tripData.price}
            onChange={(e) =>
              setTripData({ ...tripData, price: Number(e.target.value) })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Trip Stops & Destinations
        </h2>
        <p className="text-gray-600">
          Add the amazing places visitors will experience
        </p>
      </div>

      <div className="space-y-6">
        {tripData.stops.map((stop, index) => (
          <Card
            key={stop.id}
            className="relative overflow-hidden transition-colors border-2 border-gray-200 border-dashed hover:border-indigo-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-indigo-500 rounded-full">
                    {index + 1}
                  </div>
                  Stop {index + 1}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStop(stop.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Stop Name *</Label>
                  <Input
                    placeholder="e.g., Murun City"
                    value={stop.name}
                    onChange={(e) =>
                      updateStop(stop.id, "name", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe what makes this stop special..."
                  value={stop.description}
                  onChange={(e) =>
                    updateStop(stop.id, "description", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={stop.image}
                    onChange={(e) =>
                      updateStop(stop.id, "image", e.target.value)
                    }
                  />
                  <Button variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          //   variant="dashed"
          className="w-full h-20 text-gray-600 border-2 border-gray-300 border-dashed hover:border-indigo-400 hover:text-indigo-600"
          onClick={addStop}
        >
          <Plus className="w-6 h-6 mr-2" />
          Add New Stop
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Travel Tips & Recommendations
        </h2>
        <p className="text-gray-600">
          Share your insider knowledge to help travelers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Essential Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a helpful tip..."
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addTip();
                }
              }}
            />
            <Button type="button" onClick={addTip}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {tripData.tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
              >
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-indigo-500 rounded-full"></div>
                <span className="flex-1">{tip}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTip(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center border-2 border-gray-300 border-dashed rounded-lg">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-2 text-gray-600">
              Upload additional images for your trip
            </p>
            <Button variant="outline">Choose Files</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Review & Publish
        </h2>
        <p className="text-gray-600">
          Review your trip details before publishing
        </p>
      </div>

      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-bold">
            {tripData.title || "Untitled Trip"}
          </h3>
          <p className="mb-4 text-gray-700">{tripData.description}</p>

          <div className="grid gap-4 mb-6 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span className="text-sm">
                {tripData.totalDuration || "Duration not set"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-500" />
              <span className="text-sm">
                {tripData.groupSize || "Group size not set"}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="mb-2 font-semibold">
              Stops ({tripData.stops.length})
            </h4>
            <div className="space-y-2">
              {tripData.stops.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-2 text-sm">
                  <span className="flex items-center justify-center w-6 h-6 text-xs text-white bg-indigo-500 rounded-full">
                    {index + 1}
                  </span>
                  <span>{stop.name || `Stop ${index + 1}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">
              Tips ({tripData.tips.length})
            </h4>
            <div className="text-sm text-gray-600">
              {tripData.tips.length > 0
                ? `${tripData.tips.length} helpful tips added`
                : "No tips added yet"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl px-6 py-12 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Create New Trip
          </h1>
          <p className="text-xl text-gray-600">
            Share your amazing travel experiences with the world
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < totalSteps ? (
              <Button
                onClick={() =>
                  setCurrentStep(Math.min(totalSteps, currentStep + 1))
                }
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Save className="w-4 h-4" />
                Publish Trip
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
