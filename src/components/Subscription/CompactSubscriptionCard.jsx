"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Loader2, Zap, Crown, Rocket } from "lucide-react"
import Swal from "sweetalert2"
import { plans } from "@/mock/data"

const CompactSubscriptionCard = ({
  currentPlan = "FREE", // Default to "FREE" to match JWT pack format
  isTokenValid = true,
}) => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Helper to format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)

  // Normalize currentPlan prop to match plan IDs in mock data
  const currentPlanIdInPlans = currentPlan.toLowerCase() === "free" ? "free" : `matchlent-${currentPlan.toLowerCase()}`
  const currentPlanData = plans.find((p) => p.id === currentPlanIdInPlans)

  // Filter available upgrades, excluding the current plan and employer plans
  const availableUpgrades = plans.filter(
    (p) =>
      p.id !== currentPlanIdInPlans &&
      !["matchlent-basic", "matchlent-elite", "matchlent-platinum", "matchlent-ads"].includes(p.id),
  )

  const handleUpgrade = async (planId) => {
    if (!isTokenValid) {
      await Swal.fire({
        icon: "warning",
        title: "Phiên đăng nhập đã hết hạn",
        text: "Vui lòng đăng nhập lại để tiếp tục.",
        confirmButtonColor: "#7c3aed",
      })
      return
    }

    if (planId === "enterprise") {
      await Swal.fire({
        icon: "info",
        title: "Liên hệ tư vấn",
        text: "Chúng tôi sẽ liên hệ với bạn trong vòng 24h.",
        confirmButtonColor: "#7c3aed",
      })
      return
    }

    setIsProcessing(true)
    setSelectedPlan(planId)

    const planToUpgrade = plans.find((p) => p.id === planId)

    navigate("/account-plan", {
      state: {
        planId,
        planName: planToUpgrade?.name,
        price: planToUpgrade?.price,
        qrCode: `payment-data-for-${planId}`, // This will be replaced by actual QR code from transactionAPI
      },
    })
    setIsProcessing(false) // Reset processing state after navigation
  }

  const getPlanIcon = (planId) => {
    // Normalize planId for icon selection if it comes from JWT (e.g., "PRO")
    const normalizedId = planId.toLowerCase().replace("matchlent-", "")
    switch (normalizedId) {
      case "premium":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "platinum":
      case "ads":
        return <Rocket className="h-4 w-4 text-purple-500" />
      default:
        return <Zap className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50/50 to-blue-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              {getPlanIcon(currentPlan)}
              Gói hiện tại
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200/50 shadow-sm"
            >
              {currentPlanData?.name || "N/A"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-end gap-1 mb-3">
            <div className="text-2xl font-bold text-gray-900">
              {currentPlanData?.price === "0" || !currentPlanData?.price // Handle "0" or undefined/null price
                ? "Miễn phí"
                : `${formatCurrency(currentPlanData.price)}`}
            </div>
            {currentPlanData?.price !== "0" && currentPlanData?.price !== undefined && (
              <span className="text-sm text-gray-500 mb-1">/{currentPlanData?.period}</span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4">{currentPlanData?.description || "Không có mô tả."}</p>
          <ul className="space-y-2">
            {currentPlanData?.benefits?.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      {availableUpgrades.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-800">Nâng cấp gói</CardTitle>
            <CardDescription className="text-gray-500">Mở khóa thêm nhiều tính năng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableUpgrades.slice(0, 2).map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  plan.popular
                    ? "border-purple-300 bg-gradient-to-br from-purple-50/50 to-blue-50/50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getPlanIcon(plan.id)}
                    <span className="font-medium text-gray-900">{plan.name}</span>
                    {plan.popular && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-700 border border-purple-200/50"
                      >
                        Phổ biến
                      </Badge>
                    )}
                  </div>
                  {plan.id !== "free" && ( // Only show price for non-free plans
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(plan.price || 0)}</span>
                      <span className="text-xs text-gray-500">/{plan.period}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.benefits.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.benefits.length > 2 && (
                    <li className="text-xs text-gray-500 pl-6">+{plan.benefits.length - 2} tính năng khác</li>
                  )}
                </ul>

                {plan.id !== "free" && ( // Only show upgrade button for non-free plans
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isProcessing && selectedPlan === plan.id}
                    size="sm"
                    className={`w-full transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md"
                        : "hover:bg-gray-50 border-gray-300"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {isProcessing && selectedPlan === plan.id ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        {plan.id === "enterprise" ? "Liên hệ" : "Nâng cấp"}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            ))}
            {availableUpgrades.length > 2 && (
              <Button
                variant="outline"
                className="w-full mt-2 border-gray-300 hover:bg-gray-50 text-gray-700 bg-transparent"
                onClick={() => navigate("/account-plan")}
              >
                Xem thêm các gói khác
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CompactSubscriptionCard
