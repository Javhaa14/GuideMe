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
  );
}
