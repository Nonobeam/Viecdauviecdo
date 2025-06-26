import {
    getAllPostAnalytic,
    getAllProjectsAnalytic,
    getAllUserAnalytic,
} from "@/utils/adminAPI";
import {
    Calendar,
    FolderOpen,
    MessageSquare,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";

const StatCard = ({ title, value, subtitle, icon: Icon, color = "purple" }) => {
  const colorClasses = {
    purple: "from-purple-500 to-blue-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500",
    blue: "from-blue-500 to-indigo-500",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`bg-gradient-to-r ${colorClasses[color]} rounded-lg p-3`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>
        <p className="text-gray-600 font-medium">{title}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersData, postsData, projectsData] = await Promise.all([
          getAllUserAnalytic(),
          getAllPostAnalytic(),
          getAllProjectsAnalytic(),
        ]);

        setUsers(usersData);
        setPosts(postsData);
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Users Analytics
        </h2>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            Updated: {new Date().toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={users.length}
          subtitle="Registered users"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Total Posts"
          value={posts.length}
          subtitle="Across all categories"
          icon={MessageSquare}
          color="green"
        />
        <StatCard
          title="Total Projects"
          value={projects.length}
          subtitle="All projects"
          icon={FolderOpen}
          color="blue"
        />
      </div>

      {/* System Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              System Overview
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Users</span>
              <span className="font-semibold text-purple-600 text-xl">
                {users.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Posts</span>
              <span className="font-semibold text-green-600 text-xl">
                {posts.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Projects</span>
              <span className="font-semibold text-blue-600 text-xl">
                {projects.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Platform Statistics
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Posts per User</span>
              <span className="font-semibold text-blue-600 text-xl">
                {users.length > 0 ? Math.round(posts.length / users.length) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Projects per User</span>
              <span className="font-semibold text-green-600 text-xl">
                {users.length > 0
                  ? Math.round(projects.length / users.length)
                  : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Content Items</span>
              <span className="font-semibold text-orange-600 text-xl">
                {posts.length + projects.length}
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default UsersComponent;
