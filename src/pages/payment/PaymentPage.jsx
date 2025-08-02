import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  CheckCircle,
  Clock,
  QrCode,
  X,
  XCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import { storage } from "@/utils/storage";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const transactionData = location.state?.payos_response?.data || {};

  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [timeLeft, setTimeLeft] = useState(600);
  const [showInstructions, setShowInstructions] = useState(false);
  const timerRef = useRef(null);

  // Check if transaction data exists
  useEffect(() => {
    if (!transactionData) {
      console.error("No transaction data found");
      navigate("/account-plan");
    }
  }, [transactionData, navigate]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle cancel payment
  const handleCancel = () => {
    setPaymentStatus("cancelled");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    navigate("/account-plan");
  };

  // Handle payment completed (manual confirmation)
  const handlePaymentCompleted = () => {
    setPaymentStatus("completed");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // Update userType to "premium" upon successful payment
    storage.setUserType("premium");
    updateUser({ userType: "premium" });
  };

  // Handle retry payment
  const handleRetry = () => {
    navigate("/account-plan");
  };

  // Handle back to plans
  const handleBackToPlans = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    navigate("/account-plan");
  };

  // Start countdown timer
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus("failed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (paymentStatus === "pending") {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [paymentStatus, startTimer]);

  // Don't render if no transaction data
  if (!transactionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Không tìm thấy thông tin giao dịch
          </p>
          <Button onClick={() => navigate("/account-plan")}>
            Quay lại chọn gói
          </Button>
        </div>
      </div>
    );
  }

  // Render status content
  const renderStatusContent = () => {
    switch (paymentStatus) {
      case "completed":
        return (
          <div className="text-center space-y-4 max-w-md mx-auto">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Thanh toán thành công!
              </h2>
              <p className="text-gray-600">
                Cảm ơn bạn đã nâng cấp lên Premium.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Mã giao dịch: {transactionData.orderCode}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 space-y-2">
              <p className="text-green-800 font-medium">
                🎉 Chúc mừng! Bạn đã mở khóa:
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Ứng tuyển không giới hạn</li>
                <li>• Tối ưu CV bằng AI</li>
                <li>• Ưu tiên trong danh sách ứng viên</li>
                <li>• Và nhiều tính năng khác...</li>
              </ul>
            </div>
            <Button onClick={() => navigate("/")} className="w-full">
              Bắt đầu sử dụng Premium
            </Button>
          </div>
        );

      case "failed":
        return (
          <div className="text-center space-y-4 max-w-md mx-auto">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Hết thời gian thanh toán
              </h2>
              <p className="text-gray-600">
                Mã QR đã hết hạn. Vui lòng tạo giao dịch mới.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 bg-transparent"
              >
                Hủy bỏ
              </Button>
              <Button onClick={handleRetry} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Thử lại
              </Button>
            </div>
          </div>
        );

      case "cancelled":
        return (
          <div className="text-center space-y-4 max-w-md mx-auto">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-600 mb-2">
                Đã hủy thanh toán
              </h2>
              <p className="text-gray-600">Bạn đã hủy giao dịch này.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/account-plan")}
              className="w-full"
            >
              Quay lại chọn gói
            </Button>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Timer */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                Hết hạn sau: {formatTime(timeLeft)}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - QR Code */}
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100">
                  <QRCodeCanvas
                    value={transactionData.qrCode}
                    size={180}
                    className="mx-auto"
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <QrCode className="w-5 h-5" />
                    <span className="font-medium">
                      Quét mã QR để thanh toán
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã
                  </p>
                </div>
              </div>

              {/* Right Column - Payment Info */}
              <div className="space-y-4">
                {/* Payment Details */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Thông tin thanh toán
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gói:</span>
                      <span className="font-semibold text-indigo-600">
                        Premium
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Số tiền:</span>
                      <span className="font-bold text-lg">
                        {formatCurrency(transactionData.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mã đơn hàng:</span>
                      <span className="font-mono text-sm">
                        {transactionData.orderCode}
                      </span>
                    </div>
                    {transactionData.description && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Mô tả:</span>
                        <span className="text-sm">
                          {transactionData.description}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium Benefits */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                  <h4 className="font-semibold text-indigo-800 mb-2">
                    🚀 Sau khi thanh toán, bạn sẽ có:
                  </h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Ứng tuyển không giới hạn</li>
                    <li>• Tối ưu CV bằng AI</li>
                    <li>• Ưu tiên trong danh sách ứng viên</li>
                    <li>• Gợi ý việc làm cá nhân hóa</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Instructions - Collapsible */}
            <div className="bg-blue-50 rounded-xl p-4">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-medium text-blue-800">
                  Hướng dẫn thanh toán
                </span>
                <span
                  className={`transform transition-transform ${
                    showInstructions ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {showInstructions && (
                <div className="mt-3 grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>1. Mở ứng dụng ngân hàng hoặc ví điện tử</p>
                    <p>2. Chọn chức năng quét mã QR</p>
                    <p>3. Quét mã QR hiển thị trên màn hình</p>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>4. Xác nhận thông tin và hoàn tất thanh toán</p>
                    <p>5. Nhấn "Đã thanh toán" sau khi hoàn tất</p>
                  </div>
                </div>
              )}
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <div className="animate-pulse w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm">Đang chờ thanh toán...</span>
            </div>

            {/* Action buttons */}
            <div className="grid sm:grid-cols-3 gap-3">
              <Button
                onClick={handlePaymentCompleted}
                className="sm:col-span-3 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Đã thanh toán
              </Button>

              <Button
                variant="outline"
                onClick={handleBackToPlans}
                className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>

              <Button
                variant="outline"
                onClick={handleCancel}
                className="sm:col-span-2 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Hủy thanh toán
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {paymentStatus === "pending"
                  ? "Thanh toán QR Code"
                  : "Trạng thái thanh toán"}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              {renderStatusContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
