"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { experience, languages, topLanguages } from "@/app/utils/FilterData";
import { LocationFilterCard } from "./SearchLocation";
import PriceFilterCard from "./PriceRangeSlider";
import { StarRatingFilter } from "./StarRating";
import { useFilteredData } from "@/app/context/FilteredDataContext";
import { usePriceRange } from "@/app/context/PriceRangeContext";
import { useSearchLocation } from "@/app/context/SearchLocationContext";
import { Separator } from "@/components/ui/separator";
import { Guide } from "../page";

type Filters = {
  experience: string[];
  language: string[];
  gender: string[];
};

const initilaFilters = {
  experience: [],
  gender: [],
  language: [],
};

export const Filters = ({ guides }: { guides: Guide[] }) => {
  const { filteredData, setFilteredData } = useFilteredData();
  const { priceRange, setPriceRange } = usePriceRange();
  const { searchedValue, setSearchedValue } = useSearchLocation();
  const [reviewNumber, setReviewNumber] = useState<number>(0);

  const [filters, setFilters] = useState<Filters>(initilaFilters);

  const handleExperienceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedExperience = event.target.name;
    setFilters({
      ...filters,
      experience: filters.experience.includes(checkedExperience)
        ? filters.experience.filter((el) => el !== checkedExperience)
        : [...filters.experience, checkedExperience],
    });
  };
  const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedLanguages = event.target.name;
    setFilters({
      ...filters,
      language: filters.language.includes(checkedLanguages)
        ? filters.language.filter((el) => el !== checkedLanguages)
        : [...filters.language, checkedLanguages],
    });
  };

  const handleCheckedExperience = (id: number) => {
    experience.map((value) => {
      if (value.id === id) {
        return (value.isChecked = !value.isChecked);
      } else {
        return value.isChecked;
      }
    });
  };

  const handleCheckedLanguages = (id: number) => {
    languages.map((value) => {
      if (value.id === id) {
        return (value.isChecked = !value.isChecked);
      } else {
        return value.isChecked;
      }
    });
  };

  const handleCheckedTopLanguages = (id: number) => {
    topLanguages.map((value) => {
      if (value.id === id) {
        return (value.isChecked = !value.isChecked);
      } else {
        return value.isChecked;
      }
    });
  };

  console.log(filters, "value");

  const reviewFilter = (filteredResult: Guide[], filterValue: number) => {
    let newData: Guide[] = [];
    if (filterValue) {
      filteredResult.map((el) => {
        if (el.rating === filterValue) newData.push(el);
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const experienceFilter = (filteredResult: Guide[], filterValue: Filters) => {
    let newData: Guide[] = [];
    if (filterValue.experience.length > 0) {
      filterValue.experience.forEach((experience) => {
        if (experience === "5") {
          filteredResult?.map((el) => {
            if (
              el.experience.split(" ")[0] > "1" &&
              el.experience.split(" ")[0] < "6"
            )
              newData.push(el);
          });
        }
        if (experience === "1") {
          filteredResult?.map((el) => {
            if (el.experience.split(" ")[0] <= experience) newData.push(el);
          });
        }
        if (experience === "6") {
          filteredResult?.map((el) => {
            if (el.experience.split(" ")[0] >= experience) newData.push(el);
          });
        }
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const languageFilter = (filteredResult: Guide[], filterValue: Filters) => {
    let newData: Guide[] = [];
    if (filterValue.language.length > 0) {
      filterValue.language.forEach((language) => {
        filteredResult?.map((el) => {
          el.languages.forEach((lang) => {
            if (lang === language) newData.includes(el) ? "" : newData.push(el);
          });
        });
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const priceRangeFilter = (filteredResult: Guide[], priceRange: number[]) => {
    let newData: Guide[] = [];
    if (priceRange[0] !== 0) {
      filteredResult.map((el) => {
        if (
          Number(el.price) >= priceRange[0] &&
          Number(el.price) <= priceRange[1]
        ) {
          newData.push(el);
        }
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const locationFilter = (
    filteredResult: Guide[],
    searchedLocation: string
  ) => {
    let newData: Guide[] = [];
    if (searchedLocation) {
      filteredResult?.map((el) => {
        if (el.location == searchedLocation) {
          newData.push(el);
        }
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  useEffect(() => {
    let result = guides;
    result = locationFilter(result, searchedValue);
    result = priceRangeFilter(result, priceRange);
    result = reviewFilter(result, reviewNumber);
    result = experienceFilter(result, filters);
    result = languageFilter(result, filters);
    setFilteredData(result);
  }, [guides, filters, searchedValue, priceRange, reviewNumber]);

  const handleReviewChanges = (star: number) => {
    setReviewNumber(star);
  };

  const handleAllClearButton = () => {
    setFilters(initilaFilters);
    setSearchedValue("");
    setReviewNumber(0);
    setPriceRange([0, 100]);
    experience.map((value) => {
      if (value.isChecked === true) {
        return (value.isChecked = !value.isChecked);
      }
    });
    topLanguages.map((value) => {
      if (value.isChecked === true) {
        return (value.isChecked = !value.isChecked);
      }
    });
    languages.map((value) => {
      if (value.isChecked === true) {
        return (value.isChecked = !value.isChecked);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 px-30">
      <LocationFilterCard
        isFilter={true}
        placeholder="Search and select a city"
      />
      <PriceFilterCard />
      <div className="flex flex-col justify-center items-start gap-5">
        {/* <div className="flex gap-5">
          <h3 className="flex w-[150px] text-base font-medium text-gray-700">
            Review:
          </h3>
          <StarRatingFilter
            value={reviewNumber}
            onChange={handleReviewChanges}
          />
        </div> */}

        <div className="flex flex-col gap-5 justify-items-center">
          <h3 className="flex w-[150px] text-base font-medium text-gray-700">
            Experience:
          </h3>
          {experience.map((value, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={value.experience}
                name={value.experienceNumber}
                onChange={handleExperienceChange}
                checked={value.isChecked}
                onClick={() => handleCheckedExperience(value.id)}
              />
              <label
                htmlFor={value.experience}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {value.experience}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 justify-items-center">
          <h3 className="flex w-[150px] text-base font-medium text-gray-700">
            Language:
          </h3>
          <div className="flex flex-col gap-2 w-full">
            <div className="grid grid-cols-3 gap-2 items-center">
              {topLanguages.map((value, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={value.language}
                    name={value.language}
                    onChange={handleLanguageChange}
                    checked={value.isChecked}
                    onClick={() => handleCheckedTopLanguages(value.id)}
                    className=""
                  />
                  <label
                    htmlFor={value.language}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {value.language}
                  </label>
                </div>
              ))}
            </div>
            <Separator />
            <Accordion type="single" collapsible className="appearance-none">
              <AccordionItem value="item-1">
                <div className="grid grid-cols-3 items-center gap-2">
                  {languages.map((value, index) => (
                    <AccordionContent
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={value.language}
                        name={value.language}
                        onChange={handleLanguageChange}
                        checked={value.isChecked}
                        onClick={() => handleCheckedLanguages(value.id)}
                      />
                      <label
                        htmlFor={value.language}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {value.language}
                      </label>
                    </AccordionContent>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <AccordionTrigger>Show More</AccordionTrigger>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center mt-2">
        <Button
          variant="outline"
          className="bg-gray-300 "
          onClick={handleAllClearButton}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
