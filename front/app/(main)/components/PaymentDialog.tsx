"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  tripId: string;
  totalParticipants: number;
  selectedDate: string;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onClose,
  amount,
  tripId,
  totalParticipants,
  selectedDate,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, onClose]);

  const handleConfirm = async () => {
    setIsProcessing(true);

    try {
      // Create checkout session via your backend API
      const res = await fetch(
        "https://guideme-8o9f.onrender.com/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tripPlanId: tripId,
            numberOfPeople: totalParticipants,
            totalPrice: amount,
            selectedDate,
          }),
        }
      );

      const data = await res.json();

      if (!data.sessionId) {
        toast.error("Failed to create Stripe session");
        setIsProcessing(false);
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe failed to load");
        setIsProcessing(false);
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        toast.error(error.message);
        setIsProcessing(false);
        return;
      }

      // If redirect succeeds, next code won't run, but just in case:
      setIsSuccess(true);
    } catch (error: any) {
      toast.error("Payment error: " + (error.message || "Unknown error"));
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSuccess ? "Payment Successful" : "Confirm Payment"}
          </DialogTitle>
        </DialogHeader>

        {!isSuccess ? (
          <>
            <div className="my-4 text-center">
              <p className="text-lg font-semibold">Total: ${amount}</p>
              <p className="text-sm text-gray-500">Includes VAT and fees</p>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-[#453C67] hover:bg-[#5a4f8a] text-white"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </>
        ) : (
          <div className="my-8 text-center text-green-600 font-semibold text-xl">
            Your payment is successful! 🎉
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
