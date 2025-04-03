import BentoGridDemo from "@/components/BentoGridLayout";
import { 
  Building, 
  Brain, 
  BarChart, 
  Heart 
} from "lucide-react"; // Using Lucide icons
import { projects } from "@/mock/data";
// import {
//   IconBuildingBank,
//   IconBrain,
//   IconChartBar,
//   IconHeartbeat,
// } from "@tabler/icons-react";

const Project = () => {
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );

  const icons = [
    { key: "bank", element: <Building className="h-4 w-4 text-neutral-500" /> },
    { key: "brain", element: <Brain className="h-4 w-4 text-neutral-500" /> },
    { key: "chart", element: <BarChart className="h-4 w-4 text-neutral-500" /> },
    { key: "heartbeat", element: <Heart className="h-4 w-4 text-neutral-500" /> },
  ];

  const items = projects.map((project, index) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    header: <Skeleton />,
    teamSize: project.teamSize,
    icon: icons[index % icons.length].element,
    imgSrc: project.image,
  }));

  return (
    <div className="h-full overflow-auto p-4">
      <BentoGridDemo items={items} />
    </div>
  );
};

export default Project;
