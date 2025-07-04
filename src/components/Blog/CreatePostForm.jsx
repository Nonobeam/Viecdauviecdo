import { useState } from "react";

import { createPost } from "@/utils/postApi";

import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Smile, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CreatePostForm = ({
  user,
  userData,
  currentUserId,
  userInformation,
  showCreateForm,
  setShowCreateForm,
  onPostCreated,
  showLoginNotification,
}) => {
  const [creating, setCreating] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [, setNewPostImage] = useState(null);
  const [newPostImagePreview, setNewPostImagePreview] = useState("");
  const [newPostSkills, setNewPostSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !newPostSkills.includes(skillInput.trim())) {
      setNewPostSkills([...newPostSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeImage = () => {
    setNewPostImage(null);
    setNewPostImagePreview("");
  };

  const removeSkill = (skillToRemove) => {
    setNewPostSkills(newPostSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setNewPostImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      showLoginNotification();
      return;
    }

    if (!newPostContent.trim()) return;
    try {
      setCreating(true);
      console.log(user);
      const newPost = await createPost({
        user_id: currentUserId,
        title: newPostTitle,
        content: newPostContent,
        image_url: newPostImagePreview || "",
        tags: newPostSkills,
      });

      setNewPostTitle("");
      setNewPostContent("");
      setNewPostImage(null);
      setNewPostImagePreview("");
      setNewPostSkills([]);
      setSkillInput("");
      setShowCreateForm(false);

      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (err) {
      setError("Failed to create post");
      console.error("Error creating post:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      {user && (
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Tạo bài viết mới
                </h3>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewPostTitle("");
                    setNewPostContent("");
                    setNewPostImage(null);
                    setNewPostImagePreview("");
                    setNewPostSkills([]);
                    setSkillInput("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        userData[currentUserId]?.image ||
                        "https://www.gravatar.com/avatar/default?s=200&d=mp"
                      }
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      {userInformation[
                        currentUserId
                      ]?.full_name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      {userInformation[currentUserId]?.full_name ||
                        "Người dùng"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {userInformation[currentUserId]?.job_title ||
                        "Thành viên"}
                    </p>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Tiêu đề bài viết..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium"
                />
                <Textarea
                  placeholder="Chia sẻ suy nghĩ của bạn..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                  className="resize-none border-gray-200 rounded-xl focus:ring-purple-500 p-4 text-gray-700"
                />

                {/* Skills Tags Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Tag liên quan
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newPostSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-purple-500 hover:text-purple-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Thêm tag..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={handleSkillKeyPress}
                      className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                    <Button
                      type="button"
                      onClick={addSkill}
                      disabled={!skillInput.trim()}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl px-4"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Hình ảnh
                  </label>
                  {newPostImagePreview ? (
                    <div className="relative">
                      <img
                        src={newPostImagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Nhấp để tải lên hình ảnh
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <label
                      htmlFor="image-upload"
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="h-5 w-5" />
                    </label>
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                      <Smile className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewPostTitle("");
                        setNewPostContent("");
                        setNewPostImage(null);
                        setNewPostImagePreview("");
                        setNewPostSkills([]);
                        setSkillInput("");
                      }}
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={handleCreatePost}
                      disabled={
                        creating ||
                        !newPostTitle.trim() ||
                        !newPostContent.trim()
                      }
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
                    >
                      {creating ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Đang đăng...
                        </span>
                      ) : (
                        "Đăng bài"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default CreatePostForm;
