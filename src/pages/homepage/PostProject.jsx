"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/config"
import { ArrowLeft, FileText, Calendar, DollarSign, Users, Clock, Tag, FileCode } from "lucide-react"

const PostProject = () => {
  const navigate = useNavigate()

  const [projectName, setProjectName] = useState("")
  const [projectValue, setProjectValue] = useState("100.000.000")
  const [estimatedTime, setEstimatedTime] = useState("6")
  const [category, setCategory] = useState("")
  const [requirements, setRequirements] = useState("")
  const [teamSize, setTeamSize] = useState("5-10")
  const [deadline, setDeadline] = useState("")

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
              Đăng Dự Án Mới
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <label htmlFor="projectName" className="block font-medium text-gray-700 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                Tên Dự Án
              </label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Nhập tên dự án"
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Project Deadline */}
            <div className="space-y-2">
              <label htmlFor="deadline" className="block font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                Thời Hạn Dự Án
              </label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Project Value */}
            <div className="space-y-2">
              <label htmlFor="projectValue" className="block font-medium text-gray-700 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-indigo-600" />
                Giá Trị Dự Án (VNĐ)
              </label>
              <Input
                id="projectValue"
                value={projectValue}
                onChange={(e) => setProjectValue(e.target.value)}
                placeholder="Nhập ngân sách dự án"
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Team Size */}
            <div className="space-y-2">
              <label htmlFor="teamSize" className="block font-medium text-gray-700 flex items-center">
                <Users className="h-4 w-4 mr-2 text-indigo-600" />
                Quy Mô Nhóm
              </label>
              <Select value={teamSize} onValueChange={setTeamSize}>
                <SelectTrigger className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Chọn quy mô nhóm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 người</SelectItem>
                  <SelectItem value="3-5">3-5 người</SelectItem>
                  <SelectItem value="5-10">5-10 người</SelectItem>
                  <SelectItem value="10+">10+ người</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estimated Time */}
            <div className="space-y-2">
              <label htmlFor="estimatedTime" className="block font-medium text-gray-700 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                Thời Gian Dự Kiến
              </label>
              <div className="flex items-center">
                <Input
                  id="estimatedTime"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  className="w-20 mr-2 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <Select defaultValue="months">
                  <SelectTrigger className="w-32 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500">
                    <SelectValue placeholder="Đơn vị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Ngày</SelectItem>
                    <SelectItem value="weeks">Tuần</SelectItem>
                    <SelectItem value="months">Tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Project Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block font-medium text-gray-700 flex items-center">
                <Tag className="h-4 w-4 mr-2 text-indigo-600" />
                Danh Mục Dự Án
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Phát Triển Web</SelectItem>
                  <SelectItem value="mobile">Ứng Dụng Di Động</SelectItem>
                  <SelectItem value="design">Thiết Kế UI/UX</SelectItem>
                  <SelectItem value="marketing">Marketing Số</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Requirements - Full Width */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="requirements" className="block font-medium text-gray-700 flex items-center">
                <FileCode className="h-4 w-4 mr-2 text-indigo-600" />
                Yêu Cầu Dự Án
              </label>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Mô tả chi tiết yêu cầu dự án của bạn"
                rows={6}
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
              Đăng Dự Án
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostProject
