const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white font-vietnam">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4 font-nunito">
              Matchlent
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md font-vietnam">
              Nền tảng kết nối và chia sẻ các dự án sáng tạo, đổi mới từ cộng đồng. Xây dựng tương lai cùng nhau.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                💼
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
          </div>

          {/* For Project Creators */}
          <div>
            <h4 className="text-lg font-bold text-indigo-400 mb-6 font-vietnam">Dành cho người tạo dự án</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-vietnam">
                  Đăng dự án
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-vietnam">
                  Quản lý dự án
                </a>
              </li>
            </ul>
          </div>

          {/* For Participants */}
          <div>
            <h4 className="text-lg font-bold text-indigo-400 mb-6 font-vietnam">Dành cho người tham gia</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-vietnam">
                  Tìm dự án
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-vietnam">
                  Tạo hồ sơ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm font-vietnam">&copy; 2024 Matchlent. Tất cả quyền được bảo lưu.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 font-vietnam">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 font-vietnam">
                Điều khoản sử dụng
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 font-vietnam">
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
