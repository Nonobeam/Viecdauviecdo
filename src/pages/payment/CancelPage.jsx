import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CancelPage() {
  const [countdown, setCountdown] = useState(5000);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 50));
    }, 50);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  const displaySeconds = Math.ceil(countdown / 1000);
  const progressPercentage = (countdown / 5000) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-rose-50">
      <div className="max-w-md mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Thanh toán đã bị hủy
            </h1>
          </div>

          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Bạn đã hủy bỏ quá trình thanh toán
              </h2>
              <p className="text-gray-600">
                Nếu đây là sự nhầm lẫn, bạn có thể thử thanh toán lại
              </p>
            </div>

            <div className="bg-rose-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Tự động chuyển hướng sau:
                </span>
                <span className="text-rose-600 font-medium">
                  {displaySeconds}s
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-rose-500 h-2 rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 px-4 border border-rose-500 text-rose-600 
                hover:bg-rose-50 font-medium rounded-lg transition-all duration-300"
              >
                Thử thanh toán lại
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 
                hover:from-rose-600 hover:to-pink-600 text-white font-medium rounded-lg 
                transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Cần hỗ trợ?{" "}
            <a href="#" className="text-rose-600 hover:underline">
              Liên hệ chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CancelPage;
