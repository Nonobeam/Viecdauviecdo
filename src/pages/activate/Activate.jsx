import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const API_URL = "https://backend.matchlent.xyz/api/users/activate";

const Activate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      const token = searchParams.get("cri");

      if (!token) {
        setStatus("error");
        setMessage(
          "Liên kết kích hoạt không hợp lệ. Không tìm thấy mã xác thực."
        );
        return;
      }

      try {
        const response = await fetch(`${API_URL}/${token}`, {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        });

        if (response.ok) {
          setStatus("success");
          setMessage("Tài khoản của bạn đã được kích hoạt thành công!");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else if (response.status === 404) {
          setStatus("error");
          setMessage(
            "Bạn không có quyền truy cập trang này, vui lòng quay lại trang Đăng ký"
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          const data = await response.json();
          setStatus("error");
          setMessage(
            data.message || "Kích hoạt tài khoản thất bại. Vui lòng thử lại."
          );
        }
      } catch (error) {
        setStatus("error");
        setMessage("Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại.");
      }
    };

    activateAccount();
  }, [searchParams, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
      case "success":
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case "error":
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "text-blue-600";
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">{getStatusIcon()}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kích Hoạt Tài Khoản
          </h2>
          <div className={`text-lg ${getStatusColor()}`}>
            {status === "loading" && "Đang kích hoạt tài khoản của bạn..."}
            {status === "success" && "Kích hoạt thành công!"}
            {status === "error" && "Kích hoạt thất bại"}
          </div>
          <p className="mt-4 text-gray-600">{message}</p>
          {status === "success" && (
            <p className="mt-2 text-sm text-gray-500">
              Chuyển hướng đến trang đăng nhập sau 3 giây...
            </p>
          )}
          {status === "error" && (
            <div className="mt-6 space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={status === "loading"}
              >
                Thử lại
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đến trang Đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activate;
