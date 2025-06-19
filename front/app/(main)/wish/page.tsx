"use client";

<<<<<<< HEAD
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
=======
import WishlistCard from "./components/WishlistCard";

export default function Home() {
  return (
    <div className="px-10 py-10">
      <WishlistCard
        id="1"
        name="Gobi Desert Adventure"
        location="Gobi, Mongolia"
        image="/lake.png"
        startDate="2025-07-15"
        groupSize="small"
        price={1200}
        currency="USD"
        isFavorite={true}
        onRemove={() => alert("Removed from wishlist")}
      />
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
    </div>
  );
}
