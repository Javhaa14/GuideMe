"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

import { Activity } from "./Activity";
import { TripItem } from "./Booking";
import Rout from "./Rout";
import { useUser } from "@/app/context/Usercontext";

export const TripDetailPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [trip, setTrip] = useState<TripItem | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  // Зураг дэлгэц дээр томруулж харах
  const openDialog = (index: number) => {
    setCurrentIndex(index);
    dialogRef.current?.showModal();
  };
  const closeDialog = () => dialogRef.current?.close();

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Wishlist-д нэмэх функц
  const handleAddToWishlist = async () => {
    try {
      if (!trip?._id) {
        toast.error("Аяллын мэдээлэл дутуу байна");
        return;
      }

      const res = await axiosInstance.post("/wishlist", {
        userId: user.id,
        tripPlanId: trip._id,
      });

      if (res.data.success) {
        toast.success("Аялал wishlist-д нэмэгдлээ!");
        router.push("/wish");
      } else {
        toast.error("Нэмэхэд алдаа гарлаа");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Серверийн алдаа: " + (err.message || "Тодорхойгүй алдаа"));
    }
  };

  const fetchTrip = async () => {
    const tripId = params?.id as string;
    if (!tripId) {
      toast.error("Аяллын ID олдсонгүй");
      return;
    }

    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`);

      if (!res.data.success || !res.data.tripPlan) {
        toast.error("Аялал олдсонгүй: " + (res.data.message || ""));
        return;
      }

      const tripData = res.data.tripPlan;
      setTrip(tripData);

      const imageData = tripData?.images;
      setImages(
        Array.isArray(imageData) ? imageData : imageData ? [imageData] : []
      );
    } catch (error: any) {
      console.error("API fetch error:", error?.response?.data || error.message);
      toast.error("Алдаа гарлаа: " + (error.message || "Тодорхойгүй алдаа"));
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
    <div className="max-w-5xl p-4 mx-auto font-sans">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">{trip?.title || "Loading..."}</h1>
        <button
          onClick={handleAddToWishlist}
          className="flex items-center gap-1 px-3 py-1 transition-all border border-gray-300 rounded-lg hover:bg-red-50 active:scale-95">
          <Heart size={16} className="text-red-500" />
          <span className="text-sm font-medium text-gray-700">
            Add to wishlist
          </span>
        </button>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 mb-6">
          <img
            src={images[0]}
            alt="Main"
            className="object-cover w-full col-span-1 rounded cursor-pointer h-60"
            onClick={() => openDialog(0)}
          />
          <img
            src={images[1] || images[0]}
            alt="Second"
            className="object-cover w-full col-span-1 rounded cursor-pointer h-60"
            onClick={() => openDialog(1)}
          />
          <div className="grid grid-rows-2 gap-2">
            <img
              src={images[2] || images[0]}
              alt="Third"
              className="object-cover w-full rounded cursor-pointer h-28"
              onClick={() => openDialog(2)}
            />
            <img
              src={images[3] || images[0]}
              alt="Fourth"
              className="object-cover w-full rounded cursor-pointer h-28"
              onClick={() => openDialog(3)}
            />
          </div>
        </div>
      ) : (
        <p className="mb-6 text-gray-500 italic">Зураг олдсонгүй</p>
      )}

      <p className="mb-6 text-base leading-relaxed text-gray-800">
        {trip?.about || "No trip description available."}
      </p>

      {/* Зураг томруулж харах dialog */}
      <dialog
        ref={dialogRef}
        aria-modal="true"
        role="dialog"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/80 bg-transparent rounded-xl p-0 border-0 max-w-6xl w-[95vw] h-[85vh]">
        <div className="relative flex items-center justify-center w-full h-full px-12">
          <button
            onClick={closeDialog}
            className="absolute z-20 flex items-center justify-center w-12 h-12 text-4xl text-white transition duration-200 rounded-full top-4 right-6 hover:text-gray-300 bg-black/40 hover:bg-black/60 backdrop-blur">
            ×
          </button>
          <button
            onClick={prevImage}
            className="absolute left-0 z-30 px-3 py-2 text-3xl text-white transition duration-200 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur"
            aria-label="Previous Image">
            ‹
          </button>
          {images.length > 0 && (
            <img
              src={images[currentIndex]}
              alt={`Preview ${currentIndex + 1}`}
              className="object-contain max-w-full max-h-full rounded-lg shadow-lg"
            />
          )}
          <button
            onClick={nextImage}
            className="absolute right-0 z-30 px-3 py-2 text-3xl text-white transition duration-200 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur"
            aria-label="Next Image">
            ›
          </button>
        </div>
      </dialog>

      {/* Additional Components */}
      <Activity />
      {/* <TourBookingPage trip={trip!} setBookingStatus={setBookingStatus} /> */}
      <Rout />
    </div>
  );
};
