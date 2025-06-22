"use client"

import { useState } from "react"

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [location, setLocation] = useState("")

  const popularTags = [
    "Fund Raising",
    "Event Managing",
    "AWS",
    "FinTech",
    "Mobile App",
    "Real Estate",
    "Entertainment",
    "Creative",
  ]

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 font-vietnam" id="search">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 font-vietnam">
            Tìm kiếm dự án
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-vietnam">
            Khám phá các dự án phù hợp với sở thích và kỹ năng của bạn
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 font-vietnam"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Địa điểm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 font-vietnam"
              />
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 font-vietnam">Lĩnh vực quan tâm</h4>
            <div className="flex flex-wrap gap-3">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-vietnam ${
                    selectedTags.includes(tag)
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border-2 border-transparent"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-indigo-500/25 font-vietnam">
            Tìm kiếm dự án
          </button>
        </div>
      </div>
    </section>
  )
}

export default SearchSection
