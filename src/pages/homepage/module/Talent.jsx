import { TalentCard } from "@/components/items/TalentCard";
import ChatbotButton from "@/components/ui/chatbotButton";
import { getAllUsers } from "@/utils/userApi";
import { useEffect, useState } from "react";

export default function Talent({ filters }) {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

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

      const filteredData = data.data.content.filter(
        (user) => user.role === "TALENT"
      );

      if (reset) {
        setTalents(filteredData);
      } else {
        setTalents((prev) => [...prev, ...items]);
      }

      setHasMore(data.length === pageSize);
      setError(null);
    } catch (err) {
      setError("Failed to fetch talents");
      console.error("Error fetching talents:", err);
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
    <div className="h-full overflow-auto p-4">
      <TalentCard cards={talents} />

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Đang tải...
              </>
            ) : (
              "Tải thêm"
            )}
          </button>
        </div>
      )}

      {/* Error message for load more */}
      {error && talents.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <ChatbotButton />
    </div>
  );
}
