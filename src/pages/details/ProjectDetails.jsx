import Loader from "@/components/Loader";
import TabList from "@/components/TabList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import {
  addProjectMember,
  getProjectById,
  getProjectMembers,
} from "@/utils/projectAPI";
import { ArrowLeft, Github, Globe, Loader2, Mail, Tag } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Tab Components
const Overview = ({ project }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-purple-100 p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Tổng quan dự án
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {project.summary || "Không có mô tả cho dự án này."}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ProjectDetailsTab = ({ project }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-purple-100 p-8 shadow-lg">
      <h2 className="text-2xm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
        Chi tiết dự án
      </h2>
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 leading-relaxed">
            {project.description || "Thông tin chi tiết sẽ được cập nhật sớm."}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Yêu cầu kỹ năng</h3>
          <div className="flex flex-wrap gap-2">{renderTags(project.tags)}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
            <Globe className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Trạng thái</p>
            <p className="text-green-600 font-medium">Đang hoạt động</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Members = ({ project }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  // Fetch project members
  const fetchMembers = async (pageNum = 0, reset = false) => {
    try {
      const memberData = await getProjectMembers(id, pageNum, pageSize);
      if (reset) {
        setMembers(memberData.data.content);
      } else {
        setMembers((prev) => [...prev, ...memberData.data.content]);
      }

      setHasMore(memberData.data.content.length === pageSize);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch members:", error);
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMembers(nextPage, false);
    }
  };

  useEffect(() => {
    fetchMembers(0, true);
    setPage(0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-purple-100 p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Thành viên dự án
          </h2>
          <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0">
            {members.length} thành viên
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member) => (
            <div
              key={member.email}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-purple-100">
                  <AvatarImage src={member.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                    N/A
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {member.user_information.full_name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Load More Button */}
        {hasMore && members.length > 0 && (
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
                <span>Xem thêm thành viên</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Contact = ({ project }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-purple-100 p-8 shadow-lg">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
        Thông tin liên hệ
      </h2>
      <div className="space-y-6">
        <p className="text-gray-700 text-lg">
          Để tham gia dự án này, vui lòng liên hệ với đội ngũ phát triển.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Liên hệ trực tiếp
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">project@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">github.com/project-repo</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Hành động</h3>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Gửi email
              </Button>
              <Button
                variant="outline"
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Github className="w-4 h-4 mr-2" />
                Xem GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Helper function
const renderTags = (tags) => {
  if (!tags) return null;

  const tagArray = Array.isArray(tags)
    ? tags
    : tags.split(",").map((t) => t.trim());

  return tagArray.map((tag, index) => (
    <Badge
      key={index}
      className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 font-medium"
    >
      <Tag className="w-3 h-3 mr-1" />
      {tag}
    </Badge>
  ));
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  //For getting Owner information
  const [isUserMember, setIsUserMember] = useState(false);
  const [checkingMembership, setCheckingMembership] = useState(true);

  // Tab configuration
  const tabs = ["overview", "details", "members", "contact"];
  const labels = {
    overview: "Tổng quan",
    details: "Chi tiết dự án",
    members: "Thành viên",
    contact: "Liên hệ",
  };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const fetchProject = async (projectId) => {
    try {
      setLoading(true);
      const data = await getProjectById(projectId);
      setProject(data.data);
    } catch (err) {
      setError("Failed to fetch project details");
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "P";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const checkUserMembership = async (email) => {
    console.log(email)
    if (email ==null) {
      setCheckingMembership(false);
      return;
    }

    try {
      // Fetch first page of members to check if user is already a member
      const memberData = await getProjectMembers(id, 0, 100); // Get more members in first call
      const members = memberData.data.content;

      const isMember = members.some((member) => member.email === email);
      console.log(isMember)

      setIsUserMember(isMember);
    } catch (error) {
      console.error("Failed to check membership:", error);
    } finally {
      setCheckingMembership(false);
    }
  };

  const applyProject = async () => {
    try {
      const payload = {
        user_id: user.user_id,
        project_id: id,
        project_role: "MEMBER",
      };

      if (user != null) {
        addProjectMember(payload);
        alert("Joined successfully");
      } else {
        console.log("User was not fetch");
      }
      console.log("Success");
    } catch (error) {
      console.error("Something is wrong with the applying process", error);
    }
  };

    useEffect(() => {
    if (id && user?.user_id) {
      fetchProject(id);
      checkUserMembership(user.sub);
    }
  }, [id,user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-purple-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-medium">Đang tải thông tin dự án...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Không tìm thấy dự án
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "Dự án bạn đang tìm kiếm không tồn tại."}
          </p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={() => window.history.back()}
          >
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại trang chủ</span>
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex gap-6 flex-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur"></div>
                <Avatar className="relative h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl font-bold">
                    {getInitials(project.name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-white">
                    {project.name || "Dự án không có tên"}
                  </h1>
                  <Badge className="bg-green-500/20 text-green-100 border-green-400/30">
                    Đang hoạt động
                  </Badge>
                </div>
                <p className="text-xl text-white/90 mb-4 leading-relaxed">
                  {project.description || "Không có mô tả"}
                </p>
                {/* {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.split(",").map((tag, index) => (
                      <Badge key={index} className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                )} */}
              </div>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Mail className="w-4 h-4" />
                Liên hệ nhóm
              </Button>
              {!isUserMember && user && (
                <Button
                  onClick={applyProject}
                  className="flex items-center gap-2 bg-black border-black text-white hover:bg-black/80 backdrop-blur-sm"
                >
                  Tham gia dự án
                </Button>
              )}
              {isUserMember && (
                <Badge className="flex items-center gap-2 bg-green-500/20 text-green-100 border-green-400/30 px-4 py-2">
                  Đã tham gia
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <main className="flex-1 flex flex-col">
          <TabList
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            labels={labels}
          />
          <div className="flex-1 overflow-y-auto">
            <Suspense fallback={<Loader />}>
              {activeTab === "overview" && <Overview project={project} />}
              {activeTab === "details" && (
                <ProjectDetailsTab project={project} />
              )}
              {activeTab === "members" && <Members project={project} />}
              {activeTab === "contact" && <Contact project={project} />}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetails;
