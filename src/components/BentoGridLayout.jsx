import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BentoGridDemo({ items }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/project/${id}`, );
  };

  return (
    <BentoGrid className="w-full mx-auto">
      {items.map((item) => (
        <BentoGridItem
          key={item.id}
          name={item.name}
          description={item.description}
          tags={item.tags}
          image_url={item.image_url}
          created_at={item.created_at}
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
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      tags:PropTypes.string,
      image_url: PropTypes.string,
    })
  ).isRequired,
}