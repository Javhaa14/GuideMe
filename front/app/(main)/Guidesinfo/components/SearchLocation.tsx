"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { useSearchLocation } from "@/app/context/SearchLocationContext";

type dataTypes = {
  name: string;
  description: string;
};

export const LocationFilterCard = () => {
  const { searchedValue, setSearchedValue } = useSearchLocation();
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<dataTypes[]>([]);
  const [isShown, setIsShown] = useState<boolean>(true);

  useEffect(() => {
    if (inputValue.trim().length > 2) {
      fetchResults(inputValue);
    } else {
      setResults([]);
    }
  }, [inputValue]);

  const fetchResults = async (searchText: string) => {
    try {
      const res = await axios.get(
        `https://d14w0rz7s8v3pz.cloudfront.net/predictions?s=${searchText}`
      );
      const data = res.data;
      setResults(data || []);
    } catch (error) {
      console.error("Failed to fetch", error);
      setResults([]);
    }
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsShown(true);
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleOnClick = (item: dataTypes) => {
    setSearchedValue(item.description);
    setIsShown(false);
    setInputValue(item.description);
  };

  return (
    <div className="w-[400px] max-w-md">
      <div className="flex gap-1 justify-center items-center border-1 p-3 w-full h-[50px]">
        <BiSearchAlt className="size-[20px]" />
        <input
          type="search"
          placeholder="Start typing a city..."
          value={inputValue}
          onChange={handleValueChange}
          className="w-full px-3 py-2 rounded border-none outline-none hover:outline-none hover:border:none"
        />
      </div>

      {isShown ? (
        <ul>
          {results.map((item, index) => (
            <div key={index} className="flex flex-col border p-3">
              <p onClick={() => handleOnClick(item)}>{item.description}</p>
            </div>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
