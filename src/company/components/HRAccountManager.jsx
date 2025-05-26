"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Shield, Mail, Phone, MapPin, Calendar, Users } from "lucide-react"

const HRAccountManager = () => {
  const [hrAccounts, setHrAccounts] = useState([
    {
      id: 1,
      name: "Nguyễn Thị Hoa",
      email: "hoa.nguyen@company.com",
      phone: "+84 901 234 567",
      role: "Trưởng phòng HR",
      department: "Tuyển dụng",
      permissions: ["Tuyển dụng", "Onboarding", "Hồ sơ nhân viên", "Báo cáo"],
      status: "Hoạt động",
      lastActive: "2 giờ trước",
      joinDate: "2022-03-15",
      location: "Hồ Chí Minh",
      assignedJobs: 8,
      completedHires: 24,
    },
    {
      id: 2,
      name: "Trần Văn Minh",
      email: "minh.tran@company.com",
      phone: "+84 902 345 678",
      role: "HR Business Partner",
      department: "Quan hệ nhân viên",
      permissions: ["Quản lý hiệu suất", "Tương tác nhân viên", "Chính sách"],
      status: "Hoạt động",
      lastActive: "Hôm qua",
      joinDate: "2021-08-20",
      location: "Hà Nội",
      assignedJobs: 5,
      completedHires: 18,
    },
    {
      id: 3,
      name: "Lê Thị Mai",
      email: "mai.le@company.com",
      phone: "+84 903 456 789",
      role: "HR Coordinator",
      department: "Phúc lợi",
      permissions: ["Phúc lợi", "Quản lý nghỉ phép"],
      status: "Không hoạt động",
      lastActive: "1 tuần trước",
      joinDate: "2023-01-10",
      location: "Đà Nẵng",
      assignedJobs: 2,
      completedHires: 6,
    },
    {
      id: 4,
      name: "Phạm Văn Đức",
      email: "duc.pham@company.com",
      phone: "+84 904 567 890",
      role: "HR Specialist",
      department: "Đào tạo & Phát triển",
      permissions: ["Đào tạo", "Phát triển nhân viên", "Đánh giá"],
      status: "Hoạt động",
      lastActive: "30 phút trước",
      joinDate: "2022-11-05",
      location: "Hồ Chí Minh",
      assignedJobs: 3,
      completedHires: 12,
    },
  ])

  const [editingId, setEditingId] = useState(null)
  const [editedAccount, setEditedAccount] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    location: "Hồ Chí Minh",
    permissions: [],
    status: "Hoạt động",
  })

  const allPermissions = [
    "Tuyển dụng",
    "Onboarding",
    "Hồ sơ nhân viên",
    "Quản lý hiệu suất",
    "Tương tác nhân viên",
    "Chính sách",
    "Phúc lợi",
    "Quản lý nghỉ phép",
    "Lương bổng",
    "Báo cáo",
    "Đào tạo",
    "Phát triển nhân viên",
    "Đánh giá",
  ]

  const departments = [
    "Tuyển dụng",
    "Quan hệ nhân viên",
    "Phúc lợi",
    "Đào tạo & Phát triển",
    "Vận hành HR",
    "Lương bổng",
  ]

  const handleEdit = (account) => {
    setEditingId(account.id)
    setEditedAccount({ ...account })
  }

  const handleSave = (id) => {
    setHrAccounts(hrAccounts.map((account) => (account.id === id ? editedAccount : account)))
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditedAccount({})
  }

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản HR này?")) {
      setHrAccounts(hrAccounts.filter((account) => account.id !== id))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedAccount((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewAccountChange = (e) => {
    const { name, value } = e.target
    setNewAccount((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAccount = () => {
    const newId = Math.max(...hrAccounts.map((a) => a.id)) + 1
    const accountToAdd = {
      ...newAccount,
      id: newId,
      lastActive: "Vừa tạo",
      joinDate: new Date().toISOString().split("T")[0],
      assignedJobs: 0,
      completedHires: 0,
    }
    setHrAccounts([...hrAccounts, accountToAdd])
    setShowAddForm(false)
    setNewAccount({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      location: "Hồ Chí Minh",
      permissions: [],
      status: "Hoạt động",
    })
  }

  const togglePermission = (permission, isNew = false) => {
    const target = isNew ? newAccount : editedAccount
    const setter = isNew ? setNewAccount : setEditedAccount

    setter((prev) => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission]
      return { ...prev, permissions: newPermissions }
    })
  }

  const getStatusColor = (status) => {
    return status === "Hoạt động" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const filteredAccounts = hrAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || account.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || account.department === filterDepartment

    return matchesSearch && matchesStatus && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản HR</h1>
            <p className="text-gray-600 mt-1">Quản lý nhân viên HR và phân quyền hệ thống</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Thêm tài khoản HR
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng nhân viên HR</p>
                <p className="text-2xl font-bold text-gray-900">{hrAccounts.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">
                  {hrAccounts.filter((a) => a.status === "Hoạt động").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng việc được giao</p>
                <p className="text-2xl font-bold text-purple-600">
                  {hrAccounts.reduce((sum, account) => sum + account.assignedJobs, 0)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã tuyển thành công</p>
                <p className="text-2xl font-bold text-orange-600">
                  {hrAccounts.reduce((sum, account) => sum + account.completedHires, 0)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
              <h3 className="text-xl font-bold text-gray-900">Thêm tài khoản HR mới</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newAccount.name}
                    onChange={handleNewAccountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: Nguyễn Văn An"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newAccount.email}
                    onChange={handleNewAccountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: an.nguyen@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newAccount.phone}
                    onChange={handleNewAccountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: +84 901 234 567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Chức vụ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={newAccount.role}
                    onChange={handleNewAccountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: HR Specialist"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phòng ban <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={newAccount.department}
                    onChange={handleNewAccountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Chọn phòng ban</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Địa điểm làm việc</label>
                  <select
                    name="location"
                    value={newAccount.location}
                    onChange={handleNewAccountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-3">Quyền hạn</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {allPermissions.map((permission) => (
                      <button
                        key={permission}
                        type="button"
                        onClick={() => togglePermission(permission, true)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          newAccount.permissions.includes(permission)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {permission}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddAccount}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Tạo tài khoản
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, email hoặc chức vụ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Không hoạt động">Không hoạt động</option>
              </select>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả phòng ban</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* HR Accounts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-900">Danh sách nhân viên HR</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Nhân viên HR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Chức vụ & Phòng ban
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Hiệu suất
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    {editingId === account.id ? (
                      <>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <input
                              name="name"
                              value={editedAccount.name}
                              onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Họ và tên"
                            />
                            <input
                              name="email"
                              value={editedAccount.email}
                              onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Email"
                            />
                            <input
                              name="phone"
                              value={editedAccount.phone}
                              onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Số điện thoại"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <input
                              name="role"
                              value={editedAccount.role}
                              onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                              placeholder="Chức vụ"
                            />
                            <select
                              name="department"
                              value={editedAccount.department}
                              onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                            >
                              {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                  {dept}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <div>{account.assignedJobs} việc được giao</div>
                            <div>{account.completedHires} đã tuyển</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            name="status"
                            value={editedAccount.status}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Không hoạt động">Không hoạt động</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSave(account.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                            >
                              Hủy
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {account.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{account.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {account.email}
                              </div>
                              {account.phone && (
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {account.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{account.role}</div>
                            <div className="text-sm text-gray-500">{account.department}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {account.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="text-gray-900">{account.assignedJobs} việc được giao</div>
                            <div className="text-green-600">{account.completedHires} đã tuyển thành công</div>
                            <div className="text-gray-500">
                              Tham gia: {new Date(account.joinDate).toLocaleDateString("vi-VN")}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(account.status)}`}
                            >
                              {account.status}
                            </span>
                            <div className="text-xs text-gray-500">Hoạt động: {account.lastActive}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(account)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Chỉnh sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(account.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
            <div>
              Hiển thị 1 đến {filteredAccounts.length} trong tổng số {hrAccounts.length} tài khoản
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
                Trước
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">Sau</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HRAccountManager
