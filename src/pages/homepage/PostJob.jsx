"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/radiogroup"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Briefcase,
  Building,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  GraduationCap,
  Award,
  Heart,
  FileText,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/config"

const PostJob = () => {
  const navigate = useNavigate()

  const [jobTitle, setJobTitle] = useState("Senior Frontend Developer")
  const [positions, setPositions] = useState("2")
  const [salaryMin, setSalaryMin] = useState("20.000.000")
  const [salaryMax, setSalaryMax] = useState("30.000.000")
  const [deadline, setDeadline] = useState("")
  const [location, setLocation] = useState("Hà Nội")
  const [workType, setWorkType] = useState("onsite")
  const [description, setDescription] = useState("")
  const [requirements, setRequirements] = useState("")
  const [benefits, setBenefits] = useState("")
  const [department, setDepartment] = useState("")
  const [experience, setExperience] = useState("3-5")
  const [skills, setSkills] = useState("")
  const [education, setEducation] = useState("")
  const [applicationProcess, setApplicationProcess] = useState("")
  const [companyOverview, setCompanyOverview] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [isRemoteAllowed, setIsRemoteAllowed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-indigo-100">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4 text-gray-500 hover:text-indigo-600"
              onClick={() => navigate(ROUTES.seeking)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Quay lại</span>
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Đăng Tin Tuyển Dụng
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Job Title */}
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block font-medium text-gray-700 flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-indigo-600" />
                Chức Danh Công Việc
              </label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="VD: Senior Frontend Developer"
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label htmlFor="department" className="block font-medium text-gray-700 flex items-center">
                <Building className="h-4 w-4 mr-2 text-indigo-600" />
                Phòng Ban
              </label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Kỹ Thuật</SelectItem>
                  <SelectItem value="design">Thiết Kế</SelectItem>
                  <SelectItem value="product">Sản Phẩm</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Kinh Doanh</SelectItem>
                  <SelectItem value="hr">Nhân Sự</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Positions */}
            <div className="space-y-2">
              <label htmlFor="positions" className="block font-medium text-gray-700 flex items-center">
                <Users className="h-4 w-4 mr-2 text-indigo-600" />
                Số Lượng Cần Tuyển
              </label>
              <Input
                id="positions"
                type="number"
                value={positions}
                onChange={(e) => setPositions(e.target.value)}
                min="1"
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Application Deadline */}
            <div className="space-y-2">
              <label htmlFor="deadline" className="block font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                Hạn Nộp Hồ Sơ
              </label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-indigo-600" />
                Mức Lương (VNĐ)
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Tối thiểu"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span>-</span>
                <Input
                  placeholder="Tối đa"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="w-full border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <label htmlFor="experience" className="block font-medium text-gray-700 flex items-center">
                <Award className="h-4 w-4 mr-2 text-indigo-600" />
                Kinh Nghiệm
              </label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Chọn mức kinh nghiệm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Mới đi làm (0-2 năm)</SelectItem>
                  <SelectItem value="3-5">Có kinh nghiệm (3-5 năm)</SelectItem>
                  <SelectItem value="5-8">Chuyên gia (5-8 năm)</SelectItem>
                  <SelectItem value="8+">Chuyên gia cao cấp (8+ năm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Work Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="block font-medium text-gray-700 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                Địa Điểm Làm Việc
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="VD: Hà Nội, Việt Nam"
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Work Arrangement */}
            <div className="space-y-2">
              <label className="block font-medium text-gray-700 flex items-center mb-2">
                <Building className="h-4 w-4 mr-2 text-indigo-600" />
                Hình Thức Làm Việc
              </label>
              <RadioGroup value={workType} onValueChange={setWorkType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onsite" id="onsite" className="text-indigo-600" />
                  <Label htmlFor="onsite">Tại văn phòng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="hybrid" className="text-indigo-600" />
                  <Label htmlFor="hybrid">Kết hợp</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remote" id="remote" className="text-indigo-600" />
                  <Label htmlFor="remote">Từ xa</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Additional Options */}
            <div className="md:col-span-2 flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={isUrgent}
                  onCheckedChange={setIsUrgent}
                  className="text-indigo-600 border-indigo-300"
                />
                <label htmlFor="urgent" className="text-gray-700">
                  Đánh dấu là tuyển gấp
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={isRemoteAllowed}
                  onCheckedChange={setIsRemoteAllowed}
                  className="text-indigo-600 border-indigo-300"
                />
                <label htmlFor="remote" className="text-gray-700">
                  Chấp nhận ứng viên từ xa trên toàn cầu
                </label>
              </div>
            </div>

            {/* Required Skills */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="skills" className="block font-medium text-gray-700 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                Kỹ Năng Yêu Cầu
              </label>
              <Textarea
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Liệt kê các kỹ năng cần thiết cho vị trí này (VD: React, TypeScript, Node.js)"
                rows={3}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Job Description */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="description" className="block font-medium text-gray-700 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                Mô Tả Công Việc
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết về vai trò, trách nhiệm và hoạt động hàng ngày"
                rows={6}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Candidate Requirements */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="requirements" className="block font-medium text-gray-700 flex items-center">
                <Users className="h-4 w-4 mr-2 text-indigo-600" />
                Yêu Cầu Ứng Viên
              </label>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Mô tả các yêu cầu về trình độ, kinh nghiệm và phẩm chất bạn đang tìm kiếm ở ứng viên"
                rows={6}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Education Requirements */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="education" className="block font-medium text-gray-700 flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-indigo-600" />
                Yêu Cầu Học Vấn
              </label>
              <Textarea
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Nêu rõ các yêu cầu hoặc ưu tiên về học vấn"
                rows={3}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Benefits */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="benefits" className="block font-medium text-gray-700 flex items-center">
                <Heart className="h-4 w-4 mr-2 text-indigo-600" />
                Quyền Lợi & Đãi Ngộ
              </label>
              <Textarea
                id="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Liệt kê các quyền lợi, đãi ngộ và lợi ích khi làm việc tại công ty của bạn"
                rows={4}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Company Overview */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="companyOverview" className="block font-medium text-gray-700 flex items-center">
                <Building className="h-4 w-4 mr-2 text-indigo-600" />
                Giới Thiệu Công Ty
              </label>
              <Textarea
                id="companyOverview"
                value={companyOverview}
                onChange={(e) => setCompanyOverview(e.target.value)}
                placeholder="Giới thiệu ngắn gọn về công ty, văn hóa và sứ mệnh của bạn"
                rows={4}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Application Process */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="applicationProcess" className="block font-medium text-gray-700 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                Quy Trình Ứng Tuyển
              </label>
              <Textarea
                id="applicationProcess"
                value={applicationProcess}
                onChange={(e) => setApplicationProcess(e.target.value)}
                placeholder="Mô tả quy trình ứng tuyển và phỏng vấn cho vị trí này"
                rows={3}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 cursor-pointer"
            >
              Xem Trước
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(ROUTES.index)}
            >
              Đăng Tuyển Dụng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostJob
