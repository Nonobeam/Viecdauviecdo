"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";

export function TalentCard({ cards, onCardClick }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards?.map((card, index) => (
        <div key={card.id} className="h-96">
          <Card
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => onCardClick(card)}
          />
      </div>
      ))}
    </div>
  );
}