import Loader from "@/components/Loader";
import TabList from "@/components/TabList";
import SearchFilter from "@/pages/homepage/module/SearchFilter";
import { Suspense, lazy, useState } from "react";

const Talent = lazy(() => import("@/pages/homepage/module/Talent"));
const Company = lazy(() => import("@/pages/homepage/module/Company"));
const Project = lazy(() => import("@/pages/homepage/module/Project"));

const Home = () => {
  const tabs = ["talents", "projects", "companies"];
  const labels = {
    talents: "Tài năng",
    projects: "Dự án",
    companies: "Công ty",
  };
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // ① Lifted-up filter state
 const [filters, setFilters] = useState({
    city: [],
    state: [],
    country: [],
    dateOfBirth: "",
    skill: [],
    certification: [],
  });

  const [inputValues, setInputValues] = useState({
    cityInput: "",
    stateInput: "",
    countryInput: "",
    skillInput: "",
    certificationInput: "",
  });

    const [searchTrigger, setSearchTrigger] = useState(0);
  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[90vh]">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        {activeTab === "talents" && (
          <SearchFilter
            filters={filters}
            setFilters={setFilters}
            inputValues={inputValues}
            setInputValues={setInputValues}
            onSearch={handleSearch}
          />
        )}

        <main className="flex-1 flex flex-col">
          <TabList
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            labels={labels}
          />
          <div className="flex-1 overflow-y-auto">
            <Suspense fallback={<Loader />}>
              {activeTab === "talents" && <Talent filters={filters} />}
              {activeTab === "projects" && <Project />}
              {activeTab === "companies" && <Company />}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
