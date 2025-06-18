import { useAuth } from "@/providers/AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Shield, Lock, ArrowRight } from "lucide-react"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true })
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [user, loading, navigate])

  if (loading) {
    return <LoadingScreen message="Đang kiểm tra thông tin đăng nhập..." />
  }

  if (!user) {
    return <LoadingScreen message="Đang chuyển hướng đến trang đăng nhập..." showRedirectInfo />
  }

  return children
}

const LoadingScreen = ({ message, showRedirectInfo = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-70 blur-3xl"></div>
      </div>

      <div className="relative text-center space-y-8 max-w-md mx-auto px-4">

        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200 animate-spin">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-600 rounded-full"></div>
            </div>

            <div
              className="absolute inset-3 rounded-full border-4 border-purple-200 animate-spin animation-delay-150"
              style={{ animationDirection: "reverse" }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                {showRedirectInfo ? <Lock className="w-6 h-6 text-white" /> : <Shield className="w-6 h-6 text-white" />}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            {showRedirectInfo ? "Yêu Cầu Đăng Nhập" : "Đang Tải"}
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">{message}</p>

          {showRedirectInfo && (
            <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-lg">
              <div className="flex items-center justify-center text-indigo-600 font-medium">
                <span>Chuyển hướng trong giây lát</span>
                <ArrowRight className="ml-2 w-4 h-4 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    </div>
  )
}

export default ProtectedRoute