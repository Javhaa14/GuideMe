"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Star } from "lucide-react";

interface Review {
  _id: string;
  reviewerId: {
    _id: string;
    username: string;
  };
  rating: number;
  review: string;
  createdAt: string;
}

interface ReviewsProps {
  userId: string;
}

export const Reviews = ({ userId }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/comment/${userId}`);
        if (res.data.success) {
          setReviews(res.data.comments);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  // Don't show anything while loading or if there are no reviews
  if (loading || reviews.length === 0) {
    return null;
  }

  const reviewItems = reviews.map((review) => (
    <div
      key={review._id}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-sm mx-auto">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-lg text-gray-600 mr-4">
          {review.reviewerId?.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-gray-800">
            {review.reviewerId?.username}
          </p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{review.review}"</p>
      <p className="text-xs text-gray-400 mt-4 text-right">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  ));

  return (
    <div className="py-12 bg-gray-50/50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        What Others Are Saying
      </h2>
      <InfiniteMovingCards items={reviewItems} direction="right" speed="slow" />
    </div>
  );
};
