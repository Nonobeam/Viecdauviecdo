"use client"

import { useState } from "react"
import { Search, Filter, Eye, MessageCircle, Calendar, MapPin, Clock, Star, Download, Mail, Phone, User, Briefcase } from 'lucide-react'

const CandidateList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterJob, setFilterJob] = useState("all")
  const [selectedCandidates, setSelectedCandidates] = useState([])

  // Dữ liệu mẫu về các vị trí tuyển dụng và ứng viên
  const jobPostings = [
    {
      id: 1,
      title: "Senior UX Designer",
      department: "Design",
      location: "Hồ Chí Minh",
      salary: "25,000,000 - 35,000,000 VNĐ",
      applicants: [
        {
          id: 101,
          name: "Nguyễn Thị Lan",
          status: "Đã lên lịch phỏng vấn",
          lastContact: "2 ngày trước",
          experience: "8 năm",
          location: "Hồ Chí Minh",
          skills: ["Figma", "User Research", "Prototyping", "UI/UX"],
          avatar: "/placeholder.svg?height=40&width=40",
          appliedDate: "2024-01-20",
          email: "lan.nguyen@email.com",
          phone: "+84 901 234 567",
          education: "Đại học Bách Khoa TP.HCM",
          rating: 4.5,
          notes: "Ứng viên có kinh nghiệm tốt trong lĩnh vực fintech",
        },
        {
          id: 102,
          name: "Trần Văn Minh",
          status: "Ứng viên mới",
          lastContact: "Hôm nay",
          experience: "6 năm",
          location: "Hà Nội",
          skills: ["Sketch", "Adobe XD", "User Flows"],
          avatar: "/placeholder.svg?height=40&width=40",
          appliedDate: "2024-01-22",
          email: "minh.tran@email.com",
          phone: "+84 902 345 678",
          education: "Đại học FPT",
          rating: 4.2,
          notes: "Portfolio ấn tượng, cần đánh giá kỹ năng teamwork",
        },
      ],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      salary: "30,000,000 - 45,000,000 VNĐ",
      applicants: [
        {
          id: 201,
          name: "Lê Thị Mai",
          status: "Đánh giá kỹ thuật",
          lastContact: "1 tuần trước",
          experience: "5 năm",
          location: "Đà Nẵng",
          skills: ["React", "Node.js", "TypeScript", "AWS"],
          avatar: "/placeholder.svg?height=40&width=40",
          appliedDate: "2024-01-15",
          email: "mai.le@email.com",
          phone: "+84 903 456 789",
          education: "Đại học Đà Nẵng",
          rating: 4.7,
          notes: "Kỹ năng technical mạnh, có kinh nghiệm làm việc remote",
        },
        {
          id: 202,
          name: "Phạm Văn Đức",
          status: "Review code",
          lastContact: "3 ngày trước",
          experience: "4 năm",
          location: "Hồ Chí Minh",
          skills: ["JavaScript", "Python", "Django"],
          avatar: "/placeholder.svg?height=40&width=40",
          appliedDate: "2024-01-18",
          email: "duc.pham@email.com",
          phone: "+84 904 567 890",
          education: "Đại học Khoa học Tự nhiên",
          rating: 4.3,
          notes: "Có tiềm năng phát triển, cần mentor về senior skills",
        },
      ],
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Hồ Chí Minh",
      salary: "20,000,000 - 30,000,000 VNĐ",
      applicants: [
        {
          id: 301,
          name: "Võ Thị Hương",
          status: "Chờ phản hồi",
          lastContact: "5 ngày trước",
          experience: "7 năm",
          location: "Hồ Chí Minh",
          skills: ["Digital Marketing", "SEO", "Google Ads", "Facebook Ads"],
          avatar: "/placeholder.svg?height=40&width=40",
          appliedDate: "2024-01-12",
          email: "huong.vo@email.com",
          phone: "+84 905 678 901",
          education: "Đại học Kinh tế TP.HCM",
          rating: 4.6,
          notes: "Có kinh nghiệm quản lý team, từng làm ở các công ty lớn",
        },
      ],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Ứng viên mới":
        return "bg-blue-100 text-blue-800"
      case "Đã lên lịch phỏng vấn":
        return "bg-purple-100 text-purple-800"
      case "Đánh giá kỹ thuật":
        return "bg-yellow-100 text-yellow-800"
      case "Review code":
        return "bg-orange-100 text-orange-800"
      case "Chờ phản hồi":
        return "bg-gray-100 text-gray-800"
      case "Đã gửi offer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCandidateSelect = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const allCandidates = jobPostings.flatMap((job) =>
    job.applicants.map((candidate) => ({ ...candidate, jobTitle: job.title, jobId: job.id })),
  )

  const filteredCandidates = allCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || candidate.status === filterStatus
    const matchesJob = filterJob === "all" || candidate.jobId.toString() === filterJob

    return matchesSearch && matchesStatus && matchesJob
  })

  const totalCandidates = allCandidates.length
  const newCandidates = allCandidates.filter((c) => c.status === "Ứng viên mới").length
  const interviewScheduled = allCandidates.filter((c) => c.status === "Đã lên lịch phỏng vấn").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý ứng viên</h1>
            <p className="text-gray-600 mt-1">Theo dõi và quản lý ứng viên cho các vị trí tuyển dụng</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Xuất danh sách
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg">
              <MessageCircle className="h-4 w-4" />
              Gửi email hàng loạt
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng ứng viên</p>
                <p className="text-2xl font-bold text-gray-900">{totalCandidates}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ứng viên mới</p>
                <p className="text-2xl font-bold text-blue-600">{newCandidates}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã lên lịch PV</p>
                <p className="text-2xl font-bold text-purple-600">{interviewScheduled}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã chọn</p>
                <p className="text-2xl font-bold text-green-600">{selectedCandidates.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600" />
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
                  placeholder="Tìm kiếm theo tên, kỹ năng hoặc vị trí..."
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
                <option value="Ứng viên mới">Ứng viên mới</option>
                <option value="Đã lên lịch phỏng vấn">Đã lên lịch phỏng vấn</option>
                <option value="Đánh giá kỹ thuật">Đánh giá kỹ thuật</option>
                <option value="Review code">Review code</option>
                <option value="Chờ phản hồi">Chờ phản hồi</option>
              </select>
              <select
                value={filterJob}
                onChange={(e) => setFilterJob(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả vị trí</option>
                {jobPostings.map((job) => (
                  <option key={job.id} value={job.id.toString()}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">
              Danh sách ứng viên ({filteredCandidates.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCandidates(filteredCandidates.map((c) => c.id))
                        } else {
                          setSelectedCandidates([])
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Ứng viên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Vị trí ứng tuyển
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Kinh nghiệm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Đánh giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleCandidateSelect(candidate.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={candidate.avatar || "/placeholder.svg"}
                          alt={candidate.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </div>
                          <div className="text-sm text-gray-500">{candidate.education}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{candidate.jobTitle}</div>
                        <div className="text-sm text-gray-500">
                          Nộp: {new Date(candidate.appliedDate).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}
                      >
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{candidate.experience}</div>
                        <div className="text-xs text-gray-500">
                          Liên hệ: {candidate.lastContact}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{candidate.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Gửi email"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Gọi điện"
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Lên lịch phỏng vấn"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
            <div>Hiển thị 1 đến {filteredCandidates.length} trong tổng số {totalCandidates} ứng viên</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
                Trước
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">Sau</button>
            </div>
          </div>
        </div>

        {/* Quick Actions for Selected Candidates */}
        {selectedCandidates.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Đã chọn {selectedCandidates.length} ứng viên
              </span>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Gửi email
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Lên lịch PV
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                  Xuất CV
                </button>
                <button
                  onClick={() => setSelectedCandidates([])}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Hủy chọn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateList
