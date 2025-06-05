"use client";

import { useState } from "react";
import { companies } from "../mock/recruitment-data";
import { Building2, Save, Upload, MapPin, Phone, Mail, Globe, Users, Calendar, X, Plus, Edit3, Check, Linkedin, Facebook, Twitter, Instagram, Camera } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Cài đặt công ty
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Quản lý thông tin và tùy chọn của công ty bạn</p>
            </div>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              isEditing
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            {isEditing ? (
              <>
                <Save className="h-5 w-5" />
                Lưu thay đổi
              </>
            ) : (
              <>
                <Edit3 className="h-5 w-5" />
                Chỉnh sửa
              </>
            )}
          </button>
        </div>

        {/* Company Overview Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-900">Tổng quan công ty</h2>
            <p className="text-gray-600 mt-2">Thông tin cơ bản về công ty của bạn</p>
          </div>
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-start gap-8 mb-8">
              <div className="flex-shrink-0">
                <div className="relative group">
                  {company.image ? (
                    <img
                      src={company.image || "/placeholder.svg"}
                      alt="Logo công ty"
                      className="w-24 h-24 object-cover rounded-2xl border-2 border-gray-200 shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Building2 className="w-12 h-12 text-white" />
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="mt-4 w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Upload className="h-4 w-4" />
                    Tải lên logo
                  </button>
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                    Tên công ty
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={company.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                      !isEditing
                        ? "bg-gray-50 border-gray-200 text-gray-600"
                        : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="tagline" className="block text-sm font-semibold text-gray-900 mb-3">
                    Tagline
                  </label>
                  <input
                    id="tagline"
                    type="text"
                    value={company.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                      !isEditing
                        ? "bg-gray-50 border-gray-200 text-gray-600"
                        : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-semibold text-gray-900 mb-3">
                Mô tả công ty
              </label>
              <textarea
                id="about"
                value={company.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                disabled={!isEditing}
                rows={5}
                placeholder="Mô tả sứ mệnh và dịch vụ của công ty bạn..."
                className={`w-full px-4 py-4 border rounded-xl text-sm resize-vertical transition-all duration-200 ${
                  !isEditing
                    ? "bg-gray-50 border-gray-200 text-gray-600"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Business Details Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50">
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết kinh doanh</h2>
            <p className="text-gray-600 mt-2">Thông tin ngành nghề và hoạt động</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-900 mb-3">
                  Ngành nghề
                </label>
                <select
                  id="industry"
                  value={company.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
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
                <label htmlFor="companySize" className="block text-sm font-semibold text-gray-900 mb-3">
                  Quy mô công ty
                </label>
                <select
                  id="companySize"
                  value={company.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
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
                <label htmlFor="founded" className="block text-sm font-semibold text-gray-900 mb-3">
                  Năm thành lập
                </label>
                <input
                  id="founded"
                  type="number"
                  value={company.founded}
                  onChange={(e) => handleInputChange("founded", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Information Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <MapPin className="h-6 w-6 text-green-600" />
              Thông tin địa chỉ
            </h2>
            <p className="text-gray-600 mt-2">Địa chỉ liên hệ của công ty</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-3">
                  Thành phố
                </label>
                <input
                  id="city"
                  type="text"
                  value={company.location.city}
                  onChange={(e) => handleLocationChange("city", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-3">
                  Quốc gia
                </label>
                <input
                  id="country"
                  type="text"
                  value={company.location.country}
                  onChange={(e) => handleLocationChange("country", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                  }`}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-3">
                  Địa chỉ chi tiết
                </label>
                <input
                  id="address"
                  type="text"
                  value={company.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Mail className="h-6 w-6 text-orange-600" />
              Thông tin liên hệ
            </h2>
            <p className="text-gray-600 mt-2">Cách khách hàng và đối tác có thể liên hệ với bạn</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"
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
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"
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
                  className={`w-full px-4 py-4 border rounded-xl text-sm transition-all duration-200 ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                  }`}
                />
              </div>
            </div>

            {/* Social Links Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <label className="block text-lg font-semibold text-gray-900">Liên kết mạng xã hội</label>
                {isEditing && (
                  <button
                    onClick={addSocialLink}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Thêm liên kết
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {company.socialLinks.map((link, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl group-hover:shadow-md transition-all duration-200">
                      <div className="flex-shrink-0">
                        {getSocialIcon(link.type)}
                      </div>
                      {isEditing ? (
                        <div className="flex-1 flex items-center gap-3">
                          <select
                            value={link.type}
                            onChange={(e) => handleSocialLinkChange(index, "type", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
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
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                            placeholder="URL"
                          />
                        </div>
                      ) : (
                        <div className="flex-1 text-sm text-gray-900 truncate">
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
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
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                    <select
                      value={newSocialLink.type}
                      onChange={(e) => setNewSocialLink({...newSocialLink, type: e.target.value})}
                      className="px-3 py-2 border border-blue-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
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
                      className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
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
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Trạng thái công ty</h3>
          <div className="flex flex-wrap gap-4">
            <span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
              <Calendar className="h-4 w-4" />
              Thành lập {company.founded}
            </span>
            <span className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
              <Users className="h-4 w-4" />
              {company.companySize} nhân viên
            </span>
            <span className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
              <Building2 className="h-4 w-4" />
              {company.industry}
            </span>
            <span className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
              <Check className="h-4 w-4" />
              {company.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
