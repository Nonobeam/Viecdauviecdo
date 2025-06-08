import Loader from "@/components/Loader";
import TabList from "@/components/TabList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { addProjectMember, getProjectById } from "@/utils/projectAPI";
import { ArrowLeft, Github, Globe, Loader2, Mail, Tag } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Tab Components
const Overview = ({ project }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-purple-100 p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Về dự án này
        </h2>
        <p className="text-gray-600">Thông tin và chi tiết dự án</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">
            {project.name}
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {project.description || "Không có mô tả chi tiết cho dự án này."}
          </p>
        </div>

        {project.tags && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Tag className="h-5 w-5 text-purple-500" />
              Công nghệ & Kỹ năng
            </h4>
            <div className="flex flex-wrap gap-3">
              {renderTags(project.tags)}
            </div>
          </div>
        )}

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

const ProjectDetailsTab = ({ project }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl border border-purple-100 p-8 shadow-lg">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
        Chi tiết dự án
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Mô tả chi tiết</h3>
          <p className="text-gray-700 leading-relaxed">
            {project.description || "Thông tin chi tiết sẽ được cập nhật sớm."}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Yêu cầu kỹ năng</h3>
          <div className="flex flex-wrap gap-2">{renderTags(project.tags)}</div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Mục tiêu dự án</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Phát triển ứng dụng web hiện đại và responsive</li>
            <li>Tích hợp các công nghệ mới nhất</li>
            <li>Tối ưu hóa hiệu suất và trải nghiệm người dùng</li>
            <li>Đảm bảo bảo mật và khả năng mở rộng</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Members = ({ project }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch project members
    const fetchMembers = async () => {
      try {
        // Replace with actual API call
        // const response = await getProjectMembers(project.id)
        // setMembers(response.data)

        // Mock data for demonstration
        setMembers([
          {
            id: 1,
            name: "Nguyễn Văn A",
            role: "Project Manager",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "nguyenvana@email.com",
            joinedDate: "2024-01-15",
            skills: ["Leadership", "Agile", "Scrum"],
          },
          {
            id: 2,
            name: "Trần Thị B",
            role: "Frontend Developer",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "tranthib@email.com",
            joinedDate: "2024-01-20",
            skills: ["React", "TypeScript", "Tailwind CSS"],
          },
          {
            id: 3,
            name: "Lê Văn C",
            role: "Backend Developer",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "levanc@email.com",
            joinedDate: "2024-02-01",
            skills: ["Node.js", "PostgreSQL", "Docker"],
          },
          {
            id: 4,
            name: "Phạm Thị D",
            role: "UI/UX Designer",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "phamthid@email.com",
            joinedDate: "2024-02-10",
            skills: ["Figma", "Adobe XD", "User Research"],
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch members:", error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, [project.id]);

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
              key={member.id}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-purple-100">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Tham gia từ:{" "}
                  {new Date(member.joinedDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          ))}
        </div>
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

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const getInitials = (name) => {
    if (!name) return "P";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
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
            to="/projects"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại danh sách dự án</span>
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
              <Button
                onClick={applyProject}
                className="flex items-center gap-2 bg-black border-black text-white hover:bg-black/80 backdrop-blur-sm"
              >
                Tham gia dự án
              </Button>
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
