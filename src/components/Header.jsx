import ViecdauviecdoLogo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import {
  BadgeDollarSign,
  ChevronDown,
  History,
  LogOut,
  Search,
  User,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const UserDropdown = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative">
        <Button
          className="cursor-pointer flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-4 py-2"
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-700">Menu</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 text-gray-600 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md border border-white/50 rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Tài khoản</p>
                    <p className="text-sm text-gray-500">Quản lý thông tin</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <Link to="/profile">
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 flex items-center gap-3 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <User size={16} className="text-purple-600" />
                    </div>
                    <span className="font-medium">Hồ sơ cá nhân</span>
                  </button>
                </Link>

                <Link to="/seeking">
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 flex items-center gap-3 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Search size={16} className="text-blue-600" />
                    </div>
                    <span className="font-medium">Tìm kiếm việc làm</span>
                  </button>
                </Link>

                <Link to="/account-plan">
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 flex items-center gap-3 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <BadgeDollarSign size={16} className="text-emerald-600" />
                    </div>
                    <span className="font-medium">Gói tài khoản</span>
                  </button>
                </Link>

                <Link to="/transaction-history">
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 flex items-center gap-3 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <History size={16} className="text-orange-600" />
                    </div>
                    <span className="font-medium">Lịch sử giao dịch</span>
                  </button>
                </Link>
              </div>

              <div className="border-t border-gray-100 py-2">
                <Link to="/">
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all duration-200"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="relative bg-white/80 backdrop-blur-md border-b border-white/50 shadow-lg">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500"></div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold group">
              <div className="flex items-center space-x-2">
                <ViecdauviecdoLogo />
                <Sparkles className="w-5 h-5 text-purple-500 group-hover:animate-pulse" />
              </div>
            </Link>

            <nav className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/60 hover:text-purple-600"
                }`}
              >
                Trang chủ
              </Link>
              <Link
                to="/aboutus"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/aboutus"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/60 hover:text-purple-600"
                }`}
              >
                Về chúng tôi
              </Link>
              <Link
                to="/career"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/career"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/60 hover:text-purple-600"
                }`}
              >
                Định hướng nghề nghiệp
              </Link>
              <Link
                to="/job"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/job"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/60 hover:text-purple-600"
                }`}
              >
                Cơ hội việc làm
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <UserDropdown logout={logout} />
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <div className="flex items-center space-x-3">
                    <Link to="/login">
                      <Button
                        className="cursor-pointer bg-white/80 backdrop-blur-sm border border-white/50 text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xl px-6 py-2"
                        variant="ghost"
                      >
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-6 py-2">
                        Đăng ký
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 pb-4">
        <nav className="flex space-x-2 overflow-x-auto scrollbar-hide">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              location.pathname === "/"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-white/60 text-gray-600 hover:bg-white hover:text-purple-600"
            }`}
          >
            Trang chủ
          </Link>
          <Link
            to="/aboutus"
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              location.pathname === "/aboutus"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-white/60 text-gray-600 hover:bg-white hover:text-purple-600"
            }`}
          >
            Về chúng tôi
          </Link>
          <Link
            to="/career"
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              location.pathname === "/career"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-white/60 text-gray-600 hover:bg-white hover:text-purple-600"
            }`}
          >
            Định hướng
          </Link>
          <Link
            to="/job"
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              location.pathname === "/job"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "bg-white/60 text-gray-600 hover:bg-white hover:text-purple-600"
            }`}
          >
            Việc làm
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
