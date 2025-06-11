"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

// Зурагны тохиргоо
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ image талбарыг нэмсэн
type Stop = {
  name: string;
  position: [number, number];
  desc: string;
  image?: string;
};

const stops: Stop[] = [
  {
    name: "Ulaanbaatar",
    position: [47.9184, 106.9176],
    desc: "The capital city of Mongolia",
    image: "/altai.png",
  },
  {
    name: "Amarbayasgalant Monastery",
    position: [49.5983, 105.9683],
    desc: "A monastery with over 300 years of history",
    image: "/desert.jpg",
  },
  {
    name: "Erdenet City",
    position: [49.0275, 104.0445],
    desc: "The center of Orkhon province and home to a major copper mine",
    image: "/horse.png",
  },
  {
    name: "Selenge River",
    position: [49.5, 104.5],
    desc: "One of the largest rivers in Mongolia",
    image: "/lake.png",
  },
  {
    name: "Uvur-Uur Pass",
    position: [50.0, 100.8],
    desc: "A scenic high mountain pass in the north",
    image: "/horse.png",
  },
  {
    name: "Murun City",
    position: [49.6342, 100.162],
    desc: "The capital of Khuvsgul province",
    image: "/altai.png",
  },
  {
    name: "Khuvsgul Lake",
    position: [50.5583, 100.1475],
    desc: "The deepest freshwater lake in Mongolia",
    image: "/altai.png",
  },
];

export default function TourMapClient() {
  useEffect(() => {
    const map = L.DomUtil.get("map");
    if (map) (map as any)._leaflet_id = null;
  }, []);

  return (
    <MapContainer
      id="map"
      center={[49.5, 104.0]}
      zoom={6}
      scrollWheelZoom={false}
      className="h-[500px] rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />
      {stops.map((stop, idx) => (
        <Marker key={idx} position={stop.position}>
          <Popup>
            <div className="text-sm">
              <strong className="block mb-1">{stop.name}</strong>
              <p>{stop.desc}</p>
              {stop.image && (
                <img
                  src={stop.image}
                  alt={stop.name}
                  className="h-auto mt-2 rounded-md shadow w-80"
                />
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
