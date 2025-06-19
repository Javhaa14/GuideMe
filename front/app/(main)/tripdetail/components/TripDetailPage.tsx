"use client";

import React, { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import { Heart, HeartPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

import { Activity } from "./Activity";
import { TripItem } from "./Booking";
import Rout from "./Rout";
import { useUser } from "@/app/context/Usercontext";
import TourBookingPage from "./TourBookingPage";

export const TripDetailPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [trip, setTrip] = useState<TripItem | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const params = useParams();
  const { user } = useUser();
=======
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import TourBookingPage from "./TourBookingPage";
import TourMap from "./TourMap";
import RoadRoute from "./RoadRoute";
import { Activity } from "./Activity";
import { TripItem } from "./Booking";

export const TripDetailPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [trip, setTrip] = useState<TripItem>();
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams();
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305

  const openDialog = (index: number) => {
    setCurrentIndex(index);
    dialogRef.current?.showModal();
  };
<<<<<<< HEAD
=======

>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
  const closeDialog = () => dialogRef.current?.close();

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
<<<<<<< HEAD
=======

>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

<<<<<<< HEAD
  // Call backend to add trip to wishlist
  const addTripToWishlist = async (tripId: string) => {
    try {
      const res = await axiosInstance.post(`/wishlist/add`, {
        userId: user?.id,
        tripPlanId: tripId,
      });
      return res.data;
    } catch (error: any) {
      console.error("Add to wishlist error:", error);
      toast.error(
        "Нэмэхэд алдаа гарлаа: " + (error.message || "Тодорхойгүй алдаа")
      );
      return null;
    }
  };

  const handleAddToWishlist = async () => {
    if (isWishlisted) {
      toast("Already in wishlist!");
      return;
    }

    if (!trip?._id) {
      toast.error("Аяллын мэдээлэл дутуу байна");
      return;
    }

    try {
      // First, check if trip is already in wishlist
      const wishlistRes = await axiosInstance.get(`/wishlist/${user.id}`);
      if (Array.isArray(wishlistRes.data)) {
        const exists = wishlistRes.data.some(
          (item: { _id: string }) => item._id === trip._id
        );
        if (exists) {
          setIsWishlisted(true);
          toast("Already in wishlist!");
          return;
        }
      }

      // If not in wishlist, add it
      const addRes = await addTripToWishlist(trip._id);
      if (addRes && addRes.success) {
        setIsWishlisted(true);
        toast.success("Аялал wishlist-д нэмэгдлээ!");
      } else {
        toast.error("Нэмэхэд алдаа гарлаа");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Серверийн алдаа: " + (err.message || "Тодорхойгүй алдаа"));
    }
=======
  const handleAddToWishlist = () => {
    toast.success("Wishlist-д амжилттай нэмэгдлээ! 🎉");
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
  };

  const fetchTrip = async () => {
    const tripId = params?.id as string;
<<<<<<< HEAD
    const userId = user?.id;

    console.log("Fetching trip for:", tripId, "with user:", userId);

    if (!tripId) {
      toast.error("Аяллын ID олдсонгүй");
      return;
    }

    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`, {
        params: { userId },
      });
      console.log("API response:", res.data);

      if (!res.data.success || !res.data.tripPlan) {
        toast.error("Аялал олдсонгүй: " + (res.data.message || ""));
        return;
      }

      setTrip(res.data.tripPlan);
      setImages(
        Array.isArray(res.data.tripPlan.images)
          ? res.data.tripPlan.images
          : res.data.tripPlan.images
          ? [res.data.tripPlan.images]
          : []
      );
      setIsWishlisted(res.data.isWishlisted || false);
    } catch (error: any) {
      console.error("API fetch error:", error?.response?.data || error.message);
      toast.error("Алдаа гарлаа: " + (error.message || "Тодорхойгүй алдаа"));
=======
    if (!tripId) return console.warn("⛔ params.id байхгүй байна");

    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`);

      if (!res.data.success || !res.data.tripPlan) {
        console.warn("⛔ Аялал олдсонгүй:", res.data.message);
        toast.error("Аялал олдсонгүй: " + res.data.message);
        return;
      }

      const tripData = res.data.tripPlan;
      console.log("➡️ tripData:", tripData);
      setTrip(tripData);

      const imageData = tripData?.images;
      if (imageData) {
        setImages(Array.isArray(imageData) ? imageData : [imageData]);
      }
    } catch (error: any) {
      console.error(
        "❌ API fetch error:",
        error?.response?.data || error.message
      );
      toast.error("Алдаа гарлаа: " + error?.message);
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    if (user?.id && params?.id) {
      fetchTrip();
    }
  }, [user?.id, params?.id]);

  console.log(isWishlisted, "wishlist status");

  return (
    <div className="max-w-5xl p-4 mx-auto font-sans">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">{trip?.title || "Loading..."}</h1>
        <button
          onClick={handleAddToWishlist}
          className="flex items-center gap-1 px-3 py-1 transition-all border border-gray-300 rounded-lg hover:bg-red-50 active:scale-95"
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }>
          {isWishlisted ? (
            <HeartPlus size={16} className="text-red-600" />
          ) : (
            <Heart size={16} className="text-gray-400" />
          )}
          <span
            className={`text-sm font-medium ${
              isWishlisted ? "text-red-600" : "text-gray-700"
            }`}>
            {isWishlisted ? "In wishlist" : "Add to wishlist"}
          </span>
        </button>
=======
    fetchTrip();
  }, []);

  return (
    <div className="max-w-5xl p-4 mx-auto font-sans">
      <h1 className="mb-2 text-3xl font-bold">{trip?.title || "Loading..."}</h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-4 ml-auto text-sm">
          <button
            onClick={handleAddToWishlist}
            className="flex items-center gap-1 px-3 py-1 transition-all border border-gray-300 rounded-lg hover:bg-red-50 active:scale-95"
          >
            <Heart size={16} className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">
              Add to wishlist
            </span>
          </button>
        </div>
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
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

<<<<<<< HEAD
=======
      {/* Dialog for full-screen preview */}
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
      <dialog
        ref={dialogRef}
        aria-modal="true"
        role="dialog"
<<<<<<< HEAD
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/80 bg-transparent rounded-xl p-0 border-0 max-w-6xl w-[95vw] h-[85vh]">
        <div className="relative flex items-center justify-center w-full h-full px-12">
          <button
            onClick={closeDialog}
            className="absolute z-20 flex items-center justify-center w-12 h-12 text-4xl text-white transition duration-200 rounded-full top-4 right-6 hover:text-gray-300 bg-black/40 hover:bg-black/60 backdrop-blur">
=======
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/80 bg-transparent rounded-xl p-0 border-0 max-w-6xl w-[95vw] h-[85vh]"
      >
        <div className="relative flex items-center justify-center w-full h-full px-12">
          <button
            onClick={closeDialog}
            className="absolute z-20 flex items-center justify-center w-12 h-12 text-4xl text-white transition duration-200 rounded-full top-4 right-6 hover:text-gray-300 bg-black/40 hover:bg-black/60 backdrop-blur"
          >
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
            ×
          </button>
          <button
            onClick={prevImage}
            className="absolute left-0 z-30 px-3 py-2 text-3xl text-white transition duration-200 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur"
<<<<<<< HEAD
            aria-label="Previous Image">
=======
            aria-label="Previous Image"
          >
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
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
<<<<<<< HEAD
            aria-label="Next Image">
=======
            aria-label="Next Image"
          >
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
            ›
          </button>
        </div>
      </dialog>

      {/* Additional Components */}
      <Activity />
<<<<<<< HEAD
      {trip && <TourBookingPage trip={trip} />}
      <Rout />
=======
      <TourBookingPage trip={trip!} />
      <TourMap />
      <RoadRoute />
>>>>>>> 8cf4585019f5686889b411c16e1309b7d5003305
    </div>
  );
};
