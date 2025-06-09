import { Button } from "@/components/ui/button";
import { getAllCompanies } from "@/utils/companyApi";
import { motion } from "framer-motion";
import { Briefcase, Building, MapPin, Search, Users } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const navigate = useNavigate();

  const fetchCompanies = async (pageNum = 0, reset = false) => {
    try {
      setLoading(true);
      const data = await getAllCompanies(pageNum, pageSize);

      if (reset) {
        setCompanies(data.data.content);
      } else {
        setCompanies((prev) => [...prev, ...data.data.content]);
      }

      // Check if we have more data to load
      setHasMore(data.data.content.length === pageSize);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách công ty");
      console.error("Lỗi khi tải danh sách công ty:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCompanies(nextPage, false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/company/${id}`);
  };

  useEffect(() => {
    fetchCompanies(0, true);
    setPage(0);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
            Danh Sách Công Ty
          </h1>
          <p className="text-gray-600">
            Khám phá và kết nối với các công ty hàng đầu trong lĩnh vực của bạn
          </p>
        </div>

        {loading && companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Đang tải danh sách công ty...</p>
          </div>
        ) : !loading && companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
            <Building className="w-16 h-16 text-indigo-300 mb-4" />
            <p className="text-lg text-gray-600 mb-4">Hiện tại chưa có công ty nào</p>
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              onClick={() => navigate("/register-company")}
            >
              Đăng ký công ty của bạn
            </Button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {companies.map((company) => (
              <motion.div
                key={company.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 flex flex-col h-full group cursor-pointer"
                onClick={() => handleCardClick(company.id)}
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-[16/9] bg-gradient-to-r from-indigo-100 to-purple-100 overflow-hidden">
                  {company.image ? (
                    <img
                      src={company.image || "/placeholder.svg"}
                      alt={company.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building className="w-16 h-16 text-indigo-300" />
                    </div>
                  )}
                </div>

                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors">
                    {company.name}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {company.location}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        Quy mô: {company.company_size}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {company.industry || "Công nghệ thông tin"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {company.about || "Công ty chuyên về các giải pháp công nghệ và phát triển phần mềm hàng đầu."}
                  </p>
                </div>

                <div className="px-6 py-4 border-t border-indigo-50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-indigo-600 font-medium">
                      {company.job_count || "5"} vị trí đang tuyển
                    </span>
                    <div className="flex items-center text-indigo-600 font-medium text-sm">
                      <span>Xem chi tiết</span>
                      <Search className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {hasMore && companies.length > 0 && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={loadMore}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-2 h-auto rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  <span>Đang tải...</span>
                </div>
              ) : (
                <span>Xem thêm công ty</span>
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
      </div>
    </div>
  );
};

export default Company;
