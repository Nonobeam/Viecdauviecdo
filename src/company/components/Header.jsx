"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Building2, ChevronDown, User, Settings, FileText, HelpCircle, LogOut } from "lucide-react"
import { companies } from "../mock/recruitment-data"

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)
  const company = companies[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const notifications = [
    {
      id: 1,
      title: "Ứng viên mới ứng tuyển",
      message: "5 ứng viên mới cho vị trí Frontend Developer",
      time: "2 phút trước",
      unread: true,
    },
    {
      id: 2,
      title: "Tin tuyển dụng sắp hết hạn",
      message: "Backend Developer sẽ hết hạn trong 3 ngày",
      time: "1 giờ trước",
      unread: true,
    },
    {
      id: 3,
      title: "Phỏng vấn được lên lịch",
      message: "Cuộc phỏng vấn với Nguyễn Văn A lúc 14:00",
      time: "3 giờ trước",
      unread: false,
    },
  ]

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo và tên công ty */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {company?.name || "Company Name"}
              </h1>
              <p className="text-sm text-gray-500 font-medium">Hệ thống quản lý tuyển dụng</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {notifications.filter((n) => n.unread).length}
                </span>
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Thông báo</h3>
                    <p className="text-sm text-gray-500">
                      {notifications.filter((n) => n.unread).length} thông báo chưa đọc
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors border-l-4 ${notification.unread ? "border-blue-500 bg-blue-50/30" : "border-transparent"}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                          </div>
                          {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Xem tất cả thông báo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  AD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">Quản trị viên</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        AD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Admin User</p>
                        <p className="text-xs text-gray-500">{company?.email || "admin@company.com"}</p>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                          Đang hoạt động
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 group"
                    >
                      <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600" />
                      <span>Hồ sơ cá nhân</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 group"
                    >
                      <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600" />
                      <span>Cài đặt tài khoản</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 group"
                    >
                      <FileText className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600" />
                      <span>Tài liệu hướng dẫn</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 group"
                    >
                      <HelpCircle className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600" />
                      <span>Hỗ trợ & Trợ giúp</span>
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Logout */}
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-150 group"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span>Đăng xuất</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
