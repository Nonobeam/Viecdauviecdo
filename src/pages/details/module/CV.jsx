import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/AuthContext"
import { getCVs } from "@/utils/userApi"
import { Download, Eye, FileText } from "lucide-react"
import { useEffect, useState } from "react"

const CV = () => {
  const [cvData, setCvData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth();
  const pageSize = 10;

  useEffect(() => {
    // Fetch CV data here
    const fetchCV = async (pageNum = 0, reset = false) => {
      try {
        const CVs = getCVs(
          user.user_id,
          pageNum,
          pageSize
        );
        setCvData(CVs.data);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch CV:", error)
        setLoading(false)
      }
    }

    fetchCV()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!cvData) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
          <FileText className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có CV</h3>
        <p className="text-gray-500 mb-4">Tải lên CV của bạn để hiển thị cho nhà tuyển dụng</p>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
          Tải lên CV
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* CV Preview Card */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">CV_NguyenVanA.pdf</h3>
              <p className="text-sm text-gray-500">Tải lên 2 ngày trước</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Eye className="h-4 w-4 mr-1" />
              Xem
            </Button>
            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Download className="h-4 w-4 mr-1" />
              Tải xuống
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>Kích thước: 500 KB</p>
          <p>Định dạng: PDF</p>
        </div>
      </div>
    </div>
  )
}

export default CV
