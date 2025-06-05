import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-72 bg-white h-screen shadow-xl sticky top-0 border-r border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-[#4318D1] to-[#013DC4] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Menu Công ty</h2>
            <p className="text-sm text-gray-500">Quản lý doanh nghiệp</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/company"
              end
              className={({ isActive }) =>
                `w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4318D1] to-[#013DC4] text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-[#EEE7FE] text-gray-700 hover:text-[#4318D1] hover:transform hover:scale-[1.01]"
                }`
              }
            >
              <div className={`mr-4 transition-transform duration-200 group-hover:scale-110`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="font-medium text-sm">Tổng quan</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/company/jobs"
              className={({ isActive }) =>
                `w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4318D1] to-[#013DC4] text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-[#EEE7FE] text-gray-700 hover:text-[#4318D1] hover:transform hover:scale-[1.01]"
                }`
              }
            >
              <div className={`mr-4 transition-transform duration-200 group-hover:scale-110`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="font-medium text-sm">Danh sách việc làm</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/company/candidates"
              className={({ isActive }) =>
                `w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4318D1] to-[#013DC4] text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-[#EEE7FE] text-gray-700 hover:text-[#4318D1] hover:transform hover:scale-[1.01]"
                }`
              }
            >
              <div className={`mr-4 transition-transform duration-200 group-hover:scale-110`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="font-medium text-sm">Ứng viên</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/company/hr-accounts"
              className={({ isActive }) =>
                `w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4318D1] to-[#013DC4] text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-[#EEE7FE] text-gray-700 hover:text-[#4318D1] hover:transform hover:scale-[1.01]"
                }`
              }
            >
              <div className={`mr-4 transition-transform duration-200 group-hover:scale-110`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="font-medium text-sm">Tài khoản HR</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/company/hr-dashboard"
              className={({ isActive }) =>
                `w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4318D1] to-[#013DC4] text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-[#EEE7FE] text-gray-700 hover:text-[#4318D1] hover:transform hover:scale-[1.01]"
                }`
              }
            >
              <div className={`mr-4 transition-transform duration-200 group-hover:scale-110`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="font-medium text-sm">Bảng điều khiển HR</span>
            </NavLink>
          </li> */}

          {/* <li>
            <NavLink
              to="/company/packages"
              className={({ isActive }) =>
                `w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4318D1] to-[#013DC4] text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-[#EEE7FE] text-gray-700 hover:text-[#4318D1] hover:transform hover:scale-[1.01]"
                }`
              }
            >
              <div className={`mr-4 transition-transform duration-200 group-hover:scale-110`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="font-medium text-sm">Gói dịch vụ</span>
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/company/settings"
              className={({ isActive }) =>
                `w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#4318D1] to-[#013DC4] text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-[#EEE7FE] text-gray-700 hover:text-[#4318D1] hover:transform hover:scale-[1.01]"
                }`
              }
            >
              <div className={`mr-4 transition-transform duration-200 group-hover:scale-110`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="font-medium text-sm">Cài đặt</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-[#4318D1] to-[#013DC4] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">FPT</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">FPT Software</p>
            <p className="text-xs text-gray-500">Phiên bản 2.1.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
