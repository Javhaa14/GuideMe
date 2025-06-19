"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Plus, X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "../hooks/use-debounce";

interface MapSearchProps {
  onLocationSelect: (location: any) => void;
}

export default function MapSearch({ onLocationSelect }: MapSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const debouncedQuery = useDebounce(query, 500);

  // Mock location search function
  const searchLocations = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // Mock API response with some sample locations based on the query
      const mockResults = [
        {
          id: "1",
          place_name: `${searchQuery} City Center`,
          coordinates: [0, 0],
        },
        {
          id: "2",
          place_name: `${searchQuery} Park`,
          coordinates: [0.01, 0.01],
        },
        {
          id: "3",
          place_name: `${searchQuery} Museum`,
          coordinates: [0.02, 0.02],
        },
        {
          id: "4",
          place_name: `${searchQuery} Restaurant`,
          coordinates: [0.03, 0.03],
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      setResults(mockResults);
    } catch (error) {
      console.error("Error searching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search when debounced query changes
  useEffect(() => {
    searchLocations(debouncedQuery);
  }, [debouncedQuery]);

  // Select a location from search results
  const handleSelectLocation = (location: any) => {
    // Add to selected locations
    const newLocation = {
      name: location.place_name,
      coordinates: location.coordinates,
    };

    setSelectedLocations([...selectedLocations, newLocation]);

    // Notify parent component
    onLocationSelect(location);

    // Clear search
    setQuery("");
    setResults([]);
  };

  // Add a custom location
  const handleAddCustomLocation = () => {
    if (!query) return;

    const customLocation = {
      id: `custom-${Date.now()}`,
      place_name: query,
      coordinates: [0, 0], // Default coordinates
    };

    handleSelectLocation(customLocation);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <Input
            type="text"
            placeholder="Search for a location"
            className="py-6 pl-10 pr-10 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="absolute flex items-center justify-center w-6 h-6 text-gray-500 -translate-y-1/2 bg-gray-200 rounded-full right-3 top-1/2 hover:bg-gray-300"
              onClick={() => setQuery("")}
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-1"
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardContent className="p-0">
                  {results.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                      }}
                      className="border-b border-gray-100 last:border-b-0 dark:border-gray-800"
                    >
                      <Button
                        variant="ghost"
                        className="justify-start w-full h-auto px-4 py-3 text-left rounded-none"
                        onClick={() => handleSelectLocation(result)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{result.place_name}</p>
                          </div>
                          <Plus className="w-4 h-4 text-gray-400" />
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {query && results.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-1"
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardContent className="p-4">
                  <p className="mb-3 text-sm text-gray-500">
                    No results found.
                  </p>
                  <Button
                    variant="outline"
                    className="justify-start w-full border-dashed"
                    onClick={handleAddCustomLocation}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add "{query}" as a custom location
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-blue-500" />
              Selected Locations
            </h3>
            <span className="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {selectedLocations.length} location
              {selectedLocations.length !== 1 ? "s" : ""}
            </span>
          </div>

          {selectedLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="p-3 mb-3 text-blue-500 rounded-full bg-blue-50 dark:bg-blue-900/50 dark:text-blue-300">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                No locations selected yet
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Search for locations above or add them manually
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedLocations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center p-3 bg-white border border-blue-100 rounded-md dark:bg-gray-800 dark:border-blue-900/30"
                >
                  <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mr-3 dark:bg-blue-900 dark:text-blue-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="flex-1 truncate">{location.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => {
                      const newLocations = [...selectedLocations];
                      newLocations.splice(index, 1);
                      setSelectedLocations(newLocations);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Search for locations above and add them to your trip route.
      </div>
    </div>
  );
}
