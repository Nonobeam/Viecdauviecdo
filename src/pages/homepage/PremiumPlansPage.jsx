'use client'

import { useAuth } from "@/providers/AuthContext"
import { createTransaction } from "@/utils/transactionAPI"
import { Eye, Star, Target, Zap, BadgeCheck, Shield, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { plans } from "@/mock/data"
import PlanCard from "@/components/Subscription/PlanCard"
import FeatureCard from "@/components/Subscription/FeatureCard"

const PremiumPlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      const userTypeFromUser = user.userType || "free"
      const parsedUserTypeFromUser =
        typeof userTypeFromUser === "string" &&
        userTypeFromUser.startsWith('"') &&
        userTypeFromUser.endsWith('"')
          ? JSON.parse(userTypeFromUser)
          : userTypeFromUser
      const finalUserType = parsedUserTypeFromUser.toLowerCase()
      setSelectedPlan(finalUserType === "premium" ? "premium" : "free")
    } else if (!loading && !user) {
      setSelectedPlan("free")
    }
  }, [loading, user])

  const generateOrderCode = () => {
    return Math.floor(100000 + Math.random() * 900000)
  }

  const handleSelectPlan = async (planId) => {
    if (planId === selectedPlan || isLoading) return

    setIsLoading(true)
    setSelectedPlan(planId)

    if (planId === "free") {
      setIsLoading(false)
      return
    }

    const plan = plans.find((p) => p.id === planId)
    if (!plan) {
      setIsLoading(false)
      return
    }

    try {
      const orderCode = generateOrderCode()
      const transactionRequest = {
        order_code: orderCode,
        amount: parseInt(plan.price),
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
            price: parseInt(plan.price),
          },
        ],
        cancel_url: `${window.location.origin}/premium-plans?status=cancelled`,
        return_url: `${window.location.origin}/payment/success`,
        expired_at: Math.floor(Date.now() / 1000) + 5 * 60,
        signature: undefined,
      }

      console.log("=== DEBUG: Transaction Request ===")
      console.log(transactionRequest)

      const response = await createTransaction(transactionRequest)
      
      console.log("=== DEBUG: Full Response ===")
      console.log(response)
      console.log("=== DEBUG: Response Type ===")
      console.log(typeof response)
      console.log("=== DEBUG: Response.data ===")
      console.log(response?.data)

      // Check different possible response structures
      if (response && response.data) {
        console.log("=== DEBUG: Found response.data ===")
        console.log(response.data)
        
        // Check for the checkout URL in different possible locations
        const checkoutUrl = response.data?.payos_response?.data?.checkoutUrl || 
                           response.data?.data?.checkoutUrl ||
                           response.data?.checkoutUrl

        console.log("=== DEBUG: Checkout URL ===")
        console.log(checkoutUrl)

        if (checkoutUrl) {
          localStorage.setItem('pendingTransaction', JSON.stringify({
            transactionId: response.data.transaction_id || response.data?.data?.transaction_id,
            orderCode: orderCode,
            planId: planId,
            amount: plan.price,
            planName: plan.name
          }))
          
          console.log("=== DEBUG: Redirecting to checkout ===")
          window.location.href = checkoutUrl
        } else {
          console.log("=== DEBUG: No checkout URL found, using fallback ===")
          navigate('/payment', { 
            state: { 
              transactionData: response.data,
              planInfo: plan 
            } 
          })
        }
      } else if (response && !response.data) {
        // Maybe the response structure is different
        console.log("=== DEBUG: Response without .data property ===")
        console.log("Checking if response itself contains the data...")
        
        const checkoutUrl = response?.payos_response?.data?.checkoutUrl || 
                           response?.data?.checkoutUrl ||
                           response?.checkoutUrl

        if (checkoutUrl) {
          localStorage.setItem('pendingTransaction', JSON.stringify({
            transactionId: response.transaction_id,
            orderCode: orderCode,
            planId: planId,
            amount: plan.price,
            planName: plan.name
          }))
          
          window.location.href = checkoutUrl
        } else {
          navigate('/payment', { 
            state: { 
              transactionData: response,
              planInfo: plan 
            } 
          })
        }
      } else {
        console.log("=== DEBUG: No valid response ===")
        throw new Error("Invalid response from server")
      }

    } catch (err) {
      console.error("=== DEBUG: Error creating transaction ===")
      console.error(err)
      console.error("Error details:", err.message)
      console.error("Error stack:", err.stack)
      
      // Show more detailed error message
      alert(`Có lỗi xảy ra khi tạo giao dịch: ${err.message}. Vui lòng thử lại.`)
    } finally {
      setIsLoading(false)
    }
  }

  const jobSeekerPlans = plans.filter((plan) =>
    ["free", "matchlent-pro", "matchlent-premium"].includes(plan.id)
  )

  const employerPlans = plans.filter((plan) =>
    [
      "matchlent-basic",
      "matchlent-elite", 
      "matchlent-platinum",
      "matchlent-ads",
    ].includes(plan.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-40 shadow-lg flex items-end relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"></div>
        </div>
        <div className="container mx-auto px-4 pb-8 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
            Chọn gói của bạn
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl animate-fade-in [animation-delay:100ms]">
            Mở khóa các tính năng mạnh mẽ để tăng tốc tìm kiếm việc làm hoặc tìm
            ứng viên chất lượng
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        {/* Job Seeker Plans */}
        <section className="mb-16 animate-fade-in [animation-delay:200ms]">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 text-indigo-800 p-2 rounded-full mr-3">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Gói dành cho người tìm việc
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {jobSeekerPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectedPlan={selectedPlan}
                handleSelectPlan={handleSelectPlan}
                isLoading={isLoading}
              />
            ))}
          </div>
        </section>

        {/* Employer Plans */}
        <section className="animate-fade-in [animation-delay:300ms]">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Gói dành cho nhà tuyển dụng
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employerPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectedPlan={selectedPlan}
                handleSelectPlan={handleSelectPlan}
                isLoading={isLoading}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 animate-fade-in [animation-delay:400ms]">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Tại sao nâng cấp tài khoản?
          </h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Khám phá các lợi ích độc quyền giúp bạn tiết kiệm thời gian và đạt
            được kết quả tốt hơn
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-indigo-600" />}
              title="Công cụ AI mạnh mẽ"
              description="Tối ưu hóa CV và tìm kiếm công việc phù hợp nhất với công nghệ AI tiên tiến"
              color="indigo"
            />
            <FeatureCard
              icon={<Eye className="w-8 h-8 text-purple-600" />}
              title="Ưu tiên hiển thị"
              description="Hồ sơ/tin tuyển dụng của bạn sẽ được ưu tiên hiển thị hàng đầu"
              color="purple"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
              title="Phân tích chuyên sâu"
              description="Nhận báo cáo và phân tích chi tiết để cải thiện hiệu quả"
              color="blue"
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm flex items-center">
            <Shield className="w-6 h-6 text-green-500 mr-3" />
            <span className="text-gray-700">Bảo mật thanh toán</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm flex items-center">
            <BadgeCheck className="w-6 h-6 text-blue-500 mr-3" />
            <span className="text-gray-700">Chất lượng đảm bảo</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-3" />
            <span className="text-gray-700">Hoàn tiền trong 30 ngày</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumPlansPage
