import { NavLink } from "react-router-dom"
import { Home, Briefcase, Users, Settings, Building2 } from "lucide-react"

const Sidebar = () => {
  const menuItems = [
    {
      to: "/company",
      icon: Home,
      label: "Tổng quan",
      end: true,
    },
    {
      to: "/company/jobs",
      icon: Briefcase,
      label: "Quản lý việc làm",
    },
    {
      to: "/company/candidates",
      icon: Users,
      label: "Ứng viên",
    },
    {
      to: "/company/settings",
      icon: Settings,
      label: "Cài đặt công ty",
    },
  ]

  return (
    <div className="w-72 bg-white h-screen shadow-xl sticky top-0 border-r border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Menu Công ty</h2>
            <p className="text-sm text-gray-500">Quản lý doanh nghiệp</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `w-full flex items-center p-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]"
                        : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-blue-600 hover:transform hover:scale-[1.01]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Background animation */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 ${isActive ? "scale-100" : "scale-0"}`}
                      />

                      {/* Content */}
                      <div className="relative z-10 flex items-center w-full">
                        <div
                          className={`mr-4 transition-all duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm">{item.label}</span>

                        {/* Active indicator */}
                        {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
                      </div>
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
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
