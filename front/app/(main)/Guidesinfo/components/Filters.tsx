"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { experience, languages, topLanguages } from "@/app/utils/FilterData";
import { LocationFilterCard } from "./SearchLocation";
import PriceFilterCard from "./PriceRangeSlider";
import { useFilteredData } from "@/app/context/FilteredDataContext";
import { usePriceRange } from "@/app/context/PriceRangeContext";
import { useSearchLocation } from "@/app/context/SearchLocationContext";
import { Guide } from "../page";
import { ChevronDown, RefreshCw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Filters = {
  experience: string[];
  language: string[];
  gender: string[];
};

const initialFilters: Filters = {
  experience: [],
  gender: [],
  language: [],
};

export const Filters = ({ guides }: { guides: Guide[] }) => {
  const { filteredData, setFilteredData } = useFilteredData();
  const { priceRange, setPriceRange } = usePriceRange();
  const { searchedValue, setSearchedValue } = useSearchLocation();
  const [reviewNumber, setReviewNumber] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  // Handlers
  const handleExperienceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.name;
    setFilters((prev) => ({
      ...prev,
      experience: prev.experience.includes(val)
        ? prev.experience.filter((e) => e !== val)
        : [...prev.experience, val],
    }));
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.name;
    setFilters((prev) => ({
      ...prev,
      language: prev.language.includes(val)
        ? prev.language.filter((l) => l !== val)
        : [...prev.language, val],
    }));
  };

  const removeTag = (type: "experience" | "language", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  const handleAllClearButton = () => {
    setFilters(initialFilters);
    setSearchedValue("");
    setReviewNumber(0);
    setPriceRange([0, 100]);
  };

  // Filters
  const reviewFilter = (data: Guide[], value: number) =>
    value ? data.filter((el) => el.rating === value) : data;

  const experienceFilter = (data: Guide[]) => {
    if (!filters.experience.length) return data;
    return data.filter((el) => {
      const exp = parseInt(el.experience.split(" ")[0]);
      return filters.experience.some((val) => {
        if (val === "1") return exp <= 1;
        if (val === "5") return exp > 1 && exp < 6;
        if (val === "6") return exp >= 6;
      });
    });
  };

  const languageFilter = (data: Guide[]) => {
    if (!filters.language.length) return data;
    return data.filter((el) =>
      el.languages.some((lang) => filters.language.includes(lang))
    );
  };

  const priceRangeFilter = (data: Guide[]) =>
    data.filter(
      (el) =>
        Number(el.price) >= priceRange[0] && Number(el.price) <= priceRange[1]
    );

  const locationFilter = (data: Guide[]) =>
    searchedValue ? data.filter((el) => el.location === searchedValue) : data;

  useEffect(() => {
    let result = guides;
    result = locationFilter(result);
    result = priceRangeFilter(result);
    result = reviewFilter(result, reviewNumber);
    result = experienceFilter(result);
    result = languageFilter(result);
    setFilteredData(result);
  }, [guides, filters, searchedValue, priceRange, reviewNumber]);

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-md p-5 space-y-4 border border-gray-200  gap-6 w-fit sticky top-[90px]">
      <h2 className="text-gray-800 text-xl font-semibold">Filters</h2>

      {/* Location Filter */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-2">Location</h3>
        <LocationFilterCard
          isFilter={true}
          placeholder="Search location"
          className=""
        />
      </div>

      {/* Price Filter */}
      <div className="border rounded-lg p-4 shadow-sm">
        <PriceFilterCard />
      </div>

      {/* Experience Filter */}
      <div className="border rounded-lg p-4 shadow-sm space-y-2">
        <h3 className="font-medium text-gray-900">Experience</h3>

        {/* Selected tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.experience.map((exp) => (
            <span
              key={exp}
              className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {experience.map((el) => {
                if (el.experienceNumber === exp) {
                  return el.experience;
                }
              })}
              <button onClick={() => removeTag("experience", exp)}>×</button>
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {experience.map((exp) => (
            <label key={exp.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={exp.experienceNumber}
                checked={filters.experience.includes(exp.experienceNumber)}
                onChange={handleExperienceChange}
              />
              <span>{exp.experience}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language Filter */}
      <div className="border rounded-lg p-4 shadow-sm space-y-2">
        <h3 className="font-medium text-gray-900">Language</h3>

        {/* Selected tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.language.map((lang) => (
            <span
              key={lang}
              className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {lang}
              <button onClick={() => removeTag("language", lang)}>×</button>
            </span>
          ))}
        </div>

        {/* First 6 Languages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[...topLanguages, ...languages].slice(0, 6).map((lang) => (
            <label key={lang.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={lang.language}
                checked={filters.language.includes(lang.language)}
                onChange={handleLanguageChange}
              />
              <span>{lang.language}</span>
            </label>
          ))}
        </div>

        {/* Accordion for additional languages */}
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={isExpanded ? "more-languages" : ""}
          onValueChange={(value) => setIsExpanded(value === "more-languages")}
        >
          <AccordionItem value="more-languages">
            <AccordionTrigger className="flex items-center gap-1 text-sm text-sky-700 hover:underline px-0 group">
              {isExpanded ? "Show Less Languages" : "Show More Languages"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {[...topLanguages, ...languages].slice(6).map((lang) => (
                  <label key={lang.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={lang.language}
                      checked={filters.language.includes(lang.language)}
                      onChange={handleLanguageChange}
                    />
                    <span>{lang.language}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-center mt-4">
        <Button
          variant="ghost"
          className="text-sky-700 font-semibold flex items-center gap-1"
          onClick={handleAllClearButton}
        >
          <RefreshCw className="w-4 h-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};
