"use client";

import { useState } from "react";
import { Users, Globe, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TravelSection() {
  const [travelers, setTravelers] = useState("");
  const [language, setLanguage] = useState("");

  const handleProceed = () => {
    if (travelers && language) {
      console.log(`Proceeding with ${travelers} travelers in ${language}`);
      // Handle the form submission here
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Travel Details
        </CardTitle>
        <CardDescription>
          Select your travel preferences to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="travelers">Number of People</Label>
          <Select value={travelers} onValueChange={setTravelers}>
            <SelectTrigger id="travelers">
              <SelectValue placeholder="Select number of travelers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Person</SelectItem>
              <SelectItem value="2">2 People</SelectItem>
              <SelectItem value="3">3 People</SelectItem>
              <SelectItem value="4">4 People</SelectItem>
              <SelectItem value="5">5 People</SelectItem>
              <SelectItem value="6">6 People</SelectItem>
              <SelectItem value="7">7 People</SelectItem>
              <SelectItem value="8">8 People</SelectItem>
              <SelectItem value="9+">9+ People</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Language
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select your language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Español</SelectItem>
              <SelectItem value="french">Français</SelectItem>
              <SelectItem value="german">Deutsch</SelectItem>
              <SelectItem value="italian">Italiano</SelectItem>
              <SelectItem value="portuguese">Português</SelectItem>
              <SelectItem value="chinese">中文</SelectItem>
              <SelectItem value="japanese">日本語</SelectItem>
              <SelectItem value="korean">한국어</SelectItem>
              <SelectItem value="arabic">العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleProceed}
          disabled={!travelers || !language}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
