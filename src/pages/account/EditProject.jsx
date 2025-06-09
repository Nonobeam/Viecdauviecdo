import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProjectById, updateProject } from "@/utils/projectAPI";
import { Calendar, LinkIcon, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const [projectName, setProjectName] = useState("");
  const [overview, setOverview] = useState("");
  const [details, setDetails] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [startTime, setStartTime] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const formatDateToISOString = (dateOnly) => {
    return `${dateOnly}T00:00:00.000Z`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const IsoStartTime = formatDateToISOString(startTime);
    // Handle form submission here
    const projectData = {
      name: projectName,
      description: details,
      summary: overview,
      external_link: projectLink,
      start_at: IsoStartTime,
      user_id: user.user_id,
      tags,
    };

    console.log(projectData);
    const response = await updateProject(id, projectData);
  };

  const fetchProjectInformation = async (projectId) => {
    try {
      const fetchedProject = await getProjectById(projectId);
      const projectData = fetchedProject.data;
      console.log(projectData);
      const dateOnly = projectData.start_time.split("T")[0];

      setProjectName(projectData.name || "");
      setOverview(projectData.summary || "");
      setDetails(projectData.description || "");
      setProjectLink(projectData.external_link || "");
      setStartTime(dateOnly || "");
      setTags(projectData.tags || []);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchProjectInformation(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-3xl mx-auto -mt-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
        {/* Back Button */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Chỉnh sửa lại dự án
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Name */}
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tên Dự Án *
            </label>
            <Input
              id="projectName"
              placeholder="Nhập tên dự án"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          {/* Project Overview */}
          <div>
            <label
              htmlFor="overview"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tổng quan dự án *
            </label>
            <Textarea
              id="overview"
              placeholder="Mô tả ngắn gọn về dự án của bạn (2-3 câu)"
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="resize-none border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          {/* Project Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chi tiết dự án *
            </label>
            <Textarea
              id="details"
              placeholder="Mô tả chi tiết về dự án, mục tiêu, tính năng chính, yêu cầu kỹ thuật..."
              rows={6}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="resize-none border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              required
            />
          </div>

          {/* Project Link and Start Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="projectLink"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Link dự án
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-purple-500" />
                </div>
                <Input
                  id="projectLink"
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  className="pl-10 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Thời gian bắt đầu *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
                <Input
                  id="startTime"
                  type="date"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  min={new Date().toISOString().split("T")[0]} // Prevents selecting past dates
                  className="pl-10 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Công nghệ & Kỹ năng
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                id="tags"
                placeholder="Thêm thẻ mới (React, Node.js, Python, v.v.)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
              >
                <Plus className="h-4 w-4 mr-1" />
                Thêm
              </Button>
            </div>

            {/* Tag List */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 hover:from-purple-200 hover:to-blue-200 transition-colors"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveTag(tag);
                      }}
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
            >
              Sửa dự án
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
              onClick={() => navigate(-1)}
            >
              Hủy bỏ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
