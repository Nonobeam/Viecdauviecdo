import { TalentCard } from "@/components/ui/TalentCard";
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
    <div className="h-210 overflow-auto p-4">
      {viewMode === "grid" ? (
        <TalentCard cards={talents} onCardClick={handleCardClick} />
      ) : (
        <SwipeView cards={talents} initialCard={selectedCard} />
      )}
    </div>
  );
};

export default Talent;