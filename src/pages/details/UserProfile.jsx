import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthContext"
import { getUserById, uploadAvatar } from "@/utils/userApi"
import { Edit, ExternalLink, Mail, MapPin, Phone, Plus, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {
  const { user } = useAuth() // From AuthContext
  const [userData, setUserData] = useState(null)
  const [userInformation, setUserInformation] = useState(null)
  const fileInputRef = useRef(null)
  const [updated, setUpdated] = useState(false)
  const navigate = useNavigate()

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const fetchUser = async () => {
    if (user?.user_id) {
      try {
        const fetchedUser = await getUserById(user.user_id)
        setUserData(fetchedUser.data)
        setUserInformation(fetchedUser.data.user_information)
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file || !user?.user_id) return

    try {
      await uploadAvatar(user.user_id, file)
      const updated = await getUserById(user.user_id)
      setUserData(updated)
      setUpdated((prev) => !prev)
    } catch (err) {
      console.error("Avatar upload failed:", err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [updated])

  const skills = [
    { name: "React", color: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" },
    { name: "Node.js", color: "bg-gradient-to-r from-green-500 to-emerald-500 text-white" },
    { name: "Python", color: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" },
    { name: "TypeScript", color: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" },
    { name: "AWS", color: "bg-gradient-to-r from-orange-500 to-red-500 text-white" },
  ]

  const projects = [
    {
      id: 1,
      title: "Ứng dụng y tế",
      description: "App y tế full-stack cho bác sĩ và y tá",
      type: "Freelance",
      tech: ["React", "Node.js"],
      image: "/fake/healthcare-app.png",
    },
    {
      id: 2,
      title: "Nền tảng mạng xã hội",
      description: "Nền tảng cho những người đam mê trao đổi",
      type: "Open Source",
      tech: ["Python", "React"],
      image: "/fake/defi-platform.png",
    },
  ]

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
                  <div onClick={handleAvatarClick} className="cursor-pointer relative group mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <Avatar className="relative h-28 w-28 border-4 border-white shadow-lg">
                      {userData?.image ? (
                        <AvatarImage src={userData.image || "/placeholder.svg"} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl font-bold">
                          JD
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {userInformation?.full_name || "N/A"}
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">{userInformation?.job_title || "N/A"}</p>
                </div>

                {/* About Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Thông tin chung về tôi</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                      onClick={() => navigate("/edit-profile", { state: { userInformation } })}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{userInformation?.summary || "N/A"}</p>
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg">
                    Thuê tôi
                  </Button>
                  <Button variant="outline" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                    Phân tích
                  </Button>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800">Kỹ năng</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        className={`${skill.color} border-0 shadow-md hover:shadow-lg transition-shadow duration-200 font-medium px-3 py-1`}
                      >
                        {skill.name}
                      </Badge>
                    ))}
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
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Các dự án
                  </h2>
                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg">
                      <Link to="/insert-cv" className="flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Add CV
                      </Link>
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                      <Link to="/insert-project" className="flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm Dự Án
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="group hover:shadow-2xl transition-all duration-300 shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100"
                    >
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition-colors">
                            {project.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-purple-600"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{project.description}</p>
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-2 flex-wrap">
                            {project.tech.map((tech) => (
                              <Badge
                                key={tech}
                                className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 font-medium"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                              {project.type}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
