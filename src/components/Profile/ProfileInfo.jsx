import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Loader from "../Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MapPin, Mail, Phone, Edit, Award, Plus, X } from "lucide-react";

const ProfileInfo = ({
  isTokenValid,
  userData,
  isOwner,
  skills,
  hoveredSkill,
  userInformation,
  handleAvatarClick,
  setIsAddSkillOpen,
  setHoveredSkill,
  openEditSkillModal,
  handleDeleteSkill,
  avatarLoading,
}) => {
  const navigate = useNavigate();

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

  return (
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
              <Avatar className="relative h-16 w-16 border-0">
                {userData?.image ? (
                  <AvatarImage
                    src={userData.image || "/placeholder.svg"}
                    className="rounded-full object-cover h-40 w-40"
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-lg font-bold rounded-full">
                    {userInformation?.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
            <span className="text-gray-600">{userData?.email || "N/A"}</span>
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
  );
};

export default ProfileInfo;
