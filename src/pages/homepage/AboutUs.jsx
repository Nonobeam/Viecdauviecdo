import { InfiniteMovingCardsDemo } from "@/components/ReviewMovingCard"
import TeamMembersCarousel from "@/components/TeamMemberCarousel"
import { ChevronLeft, ChevronRight, Globe, Smile, Sparkles, Target, User, Users } from "lucide-react"

const About = () => {
  const stats = [
    {
      value: "10M+",
      label: "Users Worldwide",
      icon: <Users className="w-8 h-8 text-white" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      value: "95%",
      label: "Client Satisfaction",
      icon: <Smile className="w-8 h-8 text-white" />,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      value: "150+",
      label: "Team Members",
      icon: <User className="w-8 h-8 text-white" />,
      gradient: "from-purple-600 to-pink-500",
    },
    {
      value: "8",
      label: "Global Offices",
      icon: <Globe className="w-8 h-8 text-white" />,
      gradient: "from-indigo-600 to-blue-500",
    },
  ]

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10"></div>
        <div className="relative px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We're on a mission to transform how people work and create. Our platform empowers teams to achieve their
              full potential through innovative solutions and seamless collaboration.
            </p>
            <div className="flex items-center justify-center mt-8">
              <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-purple-600 font-medium">Trusted by millions worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative group p-8 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-sm text-white/90 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="px-4 py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-6">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Our Leadership Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the visionaries and innovators who drive our mission forward every day.
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <TeamMembersCarousel />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why millions of users trust us with their most important work.
            </p>
          </div>
          <InfiniteMovingCardsDemo />
        </div>
      </div>

      {/* Mission Statement */}
      <div className="px-4 py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            To democratize innovation and empower every team to build the future they envision. We believe that great
            ideas can come from anywhere, and our platform ensures they have the tools to flourish.
          </p>
        </div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <button className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default About
