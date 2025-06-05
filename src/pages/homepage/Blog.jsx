import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/AuthContext";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  likePost,
  sharePost,
  updatePost,
} from "@/utils/postApi";
import { getUserById } from "@/utils/userApi";
import {
  Edit,
  Heart,
  Home,
  MessageCircle,
  MoreVertical,
  Plus,
  Share2,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [waitLoading, setWaitLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { user, loading } = useAuth();
  const [fetch, setFetch] = useState(0);

  const [userData, setUserData] = useState({});
  const [userInformation, setUserInformation] = useState({});

  // Create post states
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [creating, setCreating] = useState(false);

  // Edit post states
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [updating, setUpdating] = useState(false);

  // Delete states
  const [deleting, setDeleting] = useState({});

  // View mode states
  const [viewMode, setViewMode] = useState("all");
  const [currentUserId, setCurrentUserId] = useState(null);

  // Comment states
  const [commentInputs, setCommentInputs] = useState({}); // Track comment input for each post
  const [commenting, setCommenting] = useState({}); // Track commenting state for each post
  const [showComments, setShowComments] = useState({}); // Track which posts show comment input

  // Dropdown menu states
  const [showDropdown, setShowDropdown] = useState({});

  const fetchUser = async (userId) => {
    if (userId != null && !userData[userId]) {
      try {
        const fetchedUser = await getUserById(userId);
        setUserData((prev) => ({
          ...prev,
          [userId]: fetchedUser.data,
        }));
        setUserInformation((prev) => ({
          ...prev,
          [userId]: fetchedUser.data.user_information,
        }));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
  };

  const fetchPosts = async (pageNum = 0, reset = false) => {
    try {
      if (pageNum === 0) setWaitLoading(true);
      else setLoadingMore(true);

      const newPosts = await getAllPosts(pageNum, 10);
      console.log(newPosts);

      if (reset || pageNum === 0) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(newPosts.length === 10);
      setPage(pageNum);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error("Error fetching posts:", err);
    } finally {
      setWaitLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch user posts
  const fetchUserPosts = async () => {
    try {
      setWaitLoading(true);
      const userPosts = await getUserPosts(currentUserId);
      console.log(userPosts);
      setPosts(userPosts);
      setHasMore(false); // User posts typically don't need pagination
    } catch (err) {
      setError("Failed to fetch user posts");
      console.error("Error fetching user posts:", err);
    } finally {
      setWaitLoading(false);
    }
  };

  // Create new post
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    console.log(currentUserId);
    try {
      setCreating(true);
      const newPost = await createPost({
        user_id: currentUserId,
        title: newPostTitle,
        content: newPostContent,
        image_url: "",
        tags: [],
      });
      setFetch((prev) => prev + 1);
      setPosts((prev) => [newPost, ...prev]);
      setNewPostTitle("");
      setNewPostContent("");
      setShowCreateForm(false);
    } catch (err) {
      setError("Failed to create post");
      console.error("Error creating post:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setShowDropdown((prev) => ({ ...prev, [post.id]: false }));
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditTitle("");
    setEditContent("");
  };

  // Update post
  const handleUpdatePost = async (postId) => {
    if (!editContent.trim()) return;

    setUpdating(true);
    try {
      const updatedPost = await updatePost(postId, {
        title: editTitle,
        content: editContent,
      });
      // Update the post in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...updatedPost } : post
        )
      );
      setFetch((prev) => prev + 1);
      setEditingPost(null);
      setEditTitle("");
      setEditContent("");
    } catch (err) {
      setError("Failed to update post");
      console.error("Error updating post:", err);
    } finally {
      setUpdating(false);
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      setDeleting((prev) => ({ ...prev, [postId]: true }));
      await deletePost(postId);

      // Remove the post from local state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setShowDropdown((prev) => ({ ...prev, [postId]: false }));
    } catch (err) {
      setError("Failed to delete post");
      console.error("Error deleting post:", err);
    } finally {
      setDeleting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  // Handle like post
  const handleLikePost = async (postId) => {
    try {
      await likePost(postId);

      // Optimistically update the UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, like_count: post.like_count + 1 }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
      // You might want to show a toast notification here
    }
  };

  // Handle share post
  const handleSharePost = async (postId) => {
    try {
      await sharePost(postId);

      // Optimistically update the UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, share_count: post.share_count + 1 }
            : post
        )
      );
    } catch (err) {
      console.error("Error sharing post:", err);
      // You might want to show a toast notification here
    }
  };

  // Handle comment on post
  const handleCommentOnPost = async (postId) => {
    const commentContent = commentInputs[postId];
    if (!commentContent?.trim()) return;

    try {
      setCommenting((prev) => ({ ...prev, [postId]: true }));

      await commentOnPost(postId, {
        userId: currentUserId,
        content: commentContent,
      });

      // Optimistically update the UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comment_count: post.comment_count + 1 }
            : post
        )
      );

      // Clear the comment input
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      setShowComments((prev) => ({ ...prev, [postId]: false }));
    } catch (err) {
      console.error("Error commenting on post:", err);
      // You might want to show a toast notification here
    } finally {
      setCommenting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleCommentInput = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleDropdown = (postId) => {
    setShowDropdown((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);

    if (isNaN(date)) return "Invalid date";

    const options = {
      year: "numeric",
      month: "short", // e.g., "Jun"
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleString(undefined, options);
  };

  // Load more posts
  const loadMore = () => {
    if (!loadingMore && hasMore && viewMode === "all") {
      fetchPosts(page + 1);
    }
  };

  // Switch view mode
  const switchViewMode = (mode) => {
    setViewMode(mode);
    setPage(0);
    if (mode === "all") {
      fetchPosts(0, true);
    } else {
      fetchUserPosts();
    }
  };

  useEffect(() => {
    if (!loading && user?.user_id) {
      setCurrentUserId(user.user_id);
    }
    switchViewMode("all");
  }, [loading, user]);

  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        fetchUser(post.user_id);
      });
    }
  }, [posts]);

  useEffect(() => {
    if (viewMode === "all") {
      fetchPosts(0, true);
    }
    else{
      fetchUserPosts();
    }
  }, [fetch]);

  if (waitLoading && posts && posts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-background h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-background h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchPosts(0, true)}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-background h-[90vh] overflow-y-auto">
      {/* Header with navigation and create button */}
      {user && (
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => switchViewMode("all")}
                className="space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>All Posts</span>
              </Button>
              <Button
                variant={viewMode === "user" ? "default" : "outline"}
                size="sm"
                onClick={() => switchViewMode("user")}
                className="space-x-2"
              >
                <User className="h-4 w-4" />
                <span>My Posts</span>
              </Button>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Post</span>
            </Button>
          </div>
        </div>
      )}
      ,{/* Create post form */}
      {showCreateForm && (
        <div className="border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post title..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex space-x-2">
              <Button
                onClick={handleCreatePost}
                disabled={
                  creating || !newPostTitle.trim() || !newPostContent.trim()
                }
              >
                {creating ? "Creating..." : "Create Post"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewPostTitle("");
                  setNewPostContent("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Posts list */}
      {posts.length > 0 &&
        posts.map((post) => {
          const user = userData[post.user_id];
          const userInfo = userInformation[post.user_id];
          return (
            <div key={post.id} className="border rounded-lg p-6 space-y-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          user?.image ||
                          "https://www.shutterstock.com/image-vector/default-gray-man-avatar-template-260nw-662278102.jpg"
                        }
                      />
                      <AvatarFallback>
                        {userInfo?.full_name?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {userInfo?.full_name || "Unknown User"}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        <p>{userInfo?.job_title || "N/A"}</p>
                        <p>{formatTime(post.created_at) || "Unknown Time"}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {post.image && (
                      <div className="mt-4">
                        <img
                          src={post.image}
                          alt="Post image"
                          className="w-full rounded-lg object-cover"
                        />
                      </div>
                    )}

                    {/* Post Actions Dropdown - Only show for post owner */}
                    {viewMode === "user" && (
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(post.id);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>

                        {showDropdown[post.id] && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-50 rounded-t-lg"
                            >
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              disabled={deleting[post.id]}
                              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>
                                {deleting[post.id] ? "Deleting..." : "Delete"}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Mode */}
              {editingPost === post.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-xl font-semibold"
                  />
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleUpdatePost(post.id)}
                      disabled={updating || !editContent.trim()}
                    >
                      {updating ? "Updating..." : "Update Post"}
                    </Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold pt-2">{post.title}</h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>{post.content}</p>
                  </div>
                </>
              )}

              {/* <h2 className="text-xl font-semibold pt-2">{post.title}</h2>

            <div className="text-muted-foreground space-y-4">
              <p>{post.content}</p>
            </div> */}

              <div className="flex items-center space-x-6 pt-4">
                <Button
                  variant="ghost"
                  className="space-x-2"
                  onClick={() => handleLikePost(post.id)}
                >
                  <Heart className="h-5 w-5" />
                  <span>{post.like_count} likes</span>
                </Button>
                <Button
                  variant="ghost"
                  className="space-x-2"
                  onClick={() => toggleCommentInput(post.id)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comment_count} comments</span>
                </Button>
                <Button
                  variant="ghost"
                  className="space-x-2"
                  onClick={() => handleSharePost(post.id)}
                >
                  <Share2 className="h-5 w-5" />
                  <span>{post.share_count} Share</span>
                </Button>
              </div>

              {/* Comment Input Section */}
              {showComments[post.id] && (
                <div className="pt-4 border-t">
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !commenting[post.id]) {
                            handleCommentOnPost(post.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleCommentOnPost(post.id)}
                        disabled={
                          commenting[post.id] || !commentInputs[post.id]?.trim()
                        }
                      >
                        {commenting[post.id] ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      {/* Load more button */}
      {hasMore && viewMode === "all" && (
        <div className="text-center py-4">
          <Button onClick={loadMore} disabled={loadingMore} variant="outline">
            {loadingMore ? "Loading..." : "Load More Posts"}
          </Button>
        </div>
      )}
      {/* No posts message */}
      {posts && posts.length === 0 && !waitLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {viewMode === "user"
              ? "You haven't created any posts yet."
              : "No posts available."}
          </p>
          {viewMode === "user" && (
            <Button onClick={() => setShowCreateForm(true)} className="mt-4">
              Create Your First Post
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
