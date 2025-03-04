import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useDarkMode } from "@/hooks/DarkModeContext";
import DarkModeToggle from "@/components/DarkModeToggle";
import Header from "@/components/Header";

const Post = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <DarkModeToggle />
      <Header />

      

      <div className="max-w-2xl mx-auto bg-background">
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Sarah Chen</h3>
              <div className="text-sm text-muted-foreground">
                <p>Senior UX Designer</p>
                <p>2h ago</p>
              </div>
            </div>
          </div>

          {/* Post Title */}
          <h2 className="text-xl font-semibold pt-2">The Future of Design Systems</h2>

          {/* Post Content */}
          <div className="text-muted-foreground space-y-4">
            <p>
              Design systems have become the backbone of modern product development. After years of working with various
              teams, I've observed some key trends that I believe will shape the future of design systems:
            </p>
            <p>
              Modular Architecture The most successful design systems are those that allow teams to adopt components
              incrementally. This modular approach reduces the barrier to entry and increases adoption rates across
              organizations.
            </p>
            <p>
              Automation & AI Integration We're seeing a shift towards automated documentation, testing, and even
              component suggestions through AI. This not only saves time but ensures consistency across large-scale
              applications.
            </p>
            <p>
              Accessibility First Accessibility is no longer an afterthought. Modern design systems are being built with
              accessibility as a core principle, not just a checkbox item.
            </p>
            <p>What are your thoughts on these trends? How do you see design systems evolving in your organization?</p>
          </div>

          {/* Engagement Actions */}
          <div className="flex items-center space-x-6 pt-4">
            <Button variant="ghost" className="space-x-2">
              <Heart className="h-5 w-5" />
              <span>234 likes</span>
            </Button>
            <Button variant="ghost" className="space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Comments</span>
            </Button>
            <Button variant="ghost" className="space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
        </div>

        {/* Second Post Preview */}
        <div className="border rounded-lg p-6 mt-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">John Chen</h3>
              <div className="text-sm text-muted-foreground">
                <p>Marketing Researcher</p>
                <p>2h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post