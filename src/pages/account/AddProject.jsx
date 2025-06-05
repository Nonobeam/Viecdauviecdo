"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ImageIcon, Plus, X } from "lucide-react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"

const AddProject = () => {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState([])
  const [image, setImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0])
    }
  }

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0])
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1000')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-2xl mx-auto -mt-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/profile">
            <Button
              variant="outline"
              className="flex items-center gap-2 mb-4 hover:bg-purple-50 border-purple-200 text-purple-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại Hồ sơ
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Thêm Dự Án Mới
          </h1>
        </div>

        {/* Image Upload */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-purple-500 bg-purple-50"
              : image
                ? "border-green-400 bg-green-50/30"
                : "border-purple-200 hover:border-purple-400 hover:bg-purple-50/50"
          }`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <div className="relative">
              <img
                src={image || "/placeholder.svg"}
                alt="Project preview"
                className="max-h-48 mx-auto rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
              />
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setImage(null)
                }}
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full p-4 mb-4">
                <ImageIcon className="h-10 w-10 text-purple-500" />
              </div>
              <p className="text-base text-gray-700 mb-2 font-medium">Kéo và thả ảnh thu nhỏ dự án vào đây</p>
              <p className="text-sm text-gray-500">hoặc nhấp để chọn tệp</p>
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileInputChange} />
        </div>

        {/* Project Name */}
        <div className="mb-6">
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên Dự Án
          </label>
          <Input
            id="projectName"
            placeholder="Nhập tên dự án"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Mô Tả
          </label>
          <Textarea
            id="description"
            placeholder="Mô tả chi tiết về dự án của bạn"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Thẻ
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              id="tags"
              placeholder="Thêm thẻ mới (React, Node.js, v.v.)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
            />
            <Button
              onClick={handleAddTag}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
            >
              <Plus className="h-4 w-4 mr-1" />
              Thêm
            </Button>
          </div>

          {/* Tag List */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="flex items-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-0 hover:from-purple-200 hover:to-blue-200 transition-colors"
                >
                  {tag}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemoveTag(tag)
                    }}
                    className="hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
            Tạo Dự Án
          </Button>
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            Hủy bỏ
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddProject
