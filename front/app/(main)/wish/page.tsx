"use client";

import WishlistCard from "./components/WishlistCard";

export default function Home() {
  return (
    <div className="px-10 py-10">
      <WishlistCard
        id="1"
        name="Northern Lights Photography Tour"
        location="Iceland"
        image="/lake.png"
        startDate="2024-11-20"
        groupSize="Up to 8 travelers"
        price={1750}
        rating={4.8}
        difficulty="Easy"
        onRemove={() => alert("Removed!")}
      />
    </div>
  );
}
