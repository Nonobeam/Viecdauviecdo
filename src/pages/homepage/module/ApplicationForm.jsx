import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/providers/AuthContext"
import { applyToJob, createApplication } from "@/utils/jobApi"
import { AlertCircle, ArrowLeft, Briefcase, CheckCircle, FileText, GraduationCap, MapPin, Send } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

const ApplicationForm = () => {
  const location = useLocation();
  const userData = location.state?.user;
  const [formData, setFormData] = useState({
    university: "",
    notes: "",
    year_experience: 0,
    user_id: "",
    country: "",
    state: "",
    city: "",
  })
  const { id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formErrors, setFormErrors] = useState({})

  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.university.trim()) {
      errors.university = "Vui lòng nhập tên trường đại học"
    }

    if (!formData.country.trim()) {
      errors.country = "Vui lòng chọn quốc gia"
    }

    if (!formData.state.trim()) {
      errors.state = "Vui lòng nhập tỉnh/thành"
    }

    if (!formData.city.trim()) {
      errors.city = "Vui lòng nhập thành phố"
    }

    if (formData.year_experience < 0) {
      errors.year_experience = "Số năm kinh nghiệm không thể âm"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setSubmitError("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      console.log("Submitting application:", formData)

      const response = await createApplication(formData);

      if(response != null){
        const applicationData = response.data;
        const applyData = {
        user_id: user.user_id,
        job_id: id,
        year_experience: applicationData.year_experience,
        university: applicationData.university
      };

        const applyResponse = await applyToJob(applyData)
        console.log(applyResponse)
      }
      setSubmitSuccess(true)

      setTimeout(() => {
        navigate(-1)
      }, 2000)
    } catch (error) {
      console.error("Application submission failed:", error)
      setSubmitError("Gửi đơn ứng tuyển thất bại. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!loading && user?.user_id) {
      setFormData((prev) => ({
        ...prev,
        user_id: user.user_id,
      }))
    }
  }, [loading, user])

  const countries = [
    "Việt Nam",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Singapore",
    "South Korea",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-2xl mx-auto -mt-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/profile">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4 hover:bg-purple-50 border-purple-200 text-purple-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại Hồ sơ
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Gửi Đơn Ứng Tuyển
          </h1>
          <p className="text-gray-600 mt-2">Điền thông tin để gửi đơn ứng tuyển của bạn</p>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-800">{submitError}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-green-800">Đơn ứng tuyển đã được gửi thành công! Đang chuyển hướng...</p>
            </div>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Education Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Thông Tin Học Vấn</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university" className="text-sm font-medium text-gray-700">
                Trường Đại Học <span className="text-red-500">*</span>
              </Label>
              <Input
                id="university"
                type="text"
                placeholder="Nhập tên trường đại học..."
                value={formData.university}
                onChange={(e) => handleInputChange("university", e.target.value)}
                className={`border-purple-200 focus:border-purple-500 focus:ring-purple-500 ${
                  formErrors.university ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {formErrors.university && <p className="text-sm text-red-600">{formErrors.university}</p>}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Kinh Nghiệm Làm Việc</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                Số Năm Kinh Nghiệm <span className="text-red-500">*</span>
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="0"
                value={formData.year_experience}
                onChange={(e) => handleInputChange("year_experience", Number.parseInt(e.target.value) || 0)}
                className={`border-purple-200 focus:border-purple-500 focus:ring-purple-500 ${
                  formErrors.year_experience ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {formErrors.year_experience && <p className="text-sm text-red-600">{formErrors.year_experience}</p>}
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Địa Chỉ</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Quốc Gia <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger
                    className={`bg-white border-purple-200 focus:border-purple-500 focus:ring-purple-500 ${
                      formErrors.country ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Chọn quốc gia..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.country && <p className="text-sm text-red-600">{formErrors.country}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  Tỉnh/Thành <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Nhập tỉnh/thành..."
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className={`border-purple-200 focus:border-purple-500 focus:ring-purple-500 ${
                    formErrors.state ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {formErrors.state && <p className="text-sm text-red-600">{formErrors.state}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                Thành Phố <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Nhập thành phố..."
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`border-purple-200 focus:border-purple-500 focus:ring-purple-500 ${
                  formErrors.city ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {formErrors.city && <p className="text-sm text-red-600">{formErrors.city}</p>}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Ghi Chú Thêm</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Ghi Chú (Tùy chọn)
              </Label>
              <Textarea
                id="notes"
                placeholder="Thêm bất kỳ thông tin bổ sung nào bạn muốn chia sẻ..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
                rows={4}
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isSubmitting || submitSuccess}
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Đang gửi..." : submitSuccess ? "Đã gửi!" : "Gửi Đơn Ứng Tuyển"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                disabled={isSubmitting}
                onClick={() => navigate("/")}
              >
                Hủy bỏ
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplicationForm
