"use client"

import { useState } from "react"
import {
  Check,
  Star,
  Users,
  Briefcase,
  TrendingUp,
  Shield,
  Headphones,
  Zap,
  Crown,
  Settings,
  Mail,
  CreditCard,
} from "lucide-react"

const ServicePackageManager = () => {
  const [activeTab, setActiveTab] = useState("packages")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [settings, setSettings] = useState({
    autoRenew: true,
    notifications: true,
    billingEmail: "finance@company.com",
    invoicePreference: "monthly",
  })

  const packages = [
    {
      id: 1,
      name: "Gói Khởi nghiệp",
      price: { monthly: "Miễn phí", yearly: "Miễn phí" },
      originalPrice: { monthly: 0, yearly: 0 },
      features: [
        "3 tin tuyển dụng đồng thời",
        "Tìm kiếm ứng viên cơ bản",
        "Hỗ trợ email (72h phản hồi)",
        "Tối đa 50 hồ sơ ứng tuyển/tháng",
        "Hiển thị tin tuyển dụng tiêu chuẩn",
        "Báo cáo cơ bản",
      ],
      businessScope: "Dành cho startup hoặc doanh nghiệp nhỏ mới bắt đầu tuyển dụng",
      recommended: false,
      icon: <Users className="h-6 w-6" />,
      color: "gray",
    },
    {
      id: 2,
      name: "Gói Cơ bản",
      price: { monthly: "990,000 VNĐ", yearly: "9,900,000 VNĐ" },
      originalPrice: { monthly: 990000, yearly: 9900000 },
      features: [
        "10 tin tuyển dụng đồng thời",
        "Bộ lọc ứng viên nâng cao",
        "Hỗ trợ email (48h phản hồi)",
        "Không giới hạn hồ sơ ứng tuyển",
        "Đẩy tin tuyển dụng (1 lần/tuần)",
        "Thuật toán gợi ý ứng viên",
        "Truy cập dashboard HR",
        "Template email tự động",
      ],
      businessScope: "Phù hợp với doanh nghiệp vừa có nhu cầu tuyển dụng thường xuyên",
      recommended: false,
      icon: <Briefcase className="h-6 w-6" />,
      color: "blue",
    },
    {
      id: 3,
      name: "Gói Chuyên nghiệp",
      price: { monthly: "2,490,000 VNĐ", yearly: "24,900,000 VNĐ" },
      originalPrice: { monthly: 2490000, yearly: 24900000 },
      features: [
        "25 tin tuyển dụng đồng thời",
        "Ưu tiên hiển thị ứng viên",
        "Hỗ trợ chat (24h phản hồi)",
        "Không giới hạn hồ sơ ứng tuyển",
        "Đẩy tin tuyển dụng (3 lần/tuần)",
        "Gợi ý ứng viên thông minh AI",
        "Bộ công cụ phân tích HR",
        "Trang tuyển dụng có thương hiệu",
        "Tích hợp ATS cơ bản",
        "Lọc ứng viên theo kỹ năng",
        "Báo cáo hiệu suất chi tiết",
      ],
      businessScope: "Dành cho công ty đang phát triển với hoạt động tuyển dụng tích cực",
      recommended: true,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "purple",
    },
    {
      id: 4,
      name: "Gói Doanh nghiệp",
      price: { monthly: "4,990,000 VNĐ", yearly: "49,900,000 VNĐ" },
      originalPrice: { monthly: 4990000, yearly: 49900000 },
      features: [
        "50 tin tuyển dụng đồng thời",
        "Hiển thị công ty nổi bật",
        "Hỗ trợ điện thoại & chat (12h phản hồi)",
        "Credit quảng cáo tin tuyển dụng",
        "Phân tích HR nâng cao",
        "Công cụ lên lịch phỏng vấn",
        "Tích hợp ATS đầy đủ",
        "Công cụ xây dựng thương hiệu nhà tuyển dụng",
        "Truy cập pool ứng viên chất lượng cao",
        "API tích hợp hệ thống",
        "Quản lý nhiều chi nhánh",
        "Báo cáo tùy chỉnh",
      ],
      businessScope: "Phù hợp với doanh nghiệp lớn có khối lượng tuyển dụng cao",
      recommended: false,
      icon: <Shield className="h-6 w-6" />,
      color: "green",
    },
    {
      id: 5,
      name: "Gói Tập đoàn",
      price: { monthly: "9,990,000 VNĐ", yearly: "99,900,000 VNĐ" },
      originalPrice: { monthly: 9990000, yearly: 99900000 },
      features: [
        "100+ tin tuyển dụng đồng thời",
        "Hồ sơ công ty cao cấp",
        "Account Manager riêng",
        "Ưu tiên hiển thị tin tuyển dụng",
        "Không giới hạn đẩy tin",
        "CRM tuyển dụng nâng cao",
        "AI sàng lọc ứng viên",
        "Báo cáo tùy chỉnh hoàn toàn",
        "Công cụ cộng tác nhóm",
        "API access đầy đủ",
        "Tích hợp hệ thống ERP/HRM",
        "Đào tạo sử dụng platform",
        "Hỗ trợ migration dữ liệu",
      ],
      businessScope: "Dành cho tập đoàn lớn với yêu cầu tuyển dụng phức tạp",
      recommended: false,
      icon: <Crown className="h-6 w-6" />,
      color: "gold",
    },
    {
      id: 6,
      name: "Gói Tùy chỉnh",
      price: { monthly: "Liên hệ", yearly: "Liên hệ" },
      originalPrice: { monthly: 0, yearly: 0 },
      features: [
        "Không giới hạn tin tuyển dụng",
        "Hỗ trợ tìm kiếm executive",
        "Hỗ trợ VIP 24/7",
        "Chuyên viên tuyển dụng riêng",
        "Chiến dịch marketing tuyển dụng",
        "Onboarding hỗ trợ toàn diện",
        "Website tuyển dụng riêng",
        "Benchmark lương thị trường",
        "Công cụ tuyển dụng hàng loạt",
        "Tích hợp tùy chỉnh",
        "SLA cam kết chất lượng",
        "Đào tạo HR team",
      ],
      businessScope: "Dành cho tập đoàn có yêu cầu tuyển dụng đặc biệt và phức tạp",
      recommended: false,
      icon: <Zap className="h-6 w-6" />,
      color: "orange",
    },
  ]

  const getColorClasses = (color, recommended = false) => {
    if (recommended) {
      return {
        border: "border-2 border-purple-500 ring-2 ring-purple-200",
        button: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white",
        icon: "bg-purple-100 text-purple-600",
        badge: "bg-purple-500",
      }
    }

    const colors = {
      gray: {
        border: "border-gray-200",
        button: "bg-gray-100 text-gray-600 cursor-not-allowed",
        icon: "bg-gray-100 text-gray-600",
      },
      blue: {
        border: "border-blue-200",
        button: "bg-blue-600 hover:bg-blue-700 text-white",
        icon: "bg-blue-100 text-blue-600",
      },
      purple: {
        border: "border-purple-200",
        button: "bg-purple-600 hover:bg-purple-700 text-white",
        icon: "bg-purple-100 text-purple-600",
      },
      green: {
        border: "border-green-200",
        button: "bg-green-600 hover:bg-green-700 text-white",
        icon: "bg-green-100 text-green-600",
      },
      gold: {
        border: "border-yellow-200",
        button: "bg-yellow-600 hover:bg-yellow-700 text-white",
        icon: "bg-yellow-100 text-yellow-600",
      },
      orange: {
        border: "border-orange-200",
        button: "bg-orange-600 hover:bg-orange-700 text-white",
        icon: "bg-orange-100 text-orange-600",
      },
    }

    return colors[color] || colors.gray
  }

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const formatPrice = (price) => {
    if (typeof price === "string") return price
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ"
  }

  const getDiscountPercentage = (monthly, yearly) => {
    if (monthly === 0 || yearly === 0) return 0
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gói dịch vụ tuyển dụng</h1>
          <p className="text-xl text-gray-600 mb-6">Chọn gói phù hợp với nhu cầu tuyển dụng của doanh nghiệp</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
              Thanh toán hàng tháng
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
              Thanh toán hàng năm
            </span>
            {billingCycle === "yearly" && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Tiết kiệm đến 17%
              </span>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "packages"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-blue-600 hover:bg-blue-50 border border-blue-200"
              }`}
              onClick={() => setActiveTab("packages")}
            >
              Gói dịch vụ
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "settings"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-blue-600 hover:bg-blue-50 border border-blue-200"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Cài đặt tài khoản
            </button>
          </div>
        </div>

        {/* Packages Tab */}
        {activeTab === "packages" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => {
                const colorClasses = getColorClasses(pkg.color, pkg.recommended)
                const discount = getDiscountPercentage(pkg.originalPrice.monthly, pkg.originalPrice.yearly)

                return (
                  <div
                    key={pkg.id}
                    className={`relative p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-200 ${colorClasses.border}`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current" />
                          PHỔ BIẾN NHẤT
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`inline-flex p-3 rounded-xl mb-4 ${colorClasses.icon}`}>{pkg.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">{pkg.price[billingCycle]}</span>
                        {pkg.originalPrice[billingCycle] > 0 && (
                          <span className="text-gray-500 text-sm">/{billingCycle === "monthly" ? "tháng" : "năm"}</span>
                        )}
                        {billingCycle === "yearly" && discount > 0 && (
                          <div className="text-sm text-green-600 font-medium mt-1">Tiết kiệm {discount}%</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold">Phù hợp với:</span> {pkg.businessScope}
                      </p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-200 ${colorClasses.button}`}
                      disabled={pkg.id === 1}
                    >
                      {pkg.id === 1 ? "Gói hiện tại" : pkg.id === 6 ? "Liên hệ tư vấn" : "Nâng cấp ngay"}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
              <div className="text-center">
                <Headphones className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cần hỗ trợ chọn gói?</h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Đội ngũ chuyên gia tuyển dụng của chúng tôi sẽ tư vấn miễn phí để giúp bạn chọn gói dịch vụ phù hợp
                  nhất với quy mô và nhu cầu tuyển dụng của doanh nghiệp.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Đặt lịch tư vấn miễn phí
                  </button>
                  <button className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    Gọi hotline: 1900 1234
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Settings Tab */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Cài đặt tài khoản</h3>
              </div>

              <div className="space-y-8">
                {/* Subscription Preferences */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Tùy chọn đăng ký
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="font-medium text-gray-900">Tự động gia hạn</label>
                        <p className="text-sm text-gray-600">Tự động gia hạn gói dịch vụ khi hết hạn</p>
                      </div>
                      <input
                        type="checkbox"
                        name="autoRenew"
                        checked={settings.autoRenew}
                        onChange={handleSettingChange}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="font-medium text-gray-900">Nhận thông báo</label>
                        <p className="text-sm text-gray-600">Nhận email về xu hướng tuyển dụng và mẹo hay</p>
                      </div>
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={settings.notifications}
                        onChange={handleSettingChange}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    Thông tin thanh toán
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email nhận hóa đơn</label>
                      <input
                        type="email"
                        name="billingEmail"
                        value={settings.billingEmail}
                        onChange={handleSettingChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="finance@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Chu kỳ hóa đơn</label>
                      <select
                        name="invoicePreference"
                        value={settings.invoicePreference}
                        onChange={handleSettingChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="monthly">Hóa đơn hàng tháng</option>
                        <option value="quarterly">Hóa đơn hàng quý</option>
                        <option value="yearly">Hóa đơn hàng năm</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Current Plan Info */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">Gói hiện tại</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-blue-900">Gói Khởi nghiệp</p>
                      <p className="text-sm text-blue-700">Miễn phí • Gia hạn: Không giới hạn</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Nâng cấp
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicePackageManager
