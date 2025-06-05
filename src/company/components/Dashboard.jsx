"use client"

import { Building2, Users, Briefcase, TrendingUp, Calendar, MapPin, Phone, Mail, Globe, Target, Award, DollarSign, Clock, CheckCircle, ArrowUp, ArrowDown, Eye } from 'lucide-react'
import { dashboardMetrics } from "../mock/recruitment-data"

const Dashboard = () => {
  const StatCard = ({ icon: Icon, title, value, change, changeType, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`p-3 rounded-xl ${color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              {change && (
                <div className={`flex items-center space-x-1 text-xs ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {changeType === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{change}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )

  const InfoCard = ({ icon: Icon, title, children, gradient }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className={`px-6 py-4 ${gradient} text-white`}>
        <h2 className="text-xl font-semibold flex items-center gap-3">
          <Icon className="h-6 w-6" />
          {title}
        </h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 px-8 py-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Building2 className="h-12 w-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Bảng Điều Khiển Công Ty</h1>
                <p className="text-blue-100 text-lg opacity-90">
                  {dashboardMetrics.companyName} - {dashboardMetrics.businessScope}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Briefcase}
            title="Tổng số Công việc"
            value={dashboardMetrics.totalJobs}
            change="+12%"
            changeType="up"
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Users}
            title="Tổng số Ứng viên"
            value={dashboardMetrics.totalCandidates}
            change="+8%"
            changeType="up"
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Công việc Đang hoạt động"
            value={dashboardMetrics.activeJobs}
            change="+5%"
            changeType="up"
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard
            icon={CheckCircle}
            title="Đã tuyển dụng tháng này"
            value={dashboardMetrics.hiredThisMonth}
            change="+15%"
            changeType="up"
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Clock}
            title="Đơn ứng tuyển đang chờ"
            value={dashboardMetrics.pendingApplications}
            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
          />
          <StatCard
            icon={Calendar}
            title="Phỏng vấn đã lên lịch"
            value={dashboardMetrics.interviewsScheduled}
            color="bg-gradient-to-r from-indigo-500 to-indigo-600"
          />
          <StatCard
            icon={Eye}
            title="Lượt xem hồ sơ"
            value="2,847"
            change="+23%"
            changeType="up"
            color="bg-gradient-to-r from-pink-500 to-pink-600"
          />
        </div>

        {/* Company Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Business Details */}
          <InfoCard
            icon={Target}
            title="Chi tiết Doanh nghiệp"
            gradient="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <div className="space-y-6">
              <div>
                <label className="text-gray-900 font-semibold block text-lg">Phạm vi Kinh doanh</label>
                <p className="text-gray-700 mt-2 text-base leading-relaxed">{dashboardMetrics.businessScope}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-900 font-semibold block">Ngành</label>
                  <p className="text-gray-700 mt-1">{dashboardMetrics.industry}</p>
                </div>
                <div>
                  <label className="text-gray-900 font-semibold block">Thành lập</label>
                  <p className="text-gray-700 mt-1">{dashboardMetrics.foundedYear}</p>
                </div>
              </div>
              <div>
                <label className="text-gray-900 font-semibold block">Số lượng Nhân viên</label>
                <p className="text-gray-700 mt-1">{dashboardMetrics.employeeCount}</p>
              </div>
            </div>
          </InfoCard>

          {/* Contact Info */}
          <InfoCard
            icon={Mail}
            title="Thông tin Liên hệ"
            gradient="bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-gray-900 font-semibold block">Trụ sở</label>
                  <p className="text-gray-700 mt-1">{dashboardMetrics.headquarters}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-gray-900 font-semibold block">Điện thoại</label>
                  <p className="text-gray-700 mt-1">{dashboardMetrics.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-gray-900 font-semibold block">Email</label>
                  <p className="text-gray-700 mt-1">{dashboardMetrics.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <label className="text-gray-900 font-semibold block">Website</label>
                  <p className="text-gray-700 mt-1">{dashboardMetrics.website}</p>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Performance Metrics */}
        <InfoCard
          icon={Award}
          title="Số liệu Hiệu suất"
          gradient="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-200">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboardMetrics.monthlyRevenue}</h3>
              <p className="text-gray-600 font-medium">Doanh thu Hàng tháng</p>
            </div>
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboardMetrics.clientSatisfaction}</h3>
              <p className="text-gray-600 font-medium">Mức độ Hài lòng</p>
            </div>
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-200">
                <Target className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboardMetrics.projectsCompleted}</h3>
              <p className="text-gray-600 font-medium">Dự án Hoàn thành</p>
            </div>
            <div className="text-center group">
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-200">
                <Users className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{dashboardMetrics.teamMembers}</h3>
              <p className="text-gray-600 font-medium">Thành viên Đội ngũ</p>
            </div>
          </div>
        </InfoCard>

        {/* Departments and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Departments */}
          <InfoCard
            icon={Building2}
            title="Phòng ban"
            gradient="bg-gradient-to-r from-indigo-600 to-blue-600"
          >
            <div className="flex flex-wrap gap-3">
              {dashboardMetrics.departments.map((dept, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-200 hover:scale-105 transition-transform duration-200 cursor-default"
                >
                  {dept}
                </span>
              ))}
            </div>
          </InfoCard>

          {/* Recent Achievements */}
          <InfoCard
            icon={Award}
            title="Thành tựu Gần đây"
            gradient="bg-gradient-to-r from-green-600 to-emerald-600"
          >
            <div className="space-y-4">
              {dashboardMetrics.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:scale-105 transition-transform duration-200">
                  <Award className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-base font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
