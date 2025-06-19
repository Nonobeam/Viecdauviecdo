"use client";

import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login as apiLogin } from "@/utils/authApi";
import { createUser as apiRegister } from "@/utils/userApi";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

const InputField = ({
  icon: Icon,
  error,
  type = "text",
  showPasswordToggle,
  onTogglePassword,
  ...props
}) => (
  <div className="space-y-2">
    <Label htmlFor={props.id} className="text-sm font-medium text-gray-700">
      {props.label}
    </Label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        {...props}
        type={
          showPasswordToggle
            ? type === "password" && !showPasswordToggle
              ? "password"
              : "text"
            : type
        }
        className={`pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300 ${
          error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
        }`}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onTogglePassword}
        >
          {showPasswordToggle ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      )}
    </div>
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center text-red-600 text-sm"
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (activeTab === "signup") {
      if (!full_name) {
        newErrors.full_name = "Họ tên là bắt buộc";
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }

      if (!agreeTerms) {
        newErrors.terms = "Bạn phải đồng ý với điều khoản";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { token } = await apiLogin({ username: email, password });
      Cookies.set("token", token, { expires: 7 });
      login(token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrors({
        general: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = useCallback(async () => {
    try {
      window.location.href = 'https://backend.matchlent.xyz/oauth2/authorization/google';
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, []);

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await apiRegister({
        email,
        full_name,
        password,
        role_name: "TALENT",
        image: undefined,
      });
      setErrors({});
      alert(
        "Đăng ký thành công — email xác nhận đã được gửi đến hộp thư của bạn"
      );
      setActiveTab("/login");
    } catch (err) {
      console.error(err);
      setErrors({ general: "Đăng ký thất bại. Vui lòng thử lại." });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSocialLogins = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200"></span>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500 font-medium">
            Hoặc tiếp tục với
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="h-12 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 group"
          onClick={handleGoogle}
        >
          <div className="flex items-center justify-center">
            {Logo.google}
            <span className="ml-2 text-sm font-medium group-hover:text-indigo-600">
              Google
            </span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="h-12 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 group"
        >
          <div className="flex items-center justify-center">
            {Logo.linkedIn}
            <span className="ml-2 text-sm font-medium group-hover:text-indigo-600">
              LinkedIn
            </span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="h-12 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 group"
        >
          <div className="flex items-center justify-center">
            {Logo.github}
            <span className="ml-2 text-sm font-medium group-hover:text-indigo-600">
              GitHub
            </span>
          </div>
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700"></div>
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23FFFFFF" fillOpacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-40'></div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white"
        >
          <div className="mb-8">
            <Sparkles className="h-12 w-12 text-white/80 mb-4" />
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Chào Mừng Đến Với
              <br />
              <Link
                to="/"
                className="hover:text-indigo-200 transition-colors duration-300 inline-flex items-center"
              >
                Matchlent
                <ArrowRight className="ml-2 h-8 w-8" />
              </Link>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              "Kết nối, hợp tác và hiện thực hóa những dự án độc đáo của
              bạn—vượt ra ngoài công việc, vượt qua mọi giới hạn."
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-white/80">
              <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
              <span>Kết nối với hàng nghìn chuyên gia</span>
            </div>
            <div className="flex items-center text-white/80">
              <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
              <span>Tìm kiếm cơ hội nghề nghiệp lý tưởng</span>
            </div>
            <div className="flex items-center text-white/80">
              <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
              <span>Xây dựng lộ trình phát triển cá nhân</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 w-full lg:w-7/12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {activeTab === "login" ? "Đăng Nhập" : "Tạo Tài Khoản"}
            </h2>
            <p className="text-gray-600">
              {activeTab === "login"
                ? "Chào mừng bạn trở lại! Vui lòng đăng nhập vào tài khoản của bạn."
                : "Tham gia cộng đồng của chúng tôi và khám phá những cơ hội tuyệt vời."}
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700"
              >
                <AlertCircle className="h-5 w-5 mr-2" />
                {errors.general}
              </motion.div>
            )}
          </AnimatePresence>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 rounded-xl p-1 mb-8">
              <TabsTrigger
                value="login"
                className="rounded-lg h-full data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm text-gray-600 font-medium transition-all duration-300"
              >
                Đăng Nhập
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-lg h-full data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm text-gray-600 font-medium transition-all duration-300"
              >
                Đăng Ký
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <InputField
                  id="login-email"
                  label="Email"
                  type="email"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  error={errors.email}
                />

                <InputField
                  id="login-password"
                  label="Mật khẩu"
                  type="password"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  error={errors.password}
                  showPasswordToggle={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="remember" className="border-gray-300" />
                    <Label
                      htmlFor="remember"
                      className="ml-2 text-sm text-gray-600"
                    >
                      Ghi nhớ đăng nhập
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Quên mật khẩu?
                  </a>
                </div>

                <Button
                  className="w-full h-12 text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang đăng nhập...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Đăng Nhập
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>

                {renderSocialLogins()}
              </motion.div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <InputField
                  id="signup-name"
                  label="Họ và tên"
                  type="text"
                  icon={User}
                  value={full_name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên"
                  error={errors.full_name}
                />

                <InputField
                  id="signup-email"
                  label="Email"
                  type="email"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  error={errors.email}
                />

                <InputField
                  id="signup-password"
                  label="Mật khẩu"
                  type="password"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tạo mật khẩu"
                  error={errors.password}
                  showPasswordToggle={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <InputField
                  id="confirm-password"
                  label="Xác nhận mật khẩu"
                  type="password"
                  icon={Shield}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  error={errors.confirmPassword}
                  showPasswordToggle={showConfirmPassword}
                  onTogglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />

                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                      className="mt-1 border-gray-300"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-gray-600 leading-relaxed"
                    >
                      Tôi đồng ý với{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        Điều khoản dịch vụ
                      </a>{" "}
                      và{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        Chính sách bảo mật
                      </a>
                    </Label>
                  </div>
                  <AnimatePresence>
                    {errors.terms && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center text-red-600 text-sm ml-6"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.terms}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  className="w-full h-12 text-base bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  onClick={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang tạo tài khoản...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Tạo Tài Khoản
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>

                {renderSocialLogins()}
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              {activeTab === "login"
                ? "Chưa có tài khoản?"
                : "Đã có tài khoản?"}{" "}
              <button
                onClick={() =>
                  setActiveTab(activeTab === "login" ? "signup" : "login")
                }
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                {activeTab === "login" ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
