"use client";

import React, { useState } from "react";
import MapSelector from "./MapSelector"; // MapSelector замыг зөв зааж өгнө үү

const MapSelectorWrapper = () => {
  const [tempCoordinate, setTempCoordinate] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [tempRoute, setTempRoute] = useState({
    name: "",
    title: "",
    about: "",
  });

  return (
    <div>
      <MapSelector
        onSelect={({ lat, lng, name, title, about }) => {
          setTempCoordinate({ lat, lng });
          setTempRoute({ name, title, about });
        }}
      />
    </div>
  );
};

export default MapSelectorWrapper;
