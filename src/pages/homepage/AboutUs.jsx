import { InfiniteMovingCardsDemo } from "@/components/ReviewMovingCard"
import TeamMembersCarousel from "@/components/TeamMemberCarousel"
import { ChevronLeft, ChevronRight, Globe, MessageCircle, Smile, Target, User, Users, Sparkles, ArrowRight, Building, Award, Zap } from 'lucide-react'
import { motion } from "framer-motion"

const About = () => {
  const stats = [
    {
      value: "100+",
      label: "Người Dùng Toàn Cầu",
      icon: <Users className="w-10 h-10 text-white" />,
      gradient: "from-blue-500 to-indigo-600",
      delay: 0.1,
    },
    {
      value: "95%",
      label: "Khách Hàng Hài Lòng",
      icon: <Smile className="w-10 h-10 text-white" />,
      gradient: "from-purple-500 to-indigo-600",
      delay: 0.2,
    },
    {
      value: "10+",
      label: "Chuyên Gia Tài Năng",
      icon: <User className="w-10 h-10 text-white" />,
      gradient: "from-indigo-500 to-blue-600",
      delay: 0.3,
    },
    {
      value: "1",
      label: "Văn Phòng",
      icon: <Globe className="w-10 h-10 text-white" />,
      gradient: "from-violet-500 to-purple-600",
      delay: 0.4,
    },
  ]

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    }),
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-600" />,
      title: "Giải Pháp Sáng Tạo",
      description: "Chúng tôi phát triển các giải pháp đột phá giúp doanh nghiệp tăng trưởng nhanh chóng.",
    },
    {
      icon: <Building className="w-6 h-6 text-indigo-600" />,
      title: "Đội Ngũ Chuyên Nghiệp",
      description: "Đội ngũ chuyên gia giàu kinh nghiệm luôn sẵn sàng hỗ trợ mọi nhu cầu của bạn.",
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      title: "Chất Lượng Hàng Đầu",
      description: "Cam kết mang đến dịch vụ chất lượng cao nhất với sự hài lòng của khách hàng là ưu tiên hàng đầu.",
    },
  ]

  return (
    <main className="w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-70 blur-3xl"></div>
      </div>

      <div className="relative px-4 py-20 mx-auto max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={0}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-6">
            <Target className="w-6 h-6 mr-2 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-800">Về Chúng Tôi</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent leading-tight">
            Kiến Tạo Tương Lai
            <br />
            <span className="text-4xl md:text-5xl">Công Nghệ & Sáng Tạo</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            Chúng tôi đang thực hiện sứ mệnh thay đổi cách mọi người làm việc và sáng tạo. Nền tảng của chúng tôi giúp
            các đội nhóm phát huy tối đa tiềm năng thông qua các giải pháp sáng tạo và hợp tác liền mạch.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#team"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              Gặp Đội Ngũ Của Chúng Tôi
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-indigo-600 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100"
            >
              Tìm Hiểu Thêm
            </a>
          </div>
        </motion.div>

        {/* Features Section */}
        <div id="features" className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Điều Gì Làm Chúng Tôi Khác Biệt</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi kết hợp công nghệ tiên tiến với chuyên môn sâu rộng để mang đến những giải pháp tốt nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                custom={index * 0.1}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-indigo-50"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Con Số Ấn Tượng</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những thành tựu đáng tự hào mà chúng tôi đã đạt được trong hành trình phát triển.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                custom={stat.delay}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative overflow-hidden rounded-2xl shadow-xl group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} transition-all duration-300 group-hover:scale-105`}
                ></div>
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-white/90 uppercase tracking-wider">{stat.label}</div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership Team Section */}
        <div id="team" className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-6">
              <Users className="w-6 h-6 mr-2 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800">Đội Ngũ Lãnh Đạo</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Những Người Dẫn Dắt Chúng Tôi</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Đội ngũ lãnh đạo giàu kinh nghiệm với tầm nhìn chiến lược, luôn tiên phong trong việc thúc đẩy đổi mới và
              nâng cao chất lượng dịch vụ.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-indigo-50">
            <TeamMembersCarousel />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-24">
          {/* <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-6">
              <MessageCircle className="w-6 h-6 mr-2 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800">Khách Hàng Nói Gì</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Phản Hồi Từ Khách Hàng</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những đánh giá chân thực từ khách hàng đã và đang sử dụng dịch vụ của chúng tôi.
            </p>
          </div> */}

          {/* <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent pointer-events-none w-20 z-10 left-0"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none w-20 z-10 right-0"></div>
            <InfiniteMovingCardsDemo />
          </div> */}
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          custom={0}
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23FFFFFF&quot; fillOpacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6 text-white">Sẵn Sàng Bắt Đầu Hành Trình?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Hãy liên hệ với chúng tôi ngay hôm nay để khám phá cách chúng tôi có thể giúp bạn đạt được mục tiêu.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
              >
                Liên Hệ Ngay
              </a>
              <a
                href="/demo"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded-full border border-white/30 transition-all duration-300"
              >
                Xem Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl flex items-center shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
          <MessageCircle className="w-6 h-6 mr-2 group-hover:animate-pulse" />
          <span className="font-medium">Hỗ Trợ Trực Tuyến</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl animate-ping opacity-20"></div>
        </button>
      </div>

      <div className="fixed bottom-6 left-6 flex items-center space-x-3 z-50">
        <button className="group p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white">
          <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
        </button>
        <button className="group p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white">
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
        </button>
      </div>
    </main>
  )
}

export default About
