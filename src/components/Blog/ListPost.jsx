const ListPost = ({
  post,
  userData,
  userInformation,
  formatTime,
  viewMode,
  showDropdown,
  toggleDropdown,
  handleEditPost,
  handleDeletePost,
  deleting,
}) => {
  const user = userData[post.user_id];
  const userInfo = userInformation[post.user_id];
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Post header with user info */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage
                src={
                  user?.image ||
                  "https://www.gravatar.com/avatar/default?s=200&d=mp"
                }
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-lg">
                {userInfo?.full_name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {userInfo?.full_name || "Người dùng"}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <span>{userInfo?.job_title || "Thành viên"}</span>
                <span className="mx-1.5">•</span>
                <span>{formatTime(post.created_at) || "Vừa xong"}</span>
              </div>
            </div>
          </div>

          {/* Post actions dropdown */}
          {viewMode === "user" && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(post.id);
                }}
                className="h-9 w-9 p-0 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>

              <AnimatePresence>
                {showDropdown[post.id] && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden"
                  >
                    <button
                      onClick={() => handleEditPost(post)}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4 text-gray-500" />
                      <span>Chỉnh sửa bài viết</span>
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      disabled={deleting[post.id]}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>
                        {deleting[post.id] ? "Đang xóa..." : "Xóa bài viết"}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Post content */}
        <div className="mt-4">
          {editingPost === post.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium"
              />
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                className="resize-none border-gray-200 rounded-xl focus:ring-purple-500 p-4"
              />

              {/* Edit Skills Tags Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Tag liên quan
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200"
                    >
                      {skill}
                      <button
                        onClick={() => removeEditSkill(skill)}
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
                    placeholder="Thêm tags..."
                    value={editSkillInput}
                    onChange={(e) => setEditSkillInput(e.target.value)}
                    onKeyPress={handleEditSkillKeyPress}
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <Button
                    type="button"
                    onClick={addEditSkill}
                    disabled={!editSkillInput.trim()}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl px-4"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Edit Image Upload Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Hình ảnh
                </label>
                {editImagePreview ? (
                  <div className="relative">
                    <img
                      src={editImagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      onClick={removeEditImage}
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
                      onChange={handleEditImageUpload}
                      className="hidden"
                      id={`edit-image-upload-${post.id}`}
                    />
                    <label
                      htmlFor={`edit-image-upload-${post.id}`}
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

              <div className="flex space-x-3">
                <Button
                  onClick={() => handleUpdatePost(post.id)}
                  disabled={updating || !editContent.trim()}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
                >
                  {updating ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                >
                  Hủy
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {post.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Skills Tags Display */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Post image */}
        {post.image_url && (
          <div className="mt-4 rounded-xl overflow-hidden">
            <img
              src={post.image_url || "/placeholder.svg"}
              alt="Nội dung bài viết"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Post stats */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" />
              </div>
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" />
              </div>
            </div>
            <span>{post.like_count} lượt thích</span>
          </div>
          <div className="flex space-x-4">
            <span>{post.comment_count} bình luận</span>
            {/* <span>{post.share_count} chia sẻ</span> */}
          </div>
        </div>
      </div>

      {/* Post actions */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleLikePost(post.id)}
          className={`flex-1 rounded-xl h-10 ${
            post.liked ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
          }`}
        >
          {post.liked ? (
            <HeartFilled className="h-5 w-5 mr-2 text-pink-600" />
          ) : (
            <Heart className="h-5 w-5 mr-2" />
          )}
          <span>Thích</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleCommentInput(post.id)}
          className="flex-1 rounded-xl h-10 text-gray-600 hover:text-blue-600"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          <span>Bình luận</span>
        </Button>
        {/* <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSharePost(post.id)}
                          className="flex-1 rounded-xl h-10 text-gray-600 hover:text-green-600"
                        >
                          <Share2 className="h-5 w-5 mr-2" />
                          <span>Chia sẻ</span>
                        </Button> */}
      </div>

      {/* Comment section */}
      <AnimatePresence>
        {showComments[post.id] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 bg-gray-50"
          >
            <div className="flex space-x-3">
              <Avatar className="h-9 w-9">
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
              <div className="flex-1 flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Viết bình luận..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    className="w-full p-3 pr-12 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !commenting[post.id]) {
                        handleCommentOnPost(post.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleCommentOnPost(post.id)}
                    disabled={
                      commenting[post.id] || !commentInputs[post.id]?.trim()
                    }
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700 disabled:text-gray-400"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {post.comment_count > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => handleViewAllComments(post.id)}
                  className="text-sm text-purple-600 font-medium hover:text-purple-700 mb-4"
                >
                  Xem tất cả {post.comment_count} bình luận
                </button>

                {/* Display fetched comments */}
                {postComments[post.id] && (
                  <div className="space-y-3 mt-4">
                    {postComments[post.id].map((comment, index) => (
                      <div key={index} className="flex space-x-3">
                        <Avatar className="h-9 w-9">
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
                        <div className="flex-1">
                          <div className="bg-white rounded-2xl px-4 py-2 border border-gray-200">
                            <p className="text-sm text-gray-800">
                              {comment.content}
                            </p>
                          </div>
                          {/* <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                            <span>{formatTime(comment.created_at)}</span>
                                            <button className="hover:text-purple-600">
                                              <Heart className="h-3 w-3 inline mr-1" />
                                              {comment.like_count}
                                            </button>
                                          </div> */}
                        </div>
                      </div>
                    ))}

                    {/* Load more comments button */}
                    {hasMoreComments[post.id] && (
                      <div className="text-center">
                        <button
                          onClick={() => loadMoreComments(post.id)}
                          disabled={loadingComments[post.id]}
                          className="text-sm text-purple-600 font-medium hover:text-purple-700"
                        >
                          {loadingComments[post.id]
                            ? "Đang tải..."
                            : "Xem thêm bình luận"}
                        </button>
                      </div>
                    )}

                    {loadingComments[post.id] && (
                      <div className="text-center py-2">
                        <div className="inline-flex items-center text-sm text-gray-500">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                          Đang tải bình luận...
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ListPost;
