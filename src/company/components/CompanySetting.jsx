"use client"

import { useState } from "react"
import {
  Building2,
  Save,
  Upload,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  X,
  Plus,
  Edit3,
  Check,
} from "lucide-react"

const CompanySettings = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingServiceIndex, setEditingServiceIndex] = useState(null)
  const [tempServiceValue, setTempServiceValue] = useState("")
  const [settings, setSettings] = useState({
    name: "TechVision Solutions Inc.",
    logo: null,
    description:
      "Một công ty tư vấn công nghệ hàng đầu chuyên về chuyển đổi số và các giải pháp phần mềm sáng tạo cho khách hàng doanh nghiệp.",
    businessScope: "Technology Consulting",
    industry: "Information Technology",
    foundedYear: "2018",
    employeeCount: "150-200",
    headquarters: "Thành phố Hồ Chí Minh, Việt Nam",
    phone: "+84 (28) 123-4567",
    email: "contact@techvisionsolutions.com",
    website: "www.techvisionsolutions.com",
    services: ["Cloud Migration", "AI/ML Solutions", "Custom Software Development", "Digital Transformation"],
    companyType: "Công ty cổ phần",
    taxId: "0123456789",
  })

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const startEditingService = (index) => {
    setEditingServiceIndex(index)
    setTempServiceValue(settings.services[index])
  }

  const saveServiceEdit = (index) => {
    if (tempServiceValue.trim() !== "") {
      const newServices = [...settings.services]
      newServices[index] = tempServiceValue.trim()
      setSettings((prev) => ({
        ...prev,
        services: newServices,
      }))
    }
    setEditingServiceIndex(null)
    setTempServiceValue("")
  }

  const cancelServiceEdit = () => {
    setEditingServiceIndex(null)
    setTempServiceValue("")
  }

  const addService = () => {
    setSettings((prev) => ({
      ...prev,
      services: [...prev.services, "Dịch vụ mới"],
    }))
    // Tự động chỉnh sửa dịch vụ mới được thêm
    const newIndex = settings.services.length
    setTimeout(() => {
      setEditingServiceIndex(newIndex)
      setTempServiceValue("Dịch vụ mới")
    }, 100)
  }

  const removeService = (index) => {
    setSettings((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
    // Hủy chỉnh sửa nếu đang chỉnh sửa dịch vụ bị xóa
    if (editingServiceIndex === index) {
      setEditingServiceIndex(null)
      setTempServiceValue("")
    }
  }

  const handleSave = () => {
    // Lưu dịch vụ đang chỉnh sửa trước khi lưu tổng thể
    if (editingServiceIndex !== null) {
      saveServiceEdit(editingServiceIndex)
    }
    setIsEditing(false)
    console.log("Cài đặt đã được lưu:", settings)
  }

  // Default company avatar component
  const DefaultAvatar = () => (
    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
      <Building2 className="w-10 h-10 text-white" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cài đặt công ty</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin và tùy chọn của công ty bạn</p>
            </div>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
              isEditing
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </>
            ) : (
              "Chỉnh sửa"
            )}
          </button>
        </div>

        {/* Company Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Tổng quan công ty</h2>
            <p className="text-gray-600 mt-1">Thông tin cơ bản về công ty của bạn</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="relative group">
                  {settings.logo ? (
                    <img
                      src={settings.logo || "/placeholder.svg"}
                      alt="Logo công ty"
                      className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200"
                    />
                  ) : (
                    <DefaultAvatar />
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="mt-3 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Upload className="h-3 w-3" />
                    Tải lên logo
                  </button>
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Tên công ty
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={settings.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                      !isEditing
                        ? "bg-gray-50 border-gray-200 text-gray-600"
                        : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="companyType" className="block text-sm font-semibold text-gray-900 mb-2">
                    Loại hình công ty
                  </label>
                  <select
                    id="companyType"
                    value={settings.companyType}
                    onChange={(e) => handleInputChange("companyType", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                      !isEditing
                        ? "bg-gray-50 border-gray-200 text-gray-600"
                        : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                  >
                    <option value="Công ty cổ phần">Công ty cổ phần</option>
                    <option value="Công ty TNHH">Công ty TNHH</option>
                    <option value="Doanh nghiệp tư nhân">Doanh nghiệp tư nhân</option>
                    <option value="Công ty hợp danh">Công ty hợp danh</option>
                    <option value="Doanh nghiệp nhà nước">Doanh nghiệp nhà nước</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                Mô tả công ty
              </label>
              <textarea
                id="description"
                value={settings.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder="Mô tả sứ mệnh và dịch vụ của công ty bạn..."
                className={`w-full px-4 py-3 border rounded-lg text-sm resize-vertical transition-all duration-200 ${
                  !isEditing
                    ? "bg-gray-50 border-gray-200 text-gray-600"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Business Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Chi tiết kinh doanh</h2>
            <p className="text-gray-600 mt-1">Thông tin ngành nghề và hoạt động</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="businessScope" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phạm vi kinh doanh
                </label>
                <input
                  id="businessScope"
                  type="text"
                  value={settings.businessScope}
                  onChange={(e) => handleInputChange("businessScope", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 mb-2">
                  Ngành nghề
                </label>
                <select
                  id="industry"
                  value={settings.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Healthcare">Y tế - Sức khỏe</option>
                  <option value="Finance">Tài chính - Ngân hàng</option>
                  <option value="Manufacturing">Sản xuất</option>
                  <option value="Retail">Bán lẻ</option>
                  <option value="Education">Giáo dục</option>
                  <option value="Real Estate">Bất động sản</option>
                </select>
              </div>
              <div>
                <label htmlFor="foundedYear" className="block text-sm font-semibold text-gray-900 mb-2">
                  Năm thành lập
                </label>
                <input
                  id="foundedYear"
                  type="text"
                  value={settings.foundedYear}
                  onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="employeeCount" className="block text-sm font-semibold text-gray-900 mb-2">
                  Số lượng nhân viên
                </label>
                <select
                  id="employeeCount"
                  value={settings.employeeCount}
                  onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                >
                  <option value="1-10">1-10 người</option>
                  <option value="11-50">11-50 người</option>
                  <option value="51-100">51-100 người</option>
                  <option value="101-200">101-200 người</option>
                  <option value="201-500">201-500 người</option>
                  <option value="500+">Trên 500 người</option>
                </select>
              </div>
              <div>
                <label htmlFor="taxId" className="block text-sm font-semibold text-gray-900 mb-2">
                  Mã số thuế
                </label>
                <input
                  id="taxId"
                  type="text"
                  value={settings.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  disabled={!isEditing}
                  placeholder="0123456789"
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
            </div>

            {/* Enhanced Services Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-900">Dịch vụ cung cấp</label>
                <button
                  onClick={addService}
                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Thêm dịch vụ
                </button>
              </div>

              <div className="space-y-3">
                {settings.services.map((service, index) => (
                  <div key={index} className="group">
                    {editingServiceIndex === index ? (
                      // Chế độ chỉnh sửa
                      <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <input
                          type="text"
                          value={tempServiceValue}
                          onChange={(e) => setTempServiceValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveServiceEdit(index)
                            } else if (e.key === "Escape") {
                              cancelServiceEdit()
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Nhập tên dịch vụ"
                          autoFocus
                        />
                        <button
                          onClick={() => saveServiceEdit(index)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Lưu"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelServiceEdit}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Hủy"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      // Chế độ hiển thị
                      <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group-hover:bg-gray-100 transition-colors">
                        <div className="flex-1 text-sm text-gray-900">{service}</div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEditingService(index)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeService(index)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {settings.services.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Chưa có dịch vụ nào được thêm</p>
                    <button
                      onClick={addService}
                      className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Thêm dịch vụ đầu tiên
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Thông tin liên hệ</h2>
            <p className="text-gray-600 mt-1">Cách khách hàng và đối tác có thể liên hệ với bạn</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="headquarters"
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Trụ sở chính
                </label>
                <input
                  id="headquarters"
                  type="text"
                  value={settings.headquarters}
                  onChange={(e) => handleInputChange("headquarters", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-blue-600" />
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  Địa chỉ email
                </label>
                <input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"
                >
                  <Globe className="h-4 w-4 text-blue-600" />
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  value={settings.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Thành lập {settings.foundedYear}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
              <Users className="h-3 w-3" />
              {settings.employeeCount} nhân viên
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
              <Building2 className="h-3 w-3" />
              {settings.industry}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanySettings
