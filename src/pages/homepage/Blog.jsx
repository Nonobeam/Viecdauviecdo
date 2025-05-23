import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/AuthContext";
import { createPost, getAllPosts, getUserPosts } from "@/utils/postApi";
import { Heart, Home, MessageCircle, Plus, Share2, User } from "lucide-react";
import { useEffect, useState } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [waitLoading, setWaitLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { user, loading } = useAuth();

  // Create post states
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [creating, setCreating] = useState(false);

  // View mode states
  const [viewMode, setViewMode] = useState("all");
  const [currentUserId] = useState(user?.user_id);

  const fetchPosts = async (pageNum = 0, reset = false) => {
    try {
      console.log(currentUserId);
      if (pageNum === 0) setWaitLoading(true);
      else setLoadingMore(true);

      const newPosts = await getAllPosts(pageNum, 10);

      if (reset || pageNum === 0) {
        setPosts(newPosts.push);
      } else {
        setPosts((prev) => [...prev, ...newPosts.push]);
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
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    try {
      setCreating(true);
      const newPost = await createPost({
        title: newPostTitle,
        content: newPostContent,
      });

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
    fetchPosts();
  }, []);

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
      {Array.isArray(posts) && posts.length > 0 && posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-6 space-y-4 mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={post.author?.avatar || "/api/placeholder/40/40"}
              />
              <AvatarFallback>{post.author?.name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">
                {post.author?.name || "Unknown User"}
              </h3>
              <div className="text-sm text-muted-foreground">
                <p>{post.author?.role || "Unknown Role"}</p>
                <p>{post.createdAt || "Unknown Time"}</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold pt-2">{post.title}</h2>

          <div className="text-muted-foreground space-y-4">
            <p>{post.content}</p>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            <Button variant="ghost" className="space-x-2">
              <Heart className="h-5 w-5" />
              <span>{post.likes} likes</span>
            </Button>
            <Button variant="ghost" className="space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments} comments</span>
            </Button>
            <Button variant="ghost" className="space-x-2">
              <Share2 className="h-5 w-5" />
              <span>{post.shares} Share</span>
            </Button>
          </div>
        </div>
      ))}
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
