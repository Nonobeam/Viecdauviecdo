import { useAuth } from "@/providers/AuthContext";
import { getTransactionById } from "@/utils/transactionAPI";
import { Download, Eye, Filter, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const [statusFilters, setStatusFilters] = useState({
    success: false,
    pending: false,
    cancel: false,
  });
  const { user, loading } = useAuth();
  const [allTransactions, setAllTransactions] = useState([]);
  let [filteredTransactions, setFilteredTransactions] = useState([]);
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log("User fetched", user)
        fetchUserTransactions(user.user_id);
      } else {
        console.log("No user");
      }
    }
  }, []);

  // Filter transactions when filters change
  useEffect(() => {
    filterTransactions();
  }, [allTransactions, statusFilters, searchTerm, dateRange, amountRange]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilters, searchTerm, dateRange, amountRange]);

  const fetchUserTransactions = async (userId) => {
    try {
      setProcessing(true);
      setError(null);

      // Use your existing API function to get all user transactions
      const response = await getTransactionById(userId);
      const transactions = response.data.content
      setAllTransactions(Array.isArray(transactions) ? transactions : []);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
      console.error("Error fetching user transactions:", err);
    } finally {
      setProcessing(false);
    }
  };

  const filterTransactions = () => {
    let filtered = [...allTransactions];

    // Filter by status
    const activeStatuses = Object.keys(statusFilters).filter(
      (key) => statusFilters[key]
    );
    if (activeStatuses.length > 0) {
      filtered = filtered.filter((transaction) =>
        activeStatuses.includes(transaction.status)
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (transaction) =>
          transaction.order_code?.toLowerCase().includes(searchLower) ||
          transaction.name?.toLowerCase().includes(searchLower) ||
          transaction.description?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (dateRange.from) {
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) >= new Date(dateRange.from)
      );
    }
    if (dateRange.to) {
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) <= new Date(dateRange.to)
      );
    }

    // Filter by amount range
    if (amountRange.min) {
      filtered = filtered.filter(
        (transaction) => transaction.amount >= parseFloat(amountRange.min)
      );
    }
    if (amountRange.max) {
      filtered = filtered.filter(
        (transaction) => transaction.amount <= parseFloat(amountRange.max)
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleViewTransaction = (transaction) => {
    // Handle viewing transaction details
    // You could open a modal, navigate to detail page, etc.
    console.log("Viewing transaction:", transaction);
    // Example: setSelectedTransaction(transaction); setShowModal(true);
  };

  const handleStatusFilter = (status) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmountRangeChange = (field, value) => {
    setAmountRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Pagination calculations
  const totalTransactions = filteredTransactions.length;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const texts = {
      completed: "Hoàn thành",
      pending: "Đang xử lý",
      failed: "Thất bại",
      cancelled: "Đã hủy",
    };
    return texts[status] || status;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  filteredTransactions = currentTransactions;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Lịch sử giao dịch
            </h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-full lg:w-80 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
            </div>

            {/* Status Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Trạng thái
              </h3>
              <div className="space-y-3">
                {[
                  { key: "completed", label: "Hoàn thành" },
                  { key: "pending", label: "Đang xử lý" },
                  { key: "failed", label: "Thất bại" },
                  { key: "cancelled", label: "Đã hủy" },
                ].map((status) => (
                  <label
                    key={status.key}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={statusFilters[status.key]}
                      onChange={() => handleStatusFilter(status.key)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      {status.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Khoảng thời gian
              </h3>
              <div className="space-y-3">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Từ ngày"
                />
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Đến ngày"
                />
              </div>
            </div>

            {/* Amount Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Khoảng giá
              </h3>
              <div className="space-y-3">
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Từ"
                />
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Đến"
                />
              </div>
            </div>
          </div>

          {/* Main Content - Transaction Table */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã đơn hàng, tên giao dịch..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mã đơn hàng
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tên giao dịch
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mô tả
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tiền
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-blue-600">
                            {transaction.order_code}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {transaction.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.payment_method}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {getStatusText(transaction.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    Không tìm thấy giao dịch nào phù hợp với bộ lọc
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-lg shadow-sm mt-6 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">1</span> đến{" "}
                  <span className="font-medium">
                    {filteredTransactions.length}
                  </span>{" "}
                  trong tổng số{" "}
                  <span className="font-medium">{allTransactions.length}</span>{" "}
                  giao dịch
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Trước
                  </button>
                  <button className="px-3 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-md">
                    1
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    Sau
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
