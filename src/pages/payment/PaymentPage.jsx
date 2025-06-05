// PaymentPage.jsx
import { sendTransactionWebhook } from "@/utils/transactionAPI";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const transactionData = location.state;
  const [qrPayload] = useState(transactionData.qrCode);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // Handle "Make Payment" click
const handleMakePayment = () => {
  const intervalId = setInterval(() => {
    sendTransactionWebhook();
  }, 2000);
};

  const handleCancel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // ✅ Stop the polling
    }
    navigate("/payment/cancel");
  };

  useEffect(() => {
    handleMakePayment();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // ✅ Clean up on unmount
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-indigo-600 h-28"></div>
      <div className="flex justify-center items-center min-h-[calc(100vh-7rem)]">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Thanh toán qua QR
          </h1>

          {/* QR code container */}
          <div className="flex flex-col items-center mb-6">
            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <QRCodeCanvas value={qrPayload} size={220} className="mx-auto" />
            </div>
            <p className="mt-2 text-gray-600 text-xs">Quét mã để thanh toán</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleCancel}
              className={`
              flex-1 ml-2 py-2 px-4 rounded-lg text-white font-medium
              ${
                status !== "idle" || timeLeft <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }
            `}
            >
              Hủy
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default PaymentPage;
