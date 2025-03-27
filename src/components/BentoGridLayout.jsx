import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function BentoGridDemo({ items }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    console.log("Helllow World");
    navigate(`/project/${id}`);
  };

  return (
    <BentoGrid className="w-full mx-auto">
      {items.map((item) => (
        <BentoGridItem
          key={item.id}
          title={item.title}
          description={item.description}
          header={item.header}
          teamSize={item.teamSize}
          icon={item.icon}
          imgSrc={item.imgSrc}
          className={`${item.id === 3 || item.id === 6 ? "md:col-span-2" : ""} cursor-pointer`}
          onClick={() => handleCardClick(item.id)}
        />
      ))}
    </BentoGrid>
  );
}

BentoGridDemo.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      teamSize: PropTypes.string,
      icon: PropTypes.node,
      imgSrc: PropTypes.string,
    })
  ).isRequired,
}