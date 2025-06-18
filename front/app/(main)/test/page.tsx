"use client";
import { useState } from "react";

const data = {
  Mongolia: ["Ulaanbaatar", "Darkhan", "Erdenet"],
  Japan: ["Tokyo", "Osaka", "Kyoto"],
};

export default function DependentSelect() {
  const [country, setCountry] = useState("Mongolia");
  const [city, setCity] = useState(data["Mongolia"][0]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setCity(data[selectedCountry][0]);
  };

  return (
    <div className="flex flex-col gap-4 p-4 text-black">
      <label>
        Country:
        <select value={country} onChange={handleCountryChange}>
          {Object.keys(data).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        City:
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {data[country].map((ct) => (
            <option key={ct} value={ct}>
              {ct}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
