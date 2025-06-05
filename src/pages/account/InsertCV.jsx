"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthContext"
import { uploadDocument } from "@/utils/userApi"
import { AlertCircle, ArrowLeft, CheckCircle, FileText, Upload, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const InsertCV = () => {
  const [cvFile, setCvFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const { user, loading } = useAuth()
  const fileInputRef = useRef(null)
  const [currentUserId, setCurrentUserId] = useState(user?.user_id)
  const navigate = useNavigate()

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (file) => {
    if (file) {
      setCvFile(file)
      setFileName(file.name)
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setCvFile(null)
    setFileName("")
  }

  const handleUpload = async () => {
    if (!cvFile) return

    // Validate file before upload
    const maxSize = 500 * 1024 // 500KB
    if (cvFile.size > maxSize) {
      setUploadError("Kích thước tệp phải nhỏ hơn 500KB")
      return
    }

    const allowedTypes = ["application/pdf"]
    if (!allowedTypes.includes(cvFile.type)) {
      setUploadError("Chỉ chấp nhận tệp PDF")
      return
    }

    setIsUploading(true)
    setUploadError("")

    try {
      console.log(currentUserId)
      await uploadDocument(currentUserId, cvFile)
      setUploadSuccess(true)

      setTimeout(() => {
        navigate("/profile")
      }, 2000)
    } catch (error) {
      console.error("Upload failed:", error)

      // More detailed error handling
      let errorMessage = "Tải lên CV thất bại. Vui lòng thử lại."

      if (error.response) {
        console.error("Error response:", error.response.data)

        if (error.response.status === 400) {
          errorMessage =
            error.response.data?.message || "Yêu cầu không hợp lệ. Vui lòng kiểm tra tệp của bạn và thử lại."
        } else if (error.response.status === 401) {
          errorMessage = "Yêu cầu xác thực. Vui lòng đăng nhập lại."
        } else if (error.response.status === 413) {
          errorMessage = "Tệp quá lớn. Vui lòng chọn tệp nhỏ hơn."
        } else if (error.response.status === 415) {
          errorMessage = "Định dạng tệp không được hỗ trợ. Vui lòng tải lên tệp PDF."
        } else {
          errorMessage = `Tải lên thất bại: ${error.response.status} ${error.response.statusText}`
        }
      } else if (error.request) {
        errorMessage = "Lỗi mạng. Vui lòng kiểm tra kết nối của bạn và thử lại."
      }

      setUploadError(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (!loading && user?.user_id) {
      setCurrentUserId(user.user_id)
    }
  }, [loading, user])

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
            Tải lên CV
          </h1>
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 animate-pulse">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-800">{uploadError}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {uploadSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-pulse">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-green-800">CV đã được tải lên thành công! Đang chuyển hướng...</p>
            </div>
          </div>
        )}

        {/* File Upload */}
        <div
          className={`border-2 border-dashed rounded-xl p-10 mb-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-purple-500 bg-purple-50"
              : cvFile
                ? "border-green-400 bg-green-50/30"
                : "border-purple-200 hover:border-purple-400 hover:bg-purple-50/50"
          }`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {cvFile ? (
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-3 mb-4 shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <p className="text-base font-medium text-gray-900 mb-1">{fileName}</p>
                <p className="text-sm text-gray-600">Tệp đã được tải lên thành công</p>
              </div>
              <button
                className="absolute top-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile()
                }}
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full p-4 mb-4">
                <Upload className="h-10 w-10 text-purple-500" />
              </div>
              <p className="text-base text-gray-700 mb-2 font-medium">Kéo và thả tệp CV của bạn vào đây</p>
              <p className="text-sm text-gray-500">hoặc nhấp để chọn tệp</p>
              <p className="text-xs text-gray-400 mt-3">Định dạng được hỗ trợ: PDF</p>
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileInputChange} />
        </div>

        {/* Additional Information */}
        <div className="mb-8 p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100/50">
          <h3 className="font-medium text-purple-900 mb-3 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Hướng dẫn tải lên:
          </h3>
          <ul className="text-sm text-gray-700 space-y-2 pl-6">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
              <span>Kích thước tệp tối đa: 500KB</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
              <span>Định dạng được chấp nhận: PDF</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
              <span>Đảm bảo CV của bạn được cập nhật và định dạng đúng</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!cvFile || isUploading || uploadSuccess}
            onClick={handleUpload}
          >
            {isUploading ? "Đang tải lên..." : uploadSuccess ? "Đã tải lên!" : "Tải lên CV"}
          </Button>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            disabled={isUploading}
            onClick={() => navigate("/profile")}
          >
            Hủy bỏ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InsertCV
