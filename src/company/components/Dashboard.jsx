"use client"

import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Target,
  Award,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react"

const Dashboard = () => {
  const dashboardData = {
    companyName: "Công ty Giải pháp TechVision",
    totalJobs: 15,
    totalCandidates: 127,
    activeJobs: 8,
    pendingApplications: 43,
    interviewsScheduled: 12,
    hiredThisMonth: 5,
    businessScope: "Tư vấn Công nghệ & Phát triển Phần mềm",
    industry: "Công nghệ Thông tin",
    foundedYear: "2018",
    employeeCount: "150-200",
    headquarters: "Hà Nội, Việt Nam",
    phone: "+84 123 456 789",
    email: "lienhe@techvisionsolutions.com",
    website: "www.techvisionsolutions.com",
    monthlyRevenue: "20 tỷ VNĐ",
    clientSatisfaction: "98%",
    projectsCompleted: 245,
    teamMembers: 178,
    departments: ["Kỹ thuật", "Thiết kế", "Marketing", "Bán hàng", "Nhân sự"],
    recentAchievements: [
      "Nhà tuyển dụng Công nghệ Xuất sắc 2024",
      "Đạt chứng nhận ISO 27001",
      "Top 100 Công ty Phát triển Nhanh nhất",
    ],
  }

  const cardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
    border: "1px solid #f3f4f6",
  }

  const headerStyle = {
    background: "linear-gradient(135deg, #4318D1 0%, #013DC4 100%)",
    padding: "24px",
    color: "white",
  }

  const contentStyle = {
    padding: "24px",
  }

  const statCardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f3f4f6",
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEE7FE", padding: "24px" }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Phần tiêu đề */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <div className="flex items-center space-x-4">
              <div
                style={{
                  backgroundColor: "#F9BE4A",
                  padding: "16px",
                  borderRadius: "12px",
                }}
              >
                <Building2 className="h-10 w-10 text-black" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Bảng Điều Khiển Công Ty</h1>
                <p className="text-blue-100 text-lg">
                  {dashboardData.companyName} - {dashboardData.businessScope}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lưới số liệu chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div style={statCardStyle}>
            <div className="flex items-center justify-center mb-4">
              <div
                style={{
                  backgroundColor: "#4318D1",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <Briefcase className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-black mb-2">{dashboardData.totalJobs}</h3>
            <p className="text-gray-600 font-medium">Tổng số Công việc</p>
          </div>

          <div style={statCardStyle}>
            <div className="flex items-center justify-center mb-4">
              <div
                style={{
                  backgroundColor: "#013DC4",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-black mb-2">{dashboardData.totalCandidates}</h3>
            <p className="text-gray-600 font-medium">Tổng số Ứng viên</p>
          </div>

          <div style={statCardStyle}>
            <div className="flex items-center justify-center mb-4">
              <div
                style={{
                  backgroundColor: "#F9BE4A",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <TrendingUp className="h-8 w-8 text-black" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-black mb-2">{dashboardData.activeJobs}</h3>
            <p className="text-gray-600 font-medium">Công việc Đang hoạt động</p>
          </div>

          <div style={statCardStyle}>
            <div className="flex items-center justify-center mb-4">
              <div
                style={{
                  backgroundColor: "#4318D1",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-black mb-2">{dashboardData.hiredThisMonth}</h3>
            <p className="text-gray-600 font-medium">Đã tuyển dụng tháng này</p>
          </div>
        </div>

        {/* Số liệu phụ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div style={statCardStyle}>
            <div className="flex items-center justify-center mb-4">
              <div
                style={{
                  backgroundColor: "#013DC4",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">{dashboardData.pendingApplications}</h3>
            <p className="text-gray-600 font-medium">Đơn ứng tuyển đang chờ</p>
          </div>

          <div style={statCardStyle}>
            <div className="flex items-center justify-center mb-4">
              <div
                style={{
                  backgroundColor: "#F9BE4A",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <Calendar className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">{dashboardData.interviewsScheduled}</h3>
            <p className="text-gray-600 font-medium">Phỏng vấn đã lên lịch</p>
          </div>

          <div style={statCardStyle}>
            <div className="flex items-center justify-center mb-4">
              <div
                style={{
                  backgroundColor: "#4318D1",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              >
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">{dashboardData.teamMembers}</h3>
            <p className="text-gray-600 font-medium">Thành viên đội ngũ</p>
          </div>
        </div>

        {/* Phần thông tin công ty */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chi tiết doanh nghiệp */}
          <div style={cardStyle}>
            <div
              style={{
                backgroundColor: "#4318D1",
                padding: "20px",
                color: "white",
              }}
            >
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Target className="h-6 w-6" />
                Chi tiết Doanh nghiệp
              </h2>
            </div>
            <div style={contentStyle}>
              <div className="space-y-6">
                <div>
                  <label className="text-black font-semibold block text-lg">Phạm vi Kinh doanh</label>
                  <p className="text-gray-700 mt-2 text-base">{dashboardData.businessScope}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-black font-semibold block">Ngành</label>
                    <p className="text-gray-700 mt-1">{dashboardData.industry}</p>
                  </div>
                  <div>
                    <label className="text-black font-semibold block">Thành lập</label>
                    <p className="text-gray-700 mt-1">{dashboardData.foundedYear}</p>
                  </div>
                </div>
                <div>
                  <label className="text-black font-semibold block">Số lượng Nhân viên</label>
                  <p className="text-gray-700 mt-1">{dashboardData.employeeCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div style={cardStyle}>
            <div
              style={{
                backgroundColor: "#013DC4",
                padding: "20px",
                color: "white",
              }}
            >
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Mail className="h-6 w-6" />
                Thông tin Liên hệ
              </h2>
            </div>
            <div style={contentStyle}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <label className="text-black font-semibold block">Trụ sở</label>
                    <p className="text-gray-700 mt-1">{dashboardData.headquarters}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <label className="text-black font-semibold block">Điện thoại</label>
                    <p className="text-gray-700 mt-1">{dashboardData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <label className="text-black font-semibold block">Email</label>
                    <p className="text-gray-700 mt-1">{dashboardData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-gray-500 mt-1" />
                  <div>
                    <label className="text-black font-semibold block">Website</label>
                    <p className="text-gray-700 mt-1">{dashboardData.website}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Số liệu hiệu suất */}
        <div style={cardStyle}>
          <div
            style={{
              background: "linear-gradient(135deg, #F9BE4A 0%, #4318D1 100%)",
              padding: "20px",
              color: "black",
            }}
          >
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <Award className="h-6 w-6" />
              Số liệu Hiệu suất
            </h2>
          </div>
          <div style={contentStyle}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div
                  style={{
                    backgroundColor: "#EEE7FE",
                    padding: "16px",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <DollarSign className="h-8 w-8 text-black mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{dashboardData.monthlyRevenue}</h3>
                <p className="text-gray-600 font-medium">Doanh thu Hàng tháng</p>
              </div>
              <div className="text-center">
                <div
                  style={{
                    backgroundColor: "#EEE7FE",
                    padding: "16px",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <TrendingUp className="h-8 w-8 text-black mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{dashboardData.clientSatisfaction}</h3>
                <p className="text-gray-600 font-medium">Mức độ Hài lòng Khách hàng</p>
              </div>
              <div className="text-center">
                <div
                  style={{
                    backgroundColor: "#EEE7FE",
                    padding: "16px",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <Target className="h-8 w-8 text-black mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{dashboardData.projectsCompleted}</h3>
                <p className="text-gray-600 font-medium">Dự án Hoàn thành</p>
              </div>
              <div className="text-center">
                <div
                  style={{
                    backgroundColor: "#EEE7FE",
                    padding: "16px",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <Users className="h-8 w-8 text-black mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{dashboardData.teamMembers}</h3>
                <p className="text-gray-600 font-medium">Thành viên Đội ngũ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phòng ban và Thành tựu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Phòng ban */}
          <div style={cardStyle}>
            <div
              style={{
                backgroundColor: "#4318D1",
                padding: "20px",
                color: "white",
              }}
            >
              <h2 className="text-2xl font-semibold">Phòng ban</h2>
            </div>
            <div style={contentStyle}>
              <div className="flex flex-wrap gap-3">
                {dashboardData.departments.map((dept, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#EEE7FE",
                      color: "#4318D1",
                      padding: "12px 20px",
                      borderRadius: "25px",
                      fontSize: "16px",
                      fontWeight: "600",
                      border: "2px solid #4318D1",
                    }}
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Thành tựu gần đây */}
          <div style={cardStyle}>
            <div
              style={{
                backgroundColor: "#F9BE4A",
                padding: "20px",
                color: "black",
              }}
            >
              <h2 className="text-2xl font-semibold">Thành tựu Gần đây</h2>
            </div>
            <div style={contentStyle}>
              <div className="space-y-4">
                {dashboardData.recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Award className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                    <span className="text-gray-700 text-base font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard