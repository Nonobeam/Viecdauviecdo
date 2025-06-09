import { ROUTES } from "@/config"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, FileText } from 'lucide-react'
import { useNavigate } from "react-router-dom"

const Seeking = () => {
    const navigate = useNavigate()

    const cardVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
                        Bạn Muốn Đăng Gì?
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Chọn loại nội dung bạn muốn đăng để kết nối với cộng đồng chuyên gia và nhà tuyển dụng
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Job Posting Card */}
                    <motion.button 
                        className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100 text-left transition-all duration-300 relative overflow-hidden group"
                        onClick={() => navigate(ROUTES.postJob)}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6">
                                <Briefcase className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                                Tìm kiếm việc làm
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Tìm kiếm việc làm mơ ước của mình tại đây
                            </p>
                            <div className="flex items-center text-indigo-600 font-medium">
                                <span>Đăng ngay</span>
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.button>

                    {/* Project Posting Card */}
                    <motion.button 
                        className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100 text-left transition-all duration-300 relative overflow-hidden group"
                        onClick={() => navigate(ROUTES.postProject)}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: 0.1 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
                                <FileText className="h-8 w-8 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                                Tìm kiếm dự án
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Tìm và tham gia các dự án để nâng trình độ bản thân
                            </p>
                            <div className="flex items-center text-purple-600 font-medium">
                                <span>Đăng ngay</span>
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default Seeking
