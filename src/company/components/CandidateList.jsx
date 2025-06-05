"use client"

import { useState } from "react"
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  Calendar,
  Briefcase,
  TrendingUp,
  Star,
  Award,
} from "lucide-react"
import { jobs as initialJobs, utils } from "../mock/recruitment-data"
import JobForm from "./JobForm"

const CandidateList = ({ companyId = 1 }) => {
  const [jobs, setJobs] = useState(initialJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [showJobForm, setShowJobForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  // Get jobs for the specific company
  const companyJobs = utils.getJobsByCompany(companyId)

  const handleDelete = (jobId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này?")) {
      setJobs(jobs.filter((job) => job.id !== jobId))
    }
  }

  const handleEdit = (job) => {
    setEditingJob(job)
    setShowJobForm(true)
  }

  const handleAddJob = () => {
    setEditingJob(null)
    setShowJobForm(true)
  }

  const handleJobSubmit = (jobData) => {
    if (editingJob) {
      // Update existing job
      setJobs(jobs.map((job) => (job.id === editingJob.id ? { ...job, ...jobData } : job)))
    } else {
      // Add new job
      const newJob = {
        id: Math.max(...jobs.map((j) => j.id)) + 1,
        companyId: companyId,
        ...jobData,
        posted: new Date().toISOString().split("T")[0],
        applicants: 0,
        views: 0,
      }
      setJobs([...jobs, newJob])
    }
    setShowJobForm(false)
    setEditingJob(null)
  }

  const handleCancel = () => {
    setShowJobForm(false)
    setEditingJob(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang tuyển":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Tạm dừng":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Đã đóng":
        return "bg-rose-100 text-rose-800 border-rose-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getPriorityIcon = (level) => {
    switch (level) {
      case "Senior":
      case "Lead":
      case "Manager":
        return <Star className="h-3 w-3 text-yellow-500" />
      default:
        return null
    }
  }

  const filteredJobs = companyJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || job.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || job.department === filterDepartment

    return matchesSearch && matchesStatus && matchesDepartment
  })

  if (showJobForm) {
    return <JobForm job={editingJob} onSubmit={handleJobSubmit} onCancel={handleCancel} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Quản lý Ứng viên
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Theo dõi và quản lý ứng viên cho các vị trí tuyển dụng</p>
            </div>
          </div>
          <button
            onClick={handleAddJob}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-3 shadow-lg transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            Tạo vị trí mới
          </button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tổng vị trí tuyển dụng</p>
                <p className="text-3xl font-bold text-gray-900">{companyJobs.length}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% so với tháng trước
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Đang tuyển</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {companyJobs.filter((j) => j.status === "Đang tuyển").length}
                </p>
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Hoạt động tích cực
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Tổng ứng viên</p>
                <p className="text-3xl font-bold text-purple-600">
                  {companyJobs.reduce((sum, job) => sum + job.applicants, 0)}
                </p>
                <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Chất lượng cao
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Lượt xem</p>
                <p className="text-3xl font-bold text-orange-600">
                  {companyJobs.reduce((sum, job) => sum + job.views, 0)}
                </p>
                <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Tăng trưởng tốt
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Eye className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Bộ lọc tìm kiếm nâng cao</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên công việc, phòng ban, kỹ năng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="all">🎯 Tất cả trạng thái</option>
                <option value="Đang tuyển">✅ Đang tuyển</option>
                <option value="Tạm dừng">⏸️ Tạm dừng</option>
                <option value="Đã đóng">❌ Đã đóng</option>
              </select>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 bg-gray-50 focus:bg-white"
              >
                <option value="all">🏢 Tất cả phòng ban</option>
                <option value="Engineering">💻 Engineering</option>
                <option value="Design">🎨 Design</option>
                <option value="Marketing">📈 Marketing</option>
                <option value="Sales">💼 Sales</option>
                <option value="HR">👥 HR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Job Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full -mr-16 -mt-16"></div>

              <div className="flex justify-between items-start mb-4 relative">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    {getPriorityIcon(job.level)}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium border border-indigo-200">
                      {job.level}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200">
                      {job.department}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
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
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  <span>{job.location}</span>
                  <span>•</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium text-emerald-600">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span>Hạn nộp: {new Date(job.deadline).toLocaleDateString("vi-VN")}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-md">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">{job.applicants}</span> ứng viên
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-md">
                    <Eye className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{job.views}</span> lượt xem
                  </span>
                </div>
                <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  {new Date(job.posted).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy vị trí tuyển dụng</h3>
              <p className="text-gray-500 mb-6">
                Thử thay đổi bộ lọc hoặc tạo vị trí tuyển dụng mới để bắt đầu thu hút ứng viên
              </p>
              <button
                onClick={handleAddJob}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Tạo vị trí tuyển dụng đầu tiên
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateList
