"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutButtonProps {
  sessionId: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  sessionId,
}) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      alert("Stripe failed to load");
      return;
    }
    // Redirect to Stripe Checkout page
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      alert(error.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-[#453C67] hover:bg-[#5a4f8a] text-white px-6 py-3 rounded-full"
    >
      Pay Now
    </button>
  );
};
