import { useState, useEffect } from "react"
import { ArrowLeft, Save, X, Plus, Trash2 } from "lucide-react"

const JobForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    department: "Engineering",
    type: "Full-time",
    level: "Middle",
    location: "Hồ Chí Minh",
    salary: "",
    workingTime: "8:00 - 17:00",
    description: "",
    requirements: "",
    benefits: ["Bảo hiểm sức khỏe"],
    status: "Đang tuyển",
    deadline: "",
  })

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        department: job.department || "Engineering",
        type: job.type || "Full-time",
        level: job.level || "Middle",
        location: job.location || "Hồ Chí Minh",
        salary: job.salary || "",
        workingTime: job.workingTime || "8:00 - 17:00",
        description: job.description || "",
        requirements: job.requirements || "",
        benefits: job.benefits || ["Bảo hiểm sức khỏe"],
        status: job.status || "Đang tuyển",
        deadline: job.deadline || "",
      })
    }
  }, [job])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData((prev) => ({ ...prev, benefits: newBenefits }))
  }

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }))
  }

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lọc bỏ benefits rỗng
    const cleanedData = {
      ...formData,
      benefits: formData.benefits.filter((benefit) => benefit.trim() !== ""),
    }
    onSubmit(cleanedData)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="flex items-center gap-4">
            <button onClick={onCancel} className="p-2 hover:bg-white rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {job ? "Chỉnh sửa tin tuyển dụng" : "Đăng tin tuyển dụng mới"}
              </h1>
              <p className="text-gray-600 mt-1">
                {job ? "Cập nhật thông tin vị trí tuyển dụng" : "Tạo tin tuyển dụng để thu hút ứng viên phù hợp"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tên vị trí <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="VD: Senior Frontend Developer"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phòng ban <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Loại hình công việc <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Full-time">Toàn thời gian</option>
                  <option value="Part-time">Bán thời gian</option>
                  <option value="Contract">Hợp đồng</option>
                  <option value="Internship">Thực tập</option>
                  <option value="Remote">Làm việc từ xa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Cấp độ <span className="text-red-500">*</span>
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Intern">Thực tập sinh</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Team Lead</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Địa điểm làm việc <span className="text-red-500">*</span>
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Remote">Làm việc từ xa</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Mức lương</label>
                <input
                  type="text"
                  name="salary"
                  placeholder="VD: 20,000,000 - 30,000,000 VNĐ"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Thời gian làm việc</label>
                <input
                  type="text"
                  name="workingTime"
                  placeholder="VD: 8:00 - 17:00"
                  value={formData.workingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Hạn nộp hồ sơ <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {job && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Trạng thái</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Đang tuyển">Đang tuyển</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                    <option value="Đã đóng">Đã đóng</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Mô tả công việc */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Mô tả chi tiết</h3>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Mô tả công việc <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Mô tả chi tiết về vai trò, trách nhiệm và môi trường làm việc..."
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Yêu cầu ứng viên <span className="text-red-500">*</span>
              </label>
              <textarea
                name="requirements"
                placeholder="Liệt kê các kỹ năng, kinh nghiệm và yêu cầu cần thiết..."
                value={formData.requirements}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Phúc lợi */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Phúc lợi</h3>
              <button
                type="button"
                onClick={addBenefit}
                className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                Thêm phúc lợi
              </button>
            </div>
            <div className="space-y-3">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    placeholder="VD: Bảo hiểm sức khỏe"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <Save className="h-4 w-4" />
              {job ? "Cập nhật tin tuyển dụng" : "Đăng tin tuyển dụng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobForm
