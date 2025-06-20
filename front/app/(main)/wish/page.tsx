<<<<<<< HEAD
import WishlistCard from "./components/WishlistCard";

export default function Home() {
  const wishlistItems = [
    {
      id: "trip-123",
      name: "Tropical Paradise Getaway",
      location: "Bali, Indonesia",
      image: "/lake.png",
      startDate: "June 15, 2025",
      groupSize: "small",
      price: 1299,
      currency: "USD",
      isFavorite: true,
    },
    {
      id: "trip-456",
      name: "Mountain Expedition Adventure",
      location: "Swiss Alps",
      image: "/horse.png",
      startDate: "July 22, 2025",
      groupSize: "big",
      price: 1899,
      currency: "USD",
      isFavorite: false,
    },
    {
      id: "trip-789",
      name: "Cultural Heritage Tour",
      location: "Kyoto, Japan",
      image: "/gobi.png",
      startDate: "August 10, 2025",
      groupSize: "small",
      price: 2199,
      currency: "USD",
      isFavorite: false,
    },
  ];

  return (
    <main className="container px-4 py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Your Travel Wishlist</h1>
      <div className="flex flex-col space-y-6">
        {wishlistItems.map((item) => (
          <WishlistCard
            key={item.id}
            id={item.id}
            name={item.name}
            location={item.location}
            image={item.image}
            startDate={item.startDate}
            groupSize={item.groupSize as "small" | "big"}
            price={item.price}
            currency={item.currency}
            isFavorite={item.isFavorite}
          />
        ))}
      </div>
    </main>
=======
"use client";

import { axiosInstance } from "@/lib/utils";
import WishlistCard from "./components/WishlistCard";
import { useUser } from "@/app/context/Usercontext";
import { useState, useEffect } from "react";

interface RouteItem {
  _id: string;
  image: string;
  title: string;
  about: string;
  iconType: string;
}

interface WishlistItem {
  _id: string; // wishlist entry id
  guideId: string;
  title: string;
  images: string[];
  about: string;
  date: string;
  duration: string;
  languages: string[];
  groupSize: string;
  price: number;
  route: RouteItem[];
  highlights: string[];
  tips: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  tripPlanId: string; // <-- make sure your API sends this field for each wishlist item
}

export default function Home() {
  const { user } = useUser();
  const [wishlists, setWishlists] = useState<WishlistItem[] | null>(null);

  const getAllWishlists = async () => {
    try {
      const response = await axiosInstance.get<WishlistItem[]>(
        `/wishlist/${user.id}`
      );
      setWishlists(response.data);
    } catch (error) {
      console.error("Failed to fetch wishlists", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getAllWishlists();
    }
  }, [user]);

  return (
    <div className="px-10 py-10">
      {wishlists && wishlists.length > 0 ? (
        wishlists.map((item) => (
          <WishlistCard
            key={item._id}
            id={item.tripPlanId || item._id}
            onRemove={() => {
              getAllWishlists();
            }}
          />
        ))
      ) : (
        <p>No wishlists found.</p>
      )}
    </div>
>>>>>>> 610eaba0bbbbdad64c4fbe0fdae458b6d91bf28a
  );
}
