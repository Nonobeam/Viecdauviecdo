"use client"
import { Button } from "@/components/ui/button"
import { X, LogIn, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const LoginNotificationPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleLoginRedirect = () => {
    navigate("/login")
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Enhanced backdrop to block background animations */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50"
        onClick={onClose}
        style={{ backdropFilter: "blur(20px) saturate(180%)" }}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative z-10 transform-gpu will-change-transform">
          <div className="relative p-6 pb-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-3">Yêu Cầu Đăng Nhập</h2>

            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Bạn chưa đăng nhập để thực hiện tác vụ này. Vui lòng đăng nhập để tiếp tục.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-800 rounded-xl py-3"
              >
                Đóng
              </Button>

              <Button
                onClick={handleLoginRedirect}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl py-3"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Đăng Nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginNotificationPopup
