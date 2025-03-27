import BentoGridDemo from "@/components/BentoGridLayout";
import {
  IconBuildingBank,
  IconBrain,
  IconChartBar,
  IconHeartbeat,
} from "@tabler/icons-react";
import { projects } from "@/mock/data";

const Project = () => {
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );

  const icons = [
    { key: "bank", element: <IconBuildingBank className="h-4 w-4 text-neutral-500" /> },
    { key: "brain", element: <IconBrain className="h-4 w-4 text-neutral-500" /> },
    { key: "chart", element: <IconChartBar className="h-4 w-4 text-neutral-500" /> },
    { key: "heartbeat", element: <IconHeartbeat className="h-4 w-4 text-neutral-500" /> },
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