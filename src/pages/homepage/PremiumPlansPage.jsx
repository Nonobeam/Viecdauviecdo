"use client"

import { useAuth } from "@/providers/AuthContext"
import { createTransaction } from "@/utils/transactionAPI"
import { Eye, Star, Zap, BadgeCheck, Shield, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { plans } from "@/mock/data"
import PlanCard from "@/components/Subscription/PlanCard"
import FeatureCard from "@/components/Subscription/FeatureCard"

// Utility function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

const PremiumPlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [currentPack, setCurrentPack] = useState("FREE") // State to hold the pack from JWT
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    // Get current pack from token in localStorage
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = decodeToken(token)
      if (decodedToken && decodedToken.pack) {
        setCurrentPack(decodedToken.pack.toUpperCase()) // Set currentPack from decoded token
        setSelectedPlan(decodedToken.pack.toLowerCase())
      }
    }

    if (!loading && !user) {
      setSelectedPlan("free")
      setCurrentPack("FREE")
    }
  }, [loading, user])

  const generateOrderCode = () => {
    return Math.floor(100000 + Math.random() * 900000)
  }

  const handleSelectPlan = async (planId) => {
    // Prevent selecting free plan if user already has PRO/PREMIUM
    if (planId === "free" && (currentPack === "PRO" || currentPack === "PREMIUM")) {
      alert("Bạn không thể chuyển về gói miễn phí khi đã có gói trả phí.")
      return
    }

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
        amount: Number.parseInt(plan.price),
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
            price: Number.parseInt(plan.price),
          },
        ],
        cancel_url: `${window.location.origin}/payment/cancel`,
        return_url: `${window.location.origin}/payment/success`,
        expired_at: Math.floor(Date.now() / 1000) + 5 * 60,
        signature: undefined,
      }

      console.log("=== DEBUG: Transaction Request ===")
      console.log(transactionRequest)

      const response = await createTransaction(transactionRequest)

      console.log("=== DEBUG: Full Response ===")
      console.log(response)

      if (response) {
        console.log("=== DEBUG: Navigating to payment page with QR data ===")

        localStorage.setItem(
          "pendingTransaction",
          JSON.stringify({
            transactionId: response.transaction_id,
            orderCode: orderCode,
            planId: planId,
            amount: plan.price,
            planName: plan.name,
          }),
        )

        const qrCode = response?.payos_response?.data?.qrCode
        const payosData = response?.payos_response?.data

        if (!qrCode) {
          console.error("QR Code not found in response")
          console.error("Response structure:", response)
          throw new Error("QR Code not found in response")
        }

        console.log("=== DEBUG: QR Code found ===")
        console.log("QR Code:", qrCode)

        navigate("/payment", {
          state: {
            payos_response: {
              data: {
                orderCode: payosData?.orderCode || orderCode,
                amount: payosData?.amount || plan.price,
                description: payosData?.description || plan.name,
                qrCode: qrCode,
                accountNumber: payosData?.accountNumber,
                accountName: payosData?.accountName,
                expiredAt: payosData?.expiredAt,
                status: payosData?.status,
                bin: payosData?.bin,
                currency: payosData?.currency,
              },
            },
            planInfo: plan,
          },
        })
      } else {
        console.log("=== DEBUG: No response received ===")
        throw new Error("No response received from server")
      }
    } catch (err) {
      console.error("=== DEBUG: Error creating transaction ===")
      console.error(err)

      alert(`Có lỗi xảy ra khi tạo giao dịch: ${err.message}. Vui lòng thử lại.`)
    } finally {
      setIsLoading(false)
    }
  }

  const jobSeekerPlans = plans.filter((plan) => ["free", "matchlent-pro", "matchlent-premium"].includes(plan.id))

  // Comment out employer plans
  // const employerPlans = plans.filter((plan) =>
  //   ["matchlent-basic", "matchlent-elite", "matchlent-platinum", "matchlent-ads"].includes(plan.id),
  // )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-40 shadow-lg flex items-end relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"></div>
        </div>
        <div className="container mx-auto px-4 pb-8 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">Chọn gói của bạn</h1>
          <p className="text-xl text-indigo-100 max-w-3xl animate-fade-in [animation-delay:100ms]">
            Mở khóa các tính năng mạnh mẽ để tăng tốc tìm kiếm việc làm
          </p>
          <div className="mt-4">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">Gói hiện tại: {currentPack}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {" "}
        {/* Changed -mt-12 to mt-8 */}
        {/* Job Seeker Plans */}
        <section className="mb-16 animate-fade-in [animation-delay:200ms]">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 text-indigo-800 p-2 rounded-full mr-3">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Gói dành cho người tìm việc</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {jobSeekerPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectedPlan={selectedPlan}
                currentPack={currentPack}
                handleSelectPlan={handleSelectPlan}
                isLoading={isLoading}
              />
            ))}
          </div>
        </section>
        {/* Commented out Employer Plans */}
        {/* <section className="animate-fade-in [animation-delay:300ms]">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Gói dành cho nhà tuyển dụng</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employerPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectedPlan={selectedPlan}
                currentPack={currentPack}
                handleSelectPlan={handleSelectPlan}
                isLoading={isLoading}
              />
            ))}
          </div>
        </section> */}
        {/* Features Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 animate-fade-in [animation-delay:400ms]">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Tại sao nâng cấp tài khoản?</h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Khám phá các lợi ích độc quyền giúp bạn tiết kiệm thời gian và đạt được kết quả tốt hơn
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
