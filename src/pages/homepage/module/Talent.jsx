import { TalentCard } from "@/components/items/TalentCard";
import { getAllUsers } from "@/utils/userApi";
import { useEffect, useState } from "react";

const Talent = () => {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  // Filter states
  const [filterCity, setFilterCity] = useState([]);
  const [filterState, setFilterState] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterDateOfBirth, setFilterDateOfBirth] = useState(null);
  const [filterSkill, setFilterSkill] = useState([]);
  const [filterCertification, setFilterCertification] = useState([]);

  const fetchTalents = async (pageNum = 0, reset = false) => {
    try {
      setLoading(true);
      const data = await getAllUsers({
        page: pageNum,
        size: pageSize,
        city: filterCity.length ? filterCity : undefined,
        state: filterState.length ? filterState : undefined,
        country: filterCountry.length ? filterCountry : undefined,
        dateOfBirth: filterDateOfBirth || undefined,
        skill: filterSkill.length ? filterSkill : undefined,
        certification: filterCertification.length
          ? filterCertification
          : undefined,
      });

      const filteredData = data.data.content.filter(
        (user) => user.role === "TALENT"
      );

      if (reset) {
        setTalents(filteredData);
      } else {
        setTalents((prev) => [...prev, ...data]);
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
    fetchTalents(0, true);
    setPage(0);
  }, []);

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

    </div>
  );
};

export default Talent;
