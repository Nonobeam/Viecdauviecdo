// PaymentPage.jsx
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const transactionData = location.state;
  console.log(transactionData.qrCode);
  const [qrPayload] = useState(transactionData.qrCode);

  const [timeLeft, setTimeLeft] = useState(transactionData.expiredAt * 1000);
  // Page status: 'idle' (still counting), 'expired', 'canceled', or 'paid'
  const [status, setStatus] = useState("idle");

  // Format seconds into "MM:SS"
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Handle "Make Payment" click
  const handleMakePayment = () => {
    if (status === "idle") {
      setStatus("paid");
    }
  };

  // Handle "Cancel" click
  const handleCancel = () => {
    if (status === "idle") {
      setStatus("canceled");
    }
  };

    useEffect(() => {
    if (status !== "idle") return;
    if (timeLeft <= 0) {
      setStatus("expired");
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, status]);

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

          {/* Countdown or status message */}
          <div className="text-center mb-6">
            {status === "idle" && timeLeft > 0 && (
              <span className="text-lg font-medium text-red-500">
                Thời gian còn lại: {formatTime(timeLeft)}
              </span>
            )}
            {status === "expired" && (
              <span className="text-lg font-medium text-gray-500">
                QR code has expired.
              </span>
            )}
            {status === "canceled" && (
              <span className="text-lg font-medium text-gray-500">
                Transaction canceled.
              </span>
            )}
            {status === "paid" && (
              <span className="text-lg font-medium text-green-600">
                Payment successful! 🎉
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleMakePayment}
              disabled={status !== "idle" || timeLeft <= 0}
              className={`
              flex-1 mr-2 py-2 px-4 rounded-lg text-white font-medium
              ${
                status !== "idle" || timeLeft <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
            >
              Thanh toán
            </button>
            <button
              onClick={handleCancel}
              disabled={status !== "idle" || timeLeft <= 0}
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
