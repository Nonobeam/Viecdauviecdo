import BentoGridDemo from "@/components/BentoGridLayout";
import { getAllProjects } from "@/utils/projectAPI";
import { useEffect, useState } from "react";
// import {
//   IconBuildingBank,
//   IconBrain,
//   IconChartBar,
//   IconHeartbeat,
// } from "@tabler/icons-react";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const fetchProjects = async (pageNum = 0, reset = false) => {
    try {
      setLoading(true);
      const data = await getAllProjects(pageNum, pageSize);
      
      if (reset) {
        setProjects(data.data.content);
      } else {
        setProjects(prev => [...prev, ...data]);
      }
      
      // Check if we have more data to load
      setHasMore(data.length === pageSize);
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProjects(nextPage, false);
    }
  };
  
  useEffect(() => {
    fetchProjects(0, true);
    setPage(0);
  }, []);

  return (
    <div className="h-full overflow-auto p-4">
      <BentoGridDemo items={projects} />
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
      {error && projects.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

    </div>
  );
};

export default Project;
