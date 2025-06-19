"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";
import { useMapEvents } from "react-leaflet"; // hook-ийг шууд

// Icon config
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface TripMapProps {
  onSelect: (lat: number, lng: number, address: string) => void;
}

// Dynamic Map components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

function TripMapInner({ onSelect }: TripMapProps) {
  const [position, setPosition] = useState<[number, number]>([
    47.918873, 106.917301,
  ]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e: any) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        const address = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        onSelect(lat, lng, address);
      },
    });
    return null;
  };

  return (
    <div className="h-80 rounded-xl overflow-hidden z-0">
      <MapContainer
        key={position.toString()} // эсвэл UUID
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
}

// Dynamic wrapper
const TripMap = dynamic(() => Promise.resolve(TripMapInner), { ssr: false });

export default TripMap;
