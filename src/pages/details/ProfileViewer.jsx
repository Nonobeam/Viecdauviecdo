import TabList from "@/components/TabList"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getSkills, getUserById } from "@/utils/userApi"
import { Loader, Mail, MapPin, Phone } from "lucide-react"
import { lazy, Suspense, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CV = lazy(() => import("@/pages/details/module/CV"))
const UserProjects = lazy(() => import("@/pages/details/module/UserProjects"))
const JoinedProjects = lazy(() => import("@/pages/details/module/JoinedProjects"))

const ProjectTabs = ({ userId }) => {
  const tabs = ["userProjects", "joinedProjects"]
  const labels = {
    userProjects: "Dự án của họ",
    joinedProjects: "Dự án tham gia",
  }
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div className="p-8">
      {/* Tab Content */}
      <main className="flex-1 flex flex-col">
        <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} labels={labels} />
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<Loader />}>
            {activeTab === "userProjects" && <UserProjects userId={userId} />}
            {activeTab === "joinedProjects" && <JoinedProjects userId={userId} />}
          </Suspense>
        </div>
      </main>
    </div>
  )
}

const ProfileViewer = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [userInformation, setUserInformation] = useState(null)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUser = async () => {
    if (!id) return

    try {
      setLoading(true)
      const fetchedUser = await getUserById(id)
      setUserData(fetchedUser.data)
      setUserInformation(fetchedUser.data.user_information)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      setError("Không thể tải thông tin người dùng")
    } finally {
      setLoading(false)
    }
  }

  const fetchSkills = async () => {
    if (!id) return

    try {
      const userSkills = await getSkills(id)
      setSkills(userSkills.data || [])
    } catch (error) {
      console.error("Failed to fetch skills:", error)
      setSkills([])
    }
  }

  useEffect(() => {
    if (id) {
      fetchUser()
      fetchSkills()
    }
  }, [id])

  const getSkillBadgeColor = (index) => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      "bg-gradient-to-r from-orange-500 to-red-500 text-white",
      "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    ]
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader className="h-6 w-6 animate-spin text-purple-600" />
          <span className="text-lg text-gray-600">Đang tải thông tin...</span>
        </div>
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy người dùng</h2>
          <p className="text-gray-600">{error || "Người dùng này không tồn tại"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl shadow-xl p-8">
              <div className="space-y-8">
                {/* Profile Info */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative group mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75"></div>
                    <Avatar className="relative h-28 w-28 border-4 border-white shadow-lg">
                      {userData?.image ? (
                        <AvatarImage
                          src={userData.image || "/placeholder.svg"}
                          alt={userInformation?.full_name || "Profile"}
                        />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl font-bold">
                          {userInformation?.full_name?.charAt(0) || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {userInformation?.full_name || "N/A"}
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">{userInformation?.job_title || "N/A"}</p>
                </div>

                {/* About Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800">Thông tin chung</h2>
                  <p className="text-gray-600 leading-relaxed">{userInformation?.summary || "Chưa có thông tin"}</p>
                </div>

                {/* Location Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">{userInformation?.country || "N/A"}</p>
                      <p className="text-sm">
                        {userInformation?.state || "N/A"}, {userInformation?.city || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-800">Liên hệ</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">{userData?.email || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">{userInformation?.phone_number || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800">Kỹ năng</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? (
                      skills.map((skill, index) => (
                        <Badge
                          key={skill}
                          className={`${getSkillBadgeColor(index)} border-0 shadow-md font-medium px-3 py-1`}
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">Chưa có kỹ năng nào</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
              {/* Header */}
              <div className="p-8 pb-6 border-b border-gray-100">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Các dự án
                </h2>
              </div>
              <ProjectTabs userId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileViewer
