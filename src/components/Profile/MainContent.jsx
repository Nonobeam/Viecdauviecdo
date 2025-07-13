import { useState, Suspense, lazy } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import TabList from "../TabList";
import { Edit, Plus, Loader2 } from "lucide-react";

const CV = lazy(() => import("@/pages/details/module/CV"));
const UserProjects = lazy(() => import("@/pages/details/module/UserProjects"));
const JoinedProjects = lazy(() =>
  import("@/pages/details/module/JoinedProjects")
);

const ProjectTabs = (userId) => {
  const tabs = ["userProjects", "joinedProjects"];
  const labels = {
    userProjects: "Dự án của mình",
    joinedProjects: "Dự án tham gia",
  };
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const actualUserId = userId.userId;
  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <main className="flex-1 flex flex-col">
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          labels={labels}
        />
        <div className="flex-1 overflow-y-auto mt-4">
          <Suspense
            fallback={
              <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
          >
            {activeTab === "userProjects" && (
              <UserProjects userId={actualUserId} />
            )}
            {activeTab === "joinedProjects" && (
              <JoinedProjects userId={actualUserId} />
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

const MainContent = ({ userInformation, isOwner, isTokenValid, user }) => {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* About Section */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-800">
              Giới thiệu
            </CardTitle>
            {isOwner && isTokenValid && (
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-600 hover:text-purple-700"
                onClick={() =>
                  navigate("/change-profile", {
                    state: { userInformation },
                  })
                }
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 leading-relaxed">
            {userInformation?.summary ||
              userInformation?.about_me ||
              "Chưa có thông tin giới thiệu."}
          </p>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-gray-800">
              Dự án
            </CardTitle>
            {isTokenValid && (
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Link
                  to="/insert-project"
                  state={{ user }}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Dự Án
                </Link>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ProjectTabs userId={user?.user_id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MainContent;
