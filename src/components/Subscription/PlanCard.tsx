"use client"

import { Check, Crown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const PlanCard = ({ plan, selectedPlan, currentPack, handleSelectPlan, isLoading, compact = false }) => {
  // Corrected logic to determine if this plan is the user's current active plan
  // It compares the plan.id (e.g., "matchlent-pro") with currentPack (e.g., "PRO")
  const isCurrentPlan = plan.id.replace("matchlent-", "").toUpperCase() === currentPack.toUpperCase()

  // Determine if the free plan should be disabled (user has PRO/PREMIUM)
  const isFreePlanDisabled = plan.id === "free" && (currentPack === "PRO" || currentPack === "PREMIUM")

  // Determine if the button should be disabled
  const isDisabled = isLoading || isCurrentPlan || isFreePlanDisabled

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)

  return (
    <div
      className={`
        relative bg-white rounded-xl p-6 h-full flex flex-col border
        ${plan.popular ? "border-2 border-indigo-300 shadow-xl" : "border-gray-200 shadow-md"}
        ${isCurrentPlan ? "ring-2 ring-indigo-500 border-indigo-500 border-2" : ""}
        ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      {isCurrentPlan && (
        <div className="absolute top-0 right-0 mt-3 mr-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Gói hiện tại
        </div>
      )}
      {plan.popular &&
        !isCurrentPlan && ( // Only show "Phổ biến" if not current plan
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
              <Crown className="w-3 h-3" />
              Phổ biến
            </div>
          </div>
        )}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-3xl font-bold text-gray-900">
            {plan.price === "0" ? "Miễn phí" : `${formatCurrency(plan.price)}`}
          </span>
          {plan.discountedPrice && (
            <span className="text-lg text-gray-500 line-through">{formatCurrency(plan.discountedPrice)}</span>
          )}
          {plan.price !== "0" && <span className="text-gray-500 text-sm mb-1">/{plan.period}</span>}
        </div>
        {plan.trialDays && (
          <p className="text-indigo-600 text-sm font-medium">Dùng thử {plan.trialDays} ngày miễn phí</p>
        )}
      </div>
      <div className="flex-grow space-y-3 mb-6">
        {plan.benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-indigo-600" : "text-gray-500"}`} />
            <span className="text-gray-700 text-sm">{benefit}</span>
          </div>
        ))}
      </div>
      {isCurrentPlan ? (
        <div className="w-full py-3 px-4 rounded-lg font-medium text-center bg-gray-100 text-gray-600 border border-gray-300">
          Gói hiện tại
        </div>
      ) : (
        <Button
          onClick={() => handleSelectPlan(plan.id)}
          className={`
            w-full py-3 px-4 rounded-lg font-medium transition-all
            transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg
            ${plan.buttonStyle}
            ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          disabled={isDisabled}
        >
          {isLoading && selectedPlan === plan.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : plan.buttonText}
        </Button>
      )}
    </div>
  )
}

export default PlanCard
