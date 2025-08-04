"use client";

import { useAuth } from "@/providers/AuthContext";
import { createTransaction } from "@/utils/transactionAPI";
import { Check, Crown, Eye, Star, Target, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { plans } from "@/mock/data";

function PremiumPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      const userTypeFromUser = user.userType || "free";
      const parsedUserTypeFromUser =
        typeof userTypeFromUser === "string" &&
        userTypeFromUser.startsWith('"') &&
        userTypeFromUser.endsWith('"')
          ? JSON.parse(userTypeFromUser)
          : userTypeFromUser;
      const finalUserType = parsedUserTypeFromUser.toLowerCase();
      setSelectedPlan(finalUserType === "premium" ? "premium" : "free");
    } else if (!loading && !user) {
      setSelectedPlan("free");
    }
  }, [loading, user]);

  const generateOrderCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSelectPlan = async (planId) => {
    if (planId === selectedPlan) return;

    setSelectedPlan(planId);

    if (planId === "free") return;

    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    try {
      const orderCode = generateOrderCode();
      const transactionRequest = {
        order_code: orderCode,
        amount: parseInt(plan.price), // Convert price to number since TransactionRequest expects number
        holder_id: user?.user_id || "",
        description: plan.name,
        buyer_name: undefined,
        buyer_email: undefined,
        buyer_phone: undefined,
        buyer_address: undefined,
        items: [
          {
            name: user?.user_id || "unknown",
            quantity: 1,
            price: parseInt(plan.price), // Convert price to number
          },
        ],
        cancel_url: undefined,
        return_url: undefined,
        expired_at: Math.floor(Date.now() / 1000) + 5 * 60,
        signature: undefined,
      };

      console.log("Creating transaction with payload:", transactionRequest);
      const transactionData = await createTransaction(transactionRequest); // Direct API call
      console.log("Transaction created successfully:", transactionData);

      // Navigate with the transaction data
      navigate("/payment", { state: transactionData });
    } catch (err) {
      console.error("Error creating transaction:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="bg-indigo-600 h-28 shadow-lg"></div>
      <div className="flex justify-center items-center min-h-[calc(100vh-7rem)] py-12 px-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Chọn gói của bạn
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mở khóa các tính năng mạnh mẽ để tăng tốc tìm kiếm việc làm và có
              được công việc mơ ước
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`
                  relative bg-white rounded-2xl p-8 transition-all duration-300 hover:scale-105
                  ${
                    plan.popular
                      ? "shadow-2xl border-2 border-indigo-200 ring-4 ring-indigo-100"
                      : "shadow-xl hover:shadow-2xl border border-gray-200"
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" />
                      Phổ biến nhất
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price === "0" ? "Miễn phí" : `${plan.price}₫`}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-gray-500 text-lg">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {plan.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`
                          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5
                          ${plan.popular ? "bg-indigo-100" : "bg-gray-100"}
                        `}
                      >
                        <Check
                          className={`w-4 h-4 ${
                            plan.popular ? "text-indigo-600" : "text-gray-600"
                          }`}
                        />
                      </div>
                      <span className="text-gray-700 leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
                {selectedPlan === plan.id ? (
                  <div className="w-full py-4 px-6 rounded-xl font-semibold text-lg text-center bg-gray-100 text-gray-600 border-2 border-gray-200">
                    Gói hiện tại
                  </div>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`
                      w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200
                      transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl
                      ${plan.buttonStyle}
                    `}
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Tại sao chọn Premium?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Công cụ AI</h4>
                <p className="text-gray-600 text-sm">
                  Để AI tối ưu hóa CV và tìm kiếm công việc phù hợp nhất
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Ưu tiên hiển thị
                </h4>
                <p className="text-gray-600 text-sm">
                  Được chú ý bởi nhà tuyển dụng với trạng thái ứng tuyển ưu tiên
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Tư vấn nghề nghiệp
                </h4>
                <p className="text-gray-600 text-sm">
                  Nhận hướng dẫn cá nhân từ các chuyên gia nghề nghiệp
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              <Star className="w-5 h-5 inline text-yellow-500 mr-2" />
              Bảo đảm hoàn tiền trong 30 ngày • Hủy bất cứ lúc nào
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPlansPage;
