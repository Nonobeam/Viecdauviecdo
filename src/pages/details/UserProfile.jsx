"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  MapPin,
  Mail,
  Phone,
  Plus,
  X,
  Award,
  Loader2,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useTokenExpiration } from "@/hooks/useTokenExpiration";
import { useNavigate, Link } from "react-router-dom";
import {
  uploadAvatar,
  getUserById,
  deleteSkill,
  addSkill,
  updateSkill,
} from "@/utils/userApi";
import ProfileImagePopup from "@/components/Profile/ProfileImagePopup";
import TokenExpirationWarning from "@/components/Profile/TokenExpirationWarning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AlertCircle } from "lucide-react";
import TabList from "@/components/TabList";

// Lazy load project components (from your original code)
const CV = lazy(() => import("@/pages/details/module/CV"));
const UserProjects = lazy(() => import("@/pages/details/module/UserProjects"));
const JoinedProjects = lazy(() =>
  import("@/pages/details/module/JoinedProjects")
);

// Project Tabs Component (from your original code)
const ProjectTabs = () => {
  const tabs = ["userProjects", "joinedProjects"];
  const labels = {
    userProjects: "Dự án của mình",
    joinedProjects: "Dự án tham gia",
  };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <main className="flex-1 flex flex-col">
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          labels={labels}
        />
        <div className="flex-1 overflow-y-auto mt-4">
          <Suspense
            fallback={
              <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
          >
            {activeTab === "userProjects" && <UserProjects />}
            {activeTab === "joinedProjects" && <JoinedProjects />}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

// Simple toast function (replace with your notification system)
const showToast = (message, type = "success") => {
  // You can replace this with your existing notification system
  if (type === "success") {
    console.log("✅ Success:", message);
    // Example: show success notification
  } else {
    console.error("❌ Error:", message);
    // Example: show error notification
  }

  // Simple browser notification as fallback
  if (window.alert) {
    alert(message);
  }
};

const Profile = () => {
  const {
    user,
    setUserData,
    userData,
    updated,
    setUpdated,
    loading,
    error,
    isTokenValid,
  } = useUser();
  const { isExpiringSoon, formattedTimeUntilExpiration } = useTokenExpiration();
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);
  const [editSkillName, setEditSkillName] = useState("");
  const [editingSkill, setEditingSkill] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [previewSkill, setPreviewSkill] = useState(null);

  const isOwner = user?.user_id === userData?.user_id;

  useEffect(() => {
    if (userData) {
      setUserInformation(userData.user_information || userData);
      setSkills(userData.skills || []);
    }
  }, [userData]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải hồ sơ...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Không thể tải hồ sơ
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={() => setUpdated(!updated)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  // Show token invalid state
  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Phiên đăng nhập đã hết hạn
          </h2>
          <p className="text-gray-600 mb-4">
            Vui lòng đăng nhập lại để tiếp tục sử dụng.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    );
  }

  const getSkillBadgeColor = (index) => {
    const colors = [
      "bg-red-100 text-red-800",
      "bg-green-100 text-green-800",
      "bg-blue-100 text-blue-800",
      "bg-yellow-100 text-yellow-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
    ];
    return colors[index % colors.length];
  };

  const handleAddSkill = async () => {
    if (!previewSkill || !isTokenValid) return;

    try {
      const skillData = { skill: previewSkill.trim() };
      await addSkill(user.user_id, skillData);

      const updatedUser = await getUserById(user.user_id);
      setUserData(updatedUser.data);
      setNewSkillName("");
      setPreviewSkill(null);
      setIsAddSkillOpen(false);
      setUpdated((prev) => !prev);

      showToast("Thêm kỹ năng thành công!", "success");
    } catch (error) {
      console.error("Thêm kỹ năng thất bại:", error);
      showToast(
          error.status === 401
              ? "Phiên đăng nhập đã hết hạn."
              : "Đã có lỗi xảy ra khi thêm kỹ năng. Vui lòng thử lại.",
          "error"
      );
    }
  };

  const handleDeleteSkill = async (skillToDelete) => {
    if (!isTokenValid) return;

    try {
      await deleteSkill(user.user_id, skillToDelete);

      const updatedUser = await getUserById(user.user_id);
      setUserData(updatedUser.data);
      setUpdated((prev) => !prev);

      showToast("Xóa kỹ năng thành công!", "success");
    } catch (error) {
      console.error("Xóa kỹ năng thất bại:", error);
      showToast(
        error.status === 401
          ? "Phiên đăng nhập đã hết hạn."
          : "Đã có lỗi xảy ra khi xóa kỹ năng. Vui lòng thử lại.",
        "error"
      );
    }
  };

  const openEditSkillModal = (skill) => {
    setEditingSkill(skill);
    setEditSkillName(skill);
    setIsEditSkillOpen(true);
  };

  const handleEditSkill = async () => {
    if (!editSkillName.trim() || !isTokenValid) return;

    try {
      await updateSkill(user.user_id, editingSkill, editSkillName.trim());

      const updatedUser = await getUserById(user.user_id);
      setUserData(updatedUser.data);
      setIsEditSkillOpen(false);
      setEditSkillName("");
      setEditingSkill("");
      setUpdated((prev) => !prev);

      showToast("Cập nhật kỹ năng thành công!", "success");
    } catch (error) {
      console.error("Cập nhật kỹ năng thất bại:", error);
      showToast(
        error.status === 401
          ? "Phiên đăng nhập đã hết hạn."
          : "Đã có lỗi xảy ra khi cập nhật kỹ năng. Vui lòng thử lại.",
        "error"
      );
    }
  };

  const handleAvatarClick = () => {
    if (isTokenValid) {
      setIsProfilePopupOpen(true);
    }
  };

  const handleAvatarChange = async (file) => {
    if (!file || !user?.user_id || !isTokenValid) return;

    try {
      await uploadAvatar(user.user_id, file);

      // Refresh user data
      const updatedUser = await getUserById(user.user_id);
      setUserData(updatedUser.data);
      setUpdated((prev) => !prev);

      showToast("Cập nhật ảnh đại diện thành công!", "success");
    } catch (err) {
      console.error("Avatar upload failed:", err);
      showToast(
        err.status === 401
          ? "Phiên đăng nhập đã hết hạn."
          : "Đã có lỗi xảy ra khi cập nhật ảnh đại diện.",
        "error"
      );
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setPreviewSkill(newSkillName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Token Expiration Warning */}
      <TokenExpirationWarning />

      <div className="container mx-auto px-4 py-8">
        {/* Session Status Banner */}
        {isExpiringSoon && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                Phiên đăng nhập sẽ hết hạn trong {formattedTimeUntilExpiration}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1">
            <div className="shadow-xl p-6 mb-6">
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="flex flex-col items-center text-center">
                  <div
                    onClick={handleAvatarClick}
                    className={`cursor-pointer relative group mb-4 ${
                      !isTokenValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                    <Avatar className="relative h-24 w-24 border-0">
                      {userData?.image ? (
                          <AvatarImage
                              src={userData.image || "/placeholder.svg"}
                              className="rounded-full object-cover w-full h-full"
                          />
                      ) : (
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl font-bold rounded-full">
                            {userInformation?.full_name?.charAt(0) || "U"}
                          </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {userInformation?.full_name || "N/A"}
                  </h1>
                  <p className="text-gray-600 font-medium">
                    {userInformation?.job_title || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {userInformation?.city || "N/A"},{" "}
                    {userInformation?.country || "N/A"}
                  </p>
                </div>

                {/* Profile Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">156</div>
                    <div className="text-xs text-gray-500">Kết nối</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">89</div>
                    <div className="text-xs text-gray-500">Lượt xem</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  {isOwner && isTokenValid && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
                        onClick={() =>
                          navigate("/change-profile", {
                            state: { userInformation },
                          })
                        }
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa hồ sơ
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => navigate("/change-password")}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Đổi mật khẩu
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-gray-800">
                    Kỹ năng
                  </CardTitle>
                  {isOwner && isTokenValid && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700"
                      onClick={() => setIsAddSkillOpen(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 6).map((skill, index) => (
                    <div
                      key={skill}
                      className="relative group"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <Badge
                        className={`${getSkillBadgeColor(
                          index
                        )} border-0 shadow-sm hover:shadow-md transition-all duration-200 font-medium px-2 py-1 text-xs ${
                          isOwner && isTokenValid ? "cursor-pointer" : ""
                        }`}
                        onClick={() =>
                          isOwner && isTokenValid && openEditSkillModal(skill)
                        }
                      >
                        {skill}
                      </Badge>
                      {isOwner && isTokenValid && hoveredSkill === skill && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSkill(skill);
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs transition-colors duration-200"
                        >
                          <X className="h-2 w-2" />
                        </button>
                      )}
                    </div>
                  ))}
                  {skills.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{skills.length - 6} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-800">
                  Liên hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-1 text-sm">
                  <Mail className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-600">
                    {userData?.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-600">
                    {userInformation?.phone_number || "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Giới thiệu
                  </CardTitle>
                  {isOwner && isTokenValid && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700"
                      onClick={() =>
                        navigate("/change-profile", {
                          state: { userInformation },
                        })
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {userInformation?.summary ||
                    userInformation?.about_me ||
                    "Chưa có thông tin giới thiệu."}
                </p>
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Dự án
                  </CardTitle>
                  {isTokenValid && (
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      <Link
                        to="/insert-project"
                        state={{ user }}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm Dự Án
                      </Link>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ProjectTabs />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Profile Image Popup */}
      <ProfileImagePopup
        isOpen={isProfilePopupOpen}
        onClose={() => setIsProfilePopupOpen(false)}
        userData={userInformation}
        onAvatarChange={handleAvatarChange}
        isOwner={isOwner}
      />

      {/* Add Skill Modal */}
      <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
        <DialogContent className="bg-white rounded-xl border-0 shadow-xl p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
              <Award className="h-5 w-5 text-purple-600 mr-2" />
              Thêm kỹ năng mới
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="new-skill" className="text-sm font-medium text-gray-700">
                Tên kỹ năng
              </Label>
              <Input
                  id="new-skill"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Ví dụ: React, Node.js, UX Design..."
                  className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyDown={handleSkillKeyDown}
                  disabled={!isTokenValid}
              />
            </div>

            {/* Add preview section */}
            {previewSkill && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Xem trước:</span>
                  <Badge className="bg-purple-100 text-purple-800 border-0 shadow-sm px-2 py-1 text-xs">
                    {previewSkill}
                  </Badge>
                </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddSkillOpen(false);
                    setPreviewSkill(null);
                  }}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Hủy
              </Button>
              <Button
                  onClick={() => {
                    if (!previewSkill) {
                      // If no preview, set one first
                      setPreviewSkill(newSkillName.trim());
                    } else {
                      // If preview exists, confirm addition
                      handleAddSkill();
                    }
                  }}
                  disabled={!newSkillName.trim() || !isTokenValid}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
              >
                {previewSkill ? (
                    "Xác nhận"
                ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Thêm
                    </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Skill Modal */}
      <Dialog open={isEditSkillOpen} onOpenChange={setIsEditSkillOpen}>
        <DialogContent className="bg-white rounded-xl border-0 shadow-xl p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
              <Edit className="h-5 w-5 text-purple-600 mr-2" />
              Chỉnh sửa kỹ năng
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="edit-skill" className="text-sm font-medium text-gray-700">
                Tên kỹ năng mới
              </Label>
              <Input
                  id="edit-skill"
                  value={editSkillName}
                  onChange={(e) => setEditSkillName(e.target.value)}
                  placeholder="Nhập tên kỹ năng mới..."
                  className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyDown={(e) => e.key === "Enter" && handleEditSkill()}
                  disabled={!isTokenValid}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                  variant="outline"
                  onClick={() => setIsEditSkillOpen(false)}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Hủy
              </Button>
              <Button
                  onClick={handleEditSkill}
                  disabled={!editSkillName.trim() || !isTokenValid}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
