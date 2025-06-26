import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    BarChart3,
    Bell,
    ChevronDown,
    Home,
    LogOut,
    Menu,
    Search,
    Settings,
    Shield,
    Star,
    Users,
    X,
} from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const AdminLayout = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationCount] = useState(3)
  const location = useLocation()

  const navigationItems = [
    { id: "users", label: "Users", icon: Users, path: "/admin" },
    { id: "ratings", label: "Ratings", icon: Star, path: "/admin/ratings" },
    { id: "analytics", label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
  ]

  const quickStats = [
    { label: "Online Users", value: "892", color: "text-green-600" },
    { label: "Active Projects", value: "234", color: "text-blue-600" },
    { label: "Avg. Rating", value: "4.2★", color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Admin Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-gray-500">Management Dashboard</p>
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users, projects, feedback..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {notificationCount}
                  </Badge>
                )}
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar className="h-8 w-8 border-2 border-purple-100">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold text-sm">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white/90 backdrop-blur-sm border-r border-purple-100 transition-transform duration-300 ease-in-out lg:transition-none`}
        >
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <div className="mb-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors text-sm"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Main Site</span>
                </Link>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">DASHBOARD</h3>
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange && onTabChange(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </nav>

            {/* Quick Stats */}
            <div className="px-4 py-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">QUICK OVERVIEW</h3>
              <div className="space-y-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className={`text-sm font-semibold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-20 bg-black/50" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout