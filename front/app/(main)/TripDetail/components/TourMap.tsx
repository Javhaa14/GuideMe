import dynamic from "next/dynamic";

// SSR-гүй динамик импорт
const TourMapClient = dynamic(() => import("./TourMapClient"), {
  ssr: false,
});

export default function TourMap() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Tour Map</h2>
      <TourMapClient />
    </div>
  );
}
