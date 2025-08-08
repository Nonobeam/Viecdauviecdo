import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CheckCircle, Home, Receipt, Crown, XCircle } from "lucide-react";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const orderCode = searchParams.get("orderCode");
  const status = searchParams.get("status");
  const cancel = searchParams.get("cancel");

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  useEffect(() => {
    if (!orderCode) {
      setError("Không tìm thấy mã đơn hàng.");
      setLoading(false);
      return;
    }

    fetch(`/api/transactions/by-order-code/${orderCode}`)
      .then((res) => {
        if (!res.ok) throw new Error("Không thể lấy thông tin giao dịch.");
        return res.json();
      })
      .then((data) => {
        setTransaction(data.data || data); // Tùy theo cấu trúc API bạn trả về
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Đã xảy ra lỗi.");
        setLoading(false);
      });
  }, [orderCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-green-100">
            {cancel === "true" || status === "CANCELLED" ? (
              <XCircle className="w-8 h-8 text-red-600" />
            ) : (
              <CheckCircle className="w-8 h-8 text-green-600" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            {cancel === "true" || status === "CANCELLED"
              ? "Thanh toán bị huỷ"
              : "Thanh toán thành công!"}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          {loading ? (
            <p>Đang tải thông tin đơn hàng...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div>
                <p className="text-gray-600 mb-2">
                  {cancel === "true"
                    ? "Bạn đã huỷ giao dịch."
                    : "Chúc mừng! Bạn đã nâng cấp thành công."}
                </p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">
                  <Crown className="w-4 h-4" />
                  Premium
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Chi tiết giao dịch
                </h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-mono">{transaction.orderCode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-semibold">
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="capitalize text-emerald-700 font-medium">
                    {transaction.status || "Success"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Thời gian:</span>
                  <span>
                    {new Date(transaction.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>

              {cancel !== "true" && (
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
            </>
          )}

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
