import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom";
import { useState } from "react";
import { Moon } from "lucide-react"
import TabList from "@/utils/TabList";
import ViecdauviecdoLogo from "@/utils/Logo";
import Talent from "@/pages/homepage/module/Talent";
import Company from "@/pages/homepage/module/Company";
import Project from "@/pages/homepage/module/Project";


export default function Home() {
  // Use for Custom Tab list
  const tabs = ["talents", "projects", "companies"];
  const labels = { talents: "Tài năng", projects: "Dự án", companies: "Công ty" };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>  
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="absolute bottom-0 right-0 m-4 rounded-full h-14 w-14 p-4 bg-muted"
      >
        <Moon className="h-6 w-6" />
        <span className="sr-only">Toggle dark mode</span>
      </Button>

      {/* Navigation Bar */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-semibold">
                <ViecdauviecdoLogo />
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-primary">
                  Trang chủ
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  Về chúng tôi
                </Link>
                <Link href="/career" className="text-muted-foreground hover:text-primary">
                  Giá trị bền vững
                </Link>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Hồ sơ</Button>
              <Button>Dự án</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="link" className="text-primary">
                Xoá chọn
              </Button>
            </div>

            {/* Industry Section */}
            <div className="space-y-3">
              <h3 className="font-medium">Ngành nghề</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="developer" />
                  <label htmlFor="developer">Lập trình viên</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="design" />
                  <label htmlFor="design">Thiết kế</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="research" />
                  <label htmlFor="research">Nghiên cứu thị trường</label>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-3">
              <h3 className="font-medium">Khu vực</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="district1" />
                  <label htmlFor="district1">Quận 1</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="district2" />
                  <label htmlFor="district2">Quận 2</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="district3" />
                  <label htmlFor="district3">Quận 3</label>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-3">
              <h3 className="font-medium">Kỹ năng</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="basic" />
                  <label htmlFor="basic">Tin học cơ bản</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="discussion" />
                  <label htmlFor="discussion">Soạn thảo văn bản pháp luật</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ui-ux" />
                  <label htmlFor="ui-ux">UI/UX</label>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} labels={labels} />

            {activeTab === "talents" && <Talent />}
            {activeTab === "projects" && <Project />}
            {activeTab === "companies" && <Company />}
          </main>
        </div>
      </div>
    </div>
  )
}