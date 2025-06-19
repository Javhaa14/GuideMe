"use client";

// import dynamic from "next/dynamic";

// const TripMap = dynamic(() => import("./TripMap"), {
//   ssr: false,
// });

// export default TripMap;

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#2E8B57",
        accent: "#FFC300",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        textPrimary: "#1F2937",
        textSecondary: "#6B7280",
        border: "#E5E7EB",
        error: "#EF4444",
      },
    },
  },
};
