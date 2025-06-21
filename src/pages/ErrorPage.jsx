"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent opacity-20 select-none">
              404
            </h1>

            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center border-4 border-purple-200 animate-bounce">
                  <Search className="h-12 w-12 text-purple-600" />
                </div>

                {/* Floating dots */}
                <div className="absolute -top-4 -right-4 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-6 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-8 -left-8 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Trang không tìm thấy
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di
            chuyển.
          </p>
        </div>

        {/* Suggestions */}
        <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Có thể bạn đang tìm:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <button
              onClick={() => navigate("/job")}
              className="text-left p-3 rounded-lg hover:bg-purple-50 transition-colors text-purple-700 hover:text-purple-800"
            >
              🏢 Trang tìm việc
            </button>
            <button
              onClick={() => navigate("/project")}
              className="text-left p-3 rounded-lg hover:bg-purple-50 transition-colors text-purple-700 hover:text-purple-800"
            >
              💼 Dự án
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="text-left p-3 rounded-lg hover:bg-purple-50 transition-colors text-purple-700 hover:text-purple-800"
            >
              👤 Hồ sơ cá nhân
            </button>
            <button
              onClick={() => navigate("/aboutus")}
              className="text-left p-3 rounded-lg hover:bg-purple-50 transition-colors text-purple-700 hover:text-purple-800"
            >
              ℹ️ Về chúng tôi
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg px-6 py-3 text-base"
          >
            <Home className="h-5 w-5 mr-2" />
            Về trang chủ
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-3 text-base"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Quay lại
          </Button>

          <Button
            onClick={handleRefresh}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-3 text-base"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Tải lại
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Nếu bạn nghĩ đây là lỗi, vui lòng{" "}
            <button
              onClick={() => navigate("/feedback")}
              className="text-purple-600 hover:text-purple-800 underline"
            >
              báo cáo cho chúng tôi
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
