"use client";

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
    </div>
  );
}
