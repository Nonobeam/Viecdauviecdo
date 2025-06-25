import TeamMembersCarousel from "../TeamMemberCarousel"

const AboutSection = () => {
  const stats = [
    {
      value: "500+",
      label: "Dự án sáng tạo",
      icon: "🚀",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      value: "2,000+",
      label: "Thành viên tham gia",
      icon: "👥",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      value: "95%",
      label: "Tỷ lệ hoàn thành",
      icon: "⭐",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      value: "20+",
      label: "Lĩnh vực đa dạng",
      icon: "💼",
      gradient: "from-violet-500 to-purple-600",
    },
  ]

  const features = [
    {
      icon: "⚡",
      title: "Giải Pháp Sáng Tạo",
      description: "Chúng tôi phát triển các giải pháp đột phá giúp dự án tăng trưởng nhanh chóng.",
    },
    {
      icon: "🏢",
      title: "Người Dùng Năng Động",
      description: "Những người dùng với đa dạng kỹ năng đến từ mọi miền tổ quốc.",
    },
    {
      icon: "🏆",
      title: "Chất Lượng Hàng Đầu",
      description: "Cam kết mang đến dịch vụ chất lượng cao nhất với sự hài lòng của người dùng là ưu tiên hàng đầu.",
    },
  ]

  return (
    <section className="w-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-vietnam" id="about">
      {/* Background Elements */}
      <div className="inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-70 blur-3xl"></div>
      </div>

      <div className="relative px-4 py-20 mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-8">
            <span className="text-2xl mr-2">🎯</span>
            <span className="text-sm font-semibold text-indigo-800 font-vietnam">Về Chúng Tôi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent leading-tight font-vietnam">
            Kiến Tạo Tương Lai
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl">Công Nghệ & Sáng Tạo</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10 font-vietnam">
            Chúng tôi đang thực hiện sứ mệnh thay đổi cách mọi người làm việc và sáng tạo. Nền tảng của chúng tôi giúp
            các đội nhóm phát huy tối đa tiềm năng thông qua các giải pháp sáng tạo và hợp tác liền mạch.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900 font-vietnam">
              Điều Gì Làm Chúng Tôi Khác Biệt
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-vietnam">
              Chúng tôi kết hợp công nghệ tiên tiến với chuyên môn sâu rộng để mang đến những giải pháp tốt nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-50 transform hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 font-vietnam">{feature.title}</h3>
                <p className="text-gray-600 font-vietnam">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900 font-vietnam">Con Số Ấn Tượng</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-vietnam">
              Những thành tựu đáng tự hào mà chúng tôi đã đạt được trong hành trình phát triển.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl shadow-xl group hover:-translate-y-3 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} transition-all duration-300 group-hover:scale-105`}
                ></div>
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 text-2xl">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black mb-2 text-white font-vietnam">{stat.value}</div>
                  <div className="text-sm font-semibold text-white/90 uppercase tracking-wider font-vietnam">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-8">
              <span className="text-2xl mr-2">👥</span>
              <span className="text-sm font-semibold text-indigo-800 font-vietnam">Đội Ngũ Lãnh Đạo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900 font-vietnam">
              Những Người Dẫn Dắt Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 font-vietnam">
              Đội ngũ lãnh đạo giàu kinh nghiệm với tầm nhìn chiến lược, luôn tiên phong trong việc thúc đẩy đổi mới và
              nâng cao chất lượng dịch vụ.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-indigo-50">
            <TeamMembersCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
