"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, X, Filter, MapPin, Calendar, Code, Award, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function SearchFilter({ filters, setFilters, inputValues, setInputValues, onSearch }) {
  const addToArray = (field, value) => {
    if (value.trim() && !filters[field].includes(value.trim())) {
      setFilters((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
      setInputValues((prev) => ({
        ...prev,
        [`${field}Input`]: "",
      }))
    }
  }

  const removeFromArray = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }))
  }

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleInputKeyPress = (e, field) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const inputField = field.replace("Input", "")
      addToArray(inputField, inputValues[field])
    }
  }

  const clearAllFilters = () => {
    setFilters({
      city: [],
      state: [],
      country: [],
      dateOfBirth: "",
      skill: [],
      certification: [],
    })
    setInputValues({
      cityInput: "",
      stateInput: "",
      countryInput: "",
      skillInput: "",
      certificationInput: "",
    })
  }

  const handleSearch = () => {
    onSearch()
  }

  const tagColors = {
    city: "bg-blue-100 text-blue-800",
    state: "bg-green-100 text-green-800",
    country: "bg-purple-100 text-purple-800",
    skill: "bg-orange-100 text-orange-800",
    certification: "bg-red-100 text-red-800",
  }

  return (
    <aside className="w-full md:w-64 bg-white rounded-2xl shadow-lg p-6 border border-indigo-100 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent flex items-center">
          <Filter className="h-4 w-4 mr-2 text-indigo-600" />
          Bộ Lọc Tìm Kiếm
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-0 h-8 w-8"
          onClick={clearAllFilters}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Location Filters */}
      <div className="space-y-5 mb-6">
        <h3 className="font-medium text-gray-900 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
          Địa Điểm
        </h3>

        {/* City Filter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Thành Phố</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Thêm thành phố..."
              value={inputValues.cityInput}
              onChange={(e) => handleInputChange("cityInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "cityInput")}
              className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Button
              size="icon"
              onClick={() => addToArray("city", inputValues.cityInput)}
              disabled={!inputValues.cityInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.city.map((city, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`inline-flex items-center px-2 py-1 ${tagColors.city} text-xs rounded-full`}
              >
                {city}
                <button
                  onClick={() => removeFromArray("city", city)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>

        {/* State Filter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Tỉnh/Thành</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Thêm tỉnh/thành..."
              value={inputValues.stateInput}
              onChange={(e) => handleInputChange("stateInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "stateInput")}
              className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Button
              size="icon"
              onClick={() => addToArray("state", inputValues.stateInput)}
              disabled={!inputValues.stateInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.state.map((state, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`inline-flex items-center px-2 py-1 ${tagColors.state} text-xs rounded-full`}
              >
                {state}
                <button
                  onClick={() => removeFromArray("state", state)}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>

        {/* Country Filter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Quốc Gia</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Thêm quốc gia..."
              value={inputValues.countryInput}
              onChange={(e) => handleInputChange("countryInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "countryInput")}
              className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Button
              size="icon"
              onClick={() => addToArray("country", inputValues.countryInput)}
              disabled={!inputValues.countryInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.country.map((country, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`inline-flex items-center px-2 py-1 ${tagColors.country} text-xs rounded-full`}
              >
                {country}
                <button
                  onClick={() => removeFromArray("country", country)}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2 mb-6">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
          Ngày Sinh
        </h3>
        <Input
          type="date"
          value={filters.dateOfBirth}
          onChange={(e) => setFilters((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
          className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Skills Section */}
      <div className="space-y-2 mb-6">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Code className="h-4 w-4 mr-2 text-indigo-600" />
          Kỹ Năng
        </h3>
        <div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Thêm kỹ năng..."
              value={inputValues.skillInput}
              onChange={(e) => handleInputChange("skillInput", e.target.value)}
              onKeyPress={(e) => handleInputKeyPress(e, "skillInput")}
              className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Button
              size="icon"
              onClick={() => addToArray("skill", inputValues.skillInput)}
              disabled={!inputValues.skillInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.skill.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`inline-flex items-center px-2 py-1 ${tagColors.skill} text-xs rounded-full`}
              >
                {skill}
                <button
                  onClick={() => removeFromArray("skill", skill)}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="space-y-2 mb-6">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Award className="h-4 w-4 mr-2 text-indigo-600" />
          Chứng Chỉ
        </h3>
        <div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Thêm chứng chỉ..."
              value={inputValues.certificationInput}
              onChange={(e) => handleInputChange("certificationInput", e.target.value)}
              onKeyUp={(e) => handleInputKeyPress(e, "certificationInput")}
              className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <Button
              size="icon"
              onClick={() => addToArray("certification", inputValues.certificationInput)}
              disabled={!inputValues.certificationInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 h-10 w-10 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.certification.map((cert, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`inline-flex items-center px-2 py-1 ${tagColors.certification} text-xs rounded-full`}
              >
                {cert}
                <button
                  onClick={() => removeFromArray("certification", cert)}
                  className="ml-1 hover:bg-red-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
      >
        Áp Dụng Bộ Lọc
      </Button>
    </aside>
  )
}
