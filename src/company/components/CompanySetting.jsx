// CompanySettings.tsx
"use client";

import { useState } from "react";
import { companies } from "../mock/recruitment-data";
import {
  Building2,
  Save,
  Upload,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  X,
  Plus,
  Edit3,
  Check,
  Linkedin,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";

const CompanySettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState(companies[0]);
  const [newSocialLink, setNewSocialLink] = useState({ type: "WEBSITE", url: "" });

  const handleInputChange = (field, value) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (field, value) => {
    setCompany(prev => ({
      ...prev,
      location: { ...prev.location, [field]: value }
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...company.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setCompany({ ...company, socialLinks: updatedLinks });
  };

  const addSocialLink = () => {
    if (newSocialLink.url.trim() !== "") {
      setCompany({
        ...company,
        socialLinks: [...company.socialLinks, newSocialLink]
      });
      setNewSocialLink({ type: "WEBSITE", url: "" });
    }
  };

  const removeSocialLink = (index) => {
    setCompany({
      ...company,
      socialLinks: company.socialLinks.filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Company data saved:", company);
  };

  const getSocialIcon = (type) => {
    switch (type) {
      case "WEBSITE": return <Globe className="h-4 w-4 text-blue-600" />;
      case "LINKEDIN": return <Linkedin className="h-4 w-4 text-blue-700" />;
      case "FACEBOOK": return <Facebook className="h-4 w-4 text-blue-800" />;
      case "TWITTER": return <Twitter className="h-4 w-4 text-blue-400" />;
      case "INSTAGRAM": return <Instagram className="h-4 w-4 text-pink-600" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const industryOptions = [
    "TECHNOLOGY",
    "FINANCE",
    "HEALTHCARE",
    "EDUCATION",
    "MANUFACTURING",
    "RETAIL",
    "TELECOMMUNICATIONS"
  ];

  const companySizeOptions = [
    "1-10",
    "11-50",
    "51-100",
    "101-200",
    "201-500",
    "500+"
  ];

  const socialLinkTypes = [
    "WEBSITE",
    "LINKEDIN",
    "FACEBOOK",
    "TWITTER",
    "INSTAGRAM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cài đặt công ty</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin và tùy chọn của công ty bạn</p>
            </div>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl ${
              isEditing
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Lưu thay đổi
              </>
            ) : (
              "Chỉnh sửa"
            )}
          </button>
        </div>

        {/* Company Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Tổng quan công ty</h2>
            <p className="text-gray-600 mt-1">Thông tin cơ bản về công ty của bạn</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="relative group">
                  {company.image ? (
                    <img
                      src={company.image}
                      alt="Logo công ty"
                      className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-white" />
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="mt-3 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Upload className="h-3 w-3" />
                    Tải lên logo
                  </button>
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Tên công ty
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={company.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                      !isEditing
                        ? "bg-gray-50 border-gray-200 text-gray-600"
                        : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="tagline" className="block text-sm font-semibold text-gray-900 mb-2">
                    Tagline
                  </label>
                  <input
                    id="tagline"
                    type="text"
                    value={company.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                      !isEditing
                        ? "bg-gray-50 border-gray-200 text-gray-600"
                        : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-semibold text-gray-900 mb-2">
                Mô tả công ty
              </label>
              <textarea
                id="about"
                value={company.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder="Mô tả sứ mệnh và dịch vụ của công ty bạn..."
                className={`w-full px-4 py-3 border rounded-lg text-sm resize-vertical transition-all duration-200 ${
                  !isEditing
                    ? "bg-gray-50 border-gray-200 text-gray-600"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Business Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Chi tiết kinh doanh</h2>
            <p className="text-gray-600 mt-1">Thông tin ngành nghề và hoạt động</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 mb-2">
                  Ngành nghề
                </label>
                <select
                  id="industry"
                  value={company.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                >
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="companySize" className="block text-sm font-semibold text-gray-900 mb-2">
                  Quy mô công ty
                </label>
                <select
                  id="companySize"
                  value={company.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                >
                  {companySizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size} nhân viên
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="founded" className="block text-sm font-semibold text-gray-900 mb-2">
                  Năm thành lập
                </label>
                <input
                  id="founded"
                  type="number"
                  value={company.founded}
                  onChange={(e) => handleInputChange("founded", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Information Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Thông tin địa chỉ</h2>
            <p className="text-gray-600 mt-1">Địa chỉ liên hệ của công ty</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
                  Thành phố
                </label>
                <input
                  id="city"
                  type="text"
                  value={company.location.city}
                  onChange={(e) => handleLocationChange("city", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-2">
                  Quốc gia
                </label>
                <input
                  id="country"
                  type="text"
                  value={company.location.country}
                  onChange={(e) => handleLocationChange("country", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                  Địa chỉ chi tiết
                </label>
                <input
                  id="address"
                  type="text"
                  value={company.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Thông tin liên hệ</h2>
            <p className="text-gray-600 mt-1">Cách khách hàng và đối tác có thể liên hệ với bạn</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-blue-600" />
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={company.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  Địa chỉ email
                </label>
                <input
                  id="email"
                  type="email"
                  value={company.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
              </div>
            </div>

            {/* Social Links Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-900">Liên kết mạng xã hội</label>
                {isEditing && (
                  <button
                    onClick={addSocialLink}
                    className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Thêm liên kết
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {company.socialLinks.map((link, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group-hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0">
                        {getSocialIcon(link.type)}
                      </div>
                      {isEditing ? (
                        <div className="flex-1 flex items-center gap-2">
                          <select
                            value={link.type}
                            onChange={(e) => handleSocialLinkChange(index, "type", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          >
                            {socialLinkTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="URL"
                          />
                        </div>
                      ) : (
                        <div className="flex-1 text-sm text-gray-900 truncate">
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {link.url}
                          </a>
                        </div>
                      )}
                      {isEditing && (
                        <button
                          onClick={() => removeSocialLink(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <select
                      value={newSocialLink.type}
                      onChange={(e) => setNewSocialLink({...newSocialLink, type: e.target.value})}
                      className="px-3 py-2 border border-blue-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      {socialLinkTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <input
                      type="url"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                      className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="URL"
                    />
                    <button
                      onClick={addSocialLink}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Thêm"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Thành lập {company.founded}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
              <Users className="h-3 w-3" />
              {company.companySize} nhân viên
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
              <Building2 className="h-3 w-3" />
              {company.industry}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium flex items-center gap-2">
              <Check className="h-3 w-3" />
              {company.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;