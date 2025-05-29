"use client";

import { useState } from "react";

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

export const Card = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="w-fit mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Choose Your Subscription
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Connect with top guides and get travel support — choose a plan that fits
        your journey.
      </p>

      <div className="space-y-4 flex gap-10">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`cursor-pointer rounded-md border min-h-[250px] min-w-[200px] gap-5 px-4 py-5 flex flex-col justify-between items-center ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              } transition`}
            >
              <h3 className="text-lg font-medium">{plan.label}</h3>
              <p className="text-sm text-gray-500">{plan.description}</p>
              <span className="text-xl font-bold">
                ${plan.price.toFixed(2)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Subscribed to ${plan.label} plan!`);
                }}
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  isSelected
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isSelected}
              >
                Select
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
