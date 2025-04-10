import Loader from "@/components/Loader";
import TabList from "@/components/TabList";
import ChatWidget from "@/components/ui/chatWidget";
import SearchFilter from "@/pages/homepage/module/SearchFilter";
import { Suspense, lazy, useState } from "react";

const Talent = lazy(() => import("@/pages/homepage/module/Talent"));
const Company = lazy(() => import("@/pages/homepage/module/Company"));
const Project = lazy(() => import("@/pages/homepage/module/Project"));

const Home = () => {
  const tabs = ["talents", "projects", "companies"];
  const labels = { talents: "Tài năng", projects: "Dự án", companies: "Công ty" };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="container mx-auto px-4 py-8 h-[90vh]">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        <SearchFilter />
        <main className="flex-1 flex flex-col">
          <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} labels={labels} />
          <div className="flex-1 overflow-y-auto">
            <Suspense fallback={<Loader />}>
              {activeTab === "talents" && <Talent />}
              {activeTab === "projects" && <Project />}
              {activeTab === "companies" && <Company />}
            </Suspense>
          </div>
        </main>
      </div>
      <ChatWidget/>
    </div>
  )
}

export default Home;