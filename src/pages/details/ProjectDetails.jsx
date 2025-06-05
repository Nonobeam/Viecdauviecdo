import ConfettiButton from "@/components/ConfettiButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { getProjectById } from "@/utils/projectAPI";
import { Badge, Loader2, Mail, Tag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const renderTags = (tags) => {
    if (!tags) return null;

    // Handle if tags is a string (comma-separated) or array
    const tagArray = Array.isArray(tags)
      ? tags
      : tags.split(",").map((t) => t.trim());

    return tagArray.map((tag, index) => (
      <Badge
        key={index}
        variant="secondary"
        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
      >
        <Tag className="w-3 h-3 mr-1" />
        {tag}
      </Badge>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading project details...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Project Not Found
          </h2>
          <p className="text-slate-600">
            {error || "The project you are looking for does not exist."}
          </p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading project details...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Project Not Found
          </h2>
          <p className="text-slate-600">
            {error || "The project you are looking for does not exist."}
          </p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex gap-4 flex-1">
              <Avatar className="h-16 w-16 border-2 border-slate-200">
                <AvatarImage
                  src={project.image_url || "/placeholder.svg"}
                  alt={project.name}
                />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                  {getInitials(project.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {project.name || "Untitled Project"}
                  </h1>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Active
                  </Badge>
                </div>
                <p className="text-lg text-slate-600 mb-3">
                  {project.description || "No description available"}
                </p>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {renderTags(project.tags)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Team
              </Button>
              <ConfettiButton
                name="Apply to Join"
                href="/"
                description="Apply successful, we will redirect you back to home page."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">   Project Details</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <div value="overview" className="space-y-8">
            <section className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  About This Project
                </h2>
                <p className="text-slate-600 text-sm">
                  Project information and details
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {project.description ||
                      "No detailed description available for this project."}
                  </p>
                </div>

                {project.tags && (
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">
                      Technologies & Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {renderTags(project.tags)}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetails;
