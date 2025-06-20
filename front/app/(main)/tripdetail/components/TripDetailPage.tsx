"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart, HeartPlus, Pencil, Save, X } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [trip, setTrip] = useState<TripItem | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedImages, setEditedImages] = useState<string[]>([]);

  const params = useParams();
  const { user } = useUser();

  useEffect(() => {
    if (trip) {
      setEditedTitle(trip.title);
      setEditedImages(images);
    }
  }, [trip, images]);

  const openDialog = (index: number) => {
    setCurrentIndex(index);
    dialogRef.current?.showModal();
  };
  const closeDialog = () => dialogRef.current?.close();

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % editedImages.length);
  };
  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + editedImages.length) % editedImages.length
    );
  };

  const fetchTrip = async () => {
    const tripId = params?.id as string;
    if (!tripId) return;

    try {
      const res = await axiosInstance.get(`/tripPlan/tripPlan/${tripId}`, {
        params: { userId: user?.id },
      });

      if (res.data.success && res.data.tripPlan) {
        setTrip(res.data.tripPlan);
        const imgs = Array.isArray(res.data.tripPlan.images)
          ? res.data.tripPlan.images
          : [res.data.tripPlan.images];
        setImages(imgs);
        setEditedImages(imgs);
        setIsWishlisted(res.data.isWishlisted || false);
      } else {
        toast.error("Аялал олдсонгүй");
      }
    } catch (error: any) {
      toast.error("Алдаа гарлаа: " + (error.message || "Тодорхойгүй алдаа"));
    }
  };

  const handleSaveAll = async () => {
    if (!trip) return;
    if (!editedTitle.trim()) {
      toast.error("Гарчиг хоосон байж болохгүй");
      return;
    }

    try {
      const res = await axiosInstance.put(`/tripPlan/${trip._id}`, {
        title: editedTitle.trim(),
        images: editedImages,
      });

      if (res.data.success) {
        toast.success("Мэдээлэл амжилттай шинэчлэгдлээ");
        setTrip({ ...trip, title: editedTitle.trim(), images: editedImages });
        setImages(editedImages);
        setIsEditing(false);
      } else {
        toast.error("Шинэчлэхэд алдаа гарлаа");
      }
    } catch (error: any) {
      toast.error("Серверийн алдаа: " + error.message);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...editedImages];
    updated.splice(index, 1);
    setEditedImages(updated);
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "guideme");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          setEditedImages((prev) => [...prev, data.secure_url]);
          toast.success("Зураг амжилттай нэмэгдлээ");
        } else {
          console.error("Upload failed:", data);
          toast.error("Зураг илгээхэд алдаа гарлаа");
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        toast.error("Серверийн алдаа: Cloudinary");
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddToWishlist = async () => {
    if (!trip?._id || !user?.id) return;
    try {
      const wishlistRes = await axiosInstance.get(`/wishlist/${user.id}`);
      const exists = wishlistRes.data?.some(
        (item: any) => item._id === trip._id
      );
      if (exists) return setIsWishlisted(true);

      const addRes = await axiosInstance.post(`/wishlist/add`, {
        userId: user.id,
        tripPlanId: trip._id,
      });
      if (addRes.data.success) {
        setIsWishlisted(true);
        toast.success("Wishlist-д нэмэгдлээ!");
      }
    } catch (error: any) {
      toast.error("Алдаа: " + (error.message || "Тодорхойгүй"));
    }
  };

  useEffect(() => {
    if (user?.id && params?.id) fetchTrip();
  }, [user?.id, params?.id]);

  return (
    <div className="max-w-5xl p-4 mx-auto font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-3xl font-bold text-gray-800 border-b border-blue-400 focus:outline-none focus:border-blue-600"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-800">
              {trip?.title || "Loading..."}
            </h1>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 active:scale-95 transition duration-150 shadow-sm"
          >
            <Pencil size={16} />
            {isEditing ? "Cancel" : "Edit"}
          </button>

          <button
            onClick={handleAddToWishlist}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md border transition duration-150 shadow-sm
              ${
                isWishlisted
                  ? "text-red-600 bg-white border-red-300 hover:bg-red-50"
                  : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
              }`}
          >
            {isWishlisted ? <HeartPlus size={16} /> : <Heart size={16} />}
            {isWishlisted ? "In wishlist" : "Add to wishlist"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {editedImages.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              onClick={() => openDialog(index)}
              className="object-cover w-full h-48 rounded-lg shadow hover:opacity-90 cursor-pointer"
              alt={`Trip ${index + 1}`}
            />
            {isEditing && (
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-100"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleAddImage}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-blue-500"
            >
              + Зураг нэмэх
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <button
          onClick={handleSaveAll}
          className="px-6 py-2 mb-4 text-white bg-green-600 rounded hover:bg-green-700"
        >
          <Save className="inline w-4 h-4 mr-1" /> Хадгалах
        </button>
      )}

      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/80 bg-transparent rounded-xl p-0 border-0 max-w-6xl w-[95vw] h-[85vh]"
      >
        <div className="relative flex items-center justify-center w-full h-full px-12">
          <button
            onClick={closeDialog}
            className="absolute z-20 flex items-center justify-center w-10 h-10 text-2xl text-white rounded-full top-4 right-6 bg-black/40 hover:bg-black/60"
          >
            ×
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 z-30 px-3 py-2 text-xl text-white rounded-full bg-black/40 hover:bg-black/60"
          >
            ‹
          </button>
          {editedImages.length > 0 && (
            <img
              src={editedImages[currentIndex]}
              alt={`Preview ${currentIndex + 1}`}
              className="object-contain max-w-full max-h-full rounded-lg"
            />
          )}
          <button
            onClick={nextImage}
            className="absolute right-4 z-30 px-3 py-2 text-xl text-white rounded-full bg-black/40 hover:bg-black/60"
          >
            ›
          </button>
        </div>
      </dialog>

      <Activity />
      {trip && <TourBookingPage trip={trip} />}
      <Rout />
    </div>
  );
};
