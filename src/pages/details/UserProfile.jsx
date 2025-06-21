import TabList from "@/components/TabList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/AuthContext";
import {
  addSkill,
  deleteSkill,
  getSkills,
  getUserById,
  updateSkill,
  uploadAvatar,
} from "@/utils/userApi";
import { Edit, Loader, Mail, MapPin, Phone, Plus, X } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CV = lazy(() => import("@/pages/details/module/CV"));
const UserProjects = lazy(() => import("@/pages/details/module/UserProjects"));
const JoinedProjects = lazy(() =>
  import("@/pages/details/module/JoinedProjects")
);

const ProjectTabs = () => {
  const { user } = useAuth();
  const tabs = ["userProjects", "joinedProjects"];
  const labels = {
    userProjects: "Dự án của mình",
    joinedProjects: "Dự án tham gia",
  };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {activeTab === "talents"}
      </div>
      {/* Tab Content */}
      <main className="flex-1 flex flex-col">
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          labels={labels}
        />
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<Loader />}>
            {activeTab === "userProjects" && <UserProjects userId={user.user_id} />}
            {activeTab === "joinedProjects" && <JoinedProjects userId={user.user_id} />}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [editingSkill, setEditingSkill] = useState("");
  const [editSkillName, setEditSkillName] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const fileInputRef = useRef(null);
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const fetchUser = async () => {
    if (user?.user_id) {
      try {
        const fetchedUser = await getUserById(user.user_id);
        setUserData(fetchedUser.data);
        setUserInformation(fetchedUser.data.user_information);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
  };

  const fetchSkills = async () => {
    if (user?.user_id) {
      try {
        const userSkills = await getSkills(user.user_id);
        setSkills(userSkills.data || []);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        setSkills([]);
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !user?.user_id) return;

    try {
      await uploadAvatar(user.user_id, file);
      const updated = await getUserById(user.user_id);
      setUserData(updated);
      setUpdated((prev) => !prev);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkillName.trim() || !user?.user_id) return;

    try {
      const skillData = { skill: newSkillName.trim() };
      await addSkill(user.user_id, skillData);
      await fetchSkills();
      setNewSkillName("");
      setIsAddSkillOpen(false);
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  };

  const handleEditSkill = async () => {
    if (!editSkillName.trim() || !editingSkill || !user?.user_id) return;

    try {
      console.log(editingSkill);
      await updateSkill(user.user_id, editingSkill, editSkillName.trim());
      await fetchSkills(); // Refresh skills list
      setEditSkillName("");
      setEditingSkill("");
      setIsEditSkillOpen(false);
    } catch (error) {
      console.error("Failed to update skill:", error);
    }
  };

  const handleDeleteSkill = async (skillToDelete) => {
    console.log("Trigger Delete");
    if (!user?.user_id) return;

    try {
      // Note: Using deleteSkill instead of deleteCompany (assuming it's a typo in your API)
      await deleteSkill(user.user_id, skillToDelete);
      await fetchSkills(); // Refresh skills list
    } catch (error) {
      console.error("Failed to delete skill:", error);
    }
  };

  const openEditSkillModal = (skill) => {
    setEditingSkill(skill);
    setEditSkillName(skill);
    setIsEditSkillOpen(true);
  };

  const isOwner = user && userData && user.user_id === userData.user_id;

  useEffect(() => {
    fetchUser();
    fetchSkills();
  }, [updated, user?.user_id]);

  const getSkillBadgeColor = (index) => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      "bg-gradient-to-r from-orange-500 to-red-500 text-white",
      "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    ];
    return colors[index % colors.length];
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
                    className="cursor-pointer relative group mb-6"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <Avatar className="relative h-28 w-28 border-4 border-white shadow-lg">
                      {userData?.image ? (
                        <AvatarImage
                          src={userData.image || "/placeholder.svg"}
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
                  <p className="text-lg text-gray-600 font-medium">
                    {userInformation?.job_title || "N/A"}
                  </p>
                </div>

                {/* About Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                      Thông tin chung về tôi
                    </h2>
                    {isOwner && (
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
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {userInformation?.summary || "N/A"}
                  </p>
                </div>

                {/* Location Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">
                        {userInformation?.country || "N/A"}
                      </p>
                      <p className="text-sm">
                        {userInformation?.state || "N/A"},{" "}
                        {userInformation?.city || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-800">Liên hệ</h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">
                        {userData?.email || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">
                        {userInformation?.phone_number || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Kỹ năng</h2>
                    {isOwner && (
                      <Dialog
                        open={isAddSkillOpen}
                        onOpenChange={setIsAddSkillOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Thêm kỹ năng mới</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="new-skill">Tên kỹ năng</Label>
                              <Input
                                id="new-skill"
                                value={newSkillName}
                                onChange={(e) =>
                                  setNewSkillName(e.target.value)
                                }
                                placeholder="Nhập tên kỹ năng..."
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleAddSkill();
                                  }
                                }}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsAddSkillOpen(false);
                                  setNewSkillName("");
                                }}
                              >
                                Hủy
                              </Button>
                              <Button
                                onClick={handleAddSkill}
                                disabled={!newSkillName.trim()}
                              >
                                Thêm
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={skill}
                        className="relative group"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <Badge
                          className={`${getSkillBadgeColor(
                            index
                          )} border-0 shadow-md hover:shadow-lg transition-all duration-200 font-medium px-3 py-1 cursor-pointer`}
                          onClick={() => isOwner && openEditSkillModal(skill)}
                        >
                          {skill}
                        </Badge>
                        {isOwner && hoveredSkill === skill && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSkill(skill);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors duration-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
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
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Các dự án
                  </h2>
                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditSkill();
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditSkillOpen(false);
                  setEditSkillName("");
                  setEditingSkill("");
                }}
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
