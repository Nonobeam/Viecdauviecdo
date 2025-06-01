import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CancelPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      // In a real app, you would redirect to homepage here
      console.log("Redirecting to homepage...");
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-indigo-600 h-28"></div>
      
      <div className="flex justify-center items-center min-h-[calc(100vh-7rem)]">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <div className="text-center">
            {/* Cancellation Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Thanh toán đã bị hủy
            </h1>
            
            <p className="text-gray-600 mb-6">
              Chuyển về trang chủ
            </p>

            {/* Countdown */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Điều hướng về trang sau {countdown} giây...
              </p>
            </div>

            {/* Manual redirect button */}
            <button 
              onClick={() => console.log("Redirecting to homepage...")}
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Về trang chủ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelPage;