"use client";

import { GuideListInPost } from "./guideListInPost";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../../../../components/ui/button";
import {
  reviews,
  locations,
  experience,
  languages,
  mocData,
} from "@/app/utils/filterDatas";

type Datatypes = {
  id: string;
  profileName: string;
  profileImage: string;
  review: string;
  location: string;
  experience: string;
  facebookA: string;
  instagramA: string;
  chargeStatus: string;
  language: string[];
};

type Filters = {
  review: string[];
  location: string[];
  experience: string[];
  language: string[];
  gender: string[];
};

export const CheckedGuides = () => {
  const [data, setData] = useState<Datatypes[]>(mocData);
  const [filteredData, setFilteredData] = useState<Datatypes[]>(data);

  const [filters, setFilters] = useState<Filters>({
    review: [],
    location: [],
    experience: [],
    gender: [],
    language: [],
  });

  const handleReviewChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedReview = event.target.name;
    setFilters({
      ...filters,
      review: filters.review.includes(checkedReview)
        ? filters.review.filter((el) => el !== checkedReview)
        : [...filters.review, checkedReview],
    });
  };
  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedLocation = event.target.name;
    setFilters({
      ...filters,
      location: filters.location.includes(checkedLocation)
        ? filters.location.filter((el) => el !== checkedLocation)
        : [...filters.location, checkedLocation],
    });
  };
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

  const handleCheckedReviews = (id: number) => {
    reviews.map((review) => {
      if (review.id === id) {
        return (review.isChecked = !review.isChecked);
      } else {
        return review.isChecked;
      }
    });
  };

  const handleCheckedLocations = (id: number) => {
    locations.map((location) => {
      if (location.id === id) {
        return (location.isChecked = !location.isChecked);
      } else {
        return location.isChecked;
      }
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

  console.log(filters, "value");

  const reviewFilter = (filteredResult: Datatypes[], filterValue: Filters) => {
    let newData: Datatypes[] = [];
    if (filterValue.review.length > 0) {
      filterValue.review.forEach((review) => {
        filteredResult.map((el) => {
          if (el.review === review) newData.push(el);
        });
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const locationFilter = (
    filteredResult: Datatypes[],
    filterValue: Filters
  ) => {
    let newData: Datatypes[] = [];
    if (filterValue.location.length > 0) {
      filterValue.location.forEach((location) => {
        filteredResult.map((el) => {
          if (el.location === location) newData.push(el);
        });
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const experienceFilter = (
    filteredResult: Datatypes[],
    filterValue: Filters
  ) => {
    let newData: Datatypes[] = [];
    if (filterValue.experience.length > 0) {
      filterValue.experience.forEach((experience) => {
        if (experience === "5") {
          filteredResult.map((el) => {
            if (
              el.experience.split(" ")[0] > "1" &&
              el.experience.split(" ")[0] < "6"
            )
              newData.push(el);
          });
        }
        if (experience === "1") {
          filteredResult.map((el) => {
            if (el.experience.split(" ")[0] <= experience) newData.push(el);
          });
        }
        if (experience === "6") {
          filteredResult.map((el) => {
            if (el.experience.split(" ")[0] >= experience) newData.push(el);
          });
        }
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  const languageFilter = (
    filteredResult: Datatypes[],
    filterValue: Filters
  ) => {
    let newData: Datatypes[] = [];
    let newData2: Datatypes[] = [];
    if (filterValue.language.length > 0) {
      filterValue.language.forEach((language) => {
        filteredResult.map((el) => {
          el.language.forEach((lang) => {
            if (lang === language) newData.includes(el) ? "" : newData.push(el);
          });
        });
      });
      return newData;
    } else {
      return filteredResult;
    }
  };

  useEffect(() => {
    let result = data;
    result = reviewFilter(result, filters);
    result = locationFilter(result, filters);
    result = experienceFilter(result, filters);
    result = languageFilter(result, filters);
    setFilteredData(result);
  }, [data, filters]);

  return (
    <div className="flex flex-col gap-5 pl-[80px] pt-[80px]">
      <div className="flex gap-3">
        <div className="flex gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Review</Button>
            </PopoverTrigger>
            <PopoverContent>
              {reviews.map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={value.review}
                    name={value.review}
                    onChange={handleReviewChange}
                    checked={value.isChecked}
                    onClick={() => handleCheckedReviews(value.id)}
                  />
                  <label
                    htmlFor={value.review}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {value.review}
                  </label>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Location</Button>
            </PopoverTrigger>
            <PopoverContent>
              {locations.map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={value.location}
                    name={value.location}
                    onChange={handleLocationChange}
                    checked={value.isChecked}
                    onClick={() => handleCheckedLocations(value.id)}
                  />
                  <label
                    htmlFor={value.location}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {value.location}
                  </label>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Experience</Button>
            </PopoverTrigger>
            <PopoverContent>
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
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Language</Button>
            </PopoverTrigger>
            <PopoverContent>
              {languages.map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
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
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filteredData?.map((guide, index) => (
          <div key={index}>
            <GuideListInPost
              profileImage={guide.profileImage}
              profileName={guide.profileName}
              experience={guide.experience}
              review={guide.review}
              location={guide.location}
              chargeStatus={guide.chargeStatus}
              facebookLink={guide.facebookA}
              instagramLink={guide.instagramA}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
