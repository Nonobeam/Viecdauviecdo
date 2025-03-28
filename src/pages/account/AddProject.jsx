import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Upload } from "lucide-react"

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-indigo-600 h-28"></div>

      <div className="max-w-2xl mx-auto -mt-20 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Thêm Dự Án Mới</h1>

        {/* Image Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors ${
            isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"
          }`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {image ? (
            <div className="relative">
              <img src={image || "/placeholder.svg"} alt="Project preview" className="max-h-48 mx-auto rounded" />
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                onClick={(e) => {
                  e.stopPropagation()
                  setImage(null)
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Kéo và thả ảnh thu nhỏ dự án vào đây</p>
              <p className="text-sm text-gray-400">hoặc nhấp để chọn tệp</p>
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileInputChange} />
        </div>

        {/* Project Name */}
        <div className="mb-6">
          <label htmlFor="projectName" className="block font-medium mb-2">
            Tên Dự Án
          </label>
          <Input
            id="projectName"
            placeholder="Nhập tên dự án"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block font-medium mb-2">
            Mô Tả
          </label>
          <Textarea
            id="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label htmlFor="tags" className="block font-medium mb-2">
            Thẻ
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              id="tags"
              placeholder="Thêm thẻ mới"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={handleAddTag} className="bg-indigo-600 hover:bg-indigo-700">
              Thêm Thẻ
            </Button>
          </div>

          {/* Tag List */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700">Tạo Dự Án</Button>
          <Button variant="outline">Hủy</Button>
        </div>
      </div>
    </div>
  )
}

export default AddProject;