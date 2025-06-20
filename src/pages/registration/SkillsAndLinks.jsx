import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/providers/AuthContext";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Plus,
  X,
  Award,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "https://backend.matchlent.xyz/api/user-info";

const SkillsAndLinks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const { userInformation, isRegistration } = location.state || {};

  // Skills state
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  // Form status
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");

    try {
      const token = user?.token || localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Không tìm thấy token xác thực");
      }

      const response = await fetch(`${API_URL}/${user.user_id}/skills`, {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: skills,
        }),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => {
          if (isRegistration) {
            navigate("/profile", {
              state: {
                registrationComplete: true,
                message:
                  "Chào mừng bạn đến với Matchlent! Hồ sơ của bạn đã được thiết lập thành công.",
              },
            });
          } else {
            navigate("/profile");
          }
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
    } catch (err) {
      console.error("Error updating skills:", err);
      setSaveError(err.message || "Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkipStep = async () => {
    if (isRegistration) {
      navigate("/profile", {
        state: {
          registrationComplete: true,
          message:
            "Chào mừng bạn đến với Matchlent! Bạn có thể thêm kỹ năng và liên kết sau.",
        },
      });
    } else {
      navigate("/profile");
    }
  };

  const handleBack = () => {
    navigate("/registration/change-information", {
      state: {
        userInformation,
        isRegistration: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-2xl mx-auto -mt-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-600">
              Bước 2 của 2
            </span>
            <span className="text-sm text-gray-500">Kỹ năng & Liên kết</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full w-full"></div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2 mb-4 hover:bg-purple-50 border-purple-200 text-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại bước trước
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Kỹ năng & Liên kết
          </h1>
          <p className="text-gray-600 mt-2">
            Thêm kỹ năng và các liên kết quan trọng để hoàn thiện hồ sơ của bạn.
          </p>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 animate-pulse">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-sm text-red-800">{saveError}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-pulse">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-sm text-green-800">
                Hồ sơ đã được thiết lập thành công! Đang chuyển hướng...
              </p>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-8">
          {/* Skills Section */}
          <div className="border-b border-purple-100 pb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="h-5 w-5 text-purple-600 mr-2" />
              Kỹ năng
            </h2>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Nhập kỹ năng (React, Node.js, Python, v.v.)"
                  className="flex-1 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                />
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Thêm
                </Button>
              </div>

              {/* Skills List */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 hover:from-purple-200 hover:to-blue-200 transition-colors"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:bg-purple-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Thêm các kỹ năng kỹ thuật, ngôn ngữ lập trình, framework, hoặc
                công cụ mà bạn thành thạo.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={isSaving || saveSuccess}
          >
            {isSaving
              ? "Đang hoàn tất..."
              : saveSuccess
              ? "Hoàn tất!"
              : "Hoàn tất thiết lập"}
          </Button>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            disabled={isSaving}
            onClick={handleSkipStep}
          >
            Bỏ qua bước này
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillsAndLinks;
