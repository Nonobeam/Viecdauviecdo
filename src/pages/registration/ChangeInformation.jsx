import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import { uploadAvatar, changeUserInformation } from "@/utils/userApi";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building,
  Camera,
  CheckCircle,
  FileText,
  MapPin,
  Phone,
  User,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ChangeInformation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const { userInformation } = location.state || {};
  const fileInputRef = useRef(null);

  // Form state
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  // Profile image state
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    if (userInformation) {
      setFullName(userInformation.full_name || "");
      setJobTitle(userInformation.job_title || "");
      setAboutMe(userInformation.summary || userInformation.about_me || "");
      setPhone(userInformation.phone_number || userInformation.phone || "");
      setCountry(userInformation.country || "");
      setState(userInformation.state || "");
      setCity(userInformation.city || "");
      if (userInformation.image) {
        setImagePreview(userInformation.image);
      }
    }
  }, [userInformation]);

  // Handle image upload
  const handleImageUpload = async (file) => {
    if (!user?.user_id) return;
    try {
      await uploadAvatar(user.user_id, file);
    } catch (err) {
      console.error("Image upload failed:", err);
      setSaveError("Failed to upload profile image. Please try again.");
    }
  };

  const handleImageChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle save action
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");

    try {
      const token = user?.token;
      if (!token) throw new Error("Không tìm thấy token xác thực");

      if (profileImage) {
        await handleImageUpload(profileImage);
      }

      await changeUserInformation(user.user_id, {
        full_name: fullName,
        job_title: jobTitle,
        about_me: aboutMe,
        country: country,
        state: state,
        city: city,
        phone: phone,
      });

      setSaveSuccess(true);
      setTimeout(() => {
        navigate("/skills-links", {
          state: {
            userInformation: {
              full_name: fullName,
              job_title: jobTitle,
              about_me: aboutMe,
              country: country,
              state: state,
              city: city,
              phone: phone,
              image: imagePreview,
            },
          },
        });
      }, 1500);
    } catch (err) {
      console.error("Error updating information:", err);
      setSaveError(err.message || "Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm" />
      </div>

      <div className="max-w-2xl mx-auto -mt-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
        <div className="mb-8">
          <Link to="/profile">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4 hover:bg-purple-50 border-purple-200 text-purple-700"
            >
              <ArrowLeft className="h-4 w-4" /> Quay về Hồ sơ
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Khởi tạo thông tin bắt buộc
          </h1>
          <p className="text-gray-600 mt-2">
            Khởi tạo thông tin cá nhân và nghề nghiệp của bạn.
          </p>
        </div>

        {saveError && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 animate-pulse">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-sm text-red-800">{saveError}</p>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-pulse">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-sm text-green-800">
                Cập nhật thông tin thành công! Đang chuyển hướng...
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Picture Section */}
          <div className="border-b border-purple-100 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="h-5 w-5 text-purple-600 mr-2" /> Ảnh đại diện
            </h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-4 border-purple-200">
                    <User className="h-8 w-8 text-purple-500" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-purple-500 bg-purple-50"
                      : "border-purple-200 hover:border-purple-400 hover:bg-purple-50/50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Kéo thả ảnh vào đây hoặc nhấp để chọn
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF tối đa 5MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && handleImageChange(e.target.files[0])
                  }
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="border-b border-purple-100 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 text-purple-600 mr-2" /> Thông tin cá
              nhân
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-purple-500" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn"
                    className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="border-b border-purple-100 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="h-5 w-5 text-purple-600 mr-2" /> Thông tin
              nghề nghiệp
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chức danh *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-4 w-4 text-purple-500" />
                  </div>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Nhập chức danh công việc"
                    className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giới thiệu bản thân *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FileText className="h-4 w-4 text-purple-500" />
                  </div>
                  <textarea
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    rows={4}
                    placeholder="Giới thiệu về bản thân, kinh nghiệm và mục tiêu của bạn..."
                    className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-purple-600 mr-2" /> Thông tin liên
              hệ
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quốc gia *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-purple-500" />
                    </div>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Nhập quốc gia"
                      className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-4 w-4 text-purple-500" />
                    </div>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Nhập tỉnh/thành phố"
                      className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-4 w-4 text-purple-500" />
                    </div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Nhập quận/huyện"
                      className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-purple-500" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại"
                      className="pl-10 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={
              isSaving ||
              saveSuccess ||
              !fullName ||
              !jobTitle ||
              !aboutMe ||
              !country ||
              !phone
            }
          >
            {isSaving
              ? "Đang lưu..."
              : saveSuccess
              ? "Đã lưu!"
              : "Lưu thay đổi"}
          </Button>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            disabled={isSaving}
            onClick={() => navigate("/profile")}
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInformation;
