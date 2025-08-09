"use client"

import { useAuth } from "@/providers/AuthContext"
import { createTransaction } from "@/utils/transactionAPI"
import { Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { plans } from "@/mock/data"
import PlanCard from "@/components/Subscription/PlanCard"

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

const PlanSelector = ({ compact = false, showTitle = true }) => {
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

      const response = await createTransaction(transactionRequest)

      if (response) {
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
          throw new Error("QR Code not found in response")
        }

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
        throw new Error("No response received from server")
      }
    } catch (err) {
      console.error("Error creating transaction:", err)
      alert(`Có lỗi xảy ra khi tạo giao dịch: ${err.message}. Vui lòng thử lại.`)
    } finally {
      setIsLoading(false)
    }
  }

  const jobSeekerPlans = plans.filter((plan) => ["free", "matchlent-pro", "matchlent-premium"].includes(plan.id))

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {showTitle && (
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 text-indigo-800 p-2 rounded-full">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Gói dịch vụ</h2>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Hiện tại: {currentPack}
          </span>
        </div>
      )}

      <div className={`grid ${compact ? "grid-cols-1 gap-4" : "md:grid-cols-3 gap-6"}`}>
        {jobSeekerPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selectedPlan={selectedPlan}
            currentPack={currentPack}
            handleSelectPlan={handleSelectPlan}
            isLoading={isLoading}
            compact={compact}
          />
        ))}
      </div>
    </div>
  )
}

export default PlanSelector
