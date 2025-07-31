"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { X, Home, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Đã hủy thanh toán
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-gray-600 mb-2">
              Bạn đã hủy giao dịch nâng cấp Premium.
            </p>
            <p className="text-sm text-gray-500">
              Bạn vẫn có thể nâng cấp bất cứ lúc nào để trải nghiệm đầy đủ các
              tính năng.
            </p>
          </div>

          {/* Premium Benefits Reminder */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 mb-2">
              💡 Với Premium, bạn sẽ có:
            </h4>
            <ul className="text-sm text-indigo-700 space-y-1 text-left">
              <li>• Ứng tuyển không giới hạn</li>
              <li>• Tối ưu CV bằng AI</li>
              <li>• Ưu tiên trong danh sách ứng viên</li>
              <li>• Gợi ý việc làm cá nhân hóa</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1 bg-transparent"
            >
              <Home className="w-4 h-4 mr-2" />
              Trang chủ
            </Button>
            <Button
              onClick={() => navigate("/account-plan")}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Chọn gói khác
            </Button>
          </div>

          <div className="pt-2">
            <Button
              onClick={() => navigate("/account-plan")}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Thử lại nâng cấp Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
