import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import TabList from "@/components/TabList";
import Talent from "@/pages/homepage/module/Talent";
import Company from "@/pages/homepage/module/Company";
import Project from "@/pages/homepage/module/Project";
import Header from "@/components/Header";

import { useDarkMode } from "@/hooks/DarkModeContext";
import DarkModeToggle from "@/components/DarkModeToggle";


export default function Home() {
  const { isDarkMode } = useDarkMode();

  // Use for Custom Tab list
  const tabs = ["talents", "projects", "companies"];
  const labels = { talents: "Tài năng", projects: "Dự án", companies: "Công ty" };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>  
      <DarkModeToggle />
      <Header />

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