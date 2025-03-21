import { useState } from "react";
import TabList from "@/components/TabList";
import Talent from "@/pages/homepage/module/Talent";
import Company from "@/pages/homepage/module/Company";
import Project from "@/pages/homepage/module/Project";
import SearchFilter from "@/pages/homepage/module/SearchFilter";
import Header from "@/components/Header";
import { useDarkMode } from "@/hooks/DarkModeContext";
import DarkModeToggle from "@/components/DarkModeToggle";
import ChangeColorToggle from "@/components/ChangeColorToggle";
import { FileUploadDemo } from "@/components/items/FileUpdloadBox"

export default function Home() {
  const { isDarkMode } = useDarkMode();

  const tabs = ["talents", "projects", "companies"];
  const labels = { talents: "Tài năng", projects: "Dự án", companies: "Công ty" };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>  
      <ChangeColorToggle />
      <DarkModeToggle />
      <Header />
      <FileUploadDemo />
      <div className="container mx-auto px-4 py-8 h-screen">
        <div className="flex flex-col md:flex-row gap-8 min-h-screen">
          <SearchFilter />
          <main className="flex-1 flex flex-col">
            <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} labels={labels} />
            <div className="flex-1 overflow-y-auto">
              {activeTab === "talents" && <Talent />}
              {activeTab === "projects" && <Project />}
              {activeTab === "companies" && <Company />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}