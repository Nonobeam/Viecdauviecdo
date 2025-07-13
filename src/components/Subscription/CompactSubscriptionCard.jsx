import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { plans } from "@/mock/data";

const CompactSubscriptionCard = ({
  currentPlan = "free",
  isTokenValid = true,
  onPlanSelect,
}) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const currentPlanData = plans.find((p) => p.id === currentPlan);
  const availableUpgrades = plans.filter((p) => p.id !== currentPlan);

  const handleUpgrade = async (planId) => {
    if (!isTokenValid) {
      Swal.fire({
        icon: "warning",
        title: "Phiên đăng nhập đã hết hạn",
        text: "Vui lòng đăng nhập lại để tiếp tục.",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    // Skip payment for enterprise (contact form)
    if (planId === "enterprise") {
      Swal.fire({
        icon: "info",
        title: "Liên hệ tư vấn",
        text: "Chúng tôi sẽ liên hệ với bạn trong vòng 24h.",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    navigate("/payment", {
      state: {
        planId,
        planName: plans.find((p) => p.id === planId)?.name,
        price: plans.find((p) => p.id === planId)?.price,
        qrCode: `payment-data-for-${planId}`,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Current Plan */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {currentPlanData?.icon}
              Gói hiện tại
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700"
            >
              {currentPlanData?.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {currentPlanData?.price === "0"
              ? "Miễn phí"
              : `${currentPlanData?.price}₫/tháng`}
          </div>
          <ul className="space-y-1">
            {currentPlanData?.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <Check className="h-3 w-3 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Upgrade Options */}
      {availableUpgrades.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Nâng cấp gói</CardTitle>
            <CardDescription>Mở khóa thêm nhiều tính năng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableUpgrades.map((plan) => (
              <div
                key={plan.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  plan.popular
                    ? "border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {plan.icon}
                    <span className="font-medium text-gray-900">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-700"
                      >
                        Phổ biến
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {plan.price}₫/tháng
                  </span>
                </div>

                <ul className="space-y-1 mb-3">
                  {plan.features.slice(0, 2).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-xs text-gray-600"
                    >
                      <Check className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                  {plan.features.length > 2 && (
                    <li className="text-xs text-gray-500">
                      +{plan.features.length - 2} tính năng khác
                    </li>
                  )}
                </ul>

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isProcessing}
                  size="sm"
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : ""
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
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompactSubscriptionCard;
