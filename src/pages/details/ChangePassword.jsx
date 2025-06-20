import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://backend.matchlent.xyz/api/users";

const PasswordInput = ({
  label,
  value,
  onChange,
  show,
  onToggleShow,
  placeholder,
  error,
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-4 w-4 text-purple-500" />
      </div>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pl-10 pr-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 ${
          error ? "border-red-300 focus:ring-red-500" : ""
        }`}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={onToggleShow}
      >
        {show ? (
          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        ) : (
          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        {error}
      </p>
    )}
  </div>
);

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // visibility state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form status
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    strength = Object.values(checks).filter(Boolean).length;
    return { strength, checks };
  };

  const { strength, checks } = calculatePasswordStrength(newPassword);

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 2) return "Yếu";
    if (strength <= 3) return "Trung bình";
    if (strength <= 4) return "Mạnh";
    return "Rất mạnh";
  };

  const validateForm = () => {
    const errors = {};

    if (!currentPassword) {
      errors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!newPassword) {
      errors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (strength < 3) {
      errors.newPassword = "Mật khẩu quá yếu, vui lòng chọn mật khẩu mạnh hơn";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (currentPassword === newPassword) {
      errors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    setSaveError("");

    try {
      // Get the auth token from user context or localStorage
      const token = user?.token || localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Không tìm thấy token xác thực");
      }

      const response = await fetch(
        `${API_URL}/${user.user_id}/change-password`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      if (response.ok) {
        setSaveSuccess(true);
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/profile"), 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 400) {
          throw new Error("Mật khẩu hiện tại không đúng");
        } else if (response.status === 401) {
          throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        } else {
          throw new Error(
            errorData.message || `Lỗi HTTP! status: ${response.status}`
          );
        }
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setSaveError(
        err.message || "Không thể thay đổi mật khẩu. Vui lòng thử lại."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-2xl mx-auto -mt-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/profile">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4 hover:bg-purple-50 border-purple-200 text-purple-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại hồ sơ
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Thay đổi mật khẩu
          </h1>
          <p className="text-gray-600 mt-2">
            Cập nhật mật khẩu để bảo mật tài khoản của bạn
          </p>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 animate-pulse">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-sm text-red-800">{saveError}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-pulse">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-sm text-green-800">
                Mật khẩu đã được thay đổi thành công! Đang chuyển hướng...
              </p>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Security Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100/50">
            <h3 className="font-medium text-blue-900 mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Lưu ý bảo mật:
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 pl-6">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                <span>Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                <span>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                <span>Không sử dụng thông tin cá nhân dễ đoán</span>
              </li>
            </ul>
          </div>

          {/* Current Password */}
          <PasswordInput
            label="Mật khẩu hiện tại *"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            show={showCurrentPassword}
            onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
            placeholder="Nhập mật khẩu hiện tại"
            error={validationErrors.currentPassword}
          />

          {/* New Password */}
          <div>
            <PasswordInput
              label="Mật khẩu mới *"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              show={showNewPassword}
              onToggleShow={() => setShowNewPassword(!showNewPassword)}
              placeholder="Nhập mật khẩu mới"
              error={validationErrors.newPassword}
            />

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Độ mạnh mật khẩu:
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      strength <= 2
                        ? "text-red-600"
                        : strength <= 3
                        ? "text-yellow-600"
                        : strength <= 4
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {getStrengthText()}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={`flex items-center ${
                      checks.length ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Ít nhất 8 ký tự
                  </div>
                  <div
                    className={`flex items-center ${
                      checks.lowercase ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Chữ thường (a-z)
                  </div>
                  <div
                    className={`flex items-center ${
                      checks.uppercase ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Chữ hoa (A-Z)
                  </div>
                  <div
                    className={`flex items-center ${
                      checks.numbers ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Số (0-9)
                  </div>
                  <div
                    className={`flex items-center ${
                      checks.special ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Ký tự đặc biệt
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <PasswordInput
            label="Xác nhận mật khẩu mới *"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            show={showConfirmPassword}
            onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            placeholder="Nhập lại mật khẩu mới"
            error={validationErrors.confirmPassword}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={
              isSaving ||
              saveSuccess ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword
            }
          >
            {isSaving
              ? "Đang thay đổi..."
              : saveSuccess
              ? "Đã thay đổi!"
              : "Thay đổi mật khẩu"}
          </Button>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            disabled={isSaving}
            onClick={() => navigate("/profile")}
          >
            Hủy bỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
