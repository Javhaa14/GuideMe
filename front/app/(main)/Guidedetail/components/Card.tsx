"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    id: "1m",
    label: "1 Month",
    price: 5,
    description: "Perfect for short trips",
  },
  {
    id: "6m",
    label: "6 Months",
    price: 30,
    description: "Best value for frequent travelers",
  },
  {
    id: "12m",
    label: "12 Months",
    price: 90,
    description: "Full year of travel guidance",
  },
];

export const Card = ({
  handleplan,
  qr,
  step,
  status,
}: {
  handleplan: (e: any, selectedPlan: string | null) => void;
  status: string;
  qr: string;
  step: number;
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col">
        <span className="text-3xl font-bold mb-3 text-center text-blue-600">
          {step == 1 && " Pick a Plan"}
          {step == 2 &&
            `You have selected ${
              selectedPlan == "6m"
                ? "6 Months"
                : selectedPlan == "1m"
                ? "1 Month"
                : selectedPlan == "12m"
                ? "1 Year"
                : ""
            } plan`}
        </span>
        <span className="text-center mb-6 text-gray-600 text-sm">
          {step == 1 &&
            "Unlock access to the best local guides and expert travel support."}
          {step == 2 && "Scan this QR code to pay!"}
        </span>
      </div>

      {step === 1 && (
        <div className="flex gap-6 justify-center flex-row">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer transition-all duration-300 ease-in-out relative rounded-lg border-2 p-6 w-60 flex flex-col justify-between items-center shadow-sm hover:shadow-md ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {isSelected && (
                  <CheckCircle2 className="absolute top-2 right-2 text-blue-600" />
                )}
                <span className="text-xl font-semibold">{plan.label}</span>
                <span className="text-sm text-gray-500 mt-2 text-center">
                  {plan.description}
                </span>
                <div className="text-2xl font-bold text-blue-600 mt-4">
                  ${plan.price.toFixed(2)}
                </div>
                <button
                  onClick={(e) => handleplan(e, selectedPlan)}
                  className={`mt-4 w-full py-2 rounded-md text-white font-semibold transition ${
                    isSelected
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!isSelected}
                >
                  {isSelected ? "Continue" : "Select a Plan"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col justify-center items-center mt-4 gap-4">
          {qr && <img className="size-[200px]" src={qr} alt="QR code" />}
          {status && (
            <span className="text-green-600 font-medium text-lg">
              ✅ Payment Successful!
            </span>
          )}
        </div>
      )}
    </div>
  );
};
