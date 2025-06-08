import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthContext"
import { getProjectById } from "@/utils/projectAPI"
import { ExternalLink, FolderOpen, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const UserProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth();

  useEffect(() => {
    // Fetch user's own projects here
    const fetchUserProjects = async () => {
      try {
        setLoading(true);
        const userProjects = await getProjectById(user.user_id);
        setProjects(userProjects.data);
        setLoading(false)

        setProjects([
          {
            id: 1,
            title: "Ứng dụng y tế",
            description: "App y tế full-stack cho bác sĩ và y tá",
            type: "Freelance",
            tech: ["React", "Node.js"],
            image: "/placeholder.svg?height=200&width=300",
            status: "Hoàn thành",
          },
          {
            id: 2,
            title: "E-commerce Platform",
            description: "Nền tảng thương mại điện tử với tính năng thanh toán",
            type: "Cá nhân",
            tech: ["Next.js", "PostgreSQL"],
            image: "/placeholder.svg?height=200&width=300",
            status: "Đang phát triển",
          },
        ])
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch user projects:", error)
        setLoading(false)
      }
    }

    fetchUserProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
          <FolderOpen className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có dự án</h3>
        <p className="text-gray-500 mb-4">Thêm dự án đầu tiên của bạn để showcase kỹ năng</p>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
          Thêm dự án mới
        </Button>
      </div>
    )
  }

  return (
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
                <Badge
                  variant="outline"
                  className={`border-green-200 text-green-700 bg-green-50 ${
                    project.status === "Đang phát triển" ? "border-yellow-200 text-yellow-700 bg-yellow-50" : ""
                  }`}
                >
                  {project.status}
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
  )
}

export default UserProjects
