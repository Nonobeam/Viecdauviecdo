import { ArrowLeft, Loader2, Star, Users } from "lucide-react"
import { Suspense, useState } from "react"
import { Link } from "react-router-dom"
import RatingComponent from "./Rating"
import UsersComponent from "./Users"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/90">System management and analytics</p>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Sidebar - 1/3 */}
        <div className="w-1/3 p-6">
          <div className="bg-white rounded-2xl shadow-xl h-full p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Navigation
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                  activeTab === "users"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <Users className="h-6 w-6" />
                <span className="font-semibold text-lg">Users</span>
              </button>

              <button
                onClick={() => setActiveTab("ratings")}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                  activeTab === "ratings"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                }`}
              >
                <Star className="h-6 w-6" />
                <span className="font-semibold text-lg">Ratings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - 2/3 */}
        <div className="w-2/3 p-6 pl-0">
          <div className="bg-white rounded-2xl shadow-xl h-full p-8 overflow-y-auto">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                </div>
              }
            >
              {activeTab === "users" && <UsersComponent />}
              {activeTab === "ratings" && <RatingComponent />}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard