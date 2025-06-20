import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/providers/AuthContext"
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  likePost,
  sharePost,
  updatePost,
} from "@/utils/postApi"
import { getUserById } from "@/utils/userApi"
import { AnimatePresence, motion } from "framer-motion"
import {
  Calendar,
  Edit,
  Heart,
  HeartIcon as HeartFilled,
  Home,
  Image,
  MessageCircle,
  MoreVertical,
  Plus,
  Send,
  Share2,
  Smile,
  Trash2,
  User,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import LoginNotificationPopup from "../../components/LoginNotificationPopup"
import { useLoginNotification } from "../../hooks/useNotificationPopup"

const Post = () => {
  const [posts, setPosts] = useState([])
  const [waitLoading, setWaitLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const { user, loading } = useAuth()
  const [fetch, setFetch] = useState(0)

  const [userData, setUserData] = useState({})
  const [userInformation, setUserInformation] = useState({})

  // Create post states
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [creating, setCreating] = useState(false)

  // Edit post states
  const [editingPost, setEditingPost] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [updating, setUpdating] = useState(false)

  // Delete states
  const [deleting, setDeleting] = useState({})

  // View mode states
  const [viewMode, setViewMode] = useState("all")
  const [currentUserId, setCurrentUserId] = useState(null)

  // Comment states
  const [commentInputs, setCommentInputs] = useState({})
  const [commenting, setCommenting] = useState({})
  const [showComments, setShowComments] = useState({})

  // Dropdown menu states
  const [showDropdown, setShowDropdown] = useState({})

  // Login notification
  const { isOpen: showLoginPopup, showLoginNotification, hideLoginNotification } = useLoginNotification()

  const fetchUser = async (userId) => {
    if (userId != null && !userData[userId]) {
      try {
        const fetchedUser = await getUserById(userId)
        setUserData((prev) => ({
          ...prev,
          [userId]: fetchedUser.data,
        }))
        setUserInformation((prev) => ({
          ...prev,
          [userId]: fetchedUser.data.user_information,
        }))
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }
  }

  const fetchPosts = async (pageNum = 0, reset = false) => {
    try {
      if (pageNum === 0) setWaitLoading(true)
      else setLoadingMore(true)

      const newPosts = await getAllPosts(pageNum, 10)

      if (reset || pageNum === 0) {
        setPosts(newPosts)
      } else {
        setPosts((prev) => [...prev, ...newPosts])
      }

      setHasMore(newPosts.length === 10)
      setPage(pageNum)
    } catch (err) {
      setError("Failed to fetch posts")
      console.error("Error fetching posts:", err)
    } finally {
      setWaitLoading(false)
      setLoadingMore(false)
    }
  }

  const fetchUserPosts = async () => {
    try {
      setWaitLoading(true)
      const userPosts = await getUserPosts(currentUserId)
      setPosts(userPosts)
      setHasMore(false)
    } catch (err) {
      setError("Failed to fetch user posts")
      console.error("Error fetching user posts:", err)
    } finally {
      setWaitLoading(false)
    }
  }

  const handleCreatePost = async () => {
    if (!user) {
      showLoginNotification()
      return
    }

    if (!newPostContent.trim()) return
    try {
      setCreating(true)
      console.log(user)
      const newPost = await createPost({
        user_id: currentUserId,
        title: newPostTitle,
        content: newPostContent,
        image_url: "",
        tags: [],
      })
      setFetch((prev) => prev + 1)
      setPosts((prev) => [newPost, ...prev])
      setNewPostTitle("")
      setNewPostContent("")
      setShowCreateForm(false)
    } catch (err) {
      setError("Failed to create post")
      console.error("Error creating post:", err)
    } finally {
      setCreating(false)
    }
  }

  const handleEditPost = (post) => {
    setEditingPost(post.id)
    setEditTitle(post.title)
    setEditContent(post.content)
    setShowDropdown((prev) => ({ ...prev, [post.id]: false }))
  }

  const handleCancelEdit = () => {
    setEditingPost(null)
    setEditTitle("")
    setEditContent("")
  }

  const handleUpdatePost = async (postId) => {
    if (!editContent.trim()) return

    setUpdating(true)
    try {
      const updatedPost = await updatePost(postId, {
        title: editTitle,
        content: editContent,
      })
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post)))
      setFetch((prev) => prev + 1)
      setEditingPost(null)
      setEditTitle("")
      setEditContent("")
    } catch (err) {
      setError("Failed to update post")
      console.error("Error updating post:", err)
    } finally {
      setUpdating(false)
    }
  }

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.")
    if (!confirmDelete) return

    try {
      setDeleting((prev) => ({ ...prev, [postId]: true }))
      await deletePost(postId)
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
      setShowDropdown((prev) => ({ ...prev, [postId]: false }))
    } catch (err) {
      setError("Failed to delete post")
      console.error("Error deleting post:", err)
    } finally {
      setDeleting((prev) => ({ ...prev, [postId]: false }))
    }
  }

  const handleLikePost = async (postId) => {
    if (!user) {
      showLoginNotification()
      return
    }

    try {
      await likePost(postId)
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, like_count: post.like_count + 1, liked: true } : post,
        ),
      )
    } catch (err) {
      console.error("Error liking post:", err)
    }
  }

  const handleSharePost = async (postId) => {
    if (!user) {
      showLoginNotification()
      return
    }

    try {
      await sharePost(postId)
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, share_count: post.share_count + 1 } : post)),
      )
    } catch (err) {
      console.error("Error sharing post:", err)
    }
  }

  const handleCommentOnPost = async (postId) => {
    if (!user) {
      showLoginNotification()
      return
    }

    const commentContent = commentInputs[postId]
    if (!commentContent?.trim()) return

    try {
      setCommenting((prev) => ({ ...prev, [postId]: true }))
      await commentOnPost(postId, {
        user_id: currentUserId,
        content: commentContent,
      })
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? { ...post, comment_count: post.comment_count + 1 } : post)),
      )
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }))
    } catch (err) {
      console.error("Error commenting on post:", err)
    } finally {
      setCommenting((prev) => ({ ...prev, [postId]: false }))
    }
  }

  const toggleCommentInput = (postId) => {
    if (!user) {
      showLoginNotification()
      return
    }

    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  const toggleDropdown = (postId) => {
    setShowDropdown((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  const formatTime = (isoString) => {
    const date = new Date(isoString)
    if (isNaN(date)) return "Invalid date"

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }

    return date.toLocaleString(undefined, options)
  }

  const loadMore = () => {
    if (!loadingMore && hasMore && viewMode === "all") {
      fetchPosts(page + 1)
    }
  }

  const switchViewMode = (mode) => {
    setViewMode(mode)
    setPage(0)
    if (mode === "all") {
      fetchPosts(0, true)
    } else {
      fetchUserPosts()
    }
  }

  useEffect(() => {
    if (!loading && user?.user_id) {
      setCurrentUserId(user.user_id)
    }
    switchViewMode("all")
  }, [loading, user])

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        fetchUser(post.user_id)
      })
    }
  }, [posts])

  useEffect(() => {
    if (viewMode === "all") {
      fetchPosts(0, true)
    } else {
      fetchUserPosts()
    }
  }, [fetch])

  if (waitLoading && posts && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-t-4 border-b-4 border-pink-500 animate-spin animation-delay-150"></div>
            <div className="absolute inset-6 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin animation-delay-300"></div>
          </div>
          <p className="text-lg font-medium text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center space-y-6 p-8 bg-white rounded-2xl shadow-xl max-w-md w-full">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <X className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Đã xảy ra lỗi</h3>
          <p className="text-red-600 font-medium">{error}</p>
          <Button
            onClick={() => fetchPosts(0, true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full"
          >
            Thử lại
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* User Profile Card */}
              {user && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="px-6 pb-6 -mt-12">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={
                          userData[currentUserId]?.image ||
                          "https://www.gravatar.com/avatar/default?s=200&d=mp" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                        {userInformation[currentUserId]?.full_name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-xl font-bold text-gray-900">
                      {userInformation[currentUserId]?.full_name || "Người dùng"}
                    </h3>
                    <p className="text-gray-600">{userInformation[currentUserId]?.job_title || "Thành viên"}</p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Tham gia tháng 6, 2023</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-2">
                <button
                  onClick={() => switchViewMode("all")}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${viewMode === "all"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <Home className={`h-5 w-5 ${viewMode === "all" ? "text-white" : "text-gray-500"}`} />
                  <span>Tất cả bài viết</span>
                </button>
                <button
                  onClick={() => switchViewMode("user")}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${viewMode === "user"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <User className={`h-5 w-5 ${viewMode === "user" ? "text-white" : "text-gray-500"}`} />
                  <span>Bài viết của tôi</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {/* Mobile Navigation */}
            <div className="lg:hidden flex overflow-x-auto space-x-2 pb-4 scrollbar-hide">
              <button
                onClick={() => switchViewMode("all")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${viewMode === "all"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
                    : "bg-white text-gray-700 border border-gray-200"
                  }`}
              >
                <Home className="h-4 w-4" />
                <span>Tất cả</span>
              </button>
              <button
                onClick={() => switchViewMode("user")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${viewMode === "user"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
                    : "bg-white text-gray-700 border border-gray-200"
                  }`}
              >
                <User className="h-4 w-4" />
                <span>Của tôi</span>
              </button>
            </div>

            {/* Create Post Button */}
            <div className="mb-6">
              <div
                onClick={() => {
                  if (!user) {
                    showLoginNotification()
                    return
                  }
                  setShowCreateForm(!showCreateForm)
                }}
                className="w-full bg-white rounded-2xl shadow-lg p-4 flex items-center space-x-3 hover:shadow-xl transition-shadow cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setShowCreateForm(!showCreateForm)
                  }
                }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      userData[currentUserId]?.image ||
                      "https://www.gravatar.com/avatar/default?s=200&d=mp" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                    {userInformation[currentUserId]?.full_name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left text-gray-500">Bạn đang nghĩ gì?</div>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Create post form */}
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
                    <h3 className="text-xl font-bold text-gray-800">Tạo bài viết mới</h3>
                    <button
                      onClick={() => {
                        setShowCreateForm(false)
                        setNewPostTitle("")
                        setNewPostContent("")
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
                            "https://www.gravatar.com/avatar/default?s=200&d=mp" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                          {userInformation[currentUserId]?.full_name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {userInformation[currentUserId]?.full_name || "Người dùng"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userInformation[currentUserId]?.job_title || "Thành viên"}
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
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                          <Image className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                          <Smile className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowCreateForm(false)
                            setNewPostTitle("")
                            setNewPostContent("")
                          }}
                          className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                        >
                          Hủy
                        </Button>
                        <Button
                          onClick={handleCreatePost}
                          disabled={creating || !newPostTitle.trim() || !newPostContent.trim()}
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

            {/* Posts list */}
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => {
                  const user = userData[post.user_id]
                  const userInfo = userInformation[post.user_id]
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
                                  "https://www.gravatar.com/avatar/default?s=200&d=mp" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg"
                                }
                              />
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-lg">
                                {userInfo?.full_name?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{userInfo?.full_name || "Người dùng"}</h3>
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
                                  e.stopPropagation()
                                  toggleDropdown(post.id)
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
                                      <span>{deleting[post.id] ? "Đang xóa..." : "Xóa bài viết"}</span>
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
                              <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
                            </>
                          )}
                        </div>

                        {/* Post image */}
                        {post.image && (
                          <div className="mt-4 rounded-xl overflow-hidden">
                            <img
                              src={post.image || "/placeholder.svg"}
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
                            <span>{post.share_count} chia sẻ</span>
                          </div>
                        </div>
                      </div>

                      {/* Post actions */}
                      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikePost(post.id)}
                          className={`flex-1 rounded-xl h-10 ${post.liked ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSharePost(post.id)}
                          className="flex-1 rounded-xl h-10 text-gray-600 hover:text-green-600"
                        >
                          <Share2 className="h-5 w-5 mr-2" />
                          <span>Chia sẻ</span>
                        </Button>
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
                                    "https://www.gravatar.com/avatar/default?s=200&d=mp" ||
                                    "/placeholder.svg" ||
                                    "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                                  {userInformation[currentUserId]?.full_name?.[0]?.toUpperCase() || "U"}
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
                                        handleCommentOnPost(post.id)
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={() => handleCommentOnPost(post.id)}
                                    disabled={commenting[post.id] || !commentInputs[post.id]?.trim()}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700 disabled:text-gray-400"
                                  >
                                    <Send className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {post.comment_count > 0 && (
                              <div className="mt-4 text-center">
                                <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                                  Xem tất cả {post.comment_count} bình luận
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              /* No posts message */
              <div className="text-center py-12">
                <div className="mx-auto max-w-md p-8 bg-white rounded-2xl shadow-lg">
                  <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <MessageCircle className="h-10 w-10 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có bài viết nào</h3>
                  <p className="text-gray-600 mb-6">
                    {viewMode === "user"
                      ? "Bạn chưa tạo bài viết nào. Hãy chia sẻ suy nghĩ của bạn!"
                      : "Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!"}
                  </p>
                  {viewMode === "user" && (
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl px-6 py-3"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Tạo bài viết đầu tiên
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Load more button */}
            {hasMore && viewMode === "all" && (
              <div className="text-center py-8">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl px-8 py-6 h-auto"
                >
                  {loadingMore ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700"
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
                      Đang tải...
                    </span>
                  ) : (
                    "Xem thêm bài viết"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginNotificationPopup isOpen={showLoginPopup} onClose={hideLoginNotification} />
    </div>
  )
}

export default Post
