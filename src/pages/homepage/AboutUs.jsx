import AboutSection from "@/components/aboutus/AboutSection"
import FeaturedProjects from "@/components/aboutus/FeaturedProjects"
import SearchSection from "@/components/aboutus/SearchSection"
import TeamMembersCarousel from "@/components/TeamMemberCarousel"
import { motion } from "framer-motion"
import { ArrowRight, Award, Building, ChevronLeft, ChevronRight, Globe, MessageCircle, Smile, Sparkles, Target, User, Users, Zap } from 'lucide-react'

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
    <div>
      <AboutSection />
      <SearchSection />
      <FeaturedProjects />
    </div>
  )
}

export default About
