"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { provinces } from "../data/provinceData";
import { Search } from "lucide-react"; // икон нэмэх

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProvinces = provinces.filter((prov) =>
    prov.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative h-[80vh] w-full rounded-xl overflow-hidden">
      {/* 🔍 Хайлт хийх талбар (glass look + icon) */}
      <div className="absolute top-4 right-4 z-[1000] flex items-center gap-2 backdrop-blur-md bg-white/70 border border-gray-300 rounded-xl px-4 py-2 shadow-lg">
        <Search className="w-4 h-4 text-gray-600" />
        <input
          type="text"
          placeholder="Search by province name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none w-40 placeholder:text-gray-500 text-sm"
        />
      </div>

      {/* 🗺 Газрын зураг */}
      <MapContainer
        center={[46.8625, 103.8467]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredProvinces.map((prov) => (
          <Marker key={prov.id} position={prov.coordinates} icon={icon}>
            <Popup>
              <div className="max-w-[320px] text-base bg-white rounded-xl shadow-xl p-2">
                <img
                  src={prov.image}
                  alt={prov.name}
                  className="w-full h-36 object-cover rounded-lg mb-2"
                />
                <strong className="text-lg text-blue-700">{prov.name}</strong>
                <p className="text-sm text-gray-700">{prov.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
