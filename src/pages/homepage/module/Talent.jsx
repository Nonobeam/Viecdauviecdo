import { TalentCard } from "@/components/items/TalentCard";
import SwipeView from "@/components/SwipeView";
import { useState } from "react";
import talents from "@/mock/data";

const Talent = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setViewMode("swipe");
  };

  return (
    <div className="h-full overflow-auto p-4">
      <TalentCard cards={talents} onCardClick={handleCardClick} />
      {/* {viewMode === "grid" ? (
        <TalentCard cards={talents} onCardClick={handleCardClick} />
      ) : (
        <SwipeView cards={talents} initialCard={selectedCard} />
      )} */}
    </div>
  );
};

export default Talent;