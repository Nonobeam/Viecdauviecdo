"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { getProjectByUserId } from "@/utils/projectAPI";
import { ExternalLink, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinedProjects = () => {
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchJoinedProjects = async (pageNum = 0, reset = false) => {
    try {
      const data = await getProjectByUserId(user.user_id, "MEMBER", pageNum, pageSize);
      setJoinedProjects(data.data.content);
      setLoading(false);
      setError(null)
      if (reset) {
        setJoinedProjects(data.data.content);
      } else {
        setJoinedProjects((prev) => [...prev, ...data.data.content]);
      }

      // Check if we have more data to load
      setHasMore(data.data.content.length === pageSize);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách dự án");
      console.error("Lỗi khi tải danh sách dự án:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchProjects(nextPage, false)
    }
  }

  useEffect(() => {
    fetchJoinedProjects(0, true);
    setPage(0);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/project/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (joinedProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
          <Users className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Chưa tham gia dự án nào
        </h3>
        <p className="text-gray-500 mb-4">
          Tham gia các dự án để hợp tác với những người khác
        </p>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
          Khám phá dự án
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {joinedProjects.map((project) => (
        <div
          key={project.id}
          className="group hover:shadow-2xl transition-all duration-300 shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-100"
          onClick={() => handleCardClick(project.id)}
        >
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
            <img
              src={project.image_url || "/placeholder.svg"}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition-colors">
                {project.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-purple-600"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {project.description}
            </p>

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Badge
                variant="outline"
                className={`border-green-200 text-green-700 bg-green-50 ${
                  project.system_status === "ACT"
                    ? "border-blue-200 text-blue-700 bg-blue-50"
                    : ""
                }`}
              >
                {project.system_status === "ACT"
                  ? "Đang hoạt động"
                  : project.system_status}
              </Badge>
            </div>
          </div>
        </div>
      ))}

      {/* Load More Button */}
      {hasMore && projects.length > 0 && (
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
              <span>Xem thêm dự án</span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default JoinedProjects;
