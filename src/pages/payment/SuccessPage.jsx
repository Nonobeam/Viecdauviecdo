import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CheckCircle, Home, Receipt, Crown, XCircle } from 'lucide-react';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderCode = searchParams.get("orderCode");
  const status = searchParams.get("status");
  const cancel = searchParams.get("cancel");
  const amount = searchParams.get("amount");
  
  const [countdown, setCountdown] = useState(5);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const isSuccess = cancel !== "true" && status !== "CANCELLED";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-green-100">
            {!isSuccess ? (
              <XCircle className="w-8 h-8 text-red-600" />
            ) : (
              <CheckCircle className="w-8 h-8 text-green-600" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            {!isSuccess
              ? "Thanh toán bị huỷ"
              : "Thanh toán thành công!"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div>
            <p className="text-gray-600 mb-2">
              {!isSuccess
                ? "Bạn đã huỷ giao dịch."
                : "Chúc mừng! Bạn đã nâng cấp thành công."}
            </p>
            {isSuccess && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">
                <Crown className="w-4 h-4" />
                Premium
              </div>
            )}
          </div>

          {orderCode && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h4 className="font-semibold text-gray-800 mb-3">
                Chi tiết giao dịch
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mã giao dịch:</span>
                <span className="font-mono">{orderCode}</span>
              </div>
              {amount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-semibold">
                    {formatCurrency(amount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Trạng thái:</span>
                <span className={`capitalize font-medium ${
                  isSuccess ? "text-emerald-700" : "text-red-700"
                }`}>
                  {isSuccess ? "Thành công" : "Đã huỷ"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Thời gian:</span>
                <span>
                  {new Date().toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <h4 className="font-semibold text-indigo-800 mb-3">
                🎉 Bạn đã mở khóa:
              </h4>
              <ul className="text-sm text-indigo-700 space-y-1 text-left">
                <li>• Ứng tuyển không giới hạn</li>
                <li>• Tối ưu CV bằng AI</li>
                <li>• Ưu tiên trong danh sách ứng viên</li>
                <li>• Gợi ý việc làm cá nhân hóa</li>
                <li>• Nhắn tin trực tiếp với nhà tuyển dụng</li>
              </ul>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              Tự động chuyển về trang chủ sau <span className="font-bold text-yellow-900">{countdown}</span> giây
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!
          </p>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1 bg-transparent"
            >
              <Home className="w-4 h-4 mr-2" />
              Trang chủ
            </Button>
            <Button onClick={() => navigate("/profile")} className="flex-1">
              <Receipt className="w-4 h-4 mr-2" />
              Hồ sơ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
