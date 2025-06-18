"use client";

import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

// 👇 onSelect одоо бүх өгөгдлийг дамжуулна
export default function MapSelector({
  onSelect,
}: {
  onSelect: (data: {
    lat: number;
    lng: number;
    name: string;
    title: string;
    about: string;
  }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    lat: 0,
    lng: 0,
    name: "",
    title: "",
    about: "",
  });

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setFormData((prev) => ({
          ...prev,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }));
        setOpen(true);
      },
    });
    return null;
  };

  const handleConfirm = () => {
    if (formData.name && formData.title) {
      onSelect(formData);
      setOpen(false);
      setFormData({ lat: 0, lng: 0, name: "", title: "", about: "" });
    }
  };

  return (
    <div className="w-full h-[600px] rounded overflow-hidden">
      <MapContainer
        center={[47.9, 106.9]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <MapClickHandler />
      </MapContainer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Маршрут нэмэх</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p>
              🧭 Байршил: {formData.lat.toFixed(5)}, {formData.lng.toFixed(5)}
            </p>
            <Input
              placeholder="Нэр"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder="Гарчиг"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Тайлбар"
              value={formData.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Болих
            </Button>
            <Button onClick={handleConfirm}>Хадгалах</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
