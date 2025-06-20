"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { useSearchLocation } from "@/app/context/SearchLocationContext";
<<<<<<< HEAD
=======
import { Input } from "@/components/ui/input";
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a

type dataTypes = {
  name: string;
  description: string;
};

<<<<<<< HEAD
export const LocationFilterCard = () => {
=======
export const LocationFilterCard = ({
  isFilter,
  className,
  placeholder,
}: {
  isFilter: boolean;
  className: string;
  placeholder: string;
}) => {
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
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
<<<<<<< HEAD
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
=======
    <div>
      {isFilter ? (
        <div className="w-full max-w-md">
          <div className="flex gap-1 justify-center items-center rounded-2xl border-1 p-3 w-[400px] h-[40px]">
            <BiSearchAlt className="size-[20px] text-gray-500" />
            <input
              type="search"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleValueChange}
              className={
                `w-full px-3 py-2 rounded-2xl border-none outline-none hover:outline-none hover:border:none` +
                className
              }
            />
          </div>

          {isShown ? (
            <ul className="mt-2 border-white border hover:border-gray-300 bg-[#f0f0f0]">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col text-sm bg-white text-black px-[15px] py-[10px] hover:bg-black hover:text-white hover:border-[#4C9AFF] "
                >
                  <p onClick={() => handleOnClick(item)}>{item.description}</p>
                </div>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <div className="w-[400px] max-w-md">
          <Input
            type="search"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleValueChange}
            className={`flex ` + className}
          />

          {isShown ? (
            <ul className="mt-2 border-white border hover:border-gray-300 bg-[#f0f0f0]">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col text-sm bg-white text-black px-[15px] py-[10px] hover:bg-black hover:text-white hover:border-[#4C9AFF] "
                >
                  <p onClick={() => handleOnClick(item)}>{item.description}</p>
                </div>
              ))}
            </ul>
          ) : null}
        </div>
      )}
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
    </div>
  );
};
