import { TalentCard } from "@/components/items/TalentCard";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/utils/userApi";
import { Loader, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Talent({ filters }) {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 9;

  const fetchTalents = async (pageNum = 0, reset = false) => {
    try {
      setLoading(true);
      const data = await getAllUsers({
        page: pageNum,
        size: pageSize,
        city: filters.city.length ? filters.city : undefined,
        state: filters.state.length ? filters.state : undefined,
        country: filters.country.length ? filters.country : undefined,
        dateOfBirth: filters.dateOfBirth || undefined,
        skill: filters.skill.length ? filters.skill : undefined,
        certification: filters.certification.length
          ? filters.certification
          : undefined,
      });


      if (reset) {
        setTalents(data.data.content);
      } else {
        setTalents((prev) => [...prev, ...data.data.content]);
      }

      setHasMore(data.data.content.length === pageSize);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách thành viên");
      console.error("Lỗi khi tải danh sách thành viên:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTalents(nextPage, false);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchTalents(0, true);
    // We join arrays into strings to avoid deep‐compare issues
  }, [
    filters.city.join(","),
    filters.state.join(","),
    filters.country.join(","),
    filters.dateOfBirth,
    filters.skill.join(","),
    filters.certification.join(","),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {loading && talents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">
              Đang tải danh sách thành viên...
            </p>
          </div>
        ) : !loading && talents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
            <User className="w-16 h-16 text-indigo-300 mb-4" />
            <p className="text-lg text-gray-600 mb-4">
              {Object.values(filters).some((f) =>
                Array.isArray(f) ? f.length > 0 : f
              )
                ? "Không tìm thấy thành viên nào phù hợp với bộ lọc của bạn"
                : "Hiện tại chưa có thành viên nào"}
            </p>
            {Object.values(filters).some((f) =>
              Array.isArray(f) ? f.length > 0 : f
            ) && (
              <Button
                variant="outline"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                onClick={() => window.location.reload()}
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        ) : (
          <TalentCard cards={talents}/>
        )}

        {/* Load More Button */}
        {hasMore && talents.length > 0 && (
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
                <span>Xem thêm thành viên</span>
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
}
