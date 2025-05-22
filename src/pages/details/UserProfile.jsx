import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ChatWidget from "@/components/ui/chatWidget";
import { useAuth } from "@/providers/AuthContext";
import { getUserById, uploadAvatar } from "@/utils/userApi";
import { Edit, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuth(); // From AuthContext
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);
  const [fetched, setFetched] = useState(false);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const fetchUser = async () => {
    if (user?.user_id && !loading) {
      try {
        const fetchedUser = await getUserById(user.user_id);
        setUserData(fetchedUser.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !user?.user_id) return;

    try {
      await uploadAvatar(user.user_id, file);
      const updated = await getUserById(user.user_id);
      setUserData(updated);
      setFetched(true);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user, fetched]);

  const skills = [
    { name: "React", color: "bg-blue-100 text-blue-700" },
    { name: "Node.js", color: "bg-green-100 text-green-700" },
    { name: "Python", color: "bg-yellow-100 text-yellow-700" },
    { name: "TypeScript", color: "bg-blue-100 text-blue-700" },
    { name: "AWS", color: "bg-orange-100 text-orange-700" },
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory",
      type: "Freelance",
      tech: ["React", "Node.js"],
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management",
      type: "Open Source",
      tech: ["Python", "React"],
      image: "/placeholder.svg",
    },
  ];

  console.log("User from userData:", userData);
  return (
    
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-8 bg-blue-50 p-6 rounded-lg md:col-span-1">
            {/* Profile Info */}
            <div className="flex flex-col items-center md:items-start">
              <div onClick={handleAvatarClick} className="cursor-pointer">
                <Avatar className="h-24 w-24 mb-4">
                  {userData?.image ? (
                    <AvatarImage src={userData.image} />
                  ) : (
                    <AvatarFallback>JD</AvatarFallback>
                  )}
                </Avatar>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <h1 className="text-2xl font-bold">
                {userData?.fullName || "Loading..."}
              </h1>
              <p className="text-muted-foreground">
                Senior Full-Stack Developer
              </p>
            </div>

            {/* About Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">About Me</h2>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <p className="text-muted-foreground">
                Passionate developer with 5+ years of experience building
                scalable web applications and leading development teams.
              </p>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <p className="text-muted-foreground">San Francisco, CA</p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <p className="text-muted-foreground">
                {userData?.email}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1">Hire Me</Button>
              <Button variant="outline" className="flex-1">
                Analyze
              </Button>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className={skill.color}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Projects */}
          <div className="md:col-span-2">
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Projects</h2>
                <div className="flex gap-x-4">
                  {" "}
                  {/* Added flex and gap-x-4 */}
                  <Button>
                    <Link to="/insert-cv" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Add CV
                    </Link>
                  </Button>
                  <Button>
                    <Link to="/insert-project" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Dự Án
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="aspect-video bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-purple-100 text-purple-700"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {project.type}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ChatWidget />
      </div>
    </div>
  );
};

export default Profile;
