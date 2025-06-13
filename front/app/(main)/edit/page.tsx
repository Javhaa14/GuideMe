"use client";

import { useState, useRef } from "react";
import { MainEdit, MainEditRef } from "./components/MainEdit";
import { RoudEdit, RoudEditRef } from "./components/RoudEdit";
import { TipsEdit, TipsEditRef } from "./components/TipsEdit";

export default function Home() {
  const mainRef = useRef<MainEditRef>(null);
  const roudRef = useRef<RoudEditRef>(null);
  const tipsRef = useRef<TipsEditRef>(null);

  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = () => {
    const mainData = mainRef.current?.getData();
    const roudData = roudRef.current?.getData();
    const tipsData = tipsRef.current?.getData();

    // Та энд backend рүү илгээдэг логик бичиж болно
    console.log("Saving all data:");
    console.log("Main:", mainData);
    console.log("Route:", roudData);
    console.log("Tips:", tipsData);

    // Амжилттай хадгалсан гэж үзье
    setSavedMessage("Амжилттай хадгалагдлаа!");

    // 3 сек дараа арилгах
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <div className="max-w-4xl px-6 py-8 mx-auto space-y-6">
      <MainEdit ref={mainRef} />
      <RoudEdit ref={roudRef} />
      <TipsEdit ref={tipsRef} />

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      {savedMessage && (
        <div className="p-3 text-green-800 bg-green-100 rounded shadow">
          {savedMessage}
        </div>
      )}
    </div>
  );
}
