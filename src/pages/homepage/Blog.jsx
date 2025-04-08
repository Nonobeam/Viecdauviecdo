import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChatbotButton from "@/components/ui/ChatbotButton";
import { blogs } from "@/mock/data";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const Post = () => {
  return (
    <div className="max-w-4xl mx-auto bg-background h-[90vh] overflow-y-auto">
      {blogs.map((blog) => (
        <div key={blog.id} className="border rounded-lg p-6 space-y-4 mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={blog.avatar || "/placeholder.svg"} />
              <AvatarFallback>{blog.name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{blog.name}</h3>
              <div className="text-sm text-muted-foreground">
                <p>{blog.role || "Unknown Role"}</p>
                <p>{blog.time || "Unknown Time"}</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold pt-2">{blog.title}</h2>

          <div className="text-muted-foreground space-y-4">
            <p>{blog.content}</p>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            <Button variant="ghost" className="space-x-2">
              <Heart className="h-5 w-5" />
              <span>{blog.likes} likes</span>
            </Button>
            <Button variant="ghost" className="space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>{blog.comments} comments</span>
            </Button>
            <Button variant="ghost" className="space-x-2">
              <Share2 className="h-5 w-5" />
              <span>{blog.shares} Share</span>
            </Button>
          </div>
        </div>
      ))}
      <ChatbotButton>

      </ChatbotButton>
    </div>
  );
};

export default Post;