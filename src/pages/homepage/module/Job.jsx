import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, ChevronLeft, ChevronRight, Clock, DollarSign, Filter, MapPin, Search, Users } from "lucide-react"
import { useEffect, useState } from "react"

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(10)

  // Filter states
  const [filters, setFilters] = useState({
    department: "",
    level: "",
    type: "",
    status: "",
  })

  // Filter options
  const filterOptions = {
    department: ["Công nghệ thông tin", "Marketing", "Nhân sự", "Tài chính", "Thiết kế"],
    level: ["Thực tập sinh", "Junior", "Middle", "Senior", "Lead", "Manager"],
    type: ["Toàn thời gian", "Bán thời gian", "Freelance", "Hợp đồng", "Remote"],
    status: ["Đang tuyển", "Sắp hết hạn", "Tạm dừng", "Đã đóng"],
  }

  useEffect(() => {
    fetchJobs()
  }, [currentPage, filters, searchTerm])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      // Mock API call - replace with actual API
      // const response = await fetch(`/api/jobs?page=${currentPage}&size=${pageSize}&department=${filters.department}&level=${filters.level}&type=${filters.type}&status=${filters.status}`)

      // Mock data
      const mockJobs = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp Vietnam",
          location: "Hồ Chí Minh",
          salary: "15-25 triệu VNĐ",
          type: "Toàn thời gian",
          level: "Middle",
          department: "Công nghệ thông tin",
          status: "Đang tuyển",
          description: "Tìm kiếm Frontend Developer có kinh nghiệm với React và TypeScript",
          skills: ["React", "TypeScript", "Tailwind CSS"],
          postedDate: "2024-01-15",
          logo: "/placeholder.svg?height=60&width=60",
        },
        {
          id: 2,
          title: "UI/UX Designer",
          company: "Design Studio",
          location: "Hà Nội",
          salary: "12-20 triệu VNĐ",
          type: "Toàn thời gian",
          level: "Junior",
          department: "Thiết kế",
          status: "Đang tuyển",
          description: "Cần tuyển UI/UX Designer sáng tạo cho các dự án web và mobile",
          skills: ["Figma", "Adobe XD", "Sketch"],
          postedDate: "2024-01-14",
          logo: "/placeholder.svg?height=60&width=60",
        },
        {
          id: 3,
          title: "Backend Developer",
          company: "StartupXYZ",
          location: "Đà Nẵng",
          salary: "18-30 triệu VNĐ",
          type: "Remote",
          level: "Senior",
          department: "Công nghệ thông tin",
          status: "Sắp hết hạn",
          description: "Tuyển Backend Developer có kinh nghiệm với Node.js và microservices",
          skills: ["Node.js", "PostgreSQL", "Docker"],
          postedDate: "2024-01-10",
          logo: "/placeholder.svg?height=60&width=60",
        },
        {
          id: 4,
          title: "Marketing Manager",
          company: "E-commerce Co",
          location: "Hồ Chí Minh",
          salary: "20-35 triệu VNĐ",
          type: "Toàn thời gian",
          level: "Manager",
          department: "Marketing",
          status: "Đang tuyển",
          description: "Quản lý chiến lược marketing và phát triển thương hiệu",
          skills: ["Digital Marketing", "SEO", "Analytics"],
          postedDate: "2024-01-12",
          logo: "/placeholder.svg?height=60&width=60",
        },
        {
          id: 5,
          title: "DevOps Engineer",
          company: "CloudTech",
          location: "Remote",
          salary: "25-40 triệu VNĐ",
          type: "Toàn thời gian",
          level: "Senior",
          department: "Công nghệ thông tin",
          status: "Đang tuyển",
          description: "Xây dựng và duy trì hạ tầng cloud cho các ứng dụng quy mô lớn",
          skills: ["AWS", "Kubernetes", "Terraform"],
          postedDate: "2024-01-13",
          logo: "/placeholder.svg?height=60&width=60",
        },
      ]

      setJobs(mockJobs)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
      setLoading(false)
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setCurrentPage(0) // Reset to first page when filtering
  }

  const clearFilters = () => {
    setFilters({
      department: "",
      level: "",
      type: "",
      status: "",
    })
    setSearchTerm("")
    setCurrentPage(0)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang tuyển":
        return "bg-green-100 text-green-700 border-green-200"
      case "Sắp hết hạn":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Tạm dừng":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "Đã đóng":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Tìm kiếm việc làm</h1>
            <p className="text-xl text-white/90 mb-8">Khám phá hàng nghìn cơ hội nghề nghiệp phù hợp với bạn</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                placeholder="Tìm kiếm theo vị trí, công ty, kỹ năng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 text-lg bg-white/90 backdrop-blur-sm border-white/30 focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - 1/3 */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Bộ lọc
                </h2>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-purple-600 hover:bg-purple-50">
                  Xóa tất cả
                </Button>
              </div>

              <div className="space-y-6">
                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phòng ban</label>
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                    className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  >
                    <option value="">Tất cả phòng ban</option>
                    {filterOptions.department.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ</label>
                  <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange("level", e.target.value)}
                    className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  >
                    <option value="">Tất cả cấp độ</option>
                    {filterOptions.level.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  >
                    <option value="">Tất cả loại hình</option>
                    {filterOptions.type.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  >
                    <option value="">Tất cả trạng thái</option>
                    {filterOptions.status.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Bộ lọc đang áp dụng:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(
                    ([key, value]) =>
                      value && (
                        <Badge
                          key={key}
                          className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0"
                        >
                          {value}
                          <button
                            onClick={() => handleFilterChange(key, "")}
                            className="ml-1 hover:bg-purple-200 rounded-full"
                          >
                            ×
                          </button>
                        </Badge>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings - 2/3 */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100">
              {/* Results Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Danh sách việc làm
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>{jobs.length} việc làm</span>
                  </div>
                </div>
              </div>

              {/* Job Cards */}
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={job.logo || "/placeholder.svg"}
                              alt={job.company}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                                  {job.title}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                  <Building className="h-4 w-4" />
                                  <span className="font-medium">{job.company}</span>
                                </div>
                              </div>
                              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                            </div>

                            <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-purple-500" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-purple-500" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-purple-500" />
                                <span>{job.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-purple-500" />
                                <span>{job.level}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                                Ứng tuyển
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Hiển thị {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, jobs.length)} trong số{" "}
                    {jobs.length} việc làm
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Trước
                    </Button>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm font-medium">
                      {currentPage + 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Sau
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
