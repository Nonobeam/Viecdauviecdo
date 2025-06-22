"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FeaturedProjects = () => {
  // Sample data based on your API structure
  const [projects] = useState([
    {
      id: "18dfc4e2-0bc0-44eb-9523-374a9565c4ac",
      name: "Green and Sustainable Community",
      description:
        "Dân số thế giới ngày càng gia tăng, dẫn đến nhu cầu nhà ở ngày càng tăng. Điều này đặt ra những thách thức cho ngành Xây dựng không chỉ trong việc đáp ứng nhu cầu chỗ ở mà còn trong việc bảo vệ môi trường. Theo báo cáo từ Chương trình Môi trường Liên Hợp Quốc (UNEP) và Trung tâm Hệ sinh thái và Kiến trúc Yale (CEA), ngành xây dựng góp phần phát thải khí nhà kính lớn nhất, chiếm khoảng 37% tổng lượng phát thải toàn cầu.",
      summary:
        "Dự án Green & Sustainable Community, trực thuộc Tổ chức phi chính phủ Keep It Beautiful Vietnam, mang trong mình sứ mệnh giảm thiểu tác động tiêu cực của ngành xây dựng đến môi trường, thúc đẩy các sáng kiến xây dựng xanh, bền vững.",
      tags: ["Fund Raising", "Event Managing"],
      image_url: "https://res.cloudinary.com/dozcr36tf/image/upload/v1750452171/x94nzdahfc7ujffilk2z.png",
      start_time: "2025-07-21T00:00:00",
      external_link: "https://www.gscommunity.org/ve-du-an",
      system_status: "ACT",
    },
    {
      id: "cc88f0f4-a2a8-48a9-abb0-294b29b37905",
      name: "Beyond Wealth Advisors – Nền tảng tư vấn tài chính cá nhân hóa dành cho người Việt hiện đại",
      description:
        "Đây là một ví dụ chi tiết về dự án tư vấn tài chính cá nhân hóa, giúp người Việt Nam quản lý tài chính hiệu quả và đầu tư thông minh.",
      summary: "Nền tảng tư vấn tài chính cá nhân hóa dành cho người Việt hiện đại",
      tags: ["AWS", "FinTech"],
      image_url: "https://res.cloudinary.com/dozcr36tf/image/upload/v1750338285/d9p4zpxoyhbrfyldstke.jpg",
      start_time: "2025-06-20T00:00:00",
      external_link: "https://github.com/Three-Pog-Men/Viecdauviecdo.git",
      system_status: "ACT",
    },
    {
      id: "ede63b36-c3ad-4a4e-a12f-b46076aa82c8",
      name: "Roomify",
      description:
        "Ứng dụng kết nối và chia sẻ không gian sống, giúp người dùng tìm kiếm phòng trọ, căn hộ phù hợp với nhu cầu và ngân sách của mình.",
      summary: "Application to video with your little three",
      tags: ["Mobile App", "Real Estate", "Social"],
      image_url: "https://res.cloudinary.com/dozcr36tf/image/upload/v1750006840/a4kx4zng1q1y6hgopnet.webp",
      start_time: "2025-07-04T00:00:00",
      external_link: "",
      system_status: "ACT",
    },
    {
      id: "6d14ac3a-5120-4226-b98f-26a5629b4c4a",
      name: "Tinh tú trên cao",
      description:
        "Dự án giải trí và sáng tạo nội dung, mang đến những trải nghiệm thú vị và độc đáo cho cộng đồng yêu thích nghệ thuật và âm nhạc.",
      summary: "Dự án sáng tạo nội dung và giải trí",
      tags: ["Entertainment", "Event Managing", "Creative"],
      image_url: "https://res.cloudinary.com/dozcr36tf/image/upload/v1750002788/qi8ma8vtxo8fbvluf91v.png",
      start_time: "2025-10-14T00:00:00",
      external_link: "https://www.youtube.com/channel/UCKc18bwjx8AefQvMyzWOpEQ",
      system_status: "ACT",
    },
  ])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const navigate = useNavigate()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 font-vietnam" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 font-vietnam">
            Dự án nổi bật
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-vietnam">
            Khám phá các cơ hội dự án hấp dẫn từ cộng đồng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image_url || "/placeholder.svg?height=200&width=400"}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium font-vietnam"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium font-vietnam">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 font-vietnam">{project.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium mb-3 font-vietnam">
                    📅 Bắt đầu: {formatDate(project.start_time)}
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 text-sm font-vietnam">
                  {truncateText(project.summary, 120)}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium font-vietnam"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 text-sm font-vietnam">
                    Tham gia dự án
                  </button>
                  {project.external_link && (
                    <a
                      href={project.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-sm flex items-center justify-center"
                    >
                      🔗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/job")}
            className="bg-transparent hover:bg-indigo-600 text-indigo-600 hover:text-white font-semibold py-4 px-8 border-2 border-indigo-600 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 font-vietnam"
          >
            Xem tất cả dự án
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
