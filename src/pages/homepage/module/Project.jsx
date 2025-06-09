"use client"

import BentoGridDemo from "@/components/BentoGridLayout"
import { Button } from "@/components/ui/button"
import ChatbotButton from "@/components/ui/chatbotButton"
import { getAllProjects } from "@/utils/projectAPI"
import { motion } from "framer-motion"
import { FileText, Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Project = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const pageSize = 10
  const navigate = useNavigate()

  const fetchProjects = async (pageNum = 0, reset = false) => {
    try {
      setLoading(true)
      const data = await getAllProjects(pageNum, pageSize)

      if (reset) {
        setProjects(data.data.content)
      } else {
        setProjects((prev) => [...prev, ...data])
      }

      // Check if we have more data to load
      setHasMore(data.length === pageSize)
      setError(null)
    } catch (err) {
      setError("Không thể tải danh sách dự án")
      console.error("Lỗi khi tải danh sách dự án:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchProjects(nextPage, false)
    }
  }

  useEffect(() => {
    fetchProjects(0, true)
    setPage(0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
            Khám Phá Dự Án
          </h1>
          <p className="text-gray-600">Tìm kiếm và tham gia các dự án hấp dẫn từ cộng đồng chuyên gia</p>
        </motion.div>

        {loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Đang tải danh sách dự án...</p>
          </div>
        ) : !loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
            <FileText className="w-16 h-16 text-indigo-300 mb-4" />
            <p className="text-lg text-gray-600 mb-4">Hiện tại chưa có dự án nào</p>
          </div>
        ) : (
          <BentoGridDemo items={projects} />
        )}

        {/* Load More Button */}
        {hasMore && projects.length > 0 && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={loadMore}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-2 h-auto rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  <span>Đang tải...</span>
                </div>
              ) : (
                <span>Xem thêm dự án</span>
              )}
            </Button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6">
            <p>{error}</p>
          </div>
        )}

        <ChatbotButton />
      </div>
    </div>
  )
}

export default Project
