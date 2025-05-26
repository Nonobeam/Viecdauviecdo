import { useState } from "react"
import { Search, Filter, Eye, Edit, Trash2, Plus, Users, MapPin, Clock, DollarSign } from 'lucide-react'
import JobForm from "./JobForm"

const JobList = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Hồ Chí Minh",
      posted: "2 ngày trước",
      salary: "25,000,000 - 35,000,000 VNĐ",
      status: "Đang tuyển",
      description: "Phát triển giao diện người dùng sử dụng React và các công nghệ frontend hiện đại",
      requirements: "3+ năm kinh nghiệm React, JavaScript, TypeScript",
      applicants: 24,
      views: 156,
      level: "Senior",
      workingTime: "8:00 - 17:00",
      benefits: ["Bảo hiểm sức khỏe", "Thưởng hiệu suất", "Du lịch công ty"],
      deadline: "2024-02-15"
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Hà Nội",
      posted: "1 tuần trước",
      salary: "20,000,000 - 30,000,000 VNĐ",
      status: "Đang tuyển",
      description: "Phát triển các ứng dụng server-side và API",
      requirements: "3+ năm kinh nghiệm Node.js, Python hoặc Java",
      applicants: 18,
      views: 89,
      level: "Middle",
      workingTime: "8:30 - 17:30",
      benefits: ["Bảo hiểm sức khỏe", "Làm việc từ xa", "Đào tạo"],
      deadline: "2024-02-20"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      type: "Full-time",
      location: "Đà Nẵng",
      posted: "3 ngày trước",
      salary: "15,000,000 - 25,000,000 VNĐ",
      status: "Tạm dừng",
      description: "Thiết kế giao diện và trải nghiệm người dùng cho các sản phẩm digital",
      requirements: "2+ năm kinh nghiệm Figma, Adobe Creative Suite",
      applicants: 31,
      views: 203,
      level: "Middle",
      workingTime: "9:00 - 18:00",
      benefits: ["Bảo hiểm sức khỏe", "Thưởng dự án", "Môi trường sáng tạo"],
      deadline: "2024-02-25"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      posted: "5 ngày trước",
      salary: "30,000,000 - 45,000,000 VNĐ",
      status: "Đang tuyển",
      description: "Quản lý hạ tầng cloud và CI/CD pipeline",
      requirements: "4+ năm kinh nghiệm AWS, Docker, Kubernetes",
      applicants: 12,
      views: 78,
      level: "Senior",
      workingTime: "Linh hoạt",
      benefits: ["Bảo hiểm sức khỏe", "Làm việc từ xa", "Laptop cao cấp"],
      deadline: "2024-03-01"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [currentJob, setCurrentJob] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")

  const handleAddJob = () => {
    setCurrentJob(null)
    setShowForm(true)
  }

  const handleEdit = (job) => {
    setCurrentJob(job)
    setShowForm(true)
  }

  const handleDelete = (jobId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này?")) {
      setJobs(jobs.filter(job => job.id !== jobId))
    }
  }

  const handleFormSubmit = (jobData) => {
    if (currentJob) {
      // Cập nhật công việc hiện có
      setJobs(jobs.map(job =>
        job.id === currentJob.id ? { ...jobData, id: currentJob.id, posted: job.posted, applicants: job.applicants, views: job.views } : job
      ))
    } else {
      // Thêm công việc mới
      const newJob = {
        ...jobData,
        id: Math.max(...jobs.map(j => j.id)) + 1,
        posted: "Vừa đăng",
        applicants: 0,
        views: 0
      }
      setJobs([newJob, ...jobs])
    }
    setShowForm(false)
    setCurrentJob(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setCurrentJob(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang tuyển":
        return "bg-green-100 text-green-800"
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800"
      case "Đã đóng":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || job.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || job.department === filterDepartment
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  if (showForm) {
    return <JobForm job={currentJob} onSubmit={handleFormSubmit} onCancel={handleCancel} />
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tin tuyển dụng</h1>
          <p className="text-gray-600 mt-1">Quản lý và theo dõi các vị trí tuyển dụng của công ty</p>
        </div>
        <button
          onClick={handleAddJob}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Đăng tin tuyển dụng
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng tin tuyển dụng</p>
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang tuyển</p>
              <p className="text-2xl font-bold text-green-600">{jobs.filter(j => j.status === "Đang tuyển").length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng ứng viên</p>
              <p className="text-2xl font-bold text-purple-600">{jobs.reduce((sum, job) => sum + job.applicants, 0)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lượt xem</p>
              <p className="text-2xl font-bold text-orange-600">{jobs.reduce((sum, job) => sum + job.views, 0)}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Eye className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên công việc hoặc phòng ban..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Đang tuyển">Đang tuyển</option>
              <option value="Tạm dừng">Tạm dừng</option>
              <option value="Đã đóng">Đã đóng</option>
            </select>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả phòng ban</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {job.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    {job.department}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Chỉnh sửa"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Hạn nộp: {new Date(job.deadline).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {job.applicants} ứng viên
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {job.views} lượt xem
                </span>
              </div>
              <span className="text-sm text-gray-500">{job.posted}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tin tuyển dụng</h3>
          <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc tạo tin tuyển dụng mới</p>
          <button
            onClick={handleAddJob}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đăng tin tuyển dụng đầu tiên
          </button>
        </div>
      )}
    </div>
  )
}

export default JobList
