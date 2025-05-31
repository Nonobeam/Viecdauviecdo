import { useState } from "react"
import { Users, Calendar, Clock, TrendingUp, Eye, FileText, Video, UserPlus, BarChart3, CheckCircle, AlertCircle } from 'lucide-react'

const HRDashboard = () => {
  const [assignedJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer (React)",
      department: "Engineering",
      applicants: 24,
      newApplicants: 5,
      status: "Đang tuyển",
      posted: "2024-01-15",
      deadline: "2024-02-15",
      priority: "Cao",
      hiringManager: "Nguyễn Thị Hoa",
      location: "Hồ Chí Minh",
      salary: "25,000,000 - 35,000,000 VNĐ",
    },
    {
      id: 2,
      title: "Backend Engineer (Node.js)",
      department: "Engineering",
      applicants: 18,
      newApplicants: 3,
      status: "Đang tuyển",
      posted: "2024-01-20",
      deadline: "2024-02-10",
      priority: "Trung bình",
      hiringManager: "Trần Văn Minh",
      location: "Hà Nội",
      salary: "20,000,000 - 30,000,000 VNĐ",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      applicants: 32,
      newApplicants: 8,
      status: "Đang tuyển",
      posted: "2024-01-10",
      deadline: "2024-02-05",
      priority: "Cao",
      hiringManager: "Lê Thị Mai",
      location: "Đà Nẵng",
      salary: "15,000,000 - 25,000,000 VNĐ",
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Analytics",
      applicants: 15,
      newApplicants: 2,
      status: "Tạm dừng",
      posted: "2023-12-28",
      deadline: "2024-02-01",
      priority: "Thấp",
      hiringManager: "Phạm Văn Đức",
      location: "Remote",
      salary: "30,000,000 - 45,000,000 VNĐ",
    },
    {
      id: 5,
      title: "HR Business Partner",
      department: "HR",
      applicants: 21,
      newApplicants: 4,
      status: "Đã đóng",
      posted: "2023-12-15",
      deadline: "2024-01-15",
      priority: "Trung bình",
      hiringManager: "Võ Thị Lan",
      location: "Hồ Chí Minh",
      salary: "18,000,000 - 28,000,000 VNĐ",
    },
  ])

  const [upcomingInterviews] = useState([
    {
      id: 1,
      candidate: "Nguyễn Văn An",
      position: "Frontend Developer",
      date: "2024-02-05",
      time: "10:00",
      interviewers: ["Nguyễn Thị Hoa", "Trần Văn Nam"],
      stage: "Phỏng vấn kỹ thuật",
      type: "Online",
      notes: "Ứng viên có 4 năm kinh nghiệm React",
    },
    {
      id: 2,
      candidate: "Trần Thị Bình",
      position: "Backend Engineer",
      date: "2024-02-06",
      time: "14:30",
      interviewers: ["Trần Văn Minh", "Võ Thị Lan"],
      stage: "Phỏng vấn cuối",
      type: "Trực tiếp",
      notes: "Ứng viên xuất sắc ở vòng kỹ thuật",
    },
    {
      id: 3,
      candidate: "Lê Văn Cường",
      position: "UI/UX Designer",
      date: "2024-02-07",
      time: "09:00",
      interviewers: ["Lê Thị Mai"],
      stage: "Portfolio Review",
      type: "Online",
      notes: "Cần đánh giá portfolio design",
    },
  ])

  const recruitmentMetrics = {
    totalOpenPositions: 8,
    positionsFilled: 12,
    avgTimeToHire: "34 ngày",
    interviewToOfferRatio: "3:1",
    topSource: "LinkedIn (42%)",
    totalApplicants: 156,
    interviewsScheduled: 23,
    offersExtended: 8,
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Đang tuyển":
        return "bg-green-100 text-green-800"
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800"
      case "Đã đóng":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Cao":
        return "bg-red-100 text-red-800"
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800"
      case "Thấp":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bảng điều khiển HR</h1>
            <p className="text-gray-600 mt-1">Tổng quan hoạt động tuyển dụng và quản lý nhân sự</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg">
              <UserPlus className="h-4 w-4" />
              Đăng tin tuyển dụng
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tạo báo cáo
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Vị trí đang tuyển</h3>
                <p className="text-2xl font-bold text-blue-600">{recruitmentMetrics.totalOpenPositions}</p>
                <p className="text-xs text-gray-500 mt-1">+2 từ tuần trước</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Đã tuyển được</h3>
                <p className="text-2xl font-bold text-green-600">{recruitmentMetrics.positionsFilled}</p>
                <p className="text-xs text-gray-500 mt-1">Tháng này</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Tổng ứng viên</h3>
                <p className="text-2xl font-bold text-purple-600">{recruitmentMetrics.totalApplicants}</p>
                <p className="text-xs text-gray-500 mt-1">+15 hôm nay</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Thời gian tuyển dụng TB</h3>
                <p className="text-2xl font-bold text-orange-600">{recruitmentMetrics.avgTimeToHire}</p>
                <p className="text-xs text-gray-500 mt-1">-5 ngày so với trước</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Jobs Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Vị trí được phân công</h2>
                  <span className="text-sm text-gray-600">{assignedJobs.length} vị trí</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Vị trí tuyển dụng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Phòng ban
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Ứng viên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {assignedJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">
                              Đăng: {new Date(job.posted).toLocaleDateString("vi-VN")}
                            </div>
                            <div className="text-sm text-gray-500">Hạn: {new Date(job.deadline).toLocaleDateString("vi-VN")}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 w-fit">
                              {job.department}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${getPriorityColor(job.priority)}`}>
                              {job.priority}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{job.applicants} tổng</div>
                          {job.newApplicants > 0 && (
                            <div className="text-sm text-blue-600 font-medium">+{job.newApplicants} mới</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Xem</button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Sửa</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
                Hiển thị 1 đến {assignedJobs.length} trong tổng số {assignedJobs.length} vị trí
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                <h2 className="text-xl font-bold text-gray-900">Lịch phỏng vấn sắp tới</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{interview.candidate}</h3>
                        <p className="text-sm text-gray-600">{interview.position}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {interview.stage}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(interview.date).toLocaleDateString("vi-VN")} lúc {interview.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {interview.interviewers.join(", ")}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Video className="w-4 h-4 mr-2" />
                        {interview.type}
                      </div>
                    </div>

                    {interview.notes && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{interview.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Tham gia họp
                      </button>
                      <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Đổi lịch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-200 text-center">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                  Xem tất cả lịch phỏng vấn
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Thao tác nhanh
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
                  <span className="font-medium">Xem quy trình ứng viên</span>
                  <Eye className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
                  <span className="font-medium">Lên lịch phỏng vấn hàng loạt</span>
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
                  <span className="font-medium">Tạo thư mời làm việc</span>
                  <FileText className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
                  <span className="font-medium">Báo cáo hiệu suất tuyển dụng</span>
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Hoạt động gần đây</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Ứng viên mới nộp hồ sơ cho vị trí Frontend Developer</p>
                    <p className="text-xs text-gray-500">5 phút trước</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Phỏng vấn với Nguyễn Văn An đã được lên lịch</p>
                    <p className="text-xs text-gray-500">1 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">Thư mời làm việc đã được gửi cho Trần Thị Bình</p>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
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

export default HRDashboard
