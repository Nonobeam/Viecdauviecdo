import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import ProfileImagePopup from "@/components/Profile/ProfileImagePopup";
import TokenExpirationWarning from "@/components/Profile/TokenExpirationWarning";
import SkillModal from "@/components/Profile/SkillModal";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import MainContent from "@/components/Profile/MainContent";
import Loader from "@/components/Loader";
import Swal from "sweetalert2";

import { useTokenExpiration } from "@/hooks/useTokenExpiration";
import { useUser } from "@/hooks/useUser";
import {
  deleteSkill,
  getSkills,
  getUserById,
  uploadAvatar,
} from "@/utils/userApi";

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
  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);
  const [, setEditSkillName] = useState("");
  const [, setPreviewSkill] = useState(null);
  const [editingSkill, setEditingSkill] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const isOwner = user?.user_id === userData?.user_id;
  useEffect(() => {
    if (userData) {
      setUserInformation(userData.user_information || userData);
      fetchSkills();
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

  const fetchSkills = async () => {
    if (!user.user_id) return;

    try {
      const userSkills = await getSkills(user.user_id);
      setSkills(userSkills.data || []);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setSkills([]);
    }
  };

  const handleDeleteSkill = async (skillToDelete) => {
    if (!isTokenValid) return;

    try {
      await deleteSkill(user.user_id, skillToDelete);

      const updatedUser = await getUserById(user.user_id);
      setUserData(updatedUser.data);
      setUpdated((prev) => !prev);

      Swal.fire({
        icon: "success",
        title: "Xóa kỹ năng thành công!",
      });
    } catch (error) {
      console.error("Xóa kỹ năng thất bại:", error);
      Swal.fire({
        icon: "error",
        title: "Xóa kỹ năng thất bại!",
        text:
          error.status === 401
            ? "Phiên đăng nhập đã hết hạn."
            : "Đã có lỗi xảy ra khi xóa kỹ năng. Vui lòng thử lại.",
      });
    }
  };

  const openEditSkillModal = (skill) => {
    setEditingSkill(skill);
    setEditSkillName(skill);
    setIsEditSkillOpen(true);
  };

  const handleAvatarClick = () => {
    if (isTokenValid) {
      setAvatarLoading(true);
      setTimeout(() => {
        setAvatarLoading(false);
        setIsProfilePopupOpen(true);
      }, 500);
    }
  };

  const handleAvatarChange = async (file) => {
    if (!file || !user?.user_id || !isTokenValid) return;

    setAvatarLoading(true);

    try {
      await uploadAvatar(user.user_id, file);

      // Refresh user data
      const updatedUser = await getUserById(user.user_id);
      setUserData(updatedUser.data);
      setUpdated((prev) => !prev);

      setAvatarLoading(false);

      Swal.fire({
        icon: "success",
        title: "Cập nhật ảnh đại diện!",
      });
    } catch (err) {
      setAvatarLoading(false);
      console.error("Avatar upload failed:", err);
      Swal.fire({
        icon: "error",
        title: "Cập nhật ảnh đại diện thất bại!",
        text:
          err.status === 401
            ? "Phiên đăng nhập đã hết hạn."
            : "Đã có lỗi xảy ra khi cập nhật ảnh đại diện.",
      });
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
          {avatarLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader />
            </div>
          ) : (
            <ProfileInfo
              isTokenValid={isTokenValid}
              userData={userData}
              isOwner={isOwner}
              skills={skills}
              hoveredSkill={hoveredSkill}
              userInformation={userInformation}
              handleAvatarClick={handleAvatarClick}
              setIsAddSkillOpen={setIsAddSkillOpen}
              setHoveredSkill={setHoveredSkill}
              openEditSkillModal={openEditSkillModal}
              handleDeleteSkill={handleDeleteSkill}
              avatarLoading={avatarLoading}
            />
          )}

          {/* Main Content */}
          <MainContent
            userInformation={userInformation}
            isOwner={isOwner}
            isTokenValid={isTokenValid}
            user={user}
          />
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

      {/* Skill Modals */}
      <SkillModal
        isOpen={isAddSkillOpen}
        onClose={() => {
          setIsAddSkillOpen(false);
          setPreviewSkill(null);
        }}
        userId={user?.user_id}
        isTokenValid={isTokenValid}
        mode="add"
        onSuccess={() => setUpdated((prev) => !prev)}
      />

      <SkillModal
        isOpen={isEditSkillOpen}
        onClose={() => setIsEditSkillOpen(false)}
        userId={user?.user_id}
        isTokenValid={isTokenValid}
        mode="edit"
        initialSkill={editingSkill}
        onSuccess={() => setUpdated((prev) => !prev)}
      />
    </div>
  );
};

export default Profile;
